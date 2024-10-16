using DocsVision.Platform.ObjectManager;
using DocsVision.Platform.ObjectModel.Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SampleWorkerExtension.WorkerService
{
    public sealed class SessionProvider : ISessionProvider
    {
        private readonly UserSession session;

        public SessionProvider(UserSession session)
        {
            this.session = session;
        }

        #region ISessionProvider Members

        public UserSession Session
        {
            get
            {
                return session;
            }
            set
            {
                throw new NotImplementedException();
            }
        }

        #endregion
    }
}
