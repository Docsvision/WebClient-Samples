using ImageDesignerExtension.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ImageDesignerExtension.Editors
{
    /// <summary>
    /// Представляет собой вспомогательный класс для режима слайдера
    /// </summary>
    class SliderModeHelper
    {
        private const char splitSymbol = ';';

        /// <summary>
        /// Конвертирует список элементов слайдера в строку
        /// </summary>
        /// <param name="items">Список элементов слайдера</param>
        /// <returns>Сконвертированная строка</returns>
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
        /// Конвертирует строку с информацией об элементах слайдера в список элементов слайдера
        /// </summary>
        /// <param name="str">Исходная строка</param>
        /// <returns>Список элементов слайдера</returns>
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
