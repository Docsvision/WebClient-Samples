using ClosedXML.Excel;
using DocsVision.WebClient.Models.Grid;
using DocsVision.WebClient.Services.ExcelExport;
using ExcelExportServerExtension.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Drawing;
using System.Linq;

namespace ExcelExportServerExtension.ExcelExport
{
    /// <summary>
    /// Описывает класс, реализующий свой экспорт в Excel.
    /// </summary>
    public class ExcelExportExampleService : ExcelExportService
    {
        // цвет нечётных строк
        private readonly Color oddRowColor = Color.LightBlue;

        /// <summary>
        /// Модифицирует документ Excel.
        /// </summary>
        /// <param name="workbook"></param>
        protected override void ApplyWorkbookSettings(XLWorkbook workbook)
        {
            foreach (var worksheet in workbook.Worksheets)
            {
                // меняем фоновый цвет нечётных строк в таблице
                for (var i = 1; i < worksheet.RangeUsed().RowCount(); i += 2)
                {
                    var row = worksheet.RangeUsed().Row(i);
                    row.Style.Fill.BackgroundColor = XLColor.FromColor(oddRowColor);
                }
            }
        }

        /// <summary>
        /// Получает строковое значение ячейки таблицы
        /// </summary>
        /// <param name="paramValue"></param>
        /// <returns></returns>
        protected override string GetGridRowParamValueAsString(object paramValue, bool noNullValues = false)
        {
            // для ячейки типа DateTime устанавливаем длинный формат
            if (paramValue is DateTime dateTime)
            {
                return dateTime.ToLongDateString();
            }

            return base.GetGridRowParamValueAsString(paramValue);
        }

        /// <summary>
        /// Получает все колонки из грида и сортирует их по параметру Order.
        /// </summary>
        protected override IEnumerable<GridColumn> GetGridColumns(GridViewModel viewModel) =>
            viewModel.Columns.Select(gridColumn => CreateGridColumnModel(gridColumn, viewModel))
                .OrderBy(column => column.UserColumn?.Order ?? 0)
                .Select(column => column.GridColumn);

        private static GridColumnModel CreateGridColumnModel(GridColumn gridColumn, GridViewModel viewModel) => new GridColumnModel
        {
            GridColumn = gridColumn,
            UserColumn = viewModel.GridUserSettings
                .GetColumnsForCurrentPresentation()
                .FirstOrDefault(x => x.Name == gridColumn.Name)
        };
    }
}
