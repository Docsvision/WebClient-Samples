using System;
using System.Collections.Generic;

namespace CSPSignatureVisualizationServerExtension.Helpers
{
    /// <summary>
    /// Содержит методы расширения
    /// </summary>
	internal static class Extensions
	{
        /// <summary>
        /// Разбивает строку на набор строк указанной длины
        /// </summary>
        /// <param name="str">Строка, которую необходимо разбить на набор строк</param>
        /// <param name="maxStringsLength">Максимальная длина строки из набора строк,
        /// на которые разбивавается указанная строка</param>
        /// <returns>Набор строк, на которые разбивавается указанная строка</returns>
        public static IEnumerable<string> Wrap(this string str, int maxStringsLength)
        {
            var strLength = str.Length;
            if (strLength > maxStringsLength)
            {
                var linesCount = (int)Math.Ceiling((double)str.Length / maxStringsLength);
                for (var i = 0; i < linesCount; i++)
                {
                    var startIndex = maxStringsLength * i;
                    var length = Math.Min(maxStringsLength, strLength - startIndex);
                    var line = str.Substring(startIndex, length);
                    yield return line;
                }
            }
            else yield return str;
        }
    }
}
