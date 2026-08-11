using System.Runtime.InteropServices;

namespace NetstatSolutionCardLib
{
    [ComVisible(true)]
    [Guid("F0BA1E06-78DC-433C-ADE0-0A1F4BBF0092")]
	[ClassInterface(ClassInterfaceType.None)]
	public class CardLibraryInfo : DocsVision.Platform.ObjectManager.Metadata.CardLibraryInfo
    {
		public CardLibraryInfo()
		{

		}

        protected override string GetLibraryDefinition()
        {
            return Resources.NetstatSolutionCardLib;
        }
    }
}
