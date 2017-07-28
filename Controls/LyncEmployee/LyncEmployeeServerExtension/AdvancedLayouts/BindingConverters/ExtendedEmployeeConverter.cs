using Docsvision.Backoffice.Client.Cards.AdvancedLayouts;
using Docsvision.Backoffice.Client.Cards.AdvancedLayouts.BindingConverters;
using Docsvision.Backoffice.Client.Cards.AdvancedLayouts.LayoutModel;
using Docsvision.Backoffice.Client.Cards.Entities;
using DocsVision.BackOffice.WebClient.Employee;
using DocsVision.Platform.WebClient.Helpers;
using LyncEmployeeServerExtension.Models;
using LyncEmployeeServerExtension.Services;
using System;
using System.Collections.Generic;

namespace LyncEmployeeServerExtension.AdvancedLayouts.BindingConverters
{
    internal class ExtendedEmployeeConverter: BaseBindingConverter
    {
        private const string Type = "ExtendedEmployee";
        private readonly IServiceProvider serviceProvider;
        private IExtendedEmployeeService employeeService;

        /// <summary>
        /// Initializes a new instance of the <see cref="ExtendedEmployeeConverter"/> class
        /// </summary>
        public ExtendedEmployeeConverter(IServiceProvider serviceProvider)
            : base(serviceProvider, Type)
        {
            this.serviceProvider = serviceProvider;
        }

        private IExtendedEmployeeService EmployeeService
        {
            get
            {
                return this.employeeService ?? (this.employeeService = ServiceUtil.GetService<IExtendedEmployeeService>(this.serviceProvider));
            }
        }

        /// <summary>
        /// Converts value for display
        /// </summary>   
        public override BindingResult ConvertForDisplay(ControlContext controlContext, Binding binding, BindingResult bindingResult)
        {
            Guid employeeId = bindingResult.Value != null ? (Guid)bindingResult.Value : Guid.Empty;

            ExtendedEmployeeModel employeeModel = null;
            if (employeeId != Guid.Empty)
            {
                employeeModel = this.EmployeeService.GetExtendedEmployeeModel(controlContext.LayoutContext.SessionContext, employeeId);
            }

            return bindingResult.Clone(employeeModel);
        }
    }
}