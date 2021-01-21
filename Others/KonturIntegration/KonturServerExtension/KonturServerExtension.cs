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
using Kontur.Controllers;
using Kontur.Services;
using DocsVision.BackOffice.CardLib.CardDefs;
using DocsVision.Platform.WebClient.WebDav;
using Autofac;
using DocsVision.Platform.WebClient.Configuration;

namespace Kontur
{
    /// <summary>
    /// Задаёт описание расширения для WebClient, которое задано в текущей сборке
    /// </summary>
    public class KonturServerExtension : WebClientExtension
    {
        /// <summary>
        /// Создаёт новый экземпляр <see cref="KonturServerExtension" />
        /// </summary>
        /// <param name="serviceProvider">Сервис-провайдер</param>
        public KonturServerExtension(IServiceProvider serviceProvider)
            : base(serviceProvider)
        {
        }

        /// <summary>
        /// Получить название расширения
        /// </summary>
        public override string ExtensionName
        {
            get { return Assembly.GetAssembly(typeof(KonturServerExtension)).GetName().Name; }
        }

        /// <summary>
        /// Получить версию расширения
        /// </summary>
        public override Version ExtensionVersion
        {
            get { return new Version(FileVersionInfo.GetVersionInfo(Assembly.GetExecutingAssembly().Location).FileVersion); }
        }

        #region WebClientExtension Overrides

        public override void InitializeContainer(global::Autofac.ContainerBuilder containerBuilder)
        {
            containerBuilder.RegisterType<KonturRequestService>().As<IKonturRequestService>().SingleInstance();
        }


        public override void OnLoad(ILifetimeScope lifetimeScope)
        {
            // Регистрируем настройку в секции WebClient в web.config Web-клиента
            var configurationProvider = lifetimeScope.Resolve<IConfigurationProvider>();
            configurationProvider.RegisterSetting(Kontur.Constants.KonturKeySetting,
                    SettingConstants.WebClient.SettingGroup,
                    new SettingOptions { DefaultValue = "" });
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

        #endregion
    }
}