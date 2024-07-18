using iText.IO.Font;
using iText.Kernel.Font;
using iText.Kernel.Pdf;
using iText.Kernel.Pdf.Canvas;
using iText.Kernel.Pdf.Colorspace;
using iText.Layout;
using iText.Layout.Element;
using iText.Layout.Properties;
using System;
using System.Diagnostics;
using System.IO;
using System.Threading.Tasks;

namespace WatermarkWebToolExtension.Services
{
    public class WatermarkService
    {
        private const string WatermarkFontFilename = "Roboto-Bold.ttf";
        private const string PathToFonts = "Fonts";

        // Добавление водяного знака с помощью библиотеки iText
        public async Task<string> AddWatermark(string file, string watermark) 
        {
            if (Path.GetExtension(file).ToLower() != ".pdf")
            {
                 throw new Exception("Неподдерживаемый формат файла");
            }

            // Файл с вод. знаком сохраняется с постфиксом _marked
            string fileWithWaternmark = file.Replace(".pdf", "_marked.pdf");

            return await Task.Run(() =>
            {
                PdfReader reader = new PdfReader(file);
                PdfWriter writer = new PdfWriter(new FileStream(fileWithWaternmark, FileMode.Create));
                PdfDocument pdf = new PdfDocument(reader, writer);
                Document doc = new Document(pdf);

                var assemblyDirectory = Path.GetDirectoryName(typeof(WatermarkService).Assembly.Location);
                string fontForWatermark = Path.Combine(assemblyDirectory, PathToFonts, WatermarkFontFilename);
                var font = PdfFontFactory.CreateFont(fontForWatermark, PdfEncodings.IDENTITY_H, PdfFontFactory.EmbeddingStrategy.FORCE_EMBEDDED);
                Text watermarkPhrase = new Text(watermark).SetFont(font).SetFontSize(80);
                watermarkPhrase.SetOpacity(0.2f);

                for (int pageIndex = 1; pageIndex <= pdf.GetNumberOfPages(); pageIndex++)
                {
                    var page = pdf.GetPage(pageIndex);
                    var pagesize = page.GetPageSize();
                    var x = (pagesize.GetLeft() + pagesize.GetRight()) / 2;
                    var y = (pagesize.GetTop() + pagesize.GetBottom()) / 2;
                    doc.ShowTextAligned(new Paragraph(watermarkPhrase), x, y, pageIndex, 
                        TextAlignment.CENTER, VerticalAlignment.TOP, 45f);
                }

                pdf.Close();
                File.Delete(file);
                return fileWithWaternmark;
            });
        }
    }
}
