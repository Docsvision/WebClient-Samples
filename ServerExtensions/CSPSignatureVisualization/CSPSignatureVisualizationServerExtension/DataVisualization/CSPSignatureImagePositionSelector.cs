using CSPSignatureVisualizationServerExtension.Helpers;
using DocsVision.BackOffice.CardLib.CardDefs;
using DocsVision.BackOffice.WebClient.DataVisualization;
using DocsVision.Platform.WebClient;
using PdfSharp.Drawing;
using PdfSharp.Pdf.Annotations;
using PdfSharp.Pdf;
using PdfSharp.Pdf.IO;
using SkiaSharp;

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
        private const int PageNumber = 0;

        #region Реализация интерфейса IImagePositionSelector

        /// <summary>
        /// Вставляет изображения штампов электронной подписи на первую страницу указанного PDF-файла
        /// </summary>
        /// <param name="sessionContext">Контекст сессии</param>
        /// <param name="generatorType">Тип генератора изображений штампов электронной подписи</param>
        /// <param name="images">Массив изображений штампов электронной подписи</param>
        /// <param name="fileStream">Поток, содержащий PDF-файл, в который необходимо вставить указанные изображения</param>
        /// <returns>Модель файла со вставленными изображениями</returns>
        public GeneratedFileInfo Generate(SessionContext sessionContext, ImageGeneratorType generatorType, List<byte[]> images, Stream fileStream)
        {
            ArgumentNullException.ThrowIfNull(images);
            ArgumentNullException.ThrowIfNull(fileStream);

            using var pdfDocument = PdfReader.Open(fileStream);
            var page = pdfDocument.Pages[PageNumber];

            var pageWidth = page.Width.Value;
            var pageHeight = page.Height.Value;

            // Задаём начальные координаты первого изображения штампов электронной подписи
            double xIndent = PagePadding;
            double yIndent = PagePadding;

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
                InsertImage(pdfDocument, page, imageHelper, xIndent, yIndent);

                // Вычисляем горизонтальную координату следующего изображения
                xIndent += imageHelper.Width + ImageMargin;
            }

            // Копируем в поток сформированный PDF-файл со вставленными изображениями штампов электронной подписи
            var outputStream = new MemoryStream();
            pdfDocument.Save(outputStream);
            pdfDocument.Close();
            outputStream.Seek(0, SeekOrigin.Begin);

            return new GeneratedFileInfo { Stream = outputStream };
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
            ArgumentNullException.ThrowIfNull(sessionContext);

            return generatorType == ImageGeneratorType.ElectronicSignature
                && sessionContext.AdvancedCardManager.GetCardTypeId(cardId) == CardDocument.ID;
        }

        #endregion Реализация интерфейса IImagePositionSelector

        #region Вспомогательные методы

        // Вставляет указанное изображение на страницу PDF-документа
        private static void InsertImage(PdfDocument pdf, PdfPage page, ImageHelper imageHelper, double x, double y)
        {
            using var memoryStream = new MemoryStream();
            imageHelper.Bitmap.Encode(memoryStream, SKEncodedImageFormat.Png, 100);
            memoryStream.Seek(0, SeekOrigin.Begin);

            var image = XImage.FromStream(memoryStream);
            var annotation = new PdfImageStampAnnotation(pdf, image)
            {
                Rectangle = new PdfRectangle(new XRect(x, y, imageHelper.Width, imageHelper.Height))
            };

            page.Annotations.Add(annotation);
        }

        #endregion Вспомогательные методы
    }
}