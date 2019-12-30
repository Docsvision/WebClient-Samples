using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Reflection;
using System.Text;
using DocsVision.BackOffice.ObjectModel;
using DocsVision.BackOffice.ObjectModel.Services;
using DocsVision.Platform.WebClient;
using DocsVision.WebClientLibrary.ObjectModel.Extensibility;
using DocsVision.WebClientLibrary.ObjectModel.ResolveContexts;
using DocsVision.WebClientLibrary.ObjectModel.Services.LayoutModel;
using Constants = CustomConditionTypesInterfaces.Constants;

namespace CustomConditionTypesLayoutExtension
{
    public class CustomConditionTypesLayoutExtension : ILayoutExtension
    {
        public CustomConditionTypesLayoutExtension()
        {
            this.LayoutExtensionDescription = new LayoutExtensionDescription
            {
                Id = Constants.ExtensionId,
                Name = "Custom condition types layout extension",
                Version = FileVersionInfo.GetVersionInfo(Assembly.GetExecutingAssembly().Location).FileVersion,
                ConditionTypes = this.GetConditionTypes(),
                ModeConditionTypes = this.GetLayoutTypes()
            };
        }

        #region Properties

        /// <summary>
        /// Класс с описанием новых условий выбора разметки
        /// </summary>
        public LayoutExtensionDescription LayoutExtensionDescription { get; }

        #endregion

        #region Public methods


        public bool CheckLayoutAvailability(SessionContext sessionContext, BaseResolveContext resolveContext, out string messsage)
        {
            messsage = null;
            return true;
        }

        /// <summary>
        /// Заполнение словаря параметров resolveContext значениями идентификаторов группы, пользователя, роли
        /// </summary>
        public void FillResolveContext(SessionContext sessionContext, BaseResolveContext resolveContext, Options options)
        {
            // Для повышения быстродействия значения идентификаторов можно закэшировать
            var userId = sessionContext.UserInfo.EmployeeId;
            var unit = sessionContext.UserInfo.Employee.Unit;
            var unitId = sessionContext.ObjectContext.GetObjectRef<StaffUnit>(unit).Id;
            StaffEmployee staffEmployee = sessionContext.ObjectContext.GetObject<StaffEmployee>(userId);
            IStaffService staffService = sessionContext.ObjectContext.GetService<IStaffService>();
            StringBuilder roleIdList = new StringBuilder();
            StringBuilder groupIdList = new StringBuilder();
            foreach (StaffGroup group in staffService.FindEmployeeGroups(staffEmployee))
            {
                var groupId = sessionContext.ObjectContext.GetObjectRef<StaffGroup>(group).Id;
                groupIdList.Append(string.Concat(groupId, ";"));
            }
            foreach (StaffRole role in staffService.FindEmployeeRoles(staffEmployee))
            {
                var roleId = sessionContext.ObjectContext.GetObjectRef<StaffRole>(role).Id;
                roleIdList.Append(string.Concat(roleId, ";"));
            }

            resolveContext.Parameters.Add(Constants.ConditionTypes.UnitConditionType, unitId.ToString());
            resolveContext.Parameters.Add(Constants.ConditionTypes.RolesConditionType, roleIdList.ToString());
            resolveContext.Parameters.Add(Constants.ConditionTypes.GroupsConditionType, groupIdList.ToString());
        }

        /// <summary>
        /// Сравнение переданного в функцию значения (value), с тем значением, которое было добавлено в словарь параметров resolveContext
        /// </summary>
        public bool ResolveConditionType(SessionContext sessionContext, BaseResolveContext resolveContext, Guid conditionTypeId, string value)
        {
            if (conditionTypeId == Constants.ConditionTypes.GroupsConditionType)
            {
                if (value == null)
                {
                    return true;
                }

                if (resolveContext.Parameters.TryGetValue(Constants.ConditionTypes.GroupsConditionType, out var groupValue))
                {
                    return groupValue.Contains(value);
                }
                else
                {
                    DocsVision.Platform.WebClient.Diagnostics.Trace.TraceVerbose($"ResolveContext doesn't contains option with id = {Constants.ConditionTypes.GroupsConditionType}");
                }
            }
            if (conditionTypeId == Constants.ConditionTypes.UnitConditionType)
            {
                if (value == null)
                {
                    return true;
                }

                if (resolveContext.Parameters.TryGetValue(Constants.ConditionTypes.UnitConditionType, out var unitValue))
                {
                    return value == unitValue;
                }
                else
                {
                    DocsVision.Platform.WebClient.Diagnostics.Trace.TraceVerbose($"ResolveContext doesn't contains option with id = {Constants.ConditionTypes.UnitConditionType}");
                }
            }
            if (conditionTypeId == Constants.ConditionTypes.RolesConditionType)
            {
                if (value == null)
                {
                    return true;
                }

                if (resolveContext.Parameters.TryGetValue(Constants.ConditionTypes.RolesConditionType, out var roleValue))
                {
                    return roleValue.Contains(value);
                }
                else
                {
                    DocsVision.Platform.WebClient.Diagnostics.Trace.TraceVerbose($"ResolveContext doesn't contains option with id = {Constants.ConditionTypes.UnitConditionType}");
                }
            }

            return false;
        }

        public bool SupportContext(SessionContext sessionContext, BaseResolveContext resolveContext)
        {
            bool isSupportContext = false;

            return isSupportContext;
        }

        #endregion

        /// <summary>
        /// Получение списка режимов выбора разметки (в данном случае пустой список)
        /// </summary>
        private List<ModeConditionType> GetLayoutTypes()
        {
            return new List<ModeConditionType>();
        }
        #region Helpers

        /// <summary>
        /// Получение списка условий выбора разметки
        /// </summary>
        private List<ConditionType> GetConditionTypes()
        {
            return new List<ConditionType>
            {
                new ConditionType
                {
                    ConditionTypeId = Constants.ConditionTypes.GroupsConditionType,
                    DefaultName = "Group",
                    ConditionTypeNames = new List<ConditionTypeName>
                    {
                        new ConditionTypeName
                        {
                            LocaleId = DocsVision.WebClientLibrary.Constants.LCID.English,
                            Name = "Group"
                        },
                        new ConditionTypeName
                        {
                            LocaleId = DocsVision.WebClientLibrary.Constants.LCID.Russian,
                            Name = "Группа"
                        },
                    }
                },
                new ConditionType
                {
                    ConditionTypeId = Constants.ConditionTypes.UnitConditionType,
                    DefaultName = "Unit",
                    ConditionTypeNames = new List<ConditionTypeName>
                    {
                        new ConditionTypeName
                        {
                            LocaleId = DocsVision.WebClientLibrary.Constants.LCID.English,
                            Name = "Unit"
                        },
                        new ConditionTypeName
                        {
                            LocaleId = DocsVision.WebClientLibrary.Constants.LCID.Russian,
                            Name = "Подразделение"
                        },
                    }
                },
                new ConditionType
                {
                    ConditionTypeId = Constants.ConditionTypes.RolesConditionType,
                    DefaultName = "Role",
                    ConditionTypeNames = new List<ConditionTypeName>
                    {
                        new ConditionTypeName
                        {
                            LocaleId = DocsVision.WebClientLibrary.Constants.LCID.English,
                            Name = "Role"
                        },
                        new ConditionTypeName
                        {
                            LocaleId = DocsVision.WebClientLibrary.Constants.LCID.Russian,
                            Name = "Роль"
                        },
                    }
                },
            };
        }

        public string GetLocation(SessionContext sessionContext, BaseResolveContext resolveContext, bool specific)
        {
            return String.Empty;
        }

        #endregion
    }
}


