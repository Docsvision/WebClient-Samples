using DocsVision.Platform.WebClient;
using DocsVision.Platform.WebClient.Models;
using ServerExtension.Models;
using ServerExtension.Services;
using Microsoft.AspNetCore.Mvc;

namespace ServerExtension.Controllers
{
    public class SampleWorkerController: Controller
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
        public CommonResponse SendToWorker([FromBody] SampleEventArgs request)
        {
            var response = new CommonResponse();
            var sessionContext = currentObjectContextProvider.GetOrCreateApplicationPoolSessionContext();
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