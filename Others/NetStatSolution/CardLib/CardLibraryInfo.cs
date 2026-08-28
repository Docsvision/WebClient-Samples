using System;
using System.Runtime.InteropServices;
using Microsoft.VisualBasic;

namespace NetstatSolutionCardLib
{
    [ComVisible(true)]
    [Guid("F0BA1E06-78DC-433C-ADE0-0A1F4BBF0092")]
	[ClassInterface(ClassInterfaceType.None)]
	public class CardLibraryInfo : DocsVision.Platform.ObjectManager.Metadata.CardLibraryInfo
    {
        private static readonly Guid NetStatSolutionCardId = new Guid("CCCA40C0-5FA4-4878-B0DA-34E67E167BEA");

        public CardLibraryInfo()
		{

		}

        public override byte[] GetIconData()
        {
            return Resources.NetstatSolutionCardLibIcon;
        }

        public override byte[] GetCardIconData(Guid cardTypeId)
        {
            if (cardTypeId == NetStatSolutionCardId)
                return Resources.NetstatSolutionCardIcon;

            return base.GetCardIconData(cardTypeId);
        }

        protected override string GetLibraryDefinition()
        {
            return Resources.NetstatSolutionCardLib;
        }

        public override string GetCardDefinition(Guid cardTypeId)
        {
            if (cardTypeId == NetStatSolutionCardId)
                return Resources.NetstatSolutionCard;

            return base.GetCardDefinition(cardTypeId);
        }
    }
}
