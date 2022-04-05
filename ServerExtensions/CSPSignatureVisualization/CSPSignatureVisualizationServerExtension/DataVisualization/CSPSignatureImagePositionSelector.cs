using System;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;

using Aspose.Pdf;
using Aspose.Pdf.Facades;
using Aspose.Pdf.InteractiveFeatures.Annotations;

using CSPSignatureVisualizationServerExtension.Helpers;

using DocsVision.BackOffice.CardLib.CardDefs;
using DocsVision.BackOffice.WebClient.DataVisualization;
using DocsVision.Platform.WebClient;

namespace CSPSignatureVisualizationServerExtension.DataVisualization
{
	/// <summary>
	/// Описывает класс, вставляющий в PDF-файл изображения штампов электронной подписи
	/// </summary>
	public class CSPSignatureImagePositionSelector : IImagePositionSelector
    {
        // Расстояние между изображениями штампов электронной подписи
        private static readonly double ImageMargin = ImageHelper.PixelsToUnits(5);

        // Координаты первого изображения штампа электронной подписи
        private static readonly int PagePadding = 30; // 30 миллиметров

        // Номер страницы, на которую требуется вставить изображение штампа
        private const int PageNumber = 1;

        /// <summary>
        ///Создаёт новый экземпляр класса <see cref="CSPSignatureImagePositionSelector"/>
        /// </summary>
        public CSPSignatureImagePositionSelector()
        {
        }

        #region Реализация интерфейса IImagePositionSelector

        /// <summary>
        /// Вставляет изображения штампов электронной подписи на первую страницу указанного PDF-файла
        /// </summary>
        /// <param name="sessionContext">Контекст сессии</param>
        /// <param name="generatorType">Тип генератора изображений штампов электронной подписи</param>
        /// <param name="images">Массив изображений штампов электронной подписи</param>
        /// <param name="fileStream">Поток, содержащий PDF-файл, в который необходимо вставить указанные изображения</param>
        /// <returns>Модель файла со вставленными изображениями</returns>
        public GeneratedFileInfo Generate(SessionContext sessionContext, ImageGeneratorType generatorType, System.Drawing.Image[] images, Stream fileStream)
        {
            if (images is null)
                throw new ArgumentNullException(nameof(images));
            if (fileStream is null)
                throw new ArgumentNullException(nameof(fileStream));

            // При необходимости поворачиваем требуемую страницу вертикально
            var pdfStream = PreparePdfStream(fileStream);
            using (var pdfDocument = new Document(pdfStream))
            {
                var page = pdfDocument.Pages[PageNumber];
                var pdfFileInfo = new PdfFileInfo(pdfDocument);

                double pageWidth = page.Rect.Width;
                double pageHeight = page.Rect.Height;

                // Вычисляем координаты первого изображения штампов электронной подписи
                var xIndent = pdfFileInfo.GetPageWidth(1) / pageWidth * PagePadding;
                var yIndent = pdfFileInfo.GetPageHeight(1) / pageHeight * PagePadding;

                // Максимальная высота изображения штампа в текущей строке (нужна для выравнивания изображений в строке)
                double maxImageHeight = 0;

                foreach (var imageHelper in images.Select(x => new ImageHelper(x)))
                {
                    // Если верхняя левая координата текущего изображения больше высоты страницы PDF-документа,
                    // то прекращаем вставку изображений
                    if (yIndent + imageHelper.Height > pageHeight)
                        break;

                    // Если ширина строки вставленных изображений превышает ширину страницы,
                    // то переходим на следующую строку
                    if (xIndent + imageHelper.Width > pageWidth)
                    {
                        yIndent += maxImageHeight + ImageMargin;
                        xIndent = PagePadding;
                        maxImageHeight = imageHelper.Height;
                    }
                    // В противном случае вычисляем максимальную высоту изображения штампа в текущей строке
                    else if (imageHelper.Height > maxImageHeight)
                    {
                        maxImageHeight = imageHelper.Height;
                    }

                    // Вставляем текущее изображение по указанным координатам
                    InsertImage(page, imageHelper, xIndent, yIndent);

                    // Вычисляем горизонтальную координату следующего изображения
                    xIndent += imageHelper.Width + ImageMargin;
                }

                // Копируем в поток сформированный PDF-файл со вставленными изображениями штампов электронной подписи
                var outputStream = new MemoryStream();
                pdfDocument.Save(outputStream);
                outputStream.Seek(0, SeekOrigin.Begin);

                return new GeneratedFileInfo { Stream = outputStream };
            }
        }

        /// <summary>
        /// Определяет доступность класс, вставляющий в PDF-файл изображения штампов электронной подписи
        /// </summary>
        /// <param name="sessionContext">Контекст сессии</param>
        /// <param name="generatorType">Тип генератора изображений штампа электронной подписи</param>
        /// <param name="cardId">Идентификатор карточки</param>
        /// <param name="fileCardId">Идентификатор файла, для которого необходимо вставить изображения штампов электронной подписи</param>
        /// <param name="fileVersionId">Идентификатор версии файла, для которого необходимо вставить изображения штампов электронной подписи</param>
        /// <returns><see langword="true"/>, если класс удовлетворяет необходимым условиям. В противном случае возвращает <see langword="false"/></returns>        
        public bool IsAllowed(SessionContext sessionContext, ImageGeneratorType generatorType, Guid cardId, Guid fileCardId, Guid? fileVersionId = null)
        {
            if (sessionContext is null)
                throw new ArgumentNullException(nameof(sessionContext));

            return generatorType == ImageGeneratorType.ElectronicSignature
                && sessionContext.AdvancedCardManager.GetCardTypeId(cardId) == CardDocument.ID;
        }

        #endregion Реализация интерфейса IImagePositionSelector

        #region Вспомогательные методы

        // Вставляет указанное изображение на страницу PDF-документа
        private static void InsertImage(Page page, ImageHelper imageHelper, double x, double y)
        {
            using (var memoryStream = new MemoryStream())
            {
                imageHelper.Bitmap.Save(memoryStream, ImageFormat.Png);
                memoryStream.Seek(0, SeekOrigin.Begin);

                var annotation = new StampAnnotation(page, new Rectangle(x, y, x + imageHelper.Width, y + imageHelper.Height));
                annotation.Image = memoryStream;

                page.Annotations.Add(annotation);
            }
        }

        // Поворачивает требуемую страницу в PDF-документе вертикально
        private static Stream PreparePdfStream(Stream pdfStream)
        {
            using (var pdf = new Document(pdfStream))
            {
                var page = pdf.Pages[PageNumber];
                
                // Угол поворота страницы (в градусах) 
                var rotation = 0;

                // Размер страницы    
                var pageSize = new PageSize((float)page.Rect.Width, (float)page.Rect.Height);

                // В PDF-документе страницы могут быть развернуты по вертикали или горизонтали
                // Вычисляем угол поворота и размеры страницы с учётом поворота
                switch (page.Rotate)
                {
                    case Rotation.None:
                        pdfStream.Position = 0;
                        return pdfStream;
                    case Rotation.on90:
                        pageSize = new PageSize((float)page.Rect.Height, (float)page.Rect.Width);
                        rotation = 90;
                        break;
                    case Rotation.on180:
                        pageSize = new PageSize((float)page.Rect.Width, (float)page.Rect.Height);
                        rotation = 180;
                        break;
                    case Rotation.on270:
                        pageSize = new PageSize((float)page.Rect.Height, (float)page.Rect.Width);
                        rotation = 270;
                        break;
                }

                // Поворачиваем страницу вертикально
                pdf.Pages[PageNumber].Rotate = Rotation.None;

                // Поворачиваем контент на странице на вычисленный угол
                var editor = new PdfPageEditor();
                editor.BindPdf(pdf);
                editor.PageSize = pageSize;
                editor.Rotation = rotation;

                // Копируем в поток сформированный PDF-файл
                var result = new MemoryStream();
                editor.Save(result);
                result.Seek(0, SeekOrigin.Begin);
                return result;
            }
        }

        #endregion Вспомогательные методы
    }
}
