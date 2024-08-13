using DocsVision.BackOffice.ObjectModel;
using DocsVision.Platform.ObjectManager.SystemCards;
using DocsVision.Platform.WebClient;
using DocsVision.Platform.WebClient.Diagnostics;
using DocsVision.Platform.WebClient.Helpers;
using DocsVision.Platform.WebClient.Models;
using DocsVision.Platform.WebClient.Models.Generic;
using DownloadFilesBatchOperationSampleServerExtension.Modes;
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;

namespace DownloadFilesBatchOperationSampleServerExtension.Controllers
{
    public class DownloadFilesBatchOperationSampleController : ControllerBase
    {
        private readonly ICurrentObjectContextProvider currentObjectContextProvider;

        public DownloadFilesBatchOperationSampleController(ICurrentObjectContextProvider currentObjectContextProvider)
        {
            this.currentObjectContextProvider = currentObjectContextProvider;
        }

        [HttpGet]
        public CommonResponse<List<FileInfo>> GetDocumentFiles(Guid documentId)
        {
            var commonResponse = new CommonResponse<List<FileInfo>>();

            var sessionContext = currentObjectContextProvider.GetOrCreateCurrentSessionContext();

            try
            {
                var files = new List<FileInfo>();
                var document = sessionContext.ObjectContext.GetObject<Document>(documentId);
                if (document != null)
                {
                    foreach (var documentFile in document.Files)
                    {
                        try
                        {
                            var fileCard = sessionContext.AdvancedCardManager.GetCard<VersionedFileCard>(documentFile.FileId);
                            if (fileCard != null)
                            {
                                var fileInfo = new FileInfo
                                {
                                    FileId = fileCard.CurrentVersion.Id,
                                    FileName = documentFile.FileName,
                                    IsMain = documentFile.FileType == DocumentFileType.Main
                                };
                                files.Add(fileInfo);
                            }
                        }
                        catch (Exception ex)
                        {
                            Trace.TraceWarning(ex.ToString());
                        }
                    }
                }
                
                commonResponse.InitializeSuccess(files);
            }
            catch (Exception ex)
            {
                Trace.TraceError(ex);
                commonResponse.InitializeError(ex.Message);
            }
 
            return commonResponse;
        }
    }
}