using System;

namespace WebService.Interfaces.Models
{
    public class ContractModel
    {
        public Guid Id { get; set; }
        public DateTime? ContractDate { get; set; }
        public Decimal? ContractSum { get; set; }
        public ContractCurrencyMode? ContractCurrency { get; set; }
    }
}