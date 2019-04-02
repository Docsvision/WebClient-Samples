using System;
using System.ComponentModel.Design;
using System.Web.Http;
using System.Web.Http.ExceptionHandling;
using NLog;
using NLog.Config;
using NLog.Targets;
using WebService.Services;

namespace WebService
{
    public class WebApiApplication : System.Web.HttpApplication, IServiceProvider
    {
        private readonly ServiceContainer serviceProvider = new ServiceContainer();


        public static WebApiApplication Instance { get; private set; }

        public object GetService(Type serviceType) => this.serviceProvider.GetService(serviceType);

        public T GetService<T>() => (T)this.serviceProvider.GetService(typeof(T));

        protected void Application_Start()
        {
            var config = new LoggingConfiguration();

            var fileTarget = new FileTarget("target")
            {
                FileName = "${basedir}/log.txt",
                Layout = "${longdate} ${level} ${message}  ${exception}"
            };
            config.AddTarget(fileTarget);
            config.AddRuleForAllLevels(fileTarget);
            LogManager.Configuration = config;

            serviceProvider.AddService(typeof(IDocumentService), new DocumentService());
            serviceProvider.AddService(typeof(IReportService), new ReportService());

            GlobalConfiguration.Configure(WebApiConfig.Register);
            GlobalConfiguration.Configuration.Services.Add(typeof(IExceptionLogger), new NLogExceptionLogger());
            GlobalConfiguration.Configuration.Services.Replace(typeof(IExceptionHandler), new WebApiExceptionHandler());

            Instance = this;
        }
    }
}
