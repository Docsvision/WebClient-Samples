using DocsVision.Platform.ObjectManager;
using DocsVision.Platform.WebClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RefCasesDesignerExtension.Editors
{
    public class RefCasesUtils
    {
        private CardManager cardManager;
        private Guid refCasesId = new Guid("246197EA-846A-44DA-9EA3-0BCAE5500388");
        private Guid yearsSectionId = new Guid("BD44C786-6E41-450E-BD60-66919657E51B");
        private Guid sectionsSectionID = new Guid("319E425D-543C-45DB-BD51-955B58476EDB");
        private CardData refCasesData;

        public RefCasesUtils(SessionContext sessionContext) => cardManager = sessionContext.Session.CardManager;

        // Возвращает список лет из Справочника номенклатуры дел 5
        public IEnumerable<Year> GetYears()
        {
            refCasesData = cardManager.GetDictionaryData(refCasesId);
            SectionData yearSection = refCasesData.Sections[yearsSectionId];

            return yearSection.Rows.Select<RowData, Year>(row => new Year() { ID = row.Id, Value = row["Year"].ToString() });
        }

        // Возвращает список разделов из Справочника номенклатуры дел 5
        public List<Node> GetSections(Guid yearID)
        {
            var yearSection = refCasesData.Sections[yearsSectionId];

            if (yearSection.RowExists(yearID)) {
                RowDataCollection sectionRows = yearSection.GetRow(yearID).ChildSections[sectionsSectionID].Rows;
                
                return GetNodesFromRows(sectionRows);
            }

            return new List<Node>();
        }

        // Возвращает описании Раздела с идентификатором sectionId
        public string GetSectionTitle(Guid sectionId)
        {
            SectionData sectionSesction = cardManager.GetDictionaryData(refCasesId).Sections[sectionsSectionID];

            // Возможно раздел был удалён
            if (sectionSesction.RowExists(sectionId) == false)
                return "Ошибка!";

            RowData sectionRow = sectionSesction.GetRow(sectionId);
            RowData yearRow = sectionRow.SubSection.ParentRow;

            if (yearRow != null)
                return string.Format("{0}. {1}", yearRow["Year"], sectionRow["Name"].ToString());

            return "Ошибка!";
        }


        // Возвращает список Разделов для строк секции справочника
        List<Node> GetNodesFromRows(RowDataCollection rows)
        {
            var nodes = new List<Node>();

            foreach (var row in rows)
            {
                var node = new Node() { ID = row.Id, Name = row["Name"].ToString() };
                if (row.HasChildRows)
                    node.Nodes = GetNodesFromRows(row.ChildRows);

                nodes.Add(node);
            }
            return nodes;
        }
    }

    public class Year
    {
        public string Value { get; set; }
        public Guid ID { get; set; }
    }

    public class Node
    {
        public string Name { get; set; }
        public Guid ID { get; set; }
        public List<Node> Nodes { get; set; }
    }
}
