using System;
using System.Collections.Generic;
using DocsVision.ApprovalDesigner.ObjectModel;
using DocsVision.ApprovalDesigner.ObjectModel.Services;
using DocsVision.BackOffice.ObjectModel;
using DocsVision.BackOffice.ObjectModel.Services;

namespace CustomStageService
{
	/// <summary>
	/// Пример переопределения сервиса этапа
	/// </summary>
	public class CustomStageService : ApprovalStageService
	{
		/// <summary>
		/// Переопределяем вычисления согласующих для этапа
		/// </summary>
		/// <param name="approvalStage">Текущий этап</param>
		/// <param name="document">Документ</param>
		/// <returns></returns>
		public override IEnumerable<ApprovalStageApprover> GetStageApprovers(ApprovalStage approvalStage, Document document)
		{
			List<ApprovalStageApprover> approvers = new List<ApprovalStageApprover>();

			IStaffService staffService = Context.GetService<IStaffService>();
			StaffEmployee employee = staffService.FindEmpoyeeByAccountName(@"Test\TestEmployee");

			// CreateApprover - штатный метод ApprovalStageService создающий запись согласующего из сотрудника
			approvers.Add(CreateApprover(employee));

			return approvers;
		}

		/// <summary>
		/// Дополняем создание задания согласования
		/// </summary>
		/// <param name="approvalStage">Текущий этап</param>
		/// <param name="approvalPath">Маршрут</param>
		/// <param name="reconcileCard">Согласование</param>
		/// <param name="task">Созданное задание</param>
		protected override void OnTaskCreated(ApprovalStage approvalStage, ApprovalPath approvalPath, Reconcile reconcileCard, Task task)
		{
			// дополним содержание задания
			task.MainInfo.Content += Environment.NewLine + "Тест расширения";
		}
	}
}