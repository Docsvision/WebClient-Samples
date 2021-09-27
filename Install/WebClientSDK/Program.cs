using WebClientSDK.Helpers;

namespace WebClientSDK
{
    class Program
    {
        static void Main()
        {
            Project.Build(Localization.EN);
            Project.Build(Localization.RU);
        }
    }
}
