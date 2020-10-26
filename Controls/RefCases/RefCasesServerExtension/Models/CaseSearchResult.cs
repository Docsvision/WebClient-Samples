using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RefCasesServerExtension.Models
{
    public class CaseSearchResult
    {
        public CaseClientModel[] Items { get; set; }
        public bool HasMore { get; set; }
    }
}