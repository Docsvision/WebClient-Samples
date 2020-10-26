using DocsVision.Platform.Data.Metadata.CardModel;
using System.Windows;
using DocsVision.Platform.Tools.LayoutEditor.Editors;
using Xceed.Wpf.Toolkit.PropertyGrid;
using Xceed.Wpf.Toolkit.PropertyGrid.Editors;
using DocsVision.Platform.WebLayoutsDesigner.NewEditors;
using DocsVision.BackOffice.WebLayoutsDesigner.Editors;

namespace CheckBoxDesignerExtension.Editors
{
    class BooleanMetadataEditor : ITypeEditor
    {
        public FrameworkElement ResolveEditor(PropertyItem propertyItem)
        {
            var editor = new FieldMetadataEditor();
            editor.FieldFilter = (field) => { return field.FieldType == FieldType.Bool; };
            return editor.ResolveEditor(propertyItem);
        }
    }
}
