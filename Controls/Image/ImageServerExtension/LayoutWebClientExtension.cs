using Docsvision.WebClient.Extensibility;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Reflection;
using System.Web.Optimization;
using System.Resources;
using Docsvision.Backoffice.Client.Cards.AdvancedLayouts.BindingConverters;
using ImageServerExtension.AdvancedLayouts.BindingConverters;

namespace ImageServerExtension
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
        /// Gets registered navigator extension
        /// </summary>
        /// <returns>registered navigator extension</returns>
        protected override WebClientNavigatorExtension GetNavigatorExtension()
        {
            var navigatorExtensionInitInfo = new WebClientNavigatorExtensionInitInfo
            {
                //Здесь указание бандлов не требуется, т.к. Web-client автоматически создает бандлы из каталогов в каталоге Content/Extensions
                
                //Scripts = (ScriptBundle)(new ScriptBundle("~/Content/Extensions/ImageSample/Scripts/Bundle")
                //.IncludeDirectory("~/Content/Extensions/ImageSample/Scripts", "*.js", true)),
                //StyleSheets = (StyleBundle)(new StyleBundle("~/Content/Extensions/ImageSample/Styles/Bundle")
                //.IncludeDirectory("~/Content/Extensions/ImageSample/Styles", "*.css", true)),
                ExtensionName = ExtensionName,
                ExtensionVersion = ExtensionVersion
            };

            return new WebClientNavigatorExtension(navigatorExtensionInitInfo);
        }

        /// <summary>
        /// Gets binding converters
        /// </summary>
        /// <returns>a list of binding converters</returns>
        protected override List<IBindingConverter> GetBindingConverters()
        {
            return new List<IBindingConverter>
            {
                new SliderConverter(this.ServiceProvider),
            };
        }

        #endregion
    }
}