using Docsvision.Platform.Tools.LayoutEditor.Helpers;
using Docsvision.Platform.Tools.LayoutEditor.Infrostructure;
using Docsvision.Platform.Tools.LayoutEditor.PropertiesEditor;
using ImageDesignerExtension.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Input;
using Xceed.Wpf.Toolkit.PropertyGrid;
using Xceed.Wpf.Toolkit.PropertyGrid.Editors;

namespace ImageDesignerExtension.Editors
{
    /// <summary>
    /// Interaction logic for SliderModeEditor.xaml
    /// </summary>
    internal partial class SliderEditor : UserControl, ITypeEditor, INotifyPropertyChanged
    {
        #region Private fields

        private IControlPropertiesObject dataObject;
        private ICommand clickCommand;

        #endregion

        /// <summary>
        /// Initializes a new instance of the <see cref="SliderEditor"/> class
        /// </summary>
        public SliderEditor()
        {
            InitializeComponent();
        }

        /// <summary>
        /// Gets DependencyProperty with name Value for <see cref="SliderEditor"/>
        /// </summary>
        public static readonly DependencyProperty ValueProperty = DependencyProperty.Register("Value", typeof(string), typeof(SliderEditor),
            new FrameworkPropertyMetadata(string.Empty, FrameworkPropertyMetadataOptions.BindsTwoWayByDefault));

        #region Properties

        /// <summary>
        /// Gets or sets value
        /// </summary>
        public string Value
        {
            get { return (string)GetValue(ValueProperty); }
            set { SetValue(ValueProperty, value); }
        }

        /// <summary>
        /// Gets click command
        /// </summary>
        public ICommand ClickCommand
        {
            get
            {
                return this.clickCommand ?? (this.clickCommand = new RelayCommand(this.Click));
            }
        }

        #endregion

        #region Helpers

        private void Click()
        {
            var dialog = new SliderDialog(dataObject.ServiceProvider);
            dialog.Owner = Window.GetWindow(this);

            var items = SliderModeHelper.StringToItems(this.Value);
            items.ForEach(l =>
            {
                if (!String.IsNullOrEmpty(l.DescriptionLocalizationKey))
                {
                    l.DisplayDescription = LocalizationHelper.GetLocalization(dataObject.ServiceProvider, l.DescriptionLocalizationKey);
                }
            });

            dialog.Initialize(items);
            if (dialog.ShowDialog() == true)
            {
                foreach (var item in dialog.Items)
                {
                    CheckLocalizationKeys(item);
                }

                this.Value = SliderModeHelper.ItemsToString(dialog.Items.ToList());
            }
        }
        
        private void CheckLocalizationKeys(SliderItem sliderItem)
        {
            if (!String.IsNullOrEmpty(sliderItem.DisplayDescription))
            {
                var localizationItem = LocalizationHelper.FindLocalization(dataObject.ServiceProvider, sliderItem.DisplayDescription);
                sliderItem.DescriptionLocalizationKey = localizationItem == null ? LocalizationHelper.AddNewLocalization(dataObject.ServiceProvider, sliderItem.DisplayDescription) : localizationItem.Key;
            }
            else
            {
                sliderItem.DescriptionLocalizationKey = null;
            }
        }

        #endregion

        #region ITypeEditor implementation 

        // Подробнее про ITypeEditor: https://xceed.com/wp-content/documentation/xceed-toolkit-plus-for-wpf/Xceed.Wpf.Toolkit~Xceed.Wpf.Toolkit.PropertyGrid.Editors.ITypeEditor.html

        /// <summary>
        /// Returns property editor for <see cref="PropertyItem"/>
        /// </summary>
        /// <param name="propertyItem">property item</param>
        /// <returns>FrameworkElement</returns>
        public FrameworkElement ResolveEditor(PropertyItem propertyItem)
        {
            dataObject = (IControlPropertiesObject)propertyItem.Instance;

            Binding binding = new Binding("Value");
            binding.Source = propertyItem;
            binding.Mode = propertyItem.IsReadOnly ? BindingMode.OneWay : BindingMode.TwoWay;
            BindingOperations.SetBinding(this, SliderEditor.ValueProperty, binding);
            return this;
        }

        #endregion

        #region INotifyPropertyChanged implementation

        public event PropertyChangedEventHandler PropertyChanged;

        private void OnPropertyChanged([CallerMemberName]string propertyName = null)
        {
            RaisePropertyChanged(propertyName);
        }

        private void RaisePropertyChanged(string propertyName)
        {
            if (this.PropertyChanged != null)
                this.PropertyChanged(this, new PropertyChangedEventArgs(propertyName));
        }

        private bool SetField<T>(ref T field, T value, [CallerMemberName] string propertyName = null)
        {
            if (EqualityComparer<T>.Default.Equals(field, value))
                return false;
            field = value;
            RaisePropertyChanged(propertyName);
            return true;
        }

        #endregion

    }
}
