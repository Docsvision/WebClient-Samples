using System;

namespace CreateCardServerExtension.Services
{
    public interface ISampleDocumentService
    {
        Guid CreateOutgoingDocument(Guid parentDocId);
    }
}
