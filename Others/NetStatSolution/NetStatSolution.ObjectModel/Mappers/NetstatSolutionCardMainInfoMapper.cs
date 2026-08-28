using DocsVision.BackOffice.ObjectModel.Mapping;
using DocsVision.Platform.ObjectModel;
using DocsVision.Platform.ObjectModel.Mapping;

namespace NetStatSolution.ObjectModel.Mappers;

public class NetstatSolutionCardMainInfoMapper : BaseCardSectionRowMapper<NetstatSolutionCardMainInfo>
{
    private static ObjectMap map;

    static NetstatSolutionCardMainInfoMapper()
    {
        InitializeObjectMap();
    }

    public NetstatSolutionCardMainInfoMapper(ObjectContext context)
        : base(context)
    {
    }

    protected override ObjectMap GetObjectMap()
    {
        return map;
    }

    protected override NetstatSolutionCardMainInfo CreateObject(ObjectInitializationData data)
    {
        return new NetstatSolutionCardMainInfo(data);
    }

    private static void InitializeObjectMap()
    {
        map = new ObjectMap();

        map.ObjectTypeId = NetstatSolutionCardDefs.MainInfo.ID;
        map.Field(NetstatSolutionCardMainInfo.AddressProperty, "Address");
        map.Field(NetstatSolutionCardMainInfo.IsCheckedProperty, "IsChecked");
        map.Field(NetstatSolutionCardMainInfo.LastResultProperty, "LastResult");
        map.Field(NetstatSolutionCardMainInfo.NameProperty, "Name");
        map.Field(NetstatSolutionCardMainInfo.TypeProperty, "Type");
    }
}
