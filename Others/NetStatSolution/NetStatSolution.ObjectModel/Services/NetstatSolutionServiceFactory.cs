using DocsVision.Platform.ObjectModel;

namespace NetStatSolution.ObjectModel.Services;

public class NetstatSolutionServiceFactory : ServiceFactory
{
    protected override object? GetService(Type serviceType)
    {
        if (serviceType == typeof(INetstatSolutionService))
        {
            return new NetstatSolutionService();
        }

        return null;
    }
}
