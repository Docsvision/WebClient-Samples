using System;
using DocsVision.BackOffice.ObjectModel;

namespace ExtendedCardInfoServerExtension.Models
{
    public class ExtendedCardModel
    {
        public DateTime CreateDate { get; set; }

        public DateTime ChangeDate { get; set; }

        public string Description { get; set; }

        public string BarCode { get; set; }

        public void Initialize(BaseCard card)
        {
            if (card == null)
                throw new ArgumentNullException("card");

            this.CreateDate = card.CreateDate;
            this.ChangeDate = card.ChangeDate;
            this.Description = card.Description;
            this.BarCode = card.Barcode;
        }
    }
}