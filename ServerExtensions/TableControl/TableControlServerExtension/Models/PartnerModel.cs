using DocsVision.BackOffice.ObjectModel;
using System;

namespace TableControlServerExtension.Models
{
    public class PartnerModel
    {
        public PartnerModel()
        {

        }

        public PartnerModel(Guid id)
        {
            this.Id = id;
        }

        public Guid Id
        {
            get;
            set;
        }

        public string Name
        {
            get;
            set;
        }

        public string Email
        {
            get;
            set;
        }

        public string Phone
        {
            get;
            set;
        }

        /// <summary>
        /// Initialize with base logic and receiving extra fields
        /// </summary>
        public void Initialize(PartnersCompany unit)
        {
            this.Name = unit.Name;
            this.Email = unit.Email;
            this.Phone = unit.Phone;
        }

    }
}