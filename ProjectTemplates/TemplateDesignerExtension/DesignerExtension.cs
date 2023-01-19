using System;
using System.Collections.Generic;
using System.Resources;
using DocsVision.Platform.Tools.LayoutEditor.DataLayer.Model;
using DocsVision.Platform.Tools.LayoutEditor.Extensibility;
using DocsVision.Platform.Tools.LayoutEditor.ObjectModel.Descriptions;

namespace TemplateDesignerExtension.Extension
{
    /// <summary>
    /// Представляет собой пример расширения для редактора разметок
    /// </summary>
    class TemplateDesignerExtension : WebLayoutsDesignerExtension
    {
        /// <summary>
        /// Создаёт новый экземпляр <see cref="TemplateDesignerExtension"/>
        /// </summary>
        /// <param name="provider">Сервис-провайдер</param>
        public TemplateDesignerExtension(IServiceProvider provider)
            : base(provider)
        {
        }

        /// <summary>
        /// Возвращает словарь ключ/описание свойства, которые будут использоваться в пользовательских контролах
        /// </summary>
        protected override Dictionary<string, PropertyDescription> GetPropertyDescriptions()
        {
            return base.GetPropertyDescriptions();
        }

        /// <summary>
        /// Возвращает описание пользовательских контролов
        /// описание контрола PartnerLink выполнено альтернативным способом и содержится в каталоге xml
        /// </summary>
        protected override List<ControlTypeDescription> GetControlTypeDescriptions()
        {
            return base.GetControlTypeDescriptions();
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
        /// Возвращает список условий выбора разметок этого расширения
        /// </summary>
        public override List<ModeConditionTypeModel> GetModeConditionTypes(Location location)
        {
            return base.GetModeConditionTypes(location);
        }

        /// <summary>
        /// Возвращает список доступных операций для контрола (доступность контрола в конкретной разметке, добавление/удаление/перемещение и т.д. контрола в разметке)
        /// </summary>
        /// <returns></returns>
        protected override Dictionary<string, Func<AllowedOperationsFlag>> GetAllowedOperations()
        {
            return base.GetAllowedOperations();
        }

        /// <summary>
        /// Возвращает список компонентов, содержащих графическое представление для отображения ЭУ
        /// </summary>
        /// <returns></returns>
        protected override Dictionary<string, Type> GetVisualizers()
        {
            return base.GetVisualizers();
        }

        /// <summary>
        /// Возвращает список редакторов значений свойств элементов управления
        /// </summary>
        /// <returns></returns>
        protected override Dictionary<string, Type> GetEditors()
        {
            return base.GetEditors();
        }

        /// <summary>
        /// Возвращает список резолверов элементов управления
        /// </summary>
        /// <returns></returns>
        protected override List<DataSourceResolverDescription> GetDataSourceResolverDescriptions()
        {
            return base.GetDataSourceResolverDescriptions();
        }
    }
}
