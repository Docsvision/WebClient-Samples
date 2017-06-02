# Docsvision Web-клиент. Примеры разработки. 

В данном разделе содержатся примеры разработки скриптов и собственных элементов управления для использования в карточках Docsvision 5 Web-клиент, настроенных с использованием Конструктора Web-разметок.

### Системные требования

Для использования примеров необходимо наличие следующих продуктов:

* [Visual Studio](https://www.visualstudio.com)
* [TypeScript](https://www.typescriptlang.org)
* [Web Compiler](https://marketplace.visualstudio.com/items?itemName=MadsKristensen.WebCompiler)
* Включенные в **Visual Studio** опции  [NuGet Package Restore](https://docs.microsoft.com/en-us/nuget/consume-packages/package-restore#enabling-and-disabling-package-restore)
* [Docsvision 5 Resource Kit](ftp://ftp.docsvision.com/downloadarea/docsvision/Docsvision5.4.2642/ResourceKit.zip)
* [Docsvision 5 DVExplorer Update 9](ftp://ftp.docsvision.com/downloadarea/Docsvision/Docsvision5.4.2642/Update9/DVExplorer_Update9.zip)

### Структура разделов

В корне репозитория расположено решение для Visual Studio (**Samples.sln**) и ключ для подписания сборок сэмплов (**StrongNameKey.snk**)

 1. **Assemblies** - Сборки, необходимые для использования примеров
 2. **ClientScripts** - Примеры клиентских скриптов
 3. **ControlProperties/Url** - пример добавления свойства "Url" в конструктор разметок
 4. **Controls** - Примеры разработки собственных элементов управления
 5. **TemplateServerExtension** - шаблоны проектов для создания расширений для Web-клиента и для Конструктора разметок
 6. **ServerExtensions** - примеры с использованием серверных расширений Web-клиент
 7. **Typings** - содержит необходимые определения типов для TypeScript