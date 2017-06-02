using System;
using System.Collections.Generic;
using System.Linq;
using AcquaintancePanelServerExtension.Models;
using AcquaintancePanelServerExtension.Helpers;
using DocsVision.BackOffice.ObjectModel.Services;
using DocsVision.BackOffice.CardLib.CardDefs;
using DocsVision.Workflow.Objects;

namespace AcquaintancePanelServerExtension.Services
{
    public class LayoutBPService : ILayoutBPService
    {

        private readonly IServiceProvider serviceProvider;
        private readonly ServiceHelper serviceHelper;

        /// <summary>
        /// Initializes a new instance of the <see cref="LayoutLinksService"/> class
        /// </summary>
        /// <param name="provider">Service provider</param>
        public LayoutBPService(IServiceProvider provider)
        {
            if (provider == null)
                throw new ArgumentNullException("provider");

            this.serviceProvider = provider;
            this.serviceHelper = new ServiceHelper(serviceProvider);
        }

        public StartProcessResultModel StartBusinessProcess(Guid cardId, Guid processTemplateId, IEnumerable<Guid> employeeIds = null, DateTime? endDate = null)
        {
            var resultModel = new StartProcessResultModel();
            var sessionContext = this.serviceHelper.CurrentObjectContextProvider.GetOrCreateCurrentSessionContext();

            try
            {
                // Инициализация объекта для работы с библиотекой карточкой СУБП
                Library WorkflowLibrary = new Library(sessionContext.Session, 1, 1, false);

                // Получение шаблона бизнес-процесса
                Process processTemplate = WorkflowLibrary.GetProcess(processTemplateId);

                // Создание экземпляра бизнес-процесса
                Process processInstance = WorkflowLibrary.CreateProcess(processTemplate);

                // Получение необходимых сервисов
                var baseCardService = sessionContext.ObjectContext.GetService<IBaseCardService>();
                IStaffService staffService = sessionContext.ObjectContext.GetService<IStaffService>();

                // Инициализация двух переменных
                // Performers является переменной с набором значений - кому отправить на ознакомление  
                var variables = new Dictionary<string, object>{
                            {"Performers",
                                employeeIds != null && employeeIds.Any() ?
                                    employeeIds.Cast<object>().ToArray() :
                                    new object[]{sessionContext.AdvancedCardManager.GetFieldValue(cardId, CardDocument.AcquaintanceStaff.ID, CardDocument.AcquaintanceStaff.AcquaintancePersons) } }
                };

                //Attach current document as document for acquaitance
                variables.Add("Document", cardId);

                if (endDate.HasValue)
                {
                    variables.Add("EndDate", endDate);
                }

                var currentEmployee = staffService.GetCurrentEmployee();
                variables.Add("Author", currentEmployee);

                baseCardService.InitializeBusinessProcessVariables(processInstance, variables);

                // Запуск экземпляра бизнес-процесса
                processInstance.Start(currentEmployee.AccountName, WorkflowLibrary.Dictionary, ExecutionModeEnum.Automatic, true);

                sessionContext.ObjectContext.AcceptChanges();
                resultModel.Success = true;
            }
            catch (Exception ex)
            {
                resultModel.Success = false;
                resultModel.Message = ex.Message;
            }
            return resultModel;
        }
    }
}