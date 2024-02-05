using DocsVision.Platform.Data.Metadata.CardModel;
using System.Runtime.Versioning;
using System.Windows;
using Xceed.Wpf.Toolkit.PropertyGrid;
using Xceed.Wpf.Toolkit.PropertyGrid.Editors;

namespace CheckBoxDesignerExtension.Editors
{
    [SupportedOSPlatform("windows")]
    class BooleanMetadataEditor : ITypeEditor
    {
        public FrameworkElement ResolveEditor(PropertyItem propertyItem)
        {
            var editor = new DocsVision.Platform.WebLayoutsDesigner.NewEditors.FieldMetadataEditor();
            editor.FieldFilter = (field) => { return field.FieldType == FieldType.Bool; };
            return editor.ResolveEditor(propertyItem);
        }
    }
}
