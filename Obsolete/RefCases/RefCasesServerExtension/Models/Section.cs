using System;
using System.Collections.Generic;
using System.Linq;

namespace RefCasesServerExtension.Models
{
    public class Section
    {
        public string DisplayValue { get; set; }
        public Guid ID { get; set; }
        public List<Section> Sections { get; set; }
    }
}