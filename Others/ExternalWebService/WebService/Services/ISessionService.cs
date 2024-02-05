using DocsVision.Platform.ObjectManager;
using WebService.Helpers;

namespace WebService.Services
{
    public interface ISessionService
    {
        public SessionContext GetSessionContext();
    }
}