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
using DownloadFilesGroupOperationDesignerExtension.Editors;

namespace DownloadFilesGroupOperationDesignerExtension.Extension
{
    /// <summary>
    /// Представляет собой пример расширения для редактора разметок
    /// </summary>
    class DownloadFilesGroupOperationDesignerExtension : WebLayoutsDesignerExtension
    {
        /// <summary>
        /// Создаёт новый экземпляр <see cref="DownloadFilesGroupOperationDesignerExtension"/>
        /// </summary>
        /// <param name="provider">Сервис-провайдер</param>
        public DownloadFilesGroupOperationDesignerExtension(IServiceProvider provider)
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
                GetDownloadFilesGroupOperationControlTypeDescription()
            };
        }

        private ControlTypeDescription GetDownloadFilesGroupOperationControlTypeDescription()
        {
            var standardCssClassProperty = this.PropertyFactory.GetStandardCssClassProperty();
            standardCssClassProperty.DefaultValue = "system-download-files-batch-operation";

            var downloadDocumentFileMode = new PropertyDescription
            {
                Type = typeof(int),
                Name = Constants.DownloadFilesGroupOperation.DownloadDocumentFileModePropertyName,
                Category = PropertyCategoryConstants.BehaviorCategory,
                ItemsSource = typeof(DownloadDocumentFileModeSource),
                DefaultValue = (int)DownloadDocumentFileMode.All,
                DisplayName = Resources.DownloadFilesGroupOperation_DownloadDocumentFileModePropertyName
            };

            var BatchOperationRestrictionFoldersPropertyDescription = new PropertyDescription
            {
                Type = typeof(string),
                Name = Constants.DownloadFilesGroupOperation.BatchOperationRestrictionFoldersPropertyName,
                Category = PropertyCategoryConstants.AppearanceCategory,
                DisplayName = Resources.DownloadFilesGroupOperation_BatchOperationRestrictionFoldersPropertyName
            };

            var controlTypeDescription = new ControlTypeDescription(Constants.DownloadFilesGroupOperation.ControlTypeName)
            {
                DisplayName = Resources.DownloadFilesGroupOperation_ControlTypeName,
                ControlGroupDisplayName = DocsVision.BackOffice.WebLayoutsDesigner.Resource.ControlGroup_BatchOperations,
                CheckAsChild = (parentControl) =>
                {
                    // Контрол разрешено разместить либо в специальном узле контрола Links, либо в специальном контроле-контейнере
                    return parentControl.ControlTypeDescription.ControlTypeName == ControlTypeConstants.Links.BatchOperationsNodeClassName || CheckAvailableGroupControls();
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

        private bool CheckAvailableGroupControls()
        {
            var selectedLayoutService = ServiceUtil.GetService<ISelectedLayoutService>(serviceProvider);
            var layoutId = selectedLayoutService.LayoutInfo.LayoutId;
            var currentObjectContextProvider = ServiceUtil.GetService<ICurrentObjectContextProvider>(serviceProvider);
            var sessionContext = currentObjectContextProvider.GetOrCreateCurrentSessionContext();
            var solutionsService = sessionContext.ObjectContext.GetService<ISolutionsService>();
            var layout = solutionsService.GetLayout(layoutId);
            var locationNodesService = ServiceUtil.GetService<ILocationNodesService>(serviceProvider);
            var locationNode = locationNodesService.GetLocation(layout.LocationId);
            if (locationNode.Location.Id == DocsVision.WebFrame.WebClient.Constants.Locations.GridOperations.Id)
                return true;
            else return false;
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
