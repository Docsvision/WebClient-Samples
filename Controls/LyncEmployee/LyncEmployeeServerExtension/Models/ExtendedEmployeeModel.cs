using System;

namespace LyncEmployeeServerExtension.Models
{
    public class ExtendedEmployeeModel
    {
        /// <summary>
        /// Unique identificator of employee
        /// </summary>
        public Guid Id
        {
            get;
            set;
        }

        /// <summary>
        /// Employee display name
        /// </summary>
        public string DisplayName
        {
            get;
            set;
        }

        /// <summary>
        /// Employee email
        /// </summary>
        public string Email
        {
            get;
            set;
        }
    }
}