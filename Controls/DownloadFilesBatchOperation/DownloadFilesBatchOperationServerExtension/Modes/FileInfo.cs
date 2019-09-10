using System;

namespace DownloadFilesBatchOperationServerExtension.Modes
{
    public class FileInfo
    {
        public Guid FileId { get; set; }

        public string FileName { get; set; }

        public bool IsMain { get; set; }
    }
}