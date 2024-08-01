using System.Text;

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
            var words = str.Split(' ');
            var currentLine = new StringBuilder();

            foreach (var word in words)
            {
                if (currentLine.Length + word.Length + 1 > maxStringsLength)
                {
                    yield return currentLine.ToString();
                    currentLine.Clear();
                }

                if (currentLine.Length > 0)
                {
                    currentLine.Append(' ');
                }

                currentLine.Append(word);
            }

            if (currentLine.Length > 0)
            {
                yield return currentLine.ToString();
            }
        }
    }
}