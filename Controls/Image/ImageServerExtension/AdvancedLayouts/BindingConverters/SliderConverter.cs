using DocsVision.WebClientLibrary.ObjectModel;
using DocsVision.WebClientLibrary.ObjectModel.Services.BindingConverters;
using DocsVision.WebClientLibrary.ObjectModel.Services.LayoutModel;
using ImageServerExtension.Models;
using System;
using System.Collections.Generic;

namespace ImageServerExtension.AdvancedLayouts.BindingConverters
{
    internal class SliderConverter : BaseBindingConverter
    {
        private const string Slider = "Slider";
        private const char splitSymbol = ';';

        /// <summary>
        /// Создаёт новый экземпляр <see cref="SliderConverter"/>
        /// </summary>
        public SliderConverter(IServiceProvider serviceProvider)
            : base(serviceProvider, Slider)
        {
        }

        /// <summary>
        /// Конвертирует значение для его показа
        /// </summary>   
        public override BindingResult ConvertForDisplay(ControlContext controlContext, Binding binding, BindingResult bindingResult)
        {
            var layoutContext = controlContext.LayoutContext;

            var model = GetList(controlContext, (string)bindingResult.Values[0]);

            return new BindingResult
            {
                Name = bindingResult.Name,
                Value = model
            };
        }

        private List<SliderItemDataModel> GetList(ControlContext controlContext, string str)
        {
            var layoutContext = controlContext.LayoutContext;

            Guid cardTypeId = layoutContext.CardTypeId;

            var list = new List<SliderItemDataModel>();
            if (!string.IsNullOrEmpty(str))
            {
                string[] parts = str.Split(splitSymbol);
                int i = 0;
                while (i < parts.Length)
                {
                    var item = new SliderItemDataModel();
                    item.Url = parts[i++];
                    item.Description = GetLocalization(layoutContext, cardTypeId, parts[i++]);
                    list.Add(item);
                }
            }
            return list;
        }
    }
}