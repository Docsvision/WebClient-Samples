using DocsVision.Platform.WebClient;
using System;
using System.Windows;

namespace RefCasesDesignerExtension.Editors
{

    public partial class SectionsTree : Window
    {
        public string SelectedNodeText = "";
        public Guid SelectedNodeID = Guid.Empty;
        private RefCasesUtils refCasesUtils;

        // Для формирования дерева Разделов нужно получить данные их Справочника номенклатуры дел 5,
        //   для этого объявляем необходимость передачи контекста сессии в конструкторе класса
        public SectionsTree(SessionContext sessionContext)
        {
            InitializeComponent();
            refCasesUtils = new RefCasesUtils(sessionContext);

            // Получаем список лет из Справочника номенклатуры дел 5 
            Years.ItemsSource = refCasesUtils.GetYears();
        }

        // При выборе Года формируем дерево Разделов для данного года
        private void Years_SelectionChanged(object sender, System.Windows.Controls.SelectionChangedEventArgs e)
        {
            if (Years.SelectedIndex == -1 || !(Years.SelectedItem is Year))
                return;

            Year selectedYear = Years.SelectedItem as Year;

            // Получаем список Разделов из Справочника номенклатуры дел 5
            Sections.ItemsSource = refCasesUtils.GetSections(selectedYear.ID);
        }

        // Обработка нажатия кнопки сохранения выбора
        private void Accept_Click(object sender, RoutedEventArgs e)
        {
            if (Sections.SelectedItem == null)
                return;
            var selectedNode = Sections.SelectedItem as Node;
            var selectedYear = Years.SelectedItem as Year;

            this.SelectedNodeText = string.Format("{0}. {1}", selectedYear.Value, selectedNode.Name);
            this.SelectedNodeID = selectedNode.ID;

            this.DialogResult = true;
            this.Close();
        }


        // Обработка нажатия отмены
        private void Cancel_Click(object sender, RoutedEventArgs e)
        {
            this.Close();
        }
    }
}
