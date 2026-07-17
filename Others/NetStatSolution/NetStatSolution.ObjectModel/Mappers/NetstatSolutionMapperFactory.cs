using DocsVision.Platform.ObjectModel;
using DocsVision.Platform.ObjectModel.Mapping;

namespace NetStatSolution.ObjectModel.Mappers;

public class NetstatSolutionMapperFactory : ObjectMapperFactory
{
    public NetstatSolutionMapperFactory(ObjectContext context)
        : base(context)
    {
        RegisterObjectMapper(typeof(NetstatSolutionCard), typeof(NetstatSolutionCardMapper));
        RegisterObjectMapper(typeof(NetstatSolutionCardMainInfo), typeof(NetstatSolutionCardMainInfoMapper));
        RegisterObjectMapper(typeof(NetstatSolutionCardJournal), typeof(NetstatSolutionCardJournalMapper));
    }
}
