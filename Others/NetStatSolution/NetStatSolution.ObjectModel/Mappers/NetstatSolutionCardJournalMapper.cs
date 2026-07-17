using DocsVision.BackOffice.ObjectModel.Mapping;
using DocsVision.Platform.ObjectModel;
using DocsVision.Platform.ObjectModel.Mapping;

namespace NetStatSolution.ObjectModel.Mappers;

public class NetstatSolutionCardJournalMapper : BaseCardSectionRowMapper<NetstatSolutionCardJournal>
{
    private static ObjectMap map;

    static NetstatSolutionCardJournalMapper()
    {
        InitializeObjectMap();
    }

    public NetstatSolutionCardJournalMapper(ObjectContext context)
        : base(context)
    {
    }

    protected override ObjectMap GetObjectMap()
    {
        return map;
    }

    protected override NetstatSolutionCardJournal CreateObject(ObjectInitializationData data)
    {
        return new NetstatSolutionCardJournal(data);
    }

    private static void InitializeObjectMap()
    {
        map = new ObjectMap();

        map.ObjectTypeId = NetstatSolutionCardDefs.Journal.ID;
        map.Field(NetstatSolutionCardJournal.DateProperty, "Date");
        map.Field(NetstatSolutionCardJournal.ResultProperty, "Result");
    }
}
