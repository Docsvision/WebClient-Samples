using System;
using System.Collections.Generic;

namespace AcquaintancePanelServerExtension.Models
{
    public class StartProcessRequestModel
    {
        public Guid CardId { get; set; }

        public List<Guid> EmployeeIds { get; set; }

        public DateTime? EndDate { get; set; }
    }
}