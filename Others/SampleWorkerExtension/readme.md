## Описание
Это демонстрационный вариант расширения для WorkerService

Это расширение получает id карточки документа и конвертирует приложенные файлы в pdfa-формат

## Настройка среды

**Требования к модулям Docsvision:**

* ManagementConsole 5.5.264.0 (1572) и выше

**Перечень необходимых инструментов:** 
* [Visual Studio 2017/2022](https://www.visualstudio.com)

## Сборка

1. Открыть /Samples.sln
2. Собрать проект Others > SampleWorkerExtension
3. Собрать проект Samples\Others\SampleWorkerExtension\SampleWorkerExtension.WebClientExtension\SampleWorkerExtension.WebExtension (инструкция внутри проекта)
4. Собрать ConversionSample (инструкция внутри проекта)

## Установка

1. Отправить в GAC сборки собранные(Samples\SamplesOutput\WorkerService) в пункте 2

gacutil.exe -if DocsVision.SampleWorkerExtension.Manager.dll
gacutil.exe -if DocsVision.SampleWorkerExtension.ObjectModel.dll
gacutil.exe -if DocsVision.SampleWorkerExtension.WorkerService.dll
gacutil.exe -if ru\DocsVision.SampleWorkerExtension.WorkerService.resources.dll

2. Добавить сборки DocsVision.SampleWorkerExtension.Role.dll вместе с ресурсами ru\DocsVision.SampleWorkerExtension.Role.resources.dll и конфигурационный файл SampleWorkerExtension.json(находится в проекте SampleWorkerExtension.Role) в папку Консоли управления. 
Если папки с расширениями нет, то создать вручную. Например, C:\Program Files (x86)\Docsvision\ManagementConsole\SampleExtensions

3. Добавить сборки DocsVision.SampleWorkerExtension.WorkerExtension.dll и DocsVision.SampleWorkerExtension.WorkerService.dll в папку WorkerService
Например, C:\Program Files (x86)\Docsvision\WorkerService\5.5\Extensions

4. Установить серверное и клиентское расширения для ВК, которые находятся в Others\SampleWorkerExtension\SampleWorkerExtension.WebClientExtension (инструкция внутри проекта)

5. Установить сэмпл ConversionSample (инструкция внутри проекта)

6. Отредактировать конфигурационный файл ExternalAPI
C:\Program Files (x86)\Docsvision\ManagementConsoleExternalAPI\DocsVision.ManagementConsole.ExternalAPI.WindowsService.exe.config

В секцию Libraries добавить строку с SampleWorkerExtension.WorkerService. Секция будет выглядеть вот так:
```
	<Libraries>
      <add Path="DocsVision.BackOffice.ObjectModel, Version=5.5.0.0, Culture=neutral, PublicKeyToken=7148afe997f90519" />
	  <add Path="DocsVision.SampleWorkerExtension.WorkerService, Version=1.0.0.0, Culture=neutral, PublicKeyToken=4a2caa47aa5b6b29" /> 
    </Libraries>
```

## Проверка

1. В КОНСОЛИ УПРАВЛЕНИЯ создать процесс WorkerService с типом конфигурации "Расширение для WorkerService"
2. В разметке документа Web-клиента (например, просмотр) создать кнопку и добавить обработчик события "При щелчке" 
sendConversionTask;
3. Создать документ в Web-клиенте, приложить файл. Сохранить документ, и в открывшейся разметке нажать созданную кнопку. Через некоторое время в секции файлов появится сконвертированный pdf-файл. Для отображения файла в списке файлов необходимо обновить страницу.