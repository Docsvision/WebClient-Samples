using System;
using System.Collections.Generic;
using DocsVision.Platform.Tools.LayoutEditor.DataLayer.Model;
using DocsVision.Platform.Tools.LayoutEditor.Extensibility;
using DocsVision.Platform.Tools.LayoutEditor.ObjectModel.Descriptions;

namespace CustomConditionTypesDesignerExtension
{
    /// <summary>
    /// Представляет собой пример расширения для редактора разметок
    /// </summary>
    public class CustomConditionTypesWebLayoutsDesignerExtension : WebLayoutsDesignerExtension
    {
        private readonly CustomConditionTypesProvider conditionTypesProvider;

        public override IConditionTypesProvider ConditionTypesProvider => this.conditionTypesProvider;

        /// <summary>
        /// Создаёт новый экземпляр <see cref="CustomConditionTypesWebLayoutsDesignerExtension"/>
        /// </summary>
        /// <param name="provider">Сервис-провайдер</param>
        public CustomConditionTypesWebLayoutsDesignerExtension(IServiceProvider provider)
            : base(provider)
        {
            this.conditionTypesProvider = new CustomConditionTypesProvider(serviceProvider);
        }
    }
}
