using DocsVision.Platform.Tools.LayoutEditor.Extensibility;
using RefCasesDesignerExtension.Editors;
using System;
using System.Collections.Generic;
using System.Resources;

namespace RefCasesDesignerExtension.Extension
{
    class RefCasesDesignerExtension : WebLayoutsDesignerExtension
    {
        public RefCasesDesignerExtension(IServiceProvider provider)
            : base(provider)
        {
        }

        protected override Dictionary<string, Type> GetEditors()
        {
            return new Dictionary<string, Type>
            {
                { "RefCasesFieldMetadataEditor", typeof(RefCasesFieldMetadataEditor)},
                { "RefCasesSectionEditor", typeof(RefCasesSectionEditor)}
            };
        }

        protected override List<ResourceManager> GetResourceManagers()
        {
            return new List<ResourceManager>
            {
                Resources.ResourceManager
            };
        }
    }
}
