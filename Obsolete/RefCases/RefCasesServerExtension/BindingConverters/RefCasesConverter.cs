using DocsVision.WebClientLibrary.Layout.IL;
using DocsVision.WebClientLibrary.ObjectModel;
using DocsVision.WebClientLibrary.ObjectModel.Services.BindingConverters;
using DocsVision.WebClientLibrary.ObjectModel.Services.LayoutModel;
using RefCasesServerExtension.Models;
using RefCasesServerExtension.Services;
using System;

namespace RefCasesServerExtension.BindingConverters
{
    // Класс конвертера может быть производным от BaseBindingConverter или полностью реализовывать интерфейс IBindingConverter 
    public class RefCasesConverter : BaseBindingConverter
    {
        private IRefCasesService refCasesService;

        // В базовый класс нужно передать название конвертера, указанного в описателе - RefCasesConverter
        public RefCasesConverter(IServiceProvider serviceProvider, IRefCasesService refCasesService) : base(serviceProvider, "RefCasesConverter")
        {
            // Получаем реализованный ранее сервис для работы со Справочником номенклатуры дел 5
            this.refCasesService = refCasesService;
        }

        // Основной метод, возвращающий отображаемое значение (а точнее модель) для значения элемента управления - bindingResult.Value
        public override BindingResult ConvertForDisplay(ControlContext controlContext, LayoutBinding binding, BindingResult bindingResult)
        {
            var itemId = bindingResult.Value != null ? (Guid)bindingResult.Value : Guid.Empty;
            var name = itemId == Guid.Empty ? "" : refCasesService.GetCaseTitle(itemId);

            // Клиент ожидает модель, включающую идентификатор и название Дела
            var model = new CaseClientModel() { Id = itemId, Name = name };

            return bindingResult.Clone(model);
        }
    }
}