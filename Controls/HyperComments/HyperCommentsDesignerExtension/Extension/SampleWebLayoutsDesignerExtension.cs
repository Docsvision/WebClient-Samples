using System;
using System.Collections.Generic;
using System.Resources;
using DocsVision.Platform.Tools.LayoutEditor.Extensibility;
using DocsVision.Platform.Tools.LayoutEditor.Helpers;
using DocsVision.Platform.Tools.LayoutEditor.Infrostructure;
using DocsVision.Platform.Tools.LayoutEditor.ObjectModel.Descriptions;
using DocsVision.Platform.WebClient.Helpers;

namespace HyperCommentsDesignerExtension.Extension
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

        // Возвращает словарь ключ/описание свойства, которые будут использоваться в пользовательских контролах
        protected override Dictionary<string, PropertyDescription> GetPropertyDescriptions()
        {
            return new Dictionary<string, PropertyDescription>
            {
                { Constants.HyperComments.WidgetId, GetWidgetIdPropertyDescription() }
            };
        }

        // Возвращает описание пользовательских контролов
        // описание контрола PartnerLink выполнено альтернативным способом и содержится в каталоге xml
        protected override List<ControlTypeDescription> GetControlTypeDescriptions()
        {
            return new List<ControlTypeDescription>
            {
                this.GetHyperCommentsDescription()
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

        // Возвращает описание свойства 
        private PropertyDescription GetWidgetIdPropertyDescription()
        {
            return new PropertyDescription
            {
                Type = typeof(int), // Тип свойства
                Name = Constants.HyperComments.WidgetId, // Наименование поля, которое будет приходить в разметке контрола
                Category = PropertyCategoryConstants.GeneralCategory, // Категория свойства, в которой будет отображаться свойство в конструкторе разметок
                DisplayName = Resources.ControlTypes_WidgetIdProperty, // Отображаемое наименование свойства в конструкторе разметок
                Validate = property =>
                {
                    return property.NewValue != null && (int)property.NewValue > 0;
                }
            };
        }

        // Возвращает описание контрола SampleCheckBox
        private ControlTypeDescription GetHyperCommentsDescription()
        {
            var standardCssClass = PropertyFactory.GetStandardCssClassProperty(); // Получаем свойство StandardCssClass
            standardCssClass.DefaultValue = "hyper-comments"; // Изменяем значение по умолчанию 

            var hyperComments = new ControlTypeDescription(Constants.HyperComments.ClassName)
            {
                DisplayName = Resources.ControlTypes_HyperComments, // Отображаемое наименование контрола в окне конструктора разметок
                ControlGroupDisplayName = Resources.ControlGroup_Samples,
                PropertyDescriptions =  // Содержит перечень свойств, которыми обладает контрол
                {
                    PropertyFactory.GetNameProperty(), // Наименование экземпляра контрола
                    standardCssClass, // Базовый css класс контрола

                    PropertyFactory.Create(Constants.HyperComments.WidgetId), // Свойство WidgetId (было добавлено ранее этим расширением)
                },
                GetAllowedOperations = AllowedOperationsStorage.GetAllowedOperations(Constants.AllowedOperations.AllowCreateInViewLayoutsOnly) // Указывает, что контрол доступен только в разметках просмотра
            };

            return hyperComments;
        }
    }
}
