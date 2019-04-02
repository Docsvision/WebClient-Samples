using System;

namespace WebService.Interfaces.Models
{
    public class FileModel
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public int Size { get; set; }
    }
}