using DocsVision.BackOffice.ObjectModel;
using DocsVision.Platform.WebClient;
using System;
using System.Diagnostics;
using DocsVision.BackOffice.ObjectModel.Services;

namespace ShiftTasksEndDateServerExtension.Services
{
    public class ShiftTasksEndDateService : IShiftTasksEndDateService
    {
        /// <summary>
        /// Сдвигает дату окончания задач
        /// </summary>
        /// <param name="sessionContext">Контекст сессии</param>
        /// <param name="cardId">Идентификатор карточки</param>
        /// <returns><see cref="ExtendedCardModel"/></returns>
        public void ShiftTasksEndDate(SessionContext sessionContext, Guid cardId)
        {
            sessionContext.AdvancedCardManager.RefreshCard(cardId);
            var document = sessionContext.ObjectContext.GetObject<Document>(cardId);
            if (document != null)
            {
                var taskService = sessionContext.ObjectContext.GetService<ITaskService>();
                foreach (var taskListTask in document.MainInfo.Tasks.Tasks)
                {
                    var task = taskListTask.Task;
                    if (task != null)
                    {
                        var endDate = task.MainInfo.EndDate ?? DateTime.UtcNow;
                        try
                        {
                            taskService.ChangeTaskExecutionDate(task, task.MainInfo.StartDate, endDate.AddDays(3), Resources.ChangeTaskComment);
                            sessionContext.ObjectContext.SaveObject(task);
                        }
                        catch (MethodAccessException ex)
                        {
                            // Пользователь не имеет прав на изменение карточки task
                            Trace.TraceWarning(ex.ToString());
                        }
                    }
                }
            }
        }
    }
}