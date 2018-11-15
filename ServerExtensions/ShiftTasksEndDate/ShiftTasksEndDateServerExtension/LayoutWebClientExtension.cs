using ShiftTasksEndDateServerExtension.Controllers;
using ShiftTasksEndDateServerExtension.Services;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Reflection;
using System.Resources;
using System.Web.Mvc;
using DocsVision.WebClient.Extensibility;

namespace ShiftTasksEndDateServerExtension
{
    /// <summary>
    /// Задаёт описание расширения для WebClient, которое задано в текущей сборке
    /// </summary>
    public class LayoutWebClientExtension : WebClientExtension
    {
        /// <summary>
        /// Создаёт новый экземпляр <see cref="LayoutWebClientExtension" />
        /// </summary>
        /// <param name="serviceProvider">Сервис-провайдер</param>
        public LayoutWebClientExtension(IServiceProvider serviceProvider)
            : base(serviceProvider)
        {
        }

        /// <summary>
        /// Получить название расширения
        /// </summary>
        public override string ExtensionName
        {
            get { return Assembly.GetAssembly(typeof(LayoutWebClientExtension)).GetName().Name; }
        }

        /// <summary>
        /// Получить пространство имён расширения
        /// </summary>
        public override string Namespace
        {
            get { return Constants.LayoutNamespace; }
        }

        /// <summary>
        /// Получить версию расширения
        /// </summary>
        public override Version ExtensionVersion
        {
            get { return new Version(FileVersionInfo.GetVersionInfo(Assembly.GetExecutingAssembly().Location).FileVersion); }
        }

        #region WebClientExtension Overrides


        /// <summary>
        /// Получить зарегистрированные активаторы сервиса
        /// </summary>
        /// <param name="serviceProvider">Сервис-провайдер</param>
        /// <returns>Тип сервиса/Маппинги активатора</returns>
        protected override Dictionary<Type, Func<object>> GetServiceActivators(IServiceProvider serviceProvider)
        {
            return new Dictionary<Type, Func<object>>
            {
                 { typeof(IShiftTasksEndDateService), () => new ShiftTasksEndDateService() }
            };
        }

        /// <summary>
        /// Получить зарегистрированные активаторы MVC-контроллера
        /// </summary>
        /// <param name="serviceProvider">Сервис-провайдер</param>
        /// <returns>Тип MVC-контроллера/Маппинги активатора</returns>
        protected override Dictionary<Type, Func<IController>> GetControllerActivators(IServiceProvider serviceProvider)
        {
            return new Dictionary<Type, Func<IController>>
            {
                { typeof(AdvancedDocumentController), () => new AdvancedDocumentController(serviceProvider) }
            };
        }

        /// <summary>
        /// Получить менеджеры ресурсов для расширения разметки
        /// </summary>
        /// <returns></returns>
        protected override List<ResourceManager> GetLayoutExtensionResourceManagers()
        {
            return new List<ResourceManager>
            {
                { Resources.ResourceManager }
            };
        }


        /// <summary>
        /// Получить зарегистрированное расширение навигатора
        /// </summary>
        /// <returns>Зарегистрированное расширение навигатора</returns>
        protected override WebClientNavigatorExtension GetNavigatorExtension()
        {
            var navigatorExtensionInitInfo = new WebClientNavigatorExtensionInitInfo
            {
                //Здесь указание бандлов не требуется, т.к. Web-client автоматически создает бандлы из каталогов в каталоге Content/Extensions

                //Scripts = (ScriptBundle)(new ScriptBundle("~/Content/Extensions/ShiftTasksEndDate/Scripts/Bundle")
                //.IncludeDirectory("~/Content/Extensions/ShiftTasksEndDate/Scripts", "*.js", true)),
                //StyleSheets = (StyleBundle)(new StyleBundle("~/Content/Extensions/ShiftTasksEndDate/Styles/Bundle")
                //.IncludeDirectory("~/Content/Extensions/ShiftTasksEndDate/Styles", "*.css", true)),
                ExtensionName = ExtensionName,
                ExtensionVersion = ExtensionVersion
            };

            return new WebClientNavigatorExtension(navigatorExtensionInitInfo);
        }

        #endregion
    }
}