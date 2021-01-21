using DocsVision.BackOffice.CardLib.CardDefs;
using DocsVision.BackOffice.ObjectModel;
using DocsVision.BackOffice.ObjectModel.Services;
using DocsVision.Platform.WebClient;
using DocsVision.Platform.WebClient.Configuration;
using DocsVision.Platform.WebClient.Models;
using DocsVision.Platform.WebClient.Web;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;

namespace Kontur.Services
{
    /// <summary>
    /// Сервис для проксирования запросов к focus-api.kontur.ru.
    /// </summary>
    /// <remarks>
    /// Проксирование запросов необходимо, поскольку выполнять запросы к focus-api.kontur.ru из браузера нет возможности из-за ограничений CORS.
    /// </remarks>
    public class KonturRequestService : IKonturRequestService
    {
        readonly string konturKey = "";
        const string urlTemplate = "https://focus-api.kontur.ru/api3/{0}?key={2}&{1}";
        const string briefReportpdfMethod = "briefReport";
        HttpClient client = new HttpClient();
        IEnvironmentService environmentService;

        public KonturRequestService(IConfigurationProvider configurationProvider, IEnvironmentService environmentService)
        {
            this.konturKey = configurationProvider.GetSetting<string>(Constants.KonturKeySetting);
            this.environmentService = environmentService;
        }

        public Task<string> PreformGetFromContur(string method, string parameters)
        {
            return client.GetStringAsync(new Uri(String.Format(urlTemplate, method, parameters, konturKey), UriKind.Absolute));
        }

        public Task<Stream> PreformGetFromConturEx(string method, string parameters)
        {
            return client.GetStreamAsync(new Uri(String.Format(urlTemplate, method, parameters, konturKey), UriKind.Absolute));
        }

        public async System.Threading.Tasks.Task AddKonturReportToCard(SessionContext sessionContext, Guid cardId, string fileName, string parameters)
        {
            using (var file = await this.PreformGetFromConturEx(briefReportpdfMethod, parameters + "&pdf=true"))
            {
                if (sessionContext.AdvancedCardManager.GetCardTypeId(cardId) == CardDocument.ID)
                {
                    var fileNameFull = fileName + ".pdf";
                    var document = sessionContext.ObjectContext.GetObject<Document>(cardId);
                    int counter = 1;
                    while (document.Files.Any(x => x.FileName == fileNameFull))
                    {
                        fileNameFull = fileName + " (" + counter + ").pdf";
                        counter++;
                    }
                    var filePath = Path.Combine(environmentService.UploadFilePath, fileNameFull);
                    try
                    {
                        using (FileStream fs = new FileStream(filePath, FileMode.Create))
                        {
                            await file.CopyToAsync(fs);
                        }
                        var documentService = sessionContext.ObjectContext.GetService<IDocumentService>();
                        documentService.AddAdditionalFile(document, filePath);
                        sessionContext.ObjectContext.SaveObject(document);
                    }
                    finally
                    {
                        File.Delete(filePath);
                    }
                }
            }
        }
    }
}