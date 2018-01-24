using Docsvision.Platform.Tools.LayoutEditor.Infrostructure;
using System;
using System.ComponentModel;
using System.Runtime.CompilerServices;
using System.Windows.Input;

namespace ImageDesignerExtension.Models
{
    /// <summary>
    /// Представляет собой класс для элемента слайдера
    /// </summary>
    class SliderItem : INotifyPropertyChanged
    {
        private ICommand clearDescriptionCommand;

        private string descriptionLocalizationKey;
        private string displayDescription;
        private string url;

        public string DescriptionLocalizationKey
        {
            get
            {
                return this.descriptionLocalizationKey;
            }
            set
            {
                this.descriptionLocalizationKey = value;
                NotifyPropertyChanged();
            }
        }

        public string DisplayDescription
        {
            get
            {
                return this.displayDescription;
            }
            set
            {
                this.displayDescription = value;
                NotifyPropertyChanged();
            }
        }

        public string Url
        {
            get
            {
                return this.url;
            }
            set
            {
                this.url = value;
                NotifyPropertyChanged();
            }
        }

        public ICommand ClearDescriptionCommand
        {
            get
            {
                return this.clearDescriptionCommand ?? (this.clearDescriptionCommand = new RelayCommand(this.ClearDescription, this.CanClearDescription));
            }
        }

        private void ClearDescription()
        {
            this.DisplayDescription = string.Empty;
            this.descriptionLocalizationKey = null;
        }

        private bool CanClearDescription(object obj)
        {
            return !String.IsNullOrEmpty(this.displayDescription);
        }

        #region INotifyPropertyChanged implementation

        public event PropertyChangedEventHandler PropertyChanged;

        protected void NotifyPropertyChanged([CallerMemberName] string propertyName = null)
        {
            if (this.PropertyChanged != null)
                this.PropertyChanged(this, new PropertyChangedEventArgs(propertyName));
        }

        #endregion
    }
}
