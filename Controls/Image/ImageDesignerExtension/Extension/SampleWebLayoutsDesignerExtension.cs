using System;
using System.Collections.Generic;
using System.Resources;
using ImageDesignerExtension.Editors;
using DocsVision.Platform.Tools.LayoutEditor.Controls;
using DocsVision.Platform.Tools.LayoutEditor.Extensibility;
using DocsVision.Platform.Tools.LayoutEditor.Helpers;
using DocsVision.Platform.Tools.LayoutEditor.Infrostructure;
using DocsVision.Platform.Tools.LayoutEditor.ObjectModel.Descriptions;
using DocsVision.Platform.WebClient.Helpers;

namespace ImageDesignerExtension.Extension
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
        /// Возвращает словарь ключ/описание свойства, которые будут использоваться в пользовательских контролах
        /// </summary>
        protected override Dictionary<string, PropertyDescription> GetPropertyDescriptions()
        {
            return new Dictionary<string, PropertyDescription>
            {                
                { Constants.SampleImage.Description, GetDescriptionPropertyDescription() },
                { Constants.SampleImage.ImageWidth, GetImageWidthPropertyDescription() },
                { Constants.SampleImage.ImageHeight, GetImageHeightPropertyDescription() },
                { Constants.SampleImage.Slider, GetSliderPropertyDescription() },
            };
        }

        /// <summary>
        /// Возвращает описание пользовательских контролов
        /// описание контрола SampleLink выполнено альтернативным способом и содержится в каталоге xml
        /// </summary>
        protected override List<ControlTypeDescription> GetControlTypeDescriptions()
        {
            return new List<ControlTypeDescription>
            {               
                this.GetSampleImageDescription()
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
        /// Возвращает описание контрола Image
        /// </summary>
        private ControlTypeDescription GetSampleImageDescription()
        {
            var standardCssClass = PropertyFactory.GetStandardCssClassProperty();
            standardCssClass.DefaultValue = "sample-image";

            var bindingProperty = PropertyFactory.GetBindingProperty();
            bindingProperty.GetBindingLoader = () => new CustomBindingLoader(Constants.SampleImage.Slider, Constants.SampleImage.SliderConverter);

            var sampleImage = new ControlTypeDescription(Constants.SampleImage.ClassName)
            {
                DisplayName = Resources.ControlTypes_SampleImage,
                ControlGroupDisplayName = Resources.ControlGroup_Samples,
                PropertyDescriptions =
                {
                    standardCssClass,
                    PropertyFactory.GetNameProperty(),
                    PropertyFactory.GetVisibilityProperty(),
                    PropertyFactory.GetCustomCssClassesProperty(),
                    PropertyFactory.Create(Constants.SampleImage.ImageHeight),
                    PropertyFactory.Create(Constants.SampleImage.ImageWidth),
                    PropertyFactory.Create(Constants.SampleImage.Slider),
                    PropertyFactory.Create(Constants.SampleImage.Description),
                    PropertyFactory.Create(UrlPropertyDesignerExtension.Extension.Constants.CommonProperties.Url),
                    bindingProperty,
                    PropertyFactory.GetClickEvent(),
                    PropertyFactory.GetMouseOverEvent(),
                    PropertyFactory.GetMouseOutEvent(),
                }
            };
            return sampleImage;
        }        

        private PropertyDescription GetDescriptionPropertyDescription()
        {
            return new PropertyDescription
            {
                Type = typeof(string),
                Name = Constants.SampleImage.Description,
                Category = PropertyCategoryConstants.DataCategory,
                DisplayName = Resources.ControlTypes_DescriptionProperty
            };
        }

        private PropertyDescription GetImageWidthPropertyDescription()
        {
            return new PropertyDescription
            {
                Type = typeof(int),
                Name = Constants.SampleImage.ImageWidth,
                Category = PropertyCategoryConstants.AppearanceCategory,
                DisplayName = Resources.ControlTypes_WidthProperty,
                DefaultValue = 300
            };
        }

        private PropertyDescription GetImageHeightPropertyDescription()
        {
            return new PropertyDescription
            {
                Type = typeof(int),
                Name = Constants.SampleImage.ImageHeight,
                Category = PropertyCategoryConstants.AppearanceCategory,
                DisplayName = Resources.ControlTypes_HeightProperty,
                DefaultValue = 300
            };
        }

        private PropertyDescription GetSliderPropertyDescription()
        {
            return new PropertyDescription
            {
                Type = typeof(string),
                Name = Constants.SampleImage.Slider,
                Category = PropertyCategoryConstants.DataCategory,
                DisplayName = Resources.ControlTypes_SliderProperty,
                DefaultValue = String.Empty,
                ExcludeFromIL = true,
                Editor = typeof(SliderEditor),
                CollectLocalizationKeys = args =>
                {
                    var value = (string)args.ControlInfo.GetProperty(args.PropertyDescription.Name);
                    var items = SliderModeHelper.StringToItems(value);
                    var keys = args.LocalizationKeys;
                    foreach (var item in items)
                    {
                        if (!string.IsNullOrEmpty(item.DescriptionLocalizationKey))
                            keys.Add(item.DescriptionLocalizationKey);
                    }
                },
                ChangeLocalizaionKeys = args =>
                {
                    var value = (string)args.ControlInfo.GetProperty(args.PropertyDescription.Name);
                    var items = SliderModeHelper.StringToItems(value);
                    var mapping = args.LocalizationMapping;
                    foreach (var item in items)
                    {
                        if (!string.IsNullOrEmpty(item.DescriptionLocalizationKey))
                        {
                            string newKey;
                            if (mapping.TryGetValue(item.DescriptionLocalizationKey, out newKey))
                                item.DescriptionLocalizationKey = newKey;
                        }
                    }
                    return SliderModeHelper.ItemsToString(items);
                }
            };
        }


    }
}
