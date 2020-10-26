using RefCasesServerExtension.Models;
using RefCasesServerExtension.Services;
using System;
using System.Web.Http;
using System.Linq;
using DocsVision.Platform.WebClient.Models;
using DocsVision.Platform.WebClient.Models.Generic;

namespace RefCasesServerExtension.Controllers
{
    public class RefCasesOperationController : ApiController
    {
        private readonly IRefCasesService refCasesService;

        // В конструкторе контроллера получаем ссылку на реализованный сервис для работы со Справочником номенклатуры дел 5
        public RefCasesOperationController(IRefCasesService refCasesService)
        {
            this.refCasesService = refCasesService;
        }

        // Возвращает список лет
        [HttpPost]
        public Year[] GetYears([FromUri]Guid? rootSectionID)
        {
            return refCasesService.GetYears(rootSectionID).ToArray();
        }

        // Возвращает список разделов
        [HttpPost]
        public Section[] GetSections([FromUri]Guid yearID, [FromUri]Guid? rootSectionID) {
            return refCasesService.GetSections(yearID, rootSectionID).ToArray();
        }

        // Возвращает список дел
        [HttpPost]
        public Case[] GetCases([FromUri]Guid sectionID)
        {
            return refCasesService.GetCases(sectionID).ToArray();
        }

        // Возвращает отображаемое название дела
        [HttpPost]
        public string GetCaseDisplayName([FromUri]Guid caseID)
        {
            return refCasesService.GetCaseTitle(caseID);
        }

        // Поиск дела по имени
        [HttpPost]
        public CaseSearchResult SearchCase([FromUri]string caseName, [FromUri]int skipCount, [FromUri]int maxCount, [FromUri]Guid? rootSectionID)
        {
            // Получаем все подходящие дела
            var rows = refCasesService.SearchCases(caseName, rootSectionID);

            var result = new CaseSearchResult
            {
                // Оставляем только количество запрошенных клиентом
                Items = rows.Skip(skipCount).Take(maxCount).ToArray(),

                // Устанавливаем флаг наличия дополнительных результатов
                HasMore = rows.Count > skipCount + maxCount
            };

            return result;
        }
    }
}