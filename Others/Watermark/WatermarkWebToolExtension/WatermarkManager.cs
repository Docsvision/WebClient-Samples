using DocsVision.DVWebTool.WebServices;
using WebSocketSharp.Server;

namespace WatermarkWebToolExtension
{
    // Регистрация контроллера, предоставляющего веб-метод добавления водяного знака
    public class WatermarkManager : IServiceManager
    {
        // Название расширения для информации в окне «О программе»
        public string DisplayName => "Watermark to PDF";

        // Регистрация контроллера расширения
        public void Register(WebSocketSharper.Server.WebSocketServer server)
        {
            // Регистрация контроллера PDFWatermarkController для маршрута Watermark
            server.AddWebSocketService<WatermarkController>("/Watermark");
        }
    }
}
