using DocsVision.Platform.ObjectManager;

namespace WebService.Helpers
{
    public static class SessionHelper
    {
        private static SessionContext SessionContext;

        public static SessionContext GetSessionContext()
        {
            if (SessionContext == null)
            {
                var manager = SessionManager.CreateInstance();
                manager.Connect(Properties.Settings.Default.ServerAddress, Properties.Settings.Default.BaseName);
                var session = manager.CreateSession();
                SessionContext = new SessionContext(session);
            }
            return SessionContext;
        }
    }
}