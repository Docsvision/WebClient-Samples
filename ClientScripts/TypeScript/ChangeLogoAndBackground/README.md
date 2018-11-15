# ChangeLogoAndBackground

Этот каталог содержит пример для изменения заголовка и стилей web-навигатора.

## Настройка среды

**Перечень необходимых инструментов:** 
* [Visual Studio 2017](https://www.visualstudio.com)
* [TypeScript 2.8](https://www.typescriptlang.org)
* [Web Compiler](https://marketplace.visualstudio.com/items?itemName=MadsKristensen.WebCompiler)
* Включенные в **Visual Studio** опции  [NuGet Package Restore](https://docs.microsoft.com/en-us/nuget/consume-packages/package-restore#enabling-and-disabling-package-restore)

## Сборка и установка

1. Открыть /Samples.sln
2. Собрать проект ClientScripts > ChangeLogoAndBackground > ChangeLogoAndBackgroundWebExtension
3. Скопировать каталог SamplesOutput\Site\Content\Extensions\ChangeLogoAndBackgroundTS в каталог "Путь к установленному Web-клиент\Site\Content\Extensions"
4. Перезапустить IIS

## Проверка примера

1. Открыть Dashboard или любую папку.

## Проект ChangeLogoAndBackgroundWebExtension

Проект-расширение клиентской части Web-клиент. Содержит клиентский скрипт изменяющий внешний вид и заголовок системы.

Внимание! Данный пример демонстрирует только изменение внешнего вида и заголовка системы с помощью скрипта.