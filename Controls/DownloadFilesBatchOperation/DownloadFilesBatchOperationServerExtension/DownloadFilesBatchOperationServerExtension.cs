using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Reflection;
using System.Resources;
using System.Web.Mvc;
using System.Web.Http.Controllers;
using DocsVision.BackOffice.WebClient.Services;
using DocsVision.WebClient.Extensibility;
using DocsVision.WebClientLibrary.ObjectModel.Services.LayoutModel;
using DocsVision.WebClientLibrary.ObjectModel.Services.BindingResolvers;
using DocsVision.WebClientLibrary.ObjectModel.Services.BindingConverters;
using DownloadFilesBatchOperationServerExtension.Controllers;

namespace DownloadFilesBatchOperationServerExtension
{
    /// <summary>
    /// Задаёт описание расширения для WebClient, которое задано в текущей сборке
    /// </summary>
    public class DownloadFilesBatchOperationServerExtension : WebClientExtension
    {
        /// <summary>
        /// Создаёт новый экземпляр <see cref="DownloadFilesBatchOperationServerExtension" />
        /// </summary>
        /// <param name="serviceProvider">Сервис-провайдер</param>
        public DownloadFilesBatchOperationServerExtension(IServiceProvider serviceProvider)
            : base(serviceProvider)
        {
        }

        /// <summary>
        /// Получить название расширения
        /// </summary>
        public override string ExtensionName
        {
            get { return Assembly.GetAssembly(typeof(DownloadFilesBatchOperationServerExtension)).GetName().Name; }
        }

        /// <summary>
        /// Получить пространство имён расширения
        /// </summary>
        public override string Namespace
        {
            get { return Constants.Namespace; }
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
        /// Gets registered service activators
        /// </summary>
        /// <param name="serviceProvider">service provider</param>
        /// <returns>service type/activator mappings</returns>
        protected override Dictionary<Type, Func<object>> GetServiceActivators(IServiceProvider serviceProvider)
        {
            return new Dictionary<Type, Func<object>>
            {

            };
        }

        /// <summary>
        /// Gets registered MVC controller activators
        /// </summary>
        /// <param name="serviceProvider">service provider</param>
        /// <returns>MVC controller type/activator mappings</returns>
        protected override Dictionary<Type, Func<IController>> GetControllerActivators(IServiceProvider serviceProvider)
        {
            return new Dictionary<Type, Func<IController>>
            {

            };
        }

        /// <summary>
        /// Gets registered WebApi controller activators
        /// </summary>
        /// <param name="serviceProvider">service provider</param>
        /// <returns>WebApi controller type/activator mappings</returns>
        protected override Dictionary<Type, Func<IHttpController>> GetApiControllerActivators(IServiceProvider serviceProvider)
        {
            return new Dictionary<Type, Func<IHttpController>>
            {
                { typeof(DownloadFilesBatchOperationController), () => new DownloadFilesBatchOperationController(serviceProvider) }
            };
        }


        /// <summary>
        /// Gets resource managers for layout extension
        /// </summary>
        /// <returns></returns>
        protected override List<ResourceManager> GetLayoutExtensionResourceManagers()
        {
            return new List<ResourceManager>
            {

            };
        }

        /// <summary>
        /// Gets binding converters
        /// </summary>
        /// <returns>a list of binding converters</returns>
        protected override List<IBindingConverter> GetBindingConverters()
        {
            return new List<IBindingConverter>
            {

            };
        }

        /// <summary>
        /// Gets binding resolvers
        /// </summary>
        /// <returns>a list of binding resolvers</returns>
        protected override List<IBindingResolver> GetBindingResolvers()
        {
            return new List<IBindingResolver>
            {

            };
        }

        /// <summary>
        /// Gets control resolvers
        /// </summary>
        /// <returns>a list of control resolvers</returns>
        protected override List<IControlResolver> GetControlResolvers()
        {
            return new List<IControlResolver>
            {

            };
        }

        /// <summary>
        /// Gets property resolvers
        /// </summary>
        /// <returns>a list of property resolvers</returns>
        protected override List<IPropertyResolver> GetPropertyResolvers()
        {
            return new List<IPropertyResolver>
            {

            };
        }

        /// <summary>
        /// Gets card factories
        /// </summary>
        /// <returns>a dictionaty of card factories</returns>
        protected override Dictionary<Guid, Func<ICardFactory>> GetCardFactories()
        {
            return new Dictionary<Guid, Func<ICardFactory>>
            {

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