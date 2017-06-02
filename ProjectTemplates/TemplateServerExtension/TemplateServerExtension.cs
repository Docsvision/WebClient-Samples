using Docsvision.WebClient.Extensibility;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Reflection;
using System.Web.Optimization;
using System.Resources;
using Docsvision.Backoffice.Client.Cards.AdvancedLayouts.BindingConverters;
using System.Web.Mvc;
using System.Web.Http.Controllers;
using Docsvision.Backoffice.Client.Cards.AdvancedLayouts.BindingResolvers;
using Docsvision.Backoffice.Client.Cards.AdvancedLayouts.LayoutModel;
using DocsVision.BackOffice.WebClient.Services;

namespace TemplateServerExtension
{
    /// <summary>
    /// Defines description of the WebClient extension defined in current assembly
    /// </summary>
    public class TemplateServerExtension : WebClientExtension
    {
        /// <summary>
        /// Creates new instance of <see cref="TemplateServerExtension" />
        /// </summary>
        /// <param name="serviceProvider">Service provider</param>
        public TemplateServerExtension(IServiceProvider serviceProvider)
            : base(serviceProvider)
        {
        }

        /// <summary>
        /// Get extenstion name
        /// </summary>
        public override string ExtensionName
        {
            get { return Assembly.GetAssembly(typeof(TemplateServerExtension)).GetName().Name; }
        }

        /// <summary>
        /// Get extension namespace
        /// </summary>
        public override string Namespace
        {
            get { return Constants.Namespace; }
        }

        /// <summary>
        /// Get extension version
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

            };
        }

        /// <summary>
        /// Gets registered model binders
        /// </summary>      
        protected override Dictionary<Type, Func<IModelBinder>> GetModelBinders()
        {
            return base.GetModelBinders();
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

        #endregion
    }
}