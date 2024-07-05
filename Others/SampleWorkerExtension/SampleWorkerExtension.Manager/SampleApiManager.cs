using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net.Http;
using System.Runtime.Remoting.Contexts;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using DocsVision.Platform.ObjectModel;
using SampleWorkerExtension.ObjectModel.Models;
using SampleWorkerExtension.ObjectModel.Services;
using DocsVision.BackOffice.ObjectModel;
using DocsVision.BackOffice.ObjectModel.Services;
using DocsVision.Platform.Settings.Navigator;
using Task = System.Threading.Tasks.Task;

namespace SampleWorkerExtension.Manager
{
    public class SampleApiManager : ISampleManager
    {
        private ObjectContext context;
        private HttpClient httpClient;

        private string webClientAddress;

        private const string NavigatorExtensionTypeName = "DocsVision.Platform.Settings.Navigator.AddIn.NavigatorExtension, DocsVision.Platform.Settings, Version=5.5.0.0, Culture=neutral, PublicKeyToken=7148afe997f90519";
        private const string NavigatorAdditionalSettingsGroupName = "AdditionalSettings";

        private Guid CardDocumentDraftingBuiltInStateId = new Guid("B2D12DBF-B344-4827-97F1-3DD6407FB350");

        /// <summary>
        /// Initializes instance of <see cref="ISampleManager"/>.
        /// </summary>
        /// <param name="objectContext">Instance of <see cref="ObjectContext"/>.</param>
        public void Initialize(ObjectContext objectContext)
        {
            context = objectContext;
            var httpClientHandler = new HttpClientHandler();
            httpClientHandler.UseDefaultCredentials = true;
            httpClientHandler.UseCookies = true;
            httpClientHandler.CookieContainer = new System.Net.CookieContainer();
            var cookie = new System.Net.Cookie("UserCulture", Thread.CurrentThread.CurrentCulture.TwoLetterISOLanguageName);
            var domain = new Uri(WebClient);
            httpClientHandler.CookieContainer.Add(domain, cookie);
            this.httpClient = new HttpClient(httpClientHandler);
        }

        private string WebClient
        {
            get
            {
                if (string.IsNullOrEmpty(webClientAddress))
                    webClientAddress = GetWebClient();

                return webClientAddress;
            }
        }

        public void Process(SampleEventArgs eventArgs)
        {
            Document doc = context.GetObject<Document>(eventArgs.CardId);
            context.RefreshObject<Document>(ref doc);

            if (doc.SystemInfo.State.BuiltInState != CardDocumentDraftingBuiltInStateId)
                return;

            var initTask = Task.Run(async () => await HttpClientInitialize());
            initTask.Wait();

            var files = doc.Files.Where(f => f.FileType == DocumentFileType.Main && !f.FileName.EndsWith(".pdf", StringComparison.OrdinalIgnoreCase)).ToList();
            List<Guid> newFiles = new List<Guid>(files.Count);
            foreach (var file in files)
            {
                string cName = GetConvertedName(file.FileName);
                if (!doc.Files.Any(f => f.FileType == DocumentFileType.Main && f.FileName == cName))
                    newFiles.Add(file.FileVersionRowId);
            }

            foreach (var fileId in newFiles)
            {
                var workTask = Task.Run(async () => await ProcessCardFile(eventArgs.CardId, fileId));
                workTask.Wait();
            }

            context.AcceptChanges();
        }

        private async Task ProcessCardFile(Guid docId, Guid fileId)
        {
            var request = new HttpRequestMessage(HttpMethod.Post, $"{WebClient}/ConversionFile/AttachPdfa?DocumentId={docId}&FileId={fileId}");
            var response = await httpClient.SendAsync(request);
            if (!response.IsSuccessStatusCode)
                throw new Exception($"Error while process file {fileId} in card {docId}");
        }

        private async Task HttpClientInitialize()
        {
            var url = $"{WebClient}/Account/LoginWindows";
            var response = await httpClient.GetAsync(url);
            if (!response.IsSuccessStatusCode)
                throw new Exception("Error while connecting to WebClient");
        }

        private string GetWebClient()
        {
            var settingsService = context.GetService<ISettingsService>();
            var additionalSettings = settingsService.GetPropertyObject<AdditionalSettings>(NavigatorExtensionTypeName, NavigatorAdditionalSettingsGroupName);
            if (string.IsNullOrWhiteSpace(additionalSettings?.ThinClientServerAddress))
                throw new ArgumentNullException(nameof(additionalSettings.ThinClientServerAddress));

            return additionalSettings.ThinClientServerAddress;
        }

        private string GetConvertedName(string fileName)
        {
            string convertedName = string.Empty;
            int i = fileName.LastIndexOf('.');
            return fileName.Substring(0, i) + "_pdfa.pdf";
        }
    }
}
