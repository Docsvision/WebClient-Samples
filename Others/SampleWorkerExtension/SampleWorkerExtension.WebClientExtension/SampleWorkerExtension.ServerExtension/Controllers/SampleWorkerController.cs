using DocsVision.Platform.WebClient;
using DocsVision.Platform.WebClient.Models;
using ServerExtension.Models;
using ServerExtension.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace ServerExtension.Controllers
{
    public class SampleWorkerController: ApiController
    {
        private readonly ICurrentObjectContextProvider currentObjectContextProvider;
        private readonly ISampleWorkerService sampleWorkerService;

        /// <summary>
        /// Создаёт новый экземпляр <see cref="SampleWorkerController"/>
        /// </summary>
        /// <param name="serviceProvider">Сервис-провайдер</param>
        public SampleWorkerController(ICurrentObjectContextProvider currentObjectContextProvider, ISampleWorkerService sampleWorkerService)
        {
            this.currentObjectContextProvider = currentObjectContextProvider;
            this.sampleWorkerService = sampleWorkerService;
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost]
        public CommonResponse SendToWorker([FromBody] WorkerMessageArgs request)
        {
            var response = new CommonResponse();
            var sessionContext = currentObjectContextProvider.GetOrCreateCurrentSessionContext();
            try
            {
                sampleWorkerService.CreateMessageToWorker(sessionContext.ObjectContext, request, Constants.SampleSomeEventId);
                response.InitializeSuccess();
                return response;
            } 
            catch (Exception ex)
            {
                response.InitializeError(ex.Message);
                return response;
            }
        }
    }
}