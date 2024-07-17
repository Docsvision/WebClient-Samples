using DocsVision.DVWebTool.WebServices;
using Newtonsoft.Json.Linq;
using NLog;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using WatermarkWebToolExtension.Services;

namespace WatermarkWebToolExtension
{

    // Реализация контроллера PDFWatermarkController
    public class WatermarkController : BaseService
    {
        private readonly ServiceProvider serviceProvider;
        private static readonly Logger Logger = LogManager.GetCurrentClassLogger();
        
        // Текст водяного знака
        private string WATERMARK = "Секретно";

        public WatermarkController()
        {
            serviceProvider = new ServiceProvider();
            Init();
        }

        // Регистрация методов контроллера PDFWatermarkController
        // Название метода - регистрозависимое 
        private void Init()
        {
            actions.Add(nameof(AddWatermarkToFiles), AddWatermarkToFiles);
        }

        // Веб-метод добавления водяного знака
        // Метод должен принимать два параметра: WebServiceRequest и JObject
        // Данные передаются в data
        private WebServiceResponse AddWatermarkToFiles(WebServiceRequest webServiceRequest, JObject data)
        {
            Logger.Info("Получено задание на добавление водяного знака");

            if (data == null)
            {
                return CreateBadResponse("С клиента не переданы данные для работы");
            }

            // Загружаем данные из полученного запроса в модель AddWatermarkRequest
            AddWatermarkRequest request;
            try
            {
                request = data.ToObject<AddWatermarkRequest>();
            }
            catch
            {
                Logger.Error($"Ошибка преобразования полученного сообщения: {data}");
                return CreateBadResponse("Поступивший запрос не соответствует ожидаемому формату");
            }

            string doneInfo;

            try
            {
                doneInfo = HandleRequest(request).Result;
            }
            catch (Exception ex)
            {
                return CreateBadResponse(ex.Message);
            }

            return CreateEndProcessResponse(request.CardID, $"Водяные знаки добавлены в файлы:<p/>{doneInfo}");
        }


        // Обработчик запроса на добавление водяного знака
        //  Получает данные запроса
        // Возвращает строку с названиями файлов, в которые добавлены запросы
        private async Task<string> HandleRequest(AddWatermarkRequest request)
        {
            var connectionService = new ConnectionToWebClient(request.ServerAddress, request.AccessToken);

            try
            {
                await connectionService.Authentificate();
            }
            catch (Exception ex)
            {
                Logger.Error(ex.Message);
                throw new Exception("Не удалось подключиться к серверу Web-клиента");
            }

            List<string> files = new List<string>();

            // Загружаем с Web-клиента файлы, идентификаторы которых переданы в запросе
            foreach (var fileId in request.FileIDs)
            {
                try
                {
                    string pathToFile = await connectionService.PullFile(fileId);
                    files.Add(pathToFile);
                }
                catch (Exception ex)
                {
                    Logger.Error(ex.Message);
                    throw new Exception($"Не удалось получить из карточки файл с идентификатором {fileId}");
                }
            }

            // Сервис для работы с водяными знаками
            var watermarkService = new WatermarkService();

            // Добавление водяных знаков в файлы из списка files
            List<Task<string>> processes = new List<Task<string>>();
            string doneInfo = "";

            foreach (var file in files)
            {
                try
                {
                    processes.Add(watermarkService.AddWatermark(file, WATERMARK));
                    doneInfo += $" {Path.GetFileName(file)}<p/>";
                }
                catch (Exception ex)
                {
                    Logger.Error(ex.Message);
                    throw new Exception($"Не удалось добавить водяной знак в файл {Path.GetFileName(file)}");
                }
            }

            var filesWithWatermark = await Task.WhenAll(processes);

            try
            {
                // Отправка запроса на прикрепление файлов filesWithWatermark к карточке request.CardID
                await connectionService.PushFiles(request.CardID, filesWithWatermark);
            }
            catch (Exception ex)
            {
                Logger.Error(ex.Message);
                throw new Exception($"Не удалось сохранить файлы в карточке");
            }
            return doneInfo;
        }


        private WebServiceResponse CreateBadResponse(string error)
        {
            return new WebServiceResponse(false, "Ошибка при добавлении водяного знака<p/>" + error);
        }
        private WebServiceResponse CreateEndProcessResponse(Guid cardID, string message)
        {
            return new WebServiceResponse(true, new { cardID, message });
        }
    }


    // Модель данных, получаемых при вызове метода добавления водяного знака
    public class AddWatermarkRequest
    {
        // Идентификатор карточки, файлы которой обрабатываются
        public Guid CardID { get; set; }

        // Идентификаторы файлов (Карточка файла с версиями), в которые добавляется водяной знак
        public Guid[] FileIDs { get; set; }

        // Идентификатор пользователя, который запустил обработку
        public Guid UserID { get; set; }

        // Адрес сервера Web-клиента
        public string ServerAddress { get; set; }

        // Токен для авторизации в сервере Web-клиента
        public string AccessToken { get; set; }
    }
}
