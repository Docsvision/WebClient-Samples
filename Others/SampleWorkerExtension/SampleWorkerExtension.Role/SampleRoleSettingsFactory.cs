using System;
using System.Collections.Generic;
using DocsVision.WebAdminConsole.Instances;
using DocsVision.WebAdminConsole.Types;
using DocsVision.WebAdminConsole.WorkerExtension.Services;
using DocsVision.WebAdminConsole.WorkerExtension.Worker;
using DocsVision.WebAdminConsole.WorkerExtension.Worker.Models;

namespace SampleWorkerExtension.Roles
{
    public class SampleRoleSettingsFactory : RoleSettingsFactory
    {
        private readonly ILocalizationProvider _localizationProvider;
        private static readonly List<string> _supportedRoleTypes = new List<string>() { SampleRole.Name };

        public override IList<string> SupportedRoleTypes => _supportedRoleTypes;

        public SampleRoleSettingsFactory(ILocalizationProvider localizationProvider)
        {
            _localizationProvider = localizationProvider;
        }
        public override string GetDisplayName(RoleType roleType, int localeId)
        {
            return "Расширение для WorkerService";
        }

        public override Role CreateRole(RoleType roleType)
        {
            Role role = base.CreateRole(roleType);
            role.Queues.Add(CreateQueue("DocsvisionQueue"));
            role.TaskType = "SampleTaskDocsvision";

            return role;
        }

        public override List<RequiredConnectionType> GetRequiredConnections(RoleType roleType, int localeId) 
        {
            return
            new List<RequiredConnectionType>() {
                new RequiredConnectionType
                {
                    LinkId = SampleRole.DocsvisionConnectionLinkId,
                    ConnectionType = "DocsvisionConnection",
                    DisplayName = "Соединение Docsvision"
                }
            };
        }

        public override void ChangeConnection(Role role, RoleConnection connection)
        {
            base.ChangeConnection(role, connection);

            if (role.Queues.Count > 0 && string.Equals(connection.ConnectionType, "DocsvisionConnection", StringComparison.OrdinalIgnoreCase))
                role.Queues[0].Settings = string.Format("Connection={0}", connection.ConnectionName);
        }
    }
}
