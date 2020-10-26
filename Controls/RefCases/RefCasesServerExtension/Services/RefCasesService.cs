using DocsVision.Platform.ObjectManager;
using DocsVision.Platform.WebClient;
using DocsVision.Platform.WebClient.Managers;
using RefCasesServerExtension.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace RefCasesServerExtension.Services
{
    public class RefCasesService : IRefCasesService
    {
        
        private Guid refCasesId = new Guid("246197EA-846A-44DA-9EA3-0BCAE5500388"); // Справочник номенклатуры дел 5
        private Guid yearsSectionId = new Guid("BD44C786-6E41-450E-BD60-66919657E51B"); // Секция «Года» справочника
        private Guid sectionsSectionID = new Guid("319E425D-543C-45DB-BD51-955B58476EDB"); // Секция «Разделы» справочника
        private Guid caseSectionID = new Guid("56af8231-b918-42d4-ac15-90ec2e9a0725"); // Секция «Дела» справочника

        // Названия полей
        private const string Year = "Year";
        private const string DisplayIndex = "DisplayIndex";
        private const string Case_Name = "Case_Name";
        private const string Case_Index = "Case_Index";
        private const string Case_SectionDisplayIndex = "Case_SectionDisplayIndex";
        private const string Name = "Name";

        ICurrentObjectContextProvider objectContextProvider;
        private AdvancedCardManager cardManager => objectContextProvider.GetOrCreateCurrentSessionContext().AdvancedCardManager;

        public RefCasesService(ICurrentObjectContextProvider objectContextProvider) => this.objectContextProvider = objectContextProvider;

        // Возвращает список лет из Справочника номенклатуры дел 5
        public List<Year> GetYears(Guid? rootSection)
        {
            CardData refCasesData = cardManager.GetDictionaryData(refCasesId);
            SectionData yearSection = refCasesData.Sections[yearsSectionId];

            // Если выбран корневой раздел, нужно вернуть только его Год
            if (rootSection.HasValue && refCasesData.Sections[sectionsSectionID].RowExists(rootSection.Value))
            {
                var sectionRow = refCasesData.Sections[sectionsSectionID].GetRow(rootSection.Value);
                var yearRow = sectionRow.SubSection.ParentRow;

                return new List<Year>() {
                    new Year() { ID = yearRow.Id, DisplayValue = yearRow[Year].ToString() }
                };
            }

            // Иначе возвращаем все года
            return yearSection.Rows.Select<RowData, Year>(row => new Year()
            {
                ID = row.Id,
                DisplayValue = row[Year].ToString()
            }).ToList();
        }

        // Возвращает дерево разделов указанного года из Справочника номенклатуры дел 5 
        public List<Section> GetSections(Guid yearID, Guid? rootSection)
        {
            CardData refCasesData = cardManager.GetDictionaryData(refCasesId);
            SectionData sectionsSection = refCasesData.Sections[sectionsSectionID];

            // Если выбран корневой раздел, вернуть только его подразделы
            if (rootSection.HasValue && sectionsSection.RowExists(rootSection.Value))
            {
                RowData row = sectionsSection.GetRow(rootSection.Value);
                return GetSectionsFromRows(new List<RowData>() { row });
            }

            SectionData yearSection = refCasesData.Sections[yearsSectionId];

            // Иначе вернуть все разделы указанного года
            if (yearSection.RowExists(yearID))
            {
                RowDataCollection sectionRows = yearSection.GetRow(yearID).ChildSections[sectionsSectionID].Rows;
                return GetSectionsFromRows(sectionRows);
            }

            return new List<Section>();
        }

        // Вернуть все дела указанного раздела
        public List<Case> GetCases(Guid sectionID)
        {
            CardData refCasesData = cardManager.GetDictionaryData(refCasesId);
            SectionData sectionsSection = refCasesData.Sections[sectionsSectionID];

            if (sectionsSection.RowExists(sectionID))
            {
                RowDataCollection sectionRows = sectionsSection.GetRow(sectionID).ChildSections[caseSectionID].Rows;
                return GetCasesFromRows(sectionRows);
            }

            return new List<Case>();
        }

        // Вернуть отображаемое название дела
        public string GetCaseTitle(Guid caseID)
        {
            CardData refCasesData = cardManager.GetDictionaryData(refCasesId);
            SectionData section = refCasesData.Sections[caseSectionID];

            if (section.RowExists(caseID))
            {
                // Получаем для дела родительские строки раздела и года
                RowData caseRow = section.GetRow(caseID);
                var sectionRow = caseRow.SubSection.ParentRow;
                var yearRow = sectionRow.SubSection.ParentRow;

                return string.Format("{0}, {1}, {2}", yearRow[Year], sectionRow[DisplayIndex], caseRow[Case_Name]);
            }

            return "Ошибка!";
        }


        // Поиск дела по названию
        public List<CaseClientModel> SearchCases(string caseName, Guid? rootSection = null)
        {
            CardData refCasesData = cardManager.GetDictionaryData(refCasesId);

            RowDataCollection allRows;

            // Если указан коневой раздел, поиск только в нём, иначе - во всех разделах
            if (rootSection.HasValue && refCasesData.Sections[sectionsSectionID].RowExists(rootSection.Value))
                allRows = refCasesData.Sections[caseSectionID].GetAllRows(rootSection.Value, true);
            else
                allRows = refCasesData.Sections[caseSectionID].GetAllRows();

            var results = new List<CaseClientModel>();

            foreach (var caseRow in allRows)
            {
                // Проверяем название раздела - поле Case_Name
                if (caseRow[Case_Name].ToString().IndexOf(caseName, StringComparison.InvariantCultureIgnoreCase) > -1 ||
                    (caseRow[Case_SectionDisplayIndex].ToString() + "-" + caseRow[Case_Index].ToString()).IndexOf(caseName, StringComparison.InvariantCultureIgnoreCase) > -1)
                {
                    var sectionRow = caseRow.SubSection.ParentRow;
                    var yearRow = sectionRow.SubSection.ParentRow;

                    results.Add(new CaseClientModel()
                    {
                        Id = caseRow.Id,

                        // Возвращаем сразу отображаемое название
                        Name = string.Format("{0}, {1}, {2}", yearRow[Year], sectionRow[DisplayIndex], caseRow[Case_Name])
                    });
                }
            }

            return results;
        }

  
        // Возвращает список Разделов для строк секции справочника
        List<Section> GetSectionsFromRows(IEnumerable<RowData> rows)
        {
            var nodes = new List<Section>();

            foreach (var row in rows)
            {
                var node = new Section() { ID = row.Id, DisplayValue = row[Name].ToString() };
                if (row.HasChildRows)
                    node.Sections = GetSectionsFromRows(row.ChildRows);

                nodes.Add(node);
            }
            return nodes;
        }

        // Возвращает список Дел для строк справочника
        List<Case> GetCasesFromRows(RowDataCollection rows)
        {
            var nodes = new List<Case>();

            foreach (var row in rows)
            {
                var node = new Case() { ID = row.Id, DisplayValue = row[Case_Name].ToString() };
                if (row.HasChildRows)
                    node.Cases = GetCasesFromRows(row.ChildRows);

                nodes.Add(node);
            }
            return nodes;
        }
    }
}