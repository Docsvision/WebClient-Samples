## Описание
Это демонстрационный вариант расширения для WorkerService

Это расширение получает id карточки документа и конвертирует приложенные файлы в pdfa-формат

## Настройка среды

**Перечень необходимых инструментов:** 
* [Visual Studio 2017/2022](https://www.visualstudio.com)

## Сборка

1. Открыть /Samples.sln
2. Собрать проект Others > SampleWorkerExtension
3. Собрать проект Samples\Others\SampleWorkerExtension\SampleWorkerExtension.WebClientExtension\SampleWorkerExtension.WebExtension
выполнить 
npm i
npm run build
4. Собрать ConversionSample(подробная инструкция внутри семпла)

## Установка

1. Отправить в GAC сборки собранные(Samples\SamplesOutput\WorkerService) в пункте 2

gacutil.exe -if DocsVision.SampleWorkerExtension.Manager.dll
gacutil.exe -if DocsVision.SampleWorkerExtension.ObjectModel.dll
gacutil.exe -if DocsVision.SampleWorkerExtension.WorkerService.dll
gacutil.exe -if ru\DocsVision.SampleWorkerExtension.WorkerService.resources.dll

2. Добавить сборку DocsVision.SampleWorkerExtension.Role.dll и конфигурационный файл SampleWorkerExtension.json(находится в проекте SampleWorkerExtension.Role) в консоль настройки. 
Если папки с расширениями нет, то создать вручную. Например, C:\Program Files (x86)\Docsvision\ManagementConsole\SampleExtensions

3. Добавить сборку DocsVision.SampleWorkerExtension.WorkerExtension.dll в папку WorkerService
Например, C:\Program Files (x86)\Docsvision\WorkerService\5.5\Extensions

4. Установить серверное расширение ВК SampleWorkerExtension.WebClientServerExtension.dll(инструкция внутри проекта)

5. Установить сэмпл ConversionSample

6. Отредактировать конфигурационный файл ExternalAPI
C:\Program Files (x86)\Docsvision\ManagementConsoleExternalAPI\DocsVision.ManagementConsole.ExternalAPI.WindowsService.exe.config

В секцию Libraries добавить строку с SampleWorkerExtension.WorkerService. Секция будет выглядеть вот так:
	<Libraries>
      <add Path="DocsVision.BackOffice.ObjectModel, Version=5.5.0.0, Culture=neutral, PublicKeyToken=7148afe997f90519" />
	  <add Path="DocsVision.SampleWorkerExtension.WorkerService, Version=1.0.0.0, Culture=neutral, PublicKeyToken=4a2caa47aa5b6b29" /> 
    </Libraries>

## Проверка

1. В КОНСОЛИ УПРАВЛЕНИЯ создать процесс воркера с типом конфигурации Sample Extensions
2. В разметке документа ВК(например, просмотр) создать кнопку и добавить обработчик события "При щелчке" 
sendConversionTask;
3. Создать документ в вк, приложить файлы. Сохранить документ и в открывшейся разметке нажать созданную кнопку. Через некоторое время в секции файлов появятся сконвертированные pdf-файлы