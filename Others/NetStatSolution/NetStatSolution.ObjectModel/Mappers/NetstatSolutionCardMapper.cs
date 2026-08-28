using DocsVision.BackOffice.ObjectModel.Mapping;
using DocsVision.Platform.ObjectModel;
using DocsVision.Platform.ObjectModel.Mapping;

namespace NetStatSolution.ObjectModel.Mappers;

public class NetstatSolutionCardMapper : BaseCardMapper<NetstatSolutionCard>
{
    private static ObjectMap map;

    static NetstatSolutionCardMapper()
    {
        InitializeObjectMap();
    }

    public NetstatSolutionCardMapper(ObjectContext context)
        : base(context)
    {
    }

    protected override NetstatSolutionCard CreateObject(ObjectInitializationData data)
    {
        return new NetstatSolutionCard(data);
    }

    protected override ObjectMap GetObjectMap()
    {
        return map;
    }

    private static void InitializeObjectMap()
    {
        map = new ObjectMap();

        map.ObjectTypeId = NetstatSolutionCardDefs.ID;
        map.Collection(NetstatSolutionCard.MainInfoProperty, NetstatSolutionCardDefs.MainInfo.ID);
        map.Collection(NetstatSolutionCard.JournalProperty, NetstatSolutionCardDefs.Journal.ID);
    }
}
