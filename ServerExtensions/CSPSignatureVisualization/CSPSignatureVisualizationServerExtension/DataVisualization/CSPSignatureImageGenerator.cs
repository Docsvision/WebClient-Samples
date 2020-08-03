using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Web;
using CSPSignatureVisualizationServerExtension.Helpers;

using DocsVision.BackOffice.WebClient.DataVisualization;
using DocsVision.Platform.WebClient;

using Svg;

using Constants = DocsVision.BackOffice.WebClient.Constants;

namespace CSPSignatureVisualizationServerExtension.DataVisualization
{
	/// <summary>
	/// Описывает генератор изображений штампов электронной подписи
	/// </summary>
	public class CSPSignatureImageGenerator : IImageGenerator
    {
        // Высота изображения штампа электронной подписи
        private const double ViewBoxHeight = 85.67;

        // Ширина изображения штампа электронной подписи
        private const double ViewBoxWidth = 314;

        // Левая верхняя координата информационного содержимого штампа электронной подписи
        private const double ContentTop = 64;

        // Высота используемого шрифта в пикселях (Используется десятый размер шрифта)
        private const double FontHeight = 13.33;

        // Максимальная длина используемого в изображении штампа электронной подписи текста 
        // при стандартном интервале между символами. Используется для разбиения текста на отдельные строки
        private const int MaxStringsLength = 38;

        private readonly ServiceHelper serviceHelper;

        private string logoImagePath;

        private static readonly string SiteRootDir = HttpContext.Current.Server.MapPath("~");

        /// <summary>
        /// Создаёт новый экземпляр класса <see cref="CSPSignatureImageGenerator"/>
        /// </summary>      
        public CSPSignatureImageGenerator(IServiceProvider serviceProvider)
        {
            serviceHelper = new ServiceHelper(serviceProvider);
        }

        #region Свойства

        /// <summary>
        /// Путь к изображению логитипа компании
        /// </summary>
        private string LogoImagePath =>
            logoImagePath ?? (logoImagePath =
                this.serviceHelper.ConfigurationProvider.GetSetting<string>( // Получаем путь к изображению логитипа компании из конфигурационного файла Веб-клиента
                    Constants.Configurations.SettingConstants.DefaultESImageGenerator.LogoImagePathSetting,
                    Constants.Configurations.SettingConstants.DefaultESImageGenerator.SettingGroup));

        #endregion Свойства

        #region Реализация интерфейса IImageGenerator

        /// <summary>
        /// Определяет доступность генератора изображений штампов электронной подписи
        /// </summary>
        /// <param name="sessionContext">Контекст сессии</param>
        /// <param name="generatorType">Тип генератора изображений штампа электронной подписи</param>
        /// <param name="cardId">Идентификатор карточки</param>
        /// <param name="fileCardId">Идентификатор файла, для которого необходимо вставить изображения штампов электронной подписи</param>
        /// <param name="fileVersionId">Идентификатор версии файла, для которого необходимо вставить изображения штампов электронной подписи</param>
        /// <returns><see langword="true"/>, если генератор удовлетворяет необходимым условиям. В противном случае возвращает <see langword="false"/></returns>
        public bool IsAllowed(SessionContext sessionContext, ImageGeneratorType generatorType, Guid cardId, Guid fileCardId, Guid? fileVersionId = null)
        {
            return generatorType == ImageGeneratorType.ElectronicSignature;
        }

        /// <summary>
        /// Создаёт массив изображений штампов электронной подписи
        /// </summary>
        /// <param name="sessionContext">Контекст сессии</param>
        /// <param name="generatorType">Тип генератора изображений штампов электронной подписи</param>
        /// <param name="cardId">Идентификатор карточки</param>
        /// <param name="fileCardId">Идентификатор файла, для которого необходимо вставить изображения штампов электронной подписи</param>
        /// <param name="fileVersionId">Идентификатор версии файла, для которого необходимо вставить изображения штампов электронной подписи</param>
        /// <returns>Массив изображений штампов электронной подписи, которые необходимо вставить в указанный файл</returns>
        public Image[] Generate(SessionContext sessionContext, ImageGeneratorType generatorType, Guid cardId, Guid fileCardId, Guid? fileVersionId = null)
        {
            var generatedImages = new List<Image>();

            // Получаем список моделей электронной подписи указанного файла
            var stampModels = serviceHelper.DocumentSignatureService.GetStampSignatureModel(sessionContext, cardId, fileCardId, fileVersionId);
            if (stampModels.Any()) // Если указанный файл содержит хотя бы одну электронную подпись
            {
                foreach (var stampModel in stampModels)
                {
                    if (stampModel.Certificate == null) continue; // Для простых электронных подписей изображения не создаём

                    // Получаем номер сертификата электронной подписи
                    var certificateNumber = stampModel.Certificate.GetSerialNumberString();

                    // Получаем имя владельца сертификата электронной подписи
                    var owner = stampModel.Certificate.GetNameInfo(X509NameType.SimpleName, false);

                    // Формируем изображение штампа электронной подписи в формате SVG на основе имени владельца, метки и номера сертификата электронной подписи,
                    // а также дат начала и окончания срока действия сертификата
                    var svg = GenerateSvg(owner, stampModel.LabelDisplayName, certificateNumber, stampModel.Certificate.NotBefore, stampModel.Certificate.NotAfter);

                    // Преобразуем сформированное изображение в формат PNG
                    var svgDocument = SvgDocument.FromSvg<SvgDocument>(svg);
                    using (var pngStream = new MemoryStream())
                    {
                        SvgToPngStream(svgDocument, pngStream);
                        
                        // и добавляем его в результирующий массив
                        generatedImages.Add(Image.FromStream(pngStream));
                    }
                }
            }

            return generatedImages.ToArray();
        }

        #endregion Реализация интерфейса IImageGenerator

        #region Вспомогательные методы

        // Формирует изображение штампа электронной подписи в формате SVG на основе имени владельца, метки и номера сертификата
        // электронной подписи, а также дат начала и окончания срока действия сертификата
        private string GenerateSvg(string owner, string label, string certificateNumber, DateTime startDate, DateTime endDate)
        {
            var withLabel = !string.IsNullOrWhiteSpace(label); // Изображение штампа может как содержать, так и не содержать метку сертификата

            // Разбиваем текст с именем фладельца сертификата на строки по 38 символов
            var wrappedOwner = owner.Wrap(MaxStringsLength).ToArray();

            // Разбиваем текст с меткой сертификата на строки по 19 символов (так как для текста метки используется увеличенный в два раза интервал)
            var wrappedLabel = label.Wrap(MaxStringsLength / 2).ToArray();

            // Вычисляем высоту изображения штампа с учётом разбиения текста с именем владельца сертификата на строки
            var height = ViewBoxHeight + wrappedOwner.Length * FontHeight;

            // При необходимости корректируем высоту изображения штампа с учётом разбиения текста с меткой сертификата на строки
            if (withLabel)
                height += wrappedLabel.Length * FontHeight;

            var yIndent = ContentTop;

            var result = new StringBuilder();

            // Формируем начальный тег SVG-изображения на основе необходимых высоты и ширины
            result.Append(CreateFragment(Properties.Resources.SvgViewboxOpenFragmentFormat, ViewBoxWidth, height));

            var logoFullName = LogoImagePath;
            if (!File.Exists(logoFullName)) // Если файла не существует, то в конфигурационном файле указан относительный путь к логотипу компании 
            {
                logoFullName = Path.Combine(SiteRootDir, LogoImagePath);
            }

            // Формируем фрагмент штампа с изображением логотипа компании
            result.Append(CreateLogoFragment(logoFullName));

            // Формируем рамку на изображении штампа
            result.Append(CreateFragment(Properties.Resources.SvgRectFragmentFormat, ViewBoxWidth - 1, height - 1));

            // Вставляем на изображение штампа текст «ДОКУМЕНТ ПОДПИСАН ЭЛЕКТРОННОЙ ПОДПИСЬЮ»
            result.Append(Properties.Resources.SvgTitleFragment);

            if (withLabel)
            {
                // При необходимости вставляем на изображение штампа текст метки сертификата
                result.Append(CreateWrappedTextFragment(Properties.Resources.SvgLabelFragmentFormat, Properties.Resources.SvgWrappedLabelFormat, yIndent, wrappedLabel));

                // и вычисляем координату следующей строки
                yIndent += FontHeight * wrappedLabel.Length;
            }

            // Вставляем на изображение штампа текст с номером сертификата
            result.Append(CreateCertificateFragment(yIndent, certificateNumber));
            yIndent += FontHeight;

            // Вставляем на изображение штампа текст со сроком действия сертификата
            result.Append(CreateValidnessFragment(yIndent, startDate, endDate));
            yIndent += FontHeight;

            // Вставляем на изображение штампа текст с именем владельца сертификата
            result.Append(CreateWrappedTextFragment(Properties.Resources.SvgOwnerFragmentFormat, Properties.Resources.SvgWrappedOwnerFormat, yIndent, wrappedOwner));

            // Закрываем начальный тег SVG-изображения
            result.Append(Properties.Resources.SvgCloseTag);

            return result.ToString();
        }

        // Преобразует SVG-изображение в изображение формата PNG
        private void SvgToPngStream(SvgDocument svgDocument, Stream outputStream)
        {
            if (outputStream == null) throw new ArgumentNullException(nameof(outputStream));

            using (var bitmap = svgDocument.Draw())
            using (var memoryStream = new MemoryStream())
            {
                bitmap.Save(memoryStream, ImageFormat.Png);
                memoryStream.Seek(0, SeekOrigin.Begin);

                memoryStream.CopyTo(outputStream);
                outputStream.Seek(0, SeekOrigin.Begin);
            }
        }

        // Создаёт текстовый фрагмент, содержащий разбитый на строки текст
        private static string CreateWrappedTextFragment(string headerFormat, string contentFormat, double top, string[] wrappedText)
        {
            var result = string.Format(headerFormat, Cast(top), wrappedText.First());

            if (wrappedText.Length > 0)
            {
                foreach (var line in wrappedText.Skip(1))
                {
                    top += FontHeight;
                    result += string.Format(contentFormat, Cast(top), line);
                }
            }

            return result;
        }

        // Создаёт текстовый фрагмент изображения, содержащий информацию о сроках действия сертификата
        private static string CreateValidnessFragment(double top, DateTime startDate, DateTime endDate) =>
            string.Format(Properties.Resources.SvgValidnessFragmentFormat, Cast(top), startDate.ToShortDateString(), endDate.ToShortDateString());

        // Создаёт текстовый фрагмент изображения с указанными координатами
        private static string CreateFragment(string fragmentFormat, double width, double height) => string.Format(fragmentFormat, Cast(width), Cast(height));

        // Создаёт фрагмент изображения, содержаний логотип компании
        private static string CreateLogoFragment(string imagePath) => string.Format(Properties.Resources.SvgLogoFragmentFormat, imagePath);

        // Создаёт текстовый фрагмент изображения, содержащий информацию с номером сертификата
        private static string CreateCertificateFragment(double top, string text) => string.Format(Properties.Resources.SvgCertificateFragmentFormat, Cast(top), text);

        // Преобразует вещественное значение в текст с учётом используемого на сервере формата
        private static string Cast(double value) => value.ToString(CultureInfo.InvariantCulture);

        #endregion Вспомогательные методы
    }
}
