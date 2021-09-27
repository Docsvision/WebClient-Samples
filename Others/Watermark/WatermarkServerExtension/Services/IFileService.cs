using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace WatermarkServerExtension.Services
{
    public interface IFileService
    {
        FileReader GetFileReader(Guid fileID);

        Task<IEnumerable<Guid>> AddFilesToCard(Guid cardID, List<string> files);
    }

    public class FileReader {
        public Guid FileID;
        public string FileName;
        public Stream Stream;
    }
}
