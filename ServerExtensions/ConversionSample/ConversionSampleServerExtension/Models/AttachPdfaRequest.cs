using System;

namespace DocsVision.ConversionSampleServerExtension.Models
{
    /// <summary>
    /// Задаёт описание модели тела запроса ConversionFile\AttachPdfa.
    /// </summary>
    public class AttachPdfaRequest
	{ 
        /// <summary>
        /// Задаёт и получает идентификатор документа.
        /// </summary>
		public Guid DocumentId { get; set; }

        /// <summary>
        /// Задаёт и получает идентификатор файла.
        /// </summary>
		public Guid FileId { get; set; }
	}
}
