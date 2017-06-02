using TableControlServerExtension.Controllers;
using TableControlServerExtension.Services;
using Docsvision.WebClient.Extensibility;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Reflection;
using System.Web.Mvc;
using System.Web.Optimization;

namespace TableControlServerExtension
{
    /// <summary>
    /// Defines description of the WebClient extension defined in current assembly
    /// </summary>
    public class LayoutWebClientExtension : WebClientExtension
    {
        /// <summary>
        /// Creates new instance of <see cref="LayoutWebClientExtension" />
        /// </summary>
        /// <param name="serviceProvider">Service provider</param>
        public LayoutWebClientExtension(IServiceProvider serviceProvider)
            : base(serviceProvider)
        {
        }

        /// <summary>
        /// Get extenstion name
        /// </summary>
        public override string ExtensionName
        {
            get { return Assembly.GetAssembly(typeof(LayoutWebClientExtension)).GetName().Name; }
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
                { typeof(ISamplePartnersService), () => new SamplePartnersService(serviceProvider)},
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
                 { typeof(SamplePartnersController), () => new SamplePartnersController(serviceProvider) },
            };
        }

        /// <summary>
        /// Gets registered navigator extension
        /// </summary>
        /// <returns>registered navigator extension</returns>
        protected override WebClientNavigatorExtension GetNavigatorExtension()
        {
            var navigatorExtensionInitInfo = new WebClientNavigatorExtensionInitInfo
            {
                //Здесь указание бандлов не требуется, т.к. Web-client автоматически создает бандлы из каталогов в каталоге Content/Extensions
                
                //Scripts = (ScriptBundle)(new ScriptBundle("~/Content/Extensions/LayoutTableControl/Scripts/Bundle")
                //.IncludeDirectory("~/Content/Extensions/LayoutTableControl/Scripts", "*.js", true)),
                //StyleSheets = (StyleBundle)(new StyleBundle("~/Content/Extensions/LayoutTableControl/Styles/Bundle")
                //.IncludeDirectory("~/Content/Extensions/LayoutTableControl/Styles", "*.css", true)),
                ExtensionName = ExtensionName,
                ExtensionVersion = ExtensionVersion
            };

            return new WebClientNavigatorExtension(navigatorExtensionInitInfo);
        }

        #endregion
    }
}