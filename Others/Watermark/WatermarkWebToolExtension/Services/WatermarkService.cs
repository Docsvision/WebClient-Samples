using iTextSharp.text;
using iTextSharp.text.pdf;
using System;
using System.IO;
using System.Threading.Tasks;

namespace WatermarkWebToolExtension.Services
{
    public class WatermarkService
    {
        string WATERMARK_FONTFILE_NAME = "ARIAL.TTF";

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
                PdfStamper stamper = new PdfStamper(reader, new FileStream(fileWithWaternmark, FileMode.Create));

                string fontForWatermark = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.Fonts), WATERMARK_FONTFILE_NAME);

                BaseFont baseFont = BaseFont.CreateFont(fontForWatermark, BaseFont.IDENTITY_H, BaseFont.EMBEDDED);
                Font font = new Font(baseFont, 80);

                Phrase watermarkPhrase = new Phrase(watermark, font);

                PdfGState gs1 = new PdfGState
                {
                    FillOpacity = 0.2f
                };

                PdfContentByte over;
                Rectangle pagesize;

                float x, y;

                for (int page = 1; page <= reader.NumberOfPages; page++)
                {
                    pagesize = reader.GetPageSize(page);
                    x = (pagesize.GetLeft(0) + pagesize.GetRight(0)) / 2;
                    y = (pagesize.GetTop(0) + pagesize.GetBottom(0)) / 2;

                    over = stamper.GetOverContent(page);
                    over.SaveState();
                    over.SetGState(gs1);
                    ColumnText.ShowTextAligned(over, Element.ALIGN_CENTER, watermarkPhrase, x, y, 45f);
                    over.RestoreState();
                }

                stamper.Close();
                reader.Close();

                File.Delete(file);

                return fileWithWaternmark;
            });
        }
    }
}
