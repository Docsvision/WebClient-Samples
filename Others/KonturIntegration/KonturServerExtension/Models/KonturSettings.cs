using System.ComponentModel.DataAnnotations;

namespace Kontur.Models
{
    public class KonturSettings
    {
        public const string Key = "KonturSettings";

        public string ApiKey { get; set; }
    }
}
