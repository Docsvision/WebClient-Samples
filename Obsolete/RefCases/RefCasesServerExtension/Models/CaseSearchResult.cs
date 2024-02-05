using System;
using System.Collections.Generic;
using System.Linq;

namespace RefCasesServerExtension.Models
{
    public class CaseSearchResult
    {
        public CaseClientModel[] Items { get; set; }
        public bool HasMore { get; set; }
    }
}