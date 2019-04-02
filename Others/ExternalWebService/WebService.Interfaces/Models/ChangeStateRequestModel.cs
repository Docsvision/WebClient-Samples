using System;

namespace WebService.Interfaces.Models
{
    public class ChangeStateRequestModel
    {
        public Guid CardId { get; set; }
        public Guid OperationId { get; set; }
    }
}
