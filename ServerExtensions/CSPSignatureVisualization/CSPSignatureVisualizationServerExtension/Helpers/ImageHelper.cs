using SkiaSharp;

namespace CSPSignatureVisualizationServerExtension.Helpers
{
    /// <summary>
    /// Описывает вспомогательный класс для работы с изображением
    /// </summary>
    internal class ImageHelper : IDisposable
    {
        // Плотность пикселей PDF-документа
        private const int PdfDpi = 72;

        // Плотность пикселей изображения
        private const int ImgDpi = 96;

        /// <summary>
        /// Создаёт новый экземпляр класса <see cref="ImageHelper"/>
        /// </summary>
        public ImageHelper(byte[] image)
        {
            Bitmap = SKBitmap.FromImage(SKImage.FromEncodedData(image));
        }

        #region Свойства

        /// <summary>
        /// Возвращает изображение в формате SkiaSharp Bitmap
        /// </summary>
        public SKBitmap Bitmap { get; private set; }

        /// <summary>
        /// Возвращает ширину изображения в системе координат PDF-документа
        /// </summary>
        public double Width => PixelsToUnits(this.Bitmap.Width);

        /// <summary>
        /// Возвращает высоту изображения в системе координат PDF-документа
        /// </summary>
        public double Height => PixelsToUnits(this.Bitmap.Height);

        #endregion Свойства

        #region Методы

        /// <summary>
        /// Освобождает все ресурсы, используемые этим объектом <see cref="ImageHelper"/>
        /// </summary>
        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
            {
                this.Bitmap.Dispose();
                this.Bitmap = null;
            }
        }

        /// <summary>
        /// Преобразует числовое значение пикселей в систему координат PDF-документа
        /// </summary>
        /// <param name="pixels"></param>
        /// <returns></returns>
        public static double PixelsToUnits(double pixels) => pixels * PdfDpi / ImgDpi;

        #endregion Методы

        #region Реализация интерфейса IDisposable

        /// <summary>
        /// Освобождает все ресурсы, используемые этим объектом <see cref="ImageHelper"/>
        /// </summary>
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        #endregion Реализация интерфейса IDisposable
    }
}