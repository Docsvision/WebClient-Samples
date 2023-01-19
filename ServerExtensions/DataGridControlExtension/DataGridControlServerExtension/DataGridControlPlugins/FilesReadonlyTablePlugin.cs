using DocsVision.BackOffice.ObjectModel;
using DocsVision.BackOffice.ObjectModel.Services;
using DocsVision.Layout.WebClient.Models;
using DocsVision.Layout.WebClient.Models.TableData;
using DocsVision.Layout.WebClient.Services;
using DocsVision.Platform.ObjectManager.SystemCards;
using DocsVision.Platform.WebClient;
using System;
using System.Collections.Generic;


namespace DataGridControlServerExtension.DataGridControlPlugins
{
    public class FilesDataGridControlPlugin : IDataGridControlPlugin
    {
        const string CurrentCardIdParameterName = "CurrentCardId";

        public string Name => "Files";

        public TableModel GetTableData(SessionContext sessionContext, List<ParamModel> parameters)
        {
            var versionedFileCardService = sessionContext.ObjectContext.GetService<IVersionedFileCardService>();
            var cardId = parameters.Find(x => x.Key == CurrentCardIdParameterName)?.Value;
            var document = sessionContext.ObjectContext.GetObject<Document>(new Guid(cardId));

            var table = new TableModel();
            string nameColumn = "name";
            string versionColumn = "version";
            string sizeColumn = "size";
            table.Columns.Add(new ColumnModel()
            {
                Id = nameColumn,
                Name = DataGridControlServerExtension.Resources.DataGridControlColumnName,
                Type = DocsVision.WebClient.Models.Grid.ColumnType.String
            });            
            table.Columns.Add(new ColumnModel()
            {
                Id = versionColumn,
                Name = DataGridControlServerExtension.Resources.DataGridControlColumnVersion,
                Type = DocsVision.WebClient.Models.Grid.ColumnType.String
            });
            table.Columns.Add(new ColumnModel()
            {
                Id = sizeColumn,
                Name = DataGridControlServerExtension.Resources.DataGridControlColumnSize,
                Type = DocsVision.WebClient.Models.Grid.ColumnType.String
            });
            foreach (var file in document.Files)
            {
                var fileCard = (VersionedFileCard)sessionContext.Session.CardManager.GetCard(file.FileId);
                table.Rows.Add(new RowModel()
                {
                    EntityId = file.GetObjectId().ToString(),
                    Id = file.GetObjectId().ToString(),
                    Cells = new List<CellModel>()
                    {
                        new CellModel()
                        {
                            ColumnId = nameColumn,
                            Value = file.FileName
                        },
                        new CellModel()
                        {
                            ColumnId = versionColumn,
                            Value = versionedFileCardService.GetVersionNumber(fileCard, fileCard.CurrentVersion.VersionId)
                        },
                        new CellModel
                        {
                            ColumnId = sizeColumn,
                            Value = file.LongFileSize
                        }                        
                    }
                });
            }
            table.Id = Guid.NewGuid().ToString();
            return table;
        }
    }
}
