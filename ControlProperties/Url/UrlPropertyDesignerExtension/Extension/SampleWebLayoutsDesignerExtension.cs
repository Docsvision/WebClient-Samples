using Docsvision.Platform.Tools.LayoutEditor.Infrostructure;
using System;
using System.Collections.Generic;
using Docsvision.Platform.Tools.LayoutEditor.ObjectModel.Descriptions;
using Docsvision.Platform.Tools.LayoutEditor.Extensibility;
using System.Resources;

namespace UrlPropertyDesignerExtension.Extension
{
    /// <summary>
    /// Represents sample layout editor extension
    /// </summary>
    public class SampleWebLayoutsDesignerExtension : WebLayoutsDesignerExtension
    {       
        /// <summary>
        /// Creates a new instance of <see cref="SampleWebLayoutsDesignerExtension"/>
        /// </summary>
        /// <param name="provider">service provider</param>
        public SampleWebLayoutsDesignerExtension(IServiceProvider provider)
            : base(provider)
        {
        }        

        // Возвращает словарь ключ/описание свойства, которые будут использоваться в пользовательских контролах
        protected override Dictionary<string, PropertyDescription> GetPropertyDescriptions()
        {
            return new Dictionary<string, PropertyDescription>
            {
                { Constants.CommonProperties.Url, GetUrlPropertyDescription() }
                
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

        private PropertyDescription GetUrlPropertyDescription()
        {
            return new PropertyDescription
            {
                Type = typeof(string),
                Name = Constants.CommonProperties.Url,
                Category = PropertyCategoryConstants.DataCategory,
                DisplayName = Resources.ControlTypes_UrlProperty
            };
        }

    }
}
