using System;

namespace CustomConditionTypesInterfaces
{
    public static class Constants
    {
        public static readonly Guid ExtensionId = new Guid("7BDD6F65-B6F2-414F-B97F-13E87E972F85");
        public static readonly Guid LocationExtensionId = new Guid("7e794753-46ed-42f3-85b2-2e172c00d045");

        public static class ConditionTypes
        {
            public static readonly Guid GroupsConditionType = new Guid("AC83CC41-CB31-4804-B330-A180FA02BA9D");
            public static readonly Guid UnitConditionType = new Guid("103B4D34-594A-479B-BE72-D481677C5136");
            public static readonly Guid RolesConditionType = new Guid("986E19CD-6101-4979-A99B-77CA50C0D781");
        }

        public static class MainMenu
        {
            public const string Id = "DV.MainMenu";
        }
    }
}
