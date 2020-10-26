using DocsVision.Platform.WebClient;

namespace CustomLibraryServerExtension.Services
{
    public interface ICustomLibraryService
    {
        int GetCustomData(SessionContext sessionContext);
    }
}