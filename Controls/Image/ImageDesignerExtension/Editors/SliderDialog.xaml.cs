using Docsvision.Platform.Tools.LayoutEditor.Helpers;
using Docsvision.Platform.Tools.LayoutEditor.Infrostructure;
using ImageDesignerExtension.Models;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Windows;
using System.Windows.Input;

namespace ImageDesignerExtension.Editors
{
    /// <summary>
    /// Interaction logic for SliderDialog.xaml
    /// </summary>
    internal partial class SliderDialog : Window, INotifyPropertyChanged
    {
        #region Private fields

        private IServiceProvider serviceProvider;

        private ICommand showLocalizationCommand;
        private ICommand addItemCommand;
        private ICommand removeItemCommand;
        private ICommand okCommand;
        private ICommand cancelCommand;

        private ObservableCollection<SliderItem> items;
        private SliderItem selectedItem;

        #endregion

        /// <summary>
        /// Creates a new instance of <see cref="SliderDialog"/>
        /// </summary>
        /// <param name="serviceProvider">service provider</param>
        public SliderDialog(IServiceProvider serviceProvider)
        {
            InitializeComponent();

            this.serviceProvider = serviceProvider;
        }

        #region Properties

        /// <summary>
        /// Gets or sets selected item
        /// </summary>
        public SliderItem SelectedItem
        {
            get
            {
                return this.selectedItem;
            }
            set
            {
                SetField(ref this.selectedItem, value);
             }
        }

        /// <summary>
        /// Gets or serts SliderItems list
        /// </summary>
        public ObservableCollection<SliderItem> Items
        {
            get
            {
                return this.items;
            }
            private set
            {
                SetField(ref this.items, value);
            }
        }

        /// <summary>
        /// Gets add item command
        /// </summary>
        public ICommand AddItemCommand
        {
            get
            {
                return this.addItemCommand ?? (this.addItemCommand = new RelayCommand(this.AddItem));
            }
        }

        /// <summary>
        /// Gets remove item command
        /// </summary>
        public ICommand RemoveItemCommand
        {
            get
            {
                return this.removeItemCommand ?? (this.removeItemCommand = new RelayCommand(this.RemoveItem, this.CanRemoveItem));
            }
        }
        
        /// <summary>
        /// Gets ok command
        /// </summary>
        public ICommand OkCommand
        {
            get
            {
                return this.okCommand ?? (this.okCommand = new RelayCommand(this.Ok, this.canOk));
            }
        }

        /// <summary>
        /// Gets cancel command
        /// </summary>
        public ICommand CancelCommand
        {
            get
            {
                return this.cancelCommand ?? (this.cancelCommand = new RelayCommand(this.Cancel));
            }
        }

        /// <summary>
        /// Gets show localization command
        /// </summary>
        public ICommand ShowLocalizationCommand
        {
            get
            {
                return this.showLocalizationCommand ?? (this.showLocalizationCommand = new RelayCommand(this.showLocalization));
            }
        }

        #endregion

        #region Public methods

        /// <summary>
        /// Initializes a SliderDialog
        /// </summary>
        /// <param name="items">SliderItems list</param>
        public void Initialize(List<SliderItem> items)
        {
            this.Items = new ObservableCollection<SliderItem>(items);
        }

        #endregion

        #region Helpers

        private void AddItem()
        {
            var item = new SliderItem();
            this.Items.Add(item);
        }

        private bool CanRemoveItem(object obj)
        {
            return this.SelectedItem != null;
        }

        private void RemoveItem()
        {
            this.Items.Remove(this.SelectedItem);
        }
        private bool canOk(object obj)
        {
            return this.Items != null && this.Items.All(l => !String.IsNullOrWhiteSpace(l.Url));
        }

        private void Ok()
        {
            this.DialogResult = true;
            Close();
        }

        private void Cancel()
        {
            this.DialogResult = false;
            Close();
        }

        private void showLocalization()
        {
            if (this.SelectedItem == null)
                return;
            var item = this.SelectedItem;

            var selectedKey = LocalizationHelper.Show(this.serviceProvider, this, item.DescriptionLocalizationKey);
            if (!String.IsNullOrEmpty(selectedKey))
            {
                item.DescriptionLocalizationKey = selectedKey;
                item.DisplayDescription = LocalizationHelper.GetLocalization(this.serviceProvider, selectedKey);
            }
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
