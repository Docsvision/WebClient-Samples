using Docsvision.Backoffice.Client.Cards.AdvancedLayouts;
using Docsvision.Backoffice.Client.Cards.AdvancedLayouts.BindingConverters;
using Docsvision.Backoffice.Client.Cards.AdvancedLayouts.LayoutModel;
using Docsvision.Backoffice.Client.Cards.Entities;
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
        /// Initializes a new instance of the <see cref="SliderConverter"/> class
        /// </summary>
        public SliderConverter(IServiceProvider serviceProvider)
            : base(serviceProvider, Slider)
        {
        }

        /// <summary>
        /// Converts value for display
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
            var session = layoutContext.Card.UserSession;
            var advancedLayouts = session.GetEntityProvider<BackofficeEntityProvider>().GetAdvancedLayoutDirectory();

            Guid cardTypeId = layoutContext.Card.System.TypeId;

            var list = new List<SliderItemDataModel>();
            if (!string.IsNullOrEmpty(str))
            {
                string[] parts = str.Split(splitSymbol);
                int i = 0;
                while (i < parts.Length)
                {
                    var item = new SliderItemDataModel();
                    item.Url = parts[i++];
                    item.Description = GetLocalization(advancedLayouts, layoutContext, cardTypeId, parts[i++]);
                    list.Add(item);
                }
            }
            return list;
        }
    }
}