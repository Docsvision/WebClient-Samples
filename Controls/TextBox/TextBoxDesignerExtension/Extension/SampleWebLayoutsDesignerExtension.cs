using Docsvision.Platform.Tools.LayoutEditor.Infrostructure;
using System;
using System.Collections.Generic;
using Docsvision.Platform.Tools.LayoutEditor.ObjectModel.Descriptions;
using Docsvision.Platform.Tools.LayoutEditor.Extensibility;
using System.Resources;
using Docsvision.Platform.Tools.LayoutEditor.Helpers;
using Docsvision.Platform;
using DocsVision.Platform.WebClient.Helpers;

namespace TextBoxDesignerExtension.Extension
{
    /// <summary>
    /// Represents sample layout editor extension
    /// </summary>
    class SampleWebLayoutsDesignerExtension : WebLayoutsDesignerExtension
    {
        IAllowedOperationsStorage allowedOperationsStorage;

        /// <summary>
        /// Creates a new instance of <see cref="SampleWebLayoutsDesignerExtension"/>
        /// </summary>
        /// <param name="provider">service provider</param>
        public SampleWebLayoutsDesignerExtension(IServiceProvider provider)
            : base(provider)
        {
        }

        /// <summary>
        /// Возвращает <see cref="IAllowedOperationsStorage"/>
        /// </summary>
        protected IAllowedOperationsStorage AllowedOperationsStorage
        {
            get
            {
                return this.allowedOperationsStorage ?? (this.allowedOperationsStorage = ServiceUtil.GetService<IAllowedOperationsStorage>(serviceProvider));
            }
        }

        // Возвращает описание пользовательских контролов       
        protected override List<ControlTypeDescription> GetControlTypeDescriptions()
        {
            return new List<ControlTypeDescription>
            {
               this.GetSampleTextBoxDescription()
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

        // Возвращает описание контрола SampleTextBox
        private ControlTypeDescription GetSampleTextBoxDescription()
        {
            var standardCssClass = PropertyFactory.GetStandardCssClassProperty();
            standardCssClass.DefaultValue = "sample-textbox";

            var sampleTextBox = new ControlTypeDescription(Constants.SampleTextBox.ClassName)
            {
                DisplayName = Resources.ControlTypes_SampleTextBox,
                PropertyDescriptions =
                {
                    standardCssClass,
                    PropertyFactory.GetNameProperty(),
                    PropertyFactory.GetVisibilityProperty(),
                    PropertyFactory.GetCustomCssClassesProperty(),
                    PropertyFactory.GetTipProperty(),
                    PropertyFactory.GetLabelTextProperty(),
                    PropertyFactory.GetTabStopProperty(),
                    PropertyFactory.GetDefaultProperty(),
                    PropertyFactory.Create(Constants.CommonProperties.Url),
                    PropertyFactory.GetClickEvent(),
                    PropertyFactory.GetMouseOverEvent(),
                    PropertyFactory.GetMouseOutEvent(),
                    PropertyFactory.GetFocusEvent(),
                    PropertyFactory.GetBlurEvent(),
                    PropertyFactory.GetDataChangedEvent(),
                    PropertyFactory.CreateEvent("ImageClick", "ControlTypes_ImageClickEventProperty"),
                },
                GetAllowedOperations = AllowedOperationsStorage.GetAllowedOperations(Constants.AllowedOperations.AllowCreateInEditLayoutsOnly)
            };
            PropertyFactory.AddSimpleBinding(sampleTextBox, editOperation: true);
            return sampleTextBox;
        }
    }
}
