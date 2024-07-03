using Docsvision.WorkerService.Interfaces;

namespace SampleWorkerExtension.WorkerService
{
        internal class MessageDescriptionImpl : IMessageDescription
        {
            public string TypeIdDescription { get; set; }

            public string SubTypeIdDescription { get; set; }

            public string TargetIdDescription { get; set; }

            public string SourceIdDescription { get; set; }

            public string DataDescription { get; set; }

            public string MessageDescription { get; set; }
        }
}
