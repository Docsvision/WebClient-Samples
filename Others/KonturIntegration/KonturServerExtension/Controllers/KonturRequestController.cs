using DocsVision.Platform.WebClient;
using Kontur.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web.Http;

namespace Kontur.Controllers
{
    public class KonturRequestController : ApiController
    {
        readonly IKonturRequestService konturRequestService;
        readonly ICurrentObjectContextProvider currentObjectContextProvider;

        public KonturRequestController(IKonturRequestService konturRequestService, ICurrentObjectContextProvider currentObjectContextProvider)
        {
            this.konturRequestService = konturRequestService;
            this.currentObjectContextProvider = currentObjectContextProvider;
        }

        [HttpGet]
        public Task<string> GetFromKontur(string method, string parameters)
        {
            return this.konturRequestService.PreformGetFromContur(method, parameters);
        }

        [HttpGet]
        public Task AddKonturReportToCard(Guid cardId, string fileName, string parameters)
        {
            var sessionContext = currentObjectContextProvider.GetOrCreateCurrentSessionContext();
            return konturRequestService.AddKonturReportToCard(sessionContext, cardId, fileName, parameters);
        }
    }
}