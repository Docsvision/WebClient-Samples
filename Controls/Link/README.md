# Link

Требует подключенного расширения дизайнера разметок UrlProprtyDesignerExtension

Этот каталог содержит пример реализации элемента управления "Link".

## Настройка среды

**Перечень необходимых инструментов:** 
* [Visual Studio 2017](https://www.visualstudio.com)
* [TypeScript 2.5](https://www.typescriptlang.org)
* [Web Compiler](https://marketplace.visualstudio.com/items?itemName=MadsKristensen.WebCompiler)
* Включенные в **Visual Studio** опции  [NuGet Package Restore](https://docs.microsoft.com/en-us/nuget/consume-packages/package-restore#enabling-and-disabling-package-restore)

## Сборка и установка

1. Открыть /Samples.sln
2. Собрать проект Controls > Link > LinkWebExtension
3. Скопировать каталог SamplesOutput\Plugins\SampleLinkControl в каталог "Путь к установленному Web-клиент\Plugins"
4. Скопировать каталог SamplesOutput\Site\Content\Extensions\Link в каталог "Путь к установленному Web-клиент\Site\Content\Extensions"
5. Перезапустить IIS

## Проверка примера

1. Запустить конструктор разметок
2. Скопировать любую разметку
3. Выбрать условия использования этой разметки
4. Открыть разметку и добавить в нее новый элемент управления "Sample link"
5. Задать желаемые параметры элемента управления
6. Сохранить разметку
7. Перезапустить IIS
8. Открыть карточку с этой разметкой
9. Убедиться, что появился новый элемент управления

### Описание контрола SampleLinkControlDescription.xml

Демонстрирует добавление нового контрола без написания расширения для конструктора разметок.
Для этого необходимо описать контрол в xml файле, используя уже подключенные к конструктору свойства и ресурсы.


## Проект LinkWebExtension

Проект-расширение клиентской части Web-клиент. Содержит клиентский скрипт и стили для SampleLink.