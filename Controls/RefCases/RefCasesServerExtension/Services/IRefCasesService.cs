using RefCasesServerExtension.Models;
using System;
using System.Collections.Generic;

namespace RefCasesServerExtension.Services
{
    public interface IRefCasesService
    {
        List<Year> GetYears(Guid? rootSection = null);
        List<Section> GetSections(Guid yearID, Guid? rootSection = null);
        List<Case> GetCases(Guid sectionID);
        string GetCaseTitle(Guid caseID);
        List<CaseClientModel> SearchCases(string caseName, Guid? rootSection = null);
    }
}
