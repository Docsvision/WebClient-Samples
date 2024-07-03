using DocsVision.Platform.ObjectModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Serialization;
using System.Xml;

namespace SampleWorkerExtension.ObjectModel.Services
{
    public abstract class EventBaseService : ContextService
    {
        protected string SerializeEventArgs<T>(T eventArgs)
        {
            if (eventArgs == null)
                return null;

            XmlSerializer xmlSerializer = new XmlSerializer(typeof(T));

            StringBuilder sb = new StringBuilder();
            using (XmlWriter writer = XmlWriter.Create(sb))
            {
                xmlSerializer.Serialize(writer, eventArgs);
            }

            return sb.ToString();

        }

        protected string SerializeEventArgs(object eventArgs)
        {
            if (eventArgs == null)
                return null;

            XmlSerializer xmlSerializer = new XmlSerializer(eventArgs.GetType());

            StringBuilder sb = new StringBuilder();
            using (XmlWriter writer = XmlWriter.Create(sb))
            {
                xmlSerializer.Serialize(writer, eventArgs);
            }

            return sb.ToString();

        }

        protected T DeserializeEventArgs<T>(string serialized)
        {
            return (T)DeserializeEventArgs(typeof(T), serialized);
        }

        protected object DeserializeEventArgs(Type eventArgsType, string serialized)
        {
            if (string.IsNullOrEmpty(serialized))
                return null;

            XmlSerializer xmlSerializer = new XmlSerializer(eventArgsType);

            using (XmlReader reader = XmlReader.Create(new System.IO.StringReader(serialized)))
                return xmlSerializer.Deserialize(reader);
        }
    }
}
