using System;
using System.Collections.Generic;

namespace WebService.Interfaces.Models
{
    public class DocumentModel
    {
        public Guid? Id { get; set; }
        public Guid? KindId { get; set; }
        public string? Name { get; set; }
        public DateTime? RegDate { get; set; }
        public Guid? Registrar { get; set; }
        public ContractModel? Contract { get; set; }
        public List<FileModel>? Files { get; set; }

        public override string ToString()
        {
            return $@"{nameof(Id)} : {Id}
{nameof(KindId)} : {KindId}
{nameof(Name)} : {Name}
{nameof(RegDate)} : {RegDate}
{nameof(Registrar)} : {Registrar}
{nameof(Contract)} : {Contract}
{nameof(Files)} : {Files}";
        }

    }
}