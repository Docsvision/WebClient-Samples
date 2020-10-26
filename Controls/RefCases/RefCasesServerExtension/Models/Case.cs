using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RefCasesServerExtension.Models
{
    public class Case
    {
        public string DisplayValue { get; set; }
        public Guid ID { get; set; }
        public List<Case> Cases { get; set; }
    }
}