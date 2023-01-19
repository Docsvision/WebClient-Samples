using DocsVision.Platform.WebClient.Models.FolderView;
using DocsVision.WebClient.Models.Grid;

namespace ExcelExportServerExtension.Models
{
    /// <summary>
    /// Задаёт описание модели колонки грида.
    /// </summary>
    internal class GridColumnModel
    {
        /// <summary>
        /// Колонка грида.
        /// </summary>
        public GridColumn GridColumn { get; set; }

        /// <summary>
        /// Параметры колонки.
        /// </summary>
        public GridUserSettingsColumn UserColumn { get; set; }
    }
}
