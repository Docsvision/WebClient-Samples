using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServerExtension.Feature1.Models
{
    /// <summary>
    /// Класс, определяющий параметры запроса.
    /// </summary>
    public class Action1Request
    {
        /// <summary>
        /// Параметр запроса - идентификатор документа.
        /// </summary>
        /// <remarks>Все параметры должны быть объявлены как публиные свойства с get и set.</remarks>
        public Guid DocumentId { get; set; }
    }
}
