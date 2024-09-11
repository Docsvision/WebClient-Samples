using System;
using System.Net.Http;
using DocsVision.Platform.WebClient;
using DocsVision.Platform.WebClient.Models;

namespace DocsVision.ConversionSampleServerExtension.Services
{
	public interface IConversionSampleService
	{
        /// <summary>
        /// Проверяет, можно ли преобразовать файл с указанным идентификатором.
        /// </summary>
        /// <param name="sessionContext">>Контекст сессии.</param>
        /// <param name="fileId">Идентификатор файла.</param>
        CommonResponse CanConvert(SessionContext sessionContext, Guid fileId);

        /// <summary>
        /// Конвертирует файл в PDF/A формат и прикладывает его к документу как основной файл.
        /// </summary>
        /// <param name="sessionContext">Контекст сессии.</param>
        /// <param name="documentId">Идентификатор документа.</param>
        /// <param name="fileId">Идентификатор файла.</param>
        CommonResponse AttachPdfa(SessionContext sessionContext, Guid documentId, Guid fileId);
	}
}