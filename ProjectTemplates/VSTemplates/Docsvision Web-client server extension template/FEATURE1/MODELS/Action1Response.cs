using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace $safeprojectname$.Feature1.Models
{
    /// <summary>
    /// Модель ответа сервера.
    /// </summary>
    public class Action1Response
    {
        /// <summary>
        /// Идентификатор обработанного документа.
        /// </summary>
        public Guid DocumentId { get; set; }

        /// <summary>
        /// Новое имя документа.
        /// </summary>
        public string Name { get; set; }
    }
}
