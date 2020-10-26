using DocsVision.BackOffice.WebLayoutsDesigner.Editors;
using DocsVision.Platform.Data.Metadata.CardModel;
using System;
using System.Windows;
using Xceed.Wpf.Toolkit.PropertyGrid;
using Xceed.Wpf.Toolkit.PropertyGrid.Editors;

namespace RefCasesDesignerExtension.Editors
{
    // Редактор для выбора поля карточки, ссылающегося на Дело в Справочника номенклатуры дел 5
    public class RefCasesFieldMetadataEditor : ITypeEditor
    {
        public FrameworkElement ResolveEditor(PropertyItem propertyItem)
        {
            var refCasesID = new Guid("246197EA-846A-44DA-9EA3-0BCAE5500388");
            var sectionCasesID = new Guid("56AF8231-B918-42D4-AC15-90EC2E9A0725");

            var editor = new FieldMetadataEditor
            {
                // Устанавливаем фильтр для выбора полей только из справочника
                FieldFilter = (field) =>
                {
                    return field.FieldType == FieldType.RefId 
                    && field.LinkedCardTypeId == refCasesID 
                    && field.LinkedSectionId == sectionCasesID;
                }
            };

            return editor.ResolveEditor(propertyItem);
        }

    }
}
