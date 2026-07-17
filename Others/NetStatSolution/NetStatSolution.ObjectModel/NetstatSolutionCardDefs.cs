namespace NetStatSolution.ObjectModel;

public class NetstatSolutionCardDefs
{
    public static readonly Guid ID = new Guid("CCCA40C0-5FA4-4878-B0DA-34E67E167BEA");

    public static class MainInfo
    {
        public const string Alias = "MainInfo";
        public static readonly Guid ID = new Guid("A1BB8AEB-D7A4-4A1B-9AC5-171C61752120");

        public const string Name = "Name";
        public const string Address = "Address";
        public const string Type = "Type";
        public const string IsChecked = "IsChecked";
        public const string LastResult = "LastResult";
    }

    public static class Journal
    {
        public const string Alias = "Journal";
        public static readonly Guid ID = new Guid("76C13C39-89CA-454D-92C2-FB959B78E943");

        public const string Date = "Date";
        public const string Result = "Result";
    }
}
