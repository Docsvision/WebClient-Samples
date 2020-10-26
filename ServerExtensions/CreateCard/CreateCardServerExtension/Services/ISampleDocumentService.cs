using System;
using DocsVision.Platform.WebClient;

namespace CreateCardServerExtension.Services
{
    public interface ISampleDocumentService
    {
        Guid CreateOutgoingDocument(SessionContext sessionContext, Guid parentDocId);
    }
}
