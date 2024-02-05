using System;
using System.Collections.Generic;
using System.Linq;

namespace RefCasesServerExtension.Models
{
    public class Case
    {
        public string DisplayValue { get; set; }
        public Guid ID { get; set; }
        public List<Case> Cases { get; set; }
    }
}