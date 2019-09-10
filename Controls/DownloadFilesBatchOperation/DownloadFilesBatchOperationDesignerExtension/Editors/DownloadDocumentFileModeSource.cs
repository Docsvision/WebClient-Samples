using Xceed.Wpf.Toolkit.PropertyGrid.Attributes;

namespace DownloadFilesBatchOperationDesignerExtension.Editors
{
    class DownloadDocumentFileModeSource : IItemsSource
    {
        private static string Main = Resources.DownloadDocumentFileMode_Main;
        private static string Additional = Resources.DownloadDocumentFileMode_Additional;
        private static string All = Resources.DownloadDocumentFileMode_All;

        public DownloadDocumentFileModeSource()
        {

        }

        public ItemCollection GetValues()
        {
            ItemCollection values = new ItemCollection();
            values.Add((int)DownloadDocumentFileMode.Main, Main);
            values.Add((int)DownloadDocumentFileMode.Additional, Additional);
            values.Add((int)DownloadDocumentFileMode.All, All);

            return values;
        }
    }
}
