using ImageDesignerExtension.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ImageDesignerExtension.Editors
{
    /// <summary>
    /// Represents slider mode helper
    /// </summary>
    class SliderModeHelper
    {
        private const char splitSymbol = ';';

        /// <summary>
        /// Converts the slider items list to a string
        /// </summary>
        /// <param name="items">slider items list</param>
        /// <returns>string</returns>
        public static string ItemsToString(List<SliderItem> items)
        {
            if (items == null)
                throw new ArgumentNullException("urls");

            StringBuilder sb = new StringBuilder();
            var last = items.LastOrDefault();

            foreach (var item in items)
            {
                sb.Append(item.Url);
                sb.Append(splitSymbol);
                sb.Append(item.DescriptionLocalizationKey);
                if (item != last)
                    sb.Append(splitSymbol);
            }

            return sb.ToString();
        }

        /// <summary>
        /// Converts the string to a slider items list
        /// </summary>
        /// <param name="str">string</param>
        /// <returns>slider items list</returns>
        public static List<SliderItem> StringToItems(string str)
        {
            List<SliderItem> result = new List<SliderItem>();
            if (!string.IsNullOrEmpty(str))
            {
                string[] parts = str.Split(splitSymbol);
                int i = 0;
                while (i < parts.Length)
                {
                    var item = new SliderItem();
                    item.Url = parts[i++];
                    item.DescriptionLocalizationKey = parts[i++];
                    result.Add(item);
                }
            }
            return result;
        }
    }
}
