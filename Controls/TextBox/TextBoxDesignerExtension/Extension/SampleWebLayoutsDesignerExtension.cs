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
    /// Представляет собой пример расширения для редактора разметок
    /// </summary>
    class SampleWebLayoutsDesignerExtension : WebLayoutsDesignerExtension
    {
        IAllowedOperationsStorage allowedOperationsStorage;

        /// <summary>
        /// Создаёт новый экземпляр <see cref="SampleWebLayoutsDesignerExtension"/>
        /// </summary>
        /// <param name="provider">Сервис-провайдер</param>
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

        /// <summary>
        /// Возвращает описание пользовательских контролов       
        /// </summary>
        protected override List<ControlTypeDescription> GetControlTypeDescriptions()
        {
            return new List<ControlTypeDescription>
            {
               this.GetSampleTextBoxDescription()
            };
        }

        /// <summary>
        /// Возвращает ResourceManager этого расширения (расширяет словарь локализации конструктора разметок, не путать с окном Localization конструктора разметок)
        /// </summary>
        protected override List<ResourceManager> GetResourceManagers()
        {
            return new List<ResourceManager>
            {
                Resources.ResourceManager
            };
        }

        /// <summary>
        /// Возвращает описание контрола SampleTextBox
        /// </summary>
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
