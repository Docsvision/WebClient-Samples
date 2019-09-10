using System;
using System.Collections.Generic;
using System.Linq;
using DocsVision.BackOffice.CardLib.CardDefs;
using DocsVision.BackOffice.ObjectModel;
using DocsVision.BackOffice.ObjectModel.Services;
using DocsVision.Platform.Tools.LayoutEditor.DataLayer.Model;
using DocsVision.Platform.Tools.LayoutEditor.Extensibility;
using DocsVision.Platform.Tools.LayoutEditor.Nodes;
using DocsVision.Platform.Tools.LayoutEditor.ObjectModel.Descriptions;
using DocsVision.Platform.Tools.LayoutEditor.UIControls;
using DocsVision.Platform.WebClient;
using Constants = CustomConditionTypesInterfaces.Constants;

namespace CustomConditionTypesDesignerExtension
{
    internal class CustomConditionTypesProvider : IConditionTypesProvider
    {
        public Guid Id => Constants.ExtensionId;

        /// <summary>
        /// Получение списка штатов сотрудников
        /// </summary>
        public List<Staff> GetStaffTree()
        {
            var staffTree = new List<Staff>();

            var objectContext = this.SessionContextProvider.GetOrCreateCurrentObjectContext();

            var staffService = objectContext.GetService<IStaffService>();
            var units = staffService.GetUnits(null, true).OrderBy(u => u.Name);

            foreach (var unit in units)
            {
                var nodeStaff = unit.Staff;
                staffTree.Add(nodeStaff);
            }

            return staffTree;
        }

        /// <summary>
        /// Получение списка сотрудников
        /// </summary>
        public List<StaffEmployee> GetUsersTree()
        {
            var usersTree = new List<StaffEmployee>();

            var objectContext = this.SessionContextProvider.GetOrCreateCurrentObjectContext();
            var staffService = objectContext.GetService<IStaffService>();
            var units = staffService.GetUnits(null, true).OrderBy(u => u.Name);
            foreach (var unit in units)
            {
                foreach (var employee in unit.Employees)
                    usersTree.Add(employee);
            }

            return usersTree;
        }

        private readonly IServiceProvider serviceProvider;
        private ICurrentObjectContextProvider sessionContextProvider;

        public CustomConditionTypesProvider(IServiceProvider serviceProvider)
        {
            this.serviceProvider = serviceProvider;
        }

        private ICurrentObjectContextProvider SessionContextProvider
        {
            get
            {
                if (this.sessionContextProvider == null)
                    this.sessionContextProvider = DocsVision.Platform.Tools.LayoutEditor.ServiceUtil.GetService<ICurrentObjectContextProvider>(this.serviceProvider);
                return this.sessionContextProvider;
            }
        }

        public virtual bool TryGetMappedValue(CacheContext cacheContext, Location sourceLocation, Location targetLocation, ConditionItemModel item, out string value)
        {
            var resolved = true;
            value = item.Value;
            return resolved;
        }

        /// <summary>
        /// Получение списка всех условий выбора разметок
        /// </summary>
        public virtual List<IConditionItemEditor> GetEditors(CacheContext cacheContext, Location location)
        {
            var editors = new List<IConditionItemEditor>();
            if (location.Id == Constants.MainMenu.Id)
            {
                var groupsEditor = this.GetGroupsConditionItemEditor();
                editors.Add(groupsEditor);

                var usersEditor = this.GetUnitsConditionItemEditor();
                editors.Add(usersEditor);

                var rolesEditor = this.GetRolesConditionItemEditor();
                editors.Add(rolesEditor);
            }

            return editors;
        }

        /// <summary>
        /// Получение условия выбора разметок по группе
        /// </summary>
        private IConditionItemEditor GetGroupsConditionItemEditor()
        {
            var groupsEditor = new ConditionItemEditor();
            var groupsHeader = new ConditionHeader { Header = "Groups", ConditionTypeId = Constants.ConditionTypes.GroupsConditionType };

            var objectContext = this.SessionContextProvider.GetOrCreateCurrentObjectContext();

            var refStaff = objectContext.GetObject<Staff>(RefStaff.ID);

            var staffGroups = new List<StaffGroup>();
            foreach (var group in refStaff.Groups)
            {
                CollectGroups(staffGroups, group);
            }

            var groupsModel = staffGroups
                .Select(staffGroup => new ConditionItemModel
                {
                    ConditionTypeId = Constants.ConditionTypes.GroupsConditionType,
                    Value = staffGroup.GetObjectId().ToString("D"),
                    ValueDisplayName = staffGroup.Name
                })
                .OrderBy(staffGroup => staffGroup.ValueDisplayName)
                .ToList();

            groupsModel.Insert(0, new ConditionItemModel
            {
                ConditionTypeId = Constants.ConditionTypes.GroupsConditionType,
                Value = null,
                ValueDisplayName = "Any"
            });

            groupsEditor.Initialize(groupsHeader, groupsModel);
            return groupsEditor;
        }

        private void CollectGroups(List<StaffGroup> staffGroups, StaffGroup currentStaffGroup)
        {
            staffGroups.Add(currentStaffGroup);

            foreach (var group in currentStaffGroup.Groups)
            {
                CollectGroups(staffGroups, group);
            }
        }

        /// <summary>
        /// Получение условия выбора разметок по пользователю
        /// </summary>
        private IConditionItemEditor GetUnitsConditionItemEditor()
        {
            var usersEditor = new ConditionItemEditor();
            var usersHeader = new ConditionHeader { Header = "Units", ConditionTypeId = Constants.ConditionTypes.UnitConditionType };

            var objectContext = this.SessionContextProvider.GetOrCreateCurrentObjectContext();

            var refStaff = objectContext.GetObject<Staff>(RefStaff.ID);

            var staffUnits = new List<StaffUnit>();
            foreach (var unit in refStaff.Units)
            {
                CollectUnits(staffUnits, unit);
            }

            var unitsModel = staffUnits
                .Select(staffUnit => new ConditionItemModel
                {
                    ConditionTypeId = Constants.ConditionTypes.UnitConditionType,
                    Value = staffUnit.GetObjectId().ToString("D"),
                    ValueDisplayName = staffUnit.Name
                })
                .OrderBy(staffUnit => staffUnit.ValueDisplayName)
                .ToList();

            unitsModel.Insert(0, new ConditionItemModel
            {
                ConditionTypeId = Constants.ConditionTypes.UnitConditionType,
                Value = null,
                ValueDisplayName = "Any"
            });
            usersEditor.Initialize(usersHeader, unitsModel);
            return usersEditor;
        }

        private void CollectUnits(List<StaffUnit> staffUnits, StaffUnit currentStaffUnit)
        {
            if (currentStaffUnit.Type == StaffUnitType.Organization)
            {
                staffUnits.Add(currentStaffUnit);

                foreach (var unit in currentStaffUnit.Units)
                {
                    CollectUnits(staffUnits, unit);
                }
            }
        }


        /// <summary>
        /// Получение условия выбора разметок по роли
        /// </summary>
        private IConditionItemEditor GetRolesConditionItemEditor()
        {
            var rolesEditor = new ConditionItemEditor();
            var rolesHeader = new ConditionHeader { Header = "Role", ConditionTypeId = Constants.ConditionTypes.RolesConditionType };
            var staffTree = GetStaffTree();

            var rolesModel = new List<ConditionItemModel>();

            foreach (var staff in staffTree)
            {
                foreach (var role in staff.Roles)
                {
                    var id = role.GetObjectId().ToString("D");
                    if (!rolesModel.Any(x => x.Value == id))
                    {
                        var rolesItem = new ConditionItemModel
                        {
                            ConditionTypeId = Constants.ConditionTypes.RolesConditionType,
                            Value = role.GetObjectId().ToString("D"),
                            ValueDisplayName = role.Name
                        };

                        if (!rolesModel.Contains(rolesItem))
                            rolesModel.Add(rolesItem);
                    }
                }
            }
            rolesModel.Insert(0, new ConditionItemModel
            {
                ConditionTypeId = Constants.ConditionTypes.RolesConditionType,
                Value = null,
                ValueDisplayName = "Any"
            });

            rolesEditor.Initialize(rolesHeader, rolesModel);
            return rolesEditor;
        }

        /// <summary>
        /// Получение отображаемого имени значения условия выбора
        /// </summary>
        public string GetValueDisplayName(CacheContext cacheContext, Location location, ConditionItemModel item)
        {
            string displayName = null;
            Guid conditionTypeId = item.ConditionTypeId;
            var value = item.Value;

            var objectContext = this.SessionContextProvider.GetOrCreateCurrentObjectContext();

            if (conditionTypeId == Constants.ConditionTypes.GroupsConditionType)
            {
                if (value != null)
                {
                    var id = Guid.Parse(value);
                    var group = objectContext.GetObject<StaffGroup>(id);
                    displayName = group.Name;
                }
                else
                {
                    displayName = "Any";
                }
            }
            else if (conditionTypeId == Constants.ConditionTypes.UnitConditionType)
            {
                if (value != null)
                {
                    var id = Guid.Parse(value);
                    var unit = objectContext.GetObject<StaffUnit>(id);
                    displayName = unit.Name;
                }
                else
                {
                    displayName = "Any";
                }
            }
            else if (conditionTypeId == Constants.ConditionTypes.RolesConditionType)
            {
                if (value != null)
                {
                    var id = Guid.Parse(value);
                    var role = objectContext.GetObject<StaffRole>(id);
                    displayName = role.Name;
                }
                else
                {
                    displayName = "Any";
                }
            }

            return displayName;
        }

        public List<IConditionItemEditor> FilterEditors(CacheContext cacheContext, Location location, List<IConditionItemEditor> editors)
        {
            return editors;
        }
    }
}

