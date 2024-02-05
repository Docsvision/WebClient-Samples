## Расширение конструктора Web-разметок

### Перечень необходимых инструментов:

* [Visual Studio](https://www.visualstudio.com)
* [Docsvision WebClient SDK](https://docsvision.itsm365.com/sd/operator/index.jsp#uuid:KB$2437101)

### Сборка и установка

1. Убедитесь, что установлен Docsvision WebClient SDK (в частности, в этом случае в переменной окружения DocsvisionWebClientSDK содержится путь к его папке, например, C:\Program Files (x86)\Docsvision\WebClient\SDK\).
2. Соберите проект в VisualStudio.
3. Скопируйте $safeprojectname$.dll и $safeprojectname$.dll.pdb из папки "bin\Plugins" в `<Каталог установки Web-клиента>\Plugins`.

### Описание файлов проекта

* DesignerExtension.cs - входная точка расширение, в которой регистрируются описания контролов и прочие сущности.
* Sign.snk - файл подписи сборки. Для установки сборки должны быть подписаны. Рекомендуется сгенерировать новый файл подписи в настройках проекта.
* Resource.resx, Resource.ru.resx - локализации, используемые в расширении.
* Constants.cs - файл для объявления констант