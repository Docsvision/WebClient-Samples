using System;
using System.Collections.Generic;
using System.Resources;
using DocsVision.BackOffice.WebLayoutsDesigner;
using DocsVision.Platform.Tools.LayoutEditor;
using DocsVision.Platform.Tools.LayoutEditor.Extensibility;
using DocsVision.Platform.Tools.LayoutEditor.Helpers;
using DocsVision.Platform.Tools.LayoutEditor.Infrostructure;
using DocsVision.Platform.Tools.LayoutEditor.ObjectModel.Descriptions;
using DocsVision.Platform.Tools.LayoutEditor.Solutions.Interfaces;
using DocsVision.Platform.WebClient;
using DocsVision.WebClientLibrary.ObjectModel.Services;
using DownloadFilesBatchOperationSampleDesignerExtension.Editors;
using Resource = DocsVision.BackOffice.WebLayoutsDesigner.Resource;

[assembly: System.Runtime.Versioning.SupportedOSPlatform("windows")]
namespace DownloadFilesBatchOperationSampleDesignerExtension.Extension
{
    /// <summary>
    /// Представляет собой пример расширения для редактора разметок
    /// </summary>
    class DownloadFilesBatchOperationSampleDesignerExtension : WebLayoutsDesignerExtension
    {
        /// <summary>
        /// Создаёт новый экземпляр <see cref="DownloadFilesBatchOperationSampleDesignerExtension"/>
        /// </summary>
        /// <param name="provider">Сервис-провайдер</param>
        public DownloadFilesBatchOperationSampleDesignerExtension(IServiceProvider provider)
            : base(provider)
        {
        }

        /// <summary>
        /// Возвращает описание пользовательских контролов
        /// описание контрола PartnerLink выполнено альтернативным способом и содержится в каталоге xml
        /// </summary>
        protected override List<ControlTypeDescription> GetControlTypeDescriptions()
        {
            return new List<ControlTypeDescription>
            {
                GetDownloadFilesBatchOperationSampleControlTypeDescription()
            };
        }

        private ControlTypeDescription GetDownloadFilesBatchOperationSampleControlTypeDescription()
        {
            var standardCssClassProperty = this.PropertyFactory.GetStandardCssClassProperty();
            standardCssClassProperty.DefaultValue = "system-download-files-batch-operation";

            var downloadDocumentFileMode = new PropertyDescription
            {
                Type = typeof(int),
                Name = Constants.DownloadFilesBatchOperationSample.DownloadDocumentFileModePropertyName,
                Category = PropertyCategoryConstants.BehaviorCategory,
                ItemsSource = typeof(DownloadDocumentFileModeSource),
                DefaultValue = (int)DownloadDocumentFileMode.All,
                DisplayName = Resources.DownloadFilesBatchOperationSample_DownloadDocumentFileModePropertyName
            };

            var BatchOperationRestrictionFoldersPropertyDescription = new PropertyDescription
            {
                Type = typeof(string),
                Name = Constants.DownloadFilesBatchOperationSample.BatchOperationRestrictionFoldersPropertyName,
                Category = PropertyCategoryConstants.AppearanceCategory,
                DisplayName = Resources.DownloadFilesBatchOperationSample_BatchOperationRestrictionFoldersPropertyName
            };

            var controlTypeDescription = new ControlTypeDescription(Constants.DownloadFilesBatchOperationSample.ControlTypeName)
            {
                DisplayName = Resources.DownloadFilesBatchOperationSample_ControlTypeName,
                ControlGroupDisplayName = Resources.ControlGroup_Samples,
                CheckAsChild = (parentControl) =>
                {
                    // Контрол разрешено разместить либо в специальном контроле-контейнере
                    return parentControl.ControlTypeDescription.ControlTypeName.Contains(
                        DocsVision.Platform.WebLayoutsDesigner.ControlTypeConstants.Batch.BatchOperationsNodeClassName);
                },
                PropertyDescriptions = {
                        standardCssClassProperty,
                        downloadDocumentFileMode,
                        BatchOperationRestrictionFoldersPropertyDescription,
                        this.PropertyFactory.GetVisibilityProperty(),
                        this.PropertyFactory.GetNameProperty(),
                        this.PropertyFactory.GetCustomCssClassesProperty(),
                        this.PropertyFactory.GetButtonTextProperty(),
                        this.PropertyFactory.GetClickEvent(),
                        this.PropertyFactory.GetMouseOutEvent(),
                        this.PropertyFactory.GetMouseOverEvent(),
                    }
            };
            return controlTypeDescription;
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
    }
}
