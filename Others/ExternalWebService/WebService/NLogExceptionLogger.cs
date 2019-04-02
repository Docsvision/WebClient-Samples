using System.Net.Http;
using System.Text;
using System.Web.Http.ExceptionHandling;
using NLog;

namespace WebService
{
    public class NLogExceptionLogger : ExceptionLogger
    {
        private static readonly Logger Logger = LogManager.GetCurrentClassLogger();
        public override void Log(ExceptionLoggerContext context)
        {
            Logger.Log(LogLevel.Error, context.Exception, RequestToString(context.Request));
        }

        private static string RequestToString(HttpRequestMessage request)
        {
            var message = new StringBuilder();
            if (request.Method != null)
                message.Append(request.Method);

            if (request.RequestUri != null)
                message.Append(" ").Append(request.RequestUri);

            return message.ToString();
        }
    }
}