using DocsVision.Platform.WebClient;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Kontur.Services
{
    public interface IKonturRequestService
    {

        Task<string> PreformGetFromContur(string method, string parameters);

        Task<Stream> PreformGetFromConturEx(string method, string parameters);

        Task AddKonturReportToCard(SessionContext sessionContext, Guid cardId, string fileName, string parameters);
    }
}