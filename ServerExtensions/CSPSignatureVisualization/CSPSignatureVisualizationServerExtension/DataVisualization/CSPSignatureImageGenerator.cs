using System.Globalization;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using CSPSignatureVisualizationServerExtension.Helpers;
using DocsVision.BackOffice.WebClient.DataVisualization;
using DocsVision.BackOffice.WebClient.Signature;
using DocsVision.Platform.WebClient;
using DocsVision.Platform.WebClient.Configuration;
using DocsVision.Platform.WebClient.Web;
using SkiaSharp;
using Svg.Skia;

using Constants = DocsVision.BackOffice.WebClient.Constants;

namespace CSPSignatureVisualizationServerExtension.DataVisualization
{
    /// <summary>
    /// Описывает генератор изображений штампов электронной подписи
    /// </summary>
    public class CSPSignatureImageGenerator : IImageGenerator
    {
        // Высота изображения штампа электронной подписи
        private const double ViewBoxHeight = 88;

        // Ширина изображения штампа электронной подписи
        private const double ViewBoxWidth = 314;

        // Левая верхняя координата информационного содержимого штампа электронной подписи
        private const double ContentTop = 64;

        // Высота используемого шрифта в пикселях (Используется десятый размер шрифта)
        private const double FontHeight = 14;

        // Максимальная длина используемого в изображении штампа электронной подписи текста 
        // при стандартном интервале между символами. Используется для разбиения текста на отдельные строки
        private const int MaxStringsLength = 38;

        private string logoImagePath;

        private readonly IConfigurationProvider _configurationProvider;
        private readonly IEnvironmentService _environmentService;
        private readonly IDocumentSignatureService _documentSignatureService;

        /// <summary>
        /// Создаёт новый экземпляр класса <see cref="CSPSignatureImageGenerator"/>.
        /// </summary>      
        public CSPSignatureImageGenerator(
            IConfigurationProvider configurationProvider,
            IDocumentSignatureService documentSignatureService,
            IEnvironmentService environmentService)
        {
            _configurationProvider = configurationProvider;
            _documentSignatureService = documentSignatureService;
            _environmentService = environmentService;
        }

        #region Свойства

        /// <summary>
        /// Путь к изображению логитипа компании
        /// </summary>
        private string LogoImagePath => logoImagePath ??= _configurationProvider.GetSetting<string>(
            Constants.Configurations.SettingConstants.DefaultESImageGenerator.LogoImagePathSetting,
            Constants.Configurations.SettingConstants.DefaultESImageGenerator.SettingGroup);

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
        public List<byte[]> Generate(SessionContext sessionContext, ImageGeneratorType generatorType, Guid cardId, Guid fileCardId, Guid? fileVersionId = null)
        {
            var generatedImages = new List<byte[]>();

            // Получаем список моделей электронной подписи указанного файла
            var stampModels = _documentSignatureService.GetStampSignatureModel(sessionContext, cardId, fileCardId, fileVersionId);
            if (stampModels.Any())  // Если указанный файл содержит хотя бы одну электронную подпись
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
                    var svgDocument = new SKSvg();
                    svgDocument.FromSvg(svg);

                    // Преобразуем сформированное изображение в формат PNG
                    // и добавляем его в результирующий массив
                    using var pngStream = new MemoryStream();
                    svgDocument.Save(pngStream, SKColors.Transparent, SKEncodedImageFormat.Png, 100);
                    generatedImages.Add(pngStream.ToArray());
                }
            }

            return generatedImages;
        }

        #endregion Реализация интерфейса IImageGenerator

        #region Вспомогательные методы

        // Формирует изображение штампа электронной подписи в формате SVG на основе имени владельца, метки и номера сертификата
        // электронной подписи, а также дат начала и окончания срока действия сертификата
        private string GenerateSvg(string owner, string label, string certificateNumber, DateTime startDate, DateTime endDate)
        {
            var withLabel = !string.IsNullOrWhiteSpace(label);

            // Разбиваем текст с именем фладельца сертификата на строки по 38 символов
            var wrappedOwner = owner.Wrap(MaxStringsLength).ToArray();

            // Разбиваем текст с меткой сертификата на строки по 38 символов
            var wrappedLabel = label.Wrap(MaxStringsLength).ToArray();

            // Вычисляем высоту изображения штампа с учётом разбиения текста с именем владельца сертификата на строки
            var height = ViewBoxHeight + wrappedOwner.Length * FontHeight;

            // При необходимости корректируем высоту изображения штампа с учётом разбиения текста с меткой сертификата на строки
            if (withLabel)
                height += wrappedLabel.Length * FontHeight;

            var yIndent = ContentTop;

            var result = new StringBuilder();

            // Формируем начальный тег SVG - изображения на основе необходимых высоты и ширины
            result.Append(CreateFragment(Resources.SvgViewboxOpenFragmentFormat, ViewBoxWidth, height));

            var logoFullName = LogoImagePath;
            if (!File.Exists(logoFullName)) // Если файла не существует, то в конфигурационном файле указан относительный путь к логотипу компании 
            {
                var rootDir = _environmentService.SiteRootDir;
                logoFullName = Path.Combine(rootDir, LogoImagePath);
            }

            if (File.Exists(logoFullName)) // Если файл логотипа существует
            {
                // Формируем фрагмент штампа с изображением логотипа компании
                var absolutePath = GetAbsolutePath(logoFullName);
                var logoFragment = CreateLogoFragment(absolutePath);
                result.Append(logoFragment);
            }

            // Формируем рамку на изображении штампа
            result.Append(CreateFragment(Resources.SvgRectFragmentFormat, ViewBoxWidth - 1, height - 1));

            // Вставляем на изображение штампа текст «ДОКУМЕНТ ПОДПИСАН ЭЛЕКТРОННОЙ ПОДПИСЬЮ»
            result.Append(Resources.SvgTitleFragment);

            if (withLabel)
            {
                // При необходимости вставляем на изображение штампа текст метки сертификата
                result.Append(CreateWrappedTextFragment(Resources.SvgLabelFragmentFormat, Resources.SvgWrappedLabelFormat, yIndent, wrappedLabel));

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
            result.Append(CreateWrappedTextFragment(Resources.SvgOwnerFragmentFormat, Resources.SvgWrappedOwnerFormat, yIndent, wrappedOwner));

            // Закрываем начальный тег SVG-изображения
            result.Append(Resources.SvgCloseTag);

            return result.ToString();
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

        // Получает абсолютный путь к файлу
        private static string GetAbsolutePath(string path)
        {
            // Если файл существует, но путь к нему определяется как относительный
            if (File.Exists(path) && !Uri.IsWellFormedUriString(path, UriKind.Absolute))
            {
                // Добавляем к пути схему file://
                path = "file://" + path;
            }

            return path;
        }

        // Создаёт текстовый фрагмент изображения, содержащий информацию о сроках действия сертификата
        private static string CreateValidnessFragment(double top, DateTime startDate, DateTime endDate) =>
            string.Format(Resources.SvgValidnessFragmentFormat, Cast(top), startDate.ToShortDateString(), endDate.ToShortDateString());

        // Создаёт текстовый фрагмент изображения с указанными координатами
        private static string CreateFragment(string fragmentFormat, double width, double height) => string.Format(fragmentFormat, Cast(width), Cast(height));

        // Создаёт фрагмент изображения, содержаний логотип компании
        private static string CreateLogoFragment(string imagePath) => string.Format(Resources.SvgLogoFragmentFormat, imagePath);

        // Создаёт текстовый фрагмент изображения, содержащий информацию с номером сертификата
        private static string CreateCertificateFragment(double top, string text) => string.Format(Resources.SvgCertificateFragmentFormat, Cast(top), text);

        // Преобразует вещественное значение в текст с учётом используемого на сервере формата
        private static string Cast(double value) => value.ToString(CultureInfo.InvariantCulture);

        #endregion Вспомогательные методы
    }
}