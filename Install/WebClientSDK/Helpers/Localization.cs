using System.Collections.Generic;

namespace WebClientSDK.Helpers
{
    class Localization
    {
        public static Dictionary<string, string> RU = new Dictionary<string, string>
        {
            { "Language", "ru-ru" },
            { "WixLocalization", "WixUI_ru-ru.wxl" },
            { "DowngradeErrorMessage", "Более новая версия [ProductName] уже установлена." },
            { "ProductName", "Docsvision Web-клиент 18 SDK" },
            { "Comments", "Инсталляционная программа для" }
        };
        public static Dictionary<string, string> EN = new Dictionary<string, string>
        {
            { "Language", "en-us" },
            { "WixLocalization", "WixUI_en-us.wxl" },
            { "DowngradeErrorMessage", "A newer version of [ProductName] is already installed." },
            { "ProductName", "Docsvision Web-client 18 SDK" },
            { "Comments", "Installation program for" }
        };
    }
}
