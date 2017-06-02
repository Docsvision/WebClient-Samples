using Docsvision.Platform.Tools.LayoutEditor.Infrostructure;
using System;
using System.Collections.Generic;
using Docsvision.Platform.Tools.LayoutEditor.ObjectModel.Descriptions;
using Docsvision.Platform.Tools.LayoutEditor.Extensibility;
using System.Resources;
using Docsvision.Platform.Tools.LayoutEditor.Helpers;
using Docsvision.Platform;

namespace TemplateDesignerExtension.Extension
{
    /// <summary>
    /// Represents sample layout editor extension
    /// </summary>
    class TemplateDesignerExtension : WebLayoutsDesignerExtension
    {
        /// <summary>
        /// Creates a new instance of <see cref="TemplateDesignerExtension"/>
        /// </summary>
        /// <param name="provider">service provider</param>
        public TemplateDesignerExtension(IServiceProvider provider)
            : base(provider)
        {
        }

        // Возвращает словарь ключ/описание свойства, которые будут использоваться в пользовательских контролах
        protected override Dictionary<string, PropertyDescription> GetPropertyDescriptions()
        {
            return new Dictionary<string, PropertyDescription>
            {

            };
        }

        // Возвращает описание пользовательских контролов
        // описание контрола PartnerLink выполнено альтернативным способом и содержится в каталоге xml
        protected override List<ControlTypeDescription> GetControlTypeDescriptions()
        {
            return new List<ControlTypeDescription>
            {
            };
        }

        // Возвращает ResourceManager этого расширения (расширяет словарь локализации конструктора разметок, не путать с окном Localization конструктора разметок)
        protected override List<ResourceManager> GetResourceManagers()
        {
            return new List<ResourceManager>
            {
                Resources.ResourceManager
            };
        }
    }
}
