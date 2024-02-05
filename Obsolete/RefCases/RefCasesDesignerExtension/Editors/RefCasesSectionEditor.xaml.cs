using DocsVision.Platform.Tools.LayoutEditor;
using DocsVision.Platform.Tools.LayoutEditor.PropertiesEditor;
using DocsVision.Platform.WebClient;
using System;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using Xceed.Wpf.Toolkit.PropertyGrid;
using Xceed.Wpf.Toolkit.PropertyGrid.Editors;

namespace RefCasesDesignerExtension.Editors
{
    public partial class RefCasesSectionEditor : UserControl, ITypeEditor
    {
        // Объвляем свойства зависимости для связыванием со значением настройки (идентификатор Раздела) и отображаемым значением 
        public static readonly DependencyProperty ValueProperty = DependencyProperty.Register("Value", typeof(Guid), typeof(RefCasesSectionEditor),
        new FrameworkPropertyMetadata(Guid.Empty, FrameworkPropertyMetadataOptions.BindsTwoWayByDefault));
        public static readonly DependencyProperty TextProperty = DependencyProperty.Register("Text", typeof(string), typeof(RefCasesSectionEditor), new FrameworkPropertyMetadata(string.Empty));

        // Идентификатор выбранного Раздела справочника - является значение настройки
        public Guid Value
        {
            get { return (Guid)GetValue(ValueProperty); }
            set { SetValue(ValueProperty, value); }
        }

        // Название выбранного Раздела справочника, отображаемое в строке настройки
        public string Text
        {
            get { return (string)GetValue(TextProperty); }
            set { 
                SetValue(TextProperty, value);
                Clear.Visibility = value != ""? Visibility.Visible: Visibility.Collapsed; // Кнопка очистки значения
            }
        }

        private IServiceProvider serviceProvider;
        private SessionContext sessionContext;

        public RefCasesSectionEditor()
        {
            InitializeComponent();
        }

        // Реализация метода ITypeEditor.ResolveEditor
        public FrameworkElement ResolveEditor(PropertyItem propertyItem)
        {
            var bindingObject = (IControlPropertiesObject)propertyItem.Instance;
            
            // Получаем поставщика сервисов из элемента управления
            this.serviceProvider = bindingObject.ServiceProvider;
            var currentObjectContextProvider = this.serviceProvider.GetService(typeof(ICurrentObjectContextProvider)) as ICurrentObjectContextProvider;
            this.sessionContext = currentObjectContextProvider.GetOrCreateCurrentSessionContext();

            // Связываем значение компонента с ValueProperty
            Binding binding = new Binding("Value");
            binding.Source = propertyItem;
            binding.Mode = propertyItem.IsReadOnly ? BindingMode.OneWay : BindingMode.TwoWay;
            BindingOperations.SetBinding(this, RefCasesSectionEditor.ValueProperty, binding);


            // Получаем отображаемое значение выбранного Раздела при закрузке элемента
            if (this.Value != Guid.Empty)
                this.Text = new RefCasesUtils(sessionContext).GetSectionTitle(this.Value);

            return this;
        }

        // Открывает форму для выбора Раздела
        private void ShowSections_Click(object sender, RoutedEventArgs e)
        {
            var sectionTree = new SectionsTree(sessionContext);
            if (sectionTree.ShowDialog() == true)
            {
                this.Value = sectionTree.SelectedNodeID;
                this.Text = sectionTree.SelectedNodeText;
            }
        }

        // Очищает значение настройки
        private void Clear_Click(object sender, RoutedEventArgs e)
        {
            this.Value = Guid.Empty;
            this.Text = "";
        }
    }
}
