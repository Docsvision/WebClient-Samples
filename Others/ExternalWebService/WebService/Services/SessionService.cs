using DocsVision.Platform.ObjectManager;
using WebService.Helpers;

namespace WebService.Services
{
    public class SessionService: ISessionService
    {
        private SessionContext? _sessionContext = null;
        private readonly IConfiguration _configuration;
        public SessionService(IConfiguration config)
        {
            _configuration = config;
        }

        public SessionContext GetSessionContext()
        {
            if (_sessionContext == null)
            {
                var manager = SessionManager.CreateInstance();
                var docsvisionSection = _configuration.GetSection(Settings.Docsvision.Section);
                var serverAddress = docsvisionSection.GetValue<string>(Settings.Docsvision.ServerAddress);
                var baseName = docsvisionSection.GetValue<string>(Settings.Docsvision.BaseName);
                manager.Connect(serverAddress, baseName);
                var session = manager.CreateSession();
                _sessionContext = new SessionContext(session);
            }
            return _sessionContext;
        }
    }
}