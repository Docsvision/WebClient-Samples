using Docsvision.WorkerService.Interfaces;
using Docsvision.WorkerService.Objects;
using System.Collections.Generic;

namespace SampleWorkerExtension.Roles
{
    public class SampleRoleTemplateProvider : IRoleTemplateProvider
    {
        private const string Role = "SampleLogicRole";

        /// <summary>
        /// Initializes a new instance of the <see cref="SampleRoleTemplateProvider"/> class
        /// </summary>
        public SampleRoleTemplateProvider()
        {

        }

        /// <summary>
        /// Gets role templates
        /// </summary>
        public IEnumerable<RoleTemplate> GetRolesTemplates()
        {
            return new[] { new RoleTemplate { Name = Role } };
        }
    }
}
