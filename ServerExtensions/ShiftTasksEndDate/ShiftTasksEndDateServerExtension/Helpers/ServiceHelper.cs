using System;
using DocsVision.Platform.WebClient.Helpers;
using ShiftTasksEndDateServerExtension.Services;

namespace ShiftTasksEndDateServerExtension.Helpers
{
    internal class ServiceHelper : DocsVision.BackOffice.WebClient.Helpers.ServiceHelper
    {
        private IShiftTasksEndDateService shiftTasksEndDateService;

        public ServiceHelper(IServiceProvider serviceProvider): base(serviceProvider)
        {
        }     

        public IShiftTasksEndDateService ShiftTasksEndDateService
        {
            get
            {
                return shiftTasksEndDateService ?? (shiftTasksEndDateService = ServiceUtil.GetService<IShiftTasksEndDateService>(serviceProvider));
            }
        }
    }
}