using System;
using System.Collections.Generic;
using System.Resources;
using CheckBoxDesignerExtension.Editors;
using DocsVision.Platform.Tools.LayoutEditor.Extensibility;
using DocsVision.Platform.Tools.LayoutEditor.Helpers;
using DocsVision.Platform.Tools.LayoutEditor.Infrostructure;
using DocsVision.Platform.Tools.LayoutEditor.ObjectModel.Descriptions;
using DocsVision.Platform.WebClient.Helpers;

namespace CheckBoxDesignerExtension.Extension
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

        /// <summary>
        /// Возвращает словарь ключ/описание свойства, которые будут использоваться в пользовательских контролах
        /// </summary>
        protected override Dictionary<string, PropertyDescription> GetPropertyDescriptions()
        {
            return new Dictionary<string, PropertyDescription>
            {
                { Constants.SampleCheckBox.DefaultValue, GetDefaultValuePropertyDescription() }
            };
        }

        /// <summary>
        /// Возвращает описание пользовательских контролов
        /// описание контрола PartnerLink выполнено альтернативным способом и содержится в каталоге xml
        /// </summary>
        protected override List<ControlTypeDescription> GetControlTypeDescriptions()
        {
            return new List<ControlTypeDescription>
            {
                this.GetSampleCheckBoxDescription()
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
        /// Возвращает описание свойства
        /// </summary>
        private PropertyDescription GetDefaultValuePropertyDescription()
        {
            return new PropertyDescription
            {
                Type = typeof(bool), // Тип свойства
                Name = Constants.SampleCheckBox.DefaultValue, // Наименование поля, которое будет приходить в разметке контрола
                Category = PropertyCategoryConstants.BehaviorCategory, // Категория свойства, в которой будет отображаться свойство в конструкторе разметок
                DisplayName = Resources.ControlTypes_DefaultValueProperty // Отображаемое наименование свойства в конструкторе разметок
            };
        }

        /// <summary>
        /// Возвращает описание контрола SampleCheckBox
        /// </summary>
        private ControlTypeDescription GetSampleCheckBoxDescription()
        {
            var standardCssClass = PropertyFactory.GetStandardCssClassProperty(); // Получаем свойство StandardCssClass
            standardCssClass.DefaultValue = "sample-checkbox"; // Изменяем значение по умолчанию 

            var dataFieldProperty = PropertyFactory.GetDataFieldProperty();
            dataFieldProperty.Editor = typeof(BooleanMetadataEditor);

            // Создаем описание контрола, который будет доступен по имени PartnerCheckBox
            var partnerCheckBox = new ControlTypeDescription(Constants.SampleCheckBox.ClassName)
            {
                DisplayName = Resources.ControlTypes_SampleCheckBox, // Отображаемое наименование контрола в окне конструктора разметок
                ControlGroupDisplayName = Resources.ControlGroup_Samples, // Название группы в конструкторе разметок
                PropertyDescriptions =  // Содержит перечень свойств, которыми обладает контрол
                {
                    PropertyFactory.GetNameProperty(), // Наименование экземпляра контрола
                    PropertyFactory.GetTipProperty(),  // Текст подсказки при наведении на контрол
                    PropertyFactory.GetLabelTextProperty(), // Текст метки
                    PropertyFactory.GetVisibilityProperty(), // Видимость контрола
                    PropertyFactory.GetCustomCssClassesProperty(), // Пользовательские css классы
                    PropertyFactory.GetTabStopProperty(), // Переход по tab
                    standardCssClass, // Базовый css класс контрола

                    // Блок свойств Binding
                    PropertyFactory.GetDataSourceProperty(), // Источник данных (отображается только в конструкторе)
                    dataFieldProperty,  // Поле данных (отображается только в конструкторе)
                    PropertyFactory.GetBindingProperty(),    // Свойство binding (не отображается в конструкторе)
                    PropertyFactory.GetEditOperationProperty(), // Режим редактирования (отображается только в конструкторе)                    

                    PropertyFactory.Create(Constants.SampleCheckBox.DefaultValue), // Свойство DefaultValue (было добавлено ранее этим расширением)

                    PropertyFactory.CreateEvent(Constants.SampleCheckBox.EventChecked, "ControlTypes_EventCheckedProperty"), // Событие EventChecked, отображаемое наименование свойства содержится в файле ресурсов по ключу ControlTypes_EventCheckedProperty 
                    PropertyFactory.CreateEvent(Constants.SampleCheckBox.EventUnchecked, "ControlTypes_EventUncheckedProperty") // Событие EventUnchecked
                },
               // GetAllowedOperations = AllowedOperationsStorage.GetAllowedOperations(Constants.AllowedOperations.AllowCreateInEditLayoutsOnly) // Указывает, что контрол доступен только в разметках редактирования
            };

            return partnerCheckBox;
        }
    }
}
