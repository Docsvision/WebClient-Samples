using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RefCasesServerExtension.Models
{
    public class Section
    {
        public string DisplayValue { get; set; }
        public Guid ID { get; set; }
        public List<Section> Sections { get; set; }
    }
}