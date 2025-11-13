## Описание
Это демонстрационный вариант расширения для WorkerService

Это расширение получает id карточки документа и конвертирует приложенные файлы в pdfa-формат

## Содержание решения

- SampleWorkerExtension.Manager
   проект содержит классы, непосредственно реализующие конечную бизнес-логику, которая используется в расширении(в данном семпле происходит происходит обработка файлов карточки)
- SampleWorkerExtension.ObjectModel
   Сборка содержит сервисы и классы, необходимые для работы расширения.
- SampleWorkerExtension.Role
	Проект содержит классы и интерфейсы обеспечивающие интеграцию расширения в WorkerService как сервиса-обработчика событий. В json-файле SampleWorkerExtension.json идет привязка фабрики заданий и очереди заданий к этой роли
	Фабрика отвечает за правильную настройку типа конфигурации в админке. Для процесса задается тип конфигурации, а тип конфигурации уже предусматривает настройку соединений, типа задания и очереди. 
	SampleRoleTemplateProvider реализует интерфейс, по которому расширения ищутся и загружаются. Без него расширение не будет загружено и обработано
	DocsvisionConnectionLinkId: Id типа соединения,можно указать случайный Guid. Если в вашем расширении нужен еще некоторый тип подключения(например почтовое), то нужно добавить еще одно поле и 
	при инициализации роли добавить его в List<RequiredConnectionType> GetRequiredConnections
	GetDisplayName определяет как в админке будет отображаться тип конфигурации(по сути локализация)
- SampleWorkerExtension.WorkerExtension
	Сборка - расширение WorkerService: здесь описывается сервис(SampleEventHandlerService), который обрабатывает события сгенерированные для воркера. Загружается логика обработки сообщений SampleWorkerExtension.Manager
- SampleWorkerExtension.WorkerService
   Проект реализует фабрику задач для WorkerService и позволяет обрабатывать в WorkerService собственное расширение и его сервисы, оформленные в виде сервисов-обработчиков событий.
   Обратите внимание, что в конструкторе фабрики SampleTaskFactory свойство MessageTypes(id сервисов обработки = SampleEventHandlerService.ServiceId) определяет какие типы сообщений будут запрашиваться из базы. 
   Если не указать нужный, то сообщения не будут обработаны
		
## Настройка среды

**Требования к модулям Docsvision:**

* ManagementConsole 6.1.174 и выше

**Перечень необходимых инструментов:** 
* [Visual Studio 2017/2022](https://www.visualstudio.com)

## Сборка

1. Открыть /Samples.sln
2. Собрать проект Others > SampleWorkerExtension
3. Собрать проект Samples\Others\SampleWorkerExtension\SampleWorkerExtension.WebClientExtension\SampleWorkerExtension.WebExtension (инструкция внутри проекта)
4. Собрать ConversionSample (инструкция внутри проекта)

## Установка

1. Создать папку /usr/lib/docsvision/common/SampleWorker
Поместить в нее файлы:
DocsVision.SampleWorkerExtension.Manager.dll
DocsVision.SampleWorkerExtension.ObjectModel.dll
DocsVision.SampleWorkerExtension.WorkerService.dll
ru\DocsVision.SampleWorkerExtension.WorkerService.resources.dll

**Возможно понадобится выдать для этой папки права, т.к. dv-сервисы могут быть запущены под разными пользователями(ВК уже запускается от non-root пользователя)**
**Если Web-клиент, WorkerService или ManagementConsole установлены на разных серверах, то этот пункт надо повторить для каждого**

2. Создать папку /usr/lib/docsvision/managementconsole/Extensions/SampleExtension

Добавить сборки DocsVision.SampleWorkerExtension.Role.dll вместе с ресурсами ru\DocsVision.SampleWorkerExtension.Role.resources.dll и конфигурационный файл SampleWorkerExtension.json(находится в проекте SampleWorkerExtension.Role) в папку Консоли управления. 

3. Создать папку /usr/lib/docsvision/workerservice/Extensions 

Добавить сборку DocsVision.SampleWorkerExtension.WorkerExtension.dll в папку 

4. Установить серверное и клиентское расширения для ВК, которые находятся в Others\SampleWorkerExtension\SampleWorkerExtension.WebClientExtension (инструкция внутри проекта)

5. Установить сэмпл ConversionSample (инструкция внутри проекта)

6. Отредактировать конфигурационный файл ExternalAPI /usr/lib/docsvision/externalapi/appsettings.json

В секцию Libraries добавить строку с SampleWorkerExtension.WorkerService. Секция будет выглядеть вот так:
```
	<Libraries>
      <add Path="DocsVision.BackOffice.ObjectModel, Version=6.0.0.0, Culture=neutral, PublicKeyToken=7148afe997f90519" />
	  <add Path="DocsVision.SampleWorkerExtension.WorkerService, Version=1.0.0.0, Culture=neutral, PublicKeyToken=4a2caa47aa5b6b29" /> 
    </Libraries>
```

## Проверка

1. В КОНСОЛИ УПРАВЛЕНИЯ создать процесс WorkerService с типом конфигурации "Расширение для WorkerService"
2. В разметке документа Web-клиента (например, просмотр) создать кнопку и добавить обработчик события "При щелчке" 
sendConversionTask;
3. Создать документ в Web-клиенте, приложить файл. Сохранить документ, и в открывшейся разметке нажать созданную кнопку. Через некоторое время в секции файлов появится сконвертированный pdf-файл. Для отображения файла в списке файлов необходимо обновить страницу.