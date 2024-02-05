using RefCasesServerExtension.Models;
using RefCasesServerExtension.Services;
using System;
using System.Linq;
using DocsVision.Platform.WebClient.Models;
using DocsVision.Platform.WebClient.Models.Generic;
using Microsoft.AspNetCore.Mvc;

namespace RefCasesServerExtension.Controllers
{
    public class RefCasesOperationController : ControllerBase
    {
        private readonly IRefCasesService refCasesService;

        // В конструкторе контроллера получаем ссылку на реализованный сервис для работы со Справочником номенклатуры дел 5
        public RefCasesOperationController(IRefCasesService refCasesService)
        {
            this.refCasesService = refCasesService;
        }

        // Возвращает список лет
        [HttpPost]
        public Year[] GetYears([FromQuery]Guid? rootSectionID)
        {
            return refCasesService.GetYears(rootSectionID).ToArray();
        }

        // Возвращает список разделов
        [HttpPost]
        public Section[] GetSections([FromQuery]Guid yearID, [FromQuery]Guid? rootSectionID) {
            return refCasesService.GetSections(yearID, rootSectionID).ToArray();
        }

        // Возвращает список дел
        [HttpPost]
        public Case[] GetCases([FromQuery]Guid sectionID)
        {
            return refCasesService.GetCases(sectionID).ToArray();
        }

        // Возвращает отображаемое название дела
        [HttpPost]
        public string GetCaseDisplayName([FromQuery]Guid caseID)
        {
            return refCasesService.GetCaseTitle(caseID);
        }

        // Поиск дела по имени
        [HttpPost]
        public CaseSearchResult SearchCase([FromQuery]string caseName, [FromQuery]int skipCount, [FromQuery]int maxCount, [FromQuery]Guid? rootSectionID)
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