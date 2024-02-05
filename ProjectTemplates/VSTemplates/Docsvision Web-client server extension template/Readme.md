## Серверное расширение Web-клиента

### Перечень необходимых инструментов:

* [Visual Studio](https://www.visualstudio.com)
* [Docsvision WebClient SDK](https://docsvision.itsm365.com/sd/operator/index.jsp#uuid:KB$2437101)


### Сборка и установка

1. Убедитесь, что установлен Docsvision WebClient SDK (в частности, в этом случае в переменной окружения DocsvisionWebClientSDK содержится путь к его папке, например, C:\Program Files (x86)\Docsvision\WebClient\SDK\).
2. Соберите проект в VisualStudio.
3. Скопируйте $safeprojectname$.dll и $safeprojectname$.dll.pdb из папки "bin\WebClientBin" в `<Каталог установки Web-клиента>\Extensions`.

### Проверка работы

1. Открыть Web-клиент
2. Открыть диалог "О программе" и убедиться, что расширение присутствует в списке подключенных расширений.
3. Открыть произвольный документ и в консоли браузера выполнить:

await layoutManager.cardLayout.getService("requestManager").post("api/Feature1/Action1", JSON.stringify({ documentId: layoutManager.cardLayout.getService("cardId") }));

4. Обновить документ, убедиться, что в названии добавился знак.

### Описание файлов проекта

* ServerExtension.cs - входная точка расширение, в которой регистрируются сервисы и прочие сущности.
* Sign.snk - файл подписи сборки. Для установки сборки должны быть подписаны. Рекомендуется сгенерировать новый файл подписи в настройках проекта.
* Resource.resx, Resource.ru.resx - локализации, используемые в расширении.
* Feature1 - папка, содержащая реализацию некоторой функциональности.
* Feature1/Feature1Controller.cs - класс, регистрирующий конечные точки Web API.
* Feature1/IFeature1Service.cs и Feature1/Feature1Service.cs - интерфейс и реализация сервиса, реализующего логику обработки запроса.
* Feature1/Models - классы моделей, используемых в сервисе и контроллере.