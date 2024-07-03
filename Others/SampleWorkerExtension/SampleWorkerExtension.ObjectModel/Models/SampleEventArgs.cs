using System;

namespace SampleWorkerExtension.ObjectModel.Models
{
    /// <summary>
    /// Provides data for <see cref="SampleEventHandlerService"/> events.
    /// </summary>
    [Serializable]
    public class SampleEventArgs : EventServiceEventArgs
    {
        /// <summary>
        /// Gets ot sets some Data
        /// </summary>
        public string Data { get; set; }

        /// <summary>
        /// Gets or sets some Id
        /// </summary>
        public Guid Id { get; set; }
    }
}
