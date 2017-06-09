# Docsvision Web-клиент. Примеры разработки. 

В данном разделе содержатся примеры разработки скриптов и собственных элементов управления для использования в карточках Docsvision 5 Web-клиент, настроенных с использованием Конструктора Web-разметок.

### Системные требования

Для использования примеров необходимо наличие следующих продуктов:

* [Visual Studio](https://www.visualstudio.com)
* [TypeScript](https://www.typescriptlang.org)
* [Web Compiler](https://marketplace.visualstudio.com/items?itemName=MadsKristensen.WebCompiler)
* Включенные в **Visual Studio** опции  [NuGet Package Restore](https://docs.microsoft.com/en-us/nuget/consume-packages/package-restore#enabling-and-disabling-package-restore)
* [Docsvision 5 Resource Kit](http://bit.ly/2qEerjr)
* [Docsvision 5 DVExplorer Update 9](http://bit.ly/2sr5DKd)

### Структура разделов

В корне репозитория расположено решение для Visual Studio (**Samples.sln**) и ключ для подписания сборок сэмплов (**StrongNameKey.snk**)

 1. **Assemblies** - Сборки, необходимые для использования примеров
 2. **ClientScripts** - Примеры клиентских скриптов
 3. **ControlProperties/Url** - пример добавления свойства "Url" в конструктор разметок
 4. **Controls** - Примеры разработки собственных элементов управления
 5. **TemplateServerExtension** - шаблоны проектов для создания расширений для Web-клиента и для Конструктора разметок
 6. **ServerExtensions** - примеры с использованием серверных расширений Web-клиент
 7. **Typings** - содержит необходимые определения типов для TypeScript
