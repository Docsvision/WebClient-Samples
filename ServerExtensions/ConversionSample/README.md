# ConversionSampleServerExtension

Этот пример серверного расширения демонстрирует пример взаиможействия с сервисом конвертации.

## Настройка среды

**Перечень необходимых инструментов:** 
* [Visual Studio 2019+](https://www.visualstudio.com)
* [NodeJS v14.17.0+](https://nodejs.org/en/)

> Для работы расширения требуется наличие в лицензии фичи **Docsvision Сервис конвертации файлов**.

## Сборка

1. Открыть /Samples.sln
2. Собрать проект ServerExtensions > ConversionSample > ConversionSampleServerExtension
3. Открыть консоль в папке ServerExtensions > ConversionSample > ConversionSampleWebExtension `npm install`, `npm update` и `npm run build:prod`
4. Скопировать каталог SamplesOutput\Site\Content\Modules\ConversionSampleWebExtension в каталог "Путь к установленному Web-клиент/Content/Modules"
5. Скопировать каталог SamplesOutput\Site\Extensions\ConversionSampleServerExtension в каталог "Путь к установленному Web-клиент/Extensions"
6. Перезапустить службу сервера приложений sudo systemctl restart dvappserver
7. Перезапустить службу Web-клиента sudo systemctl restart dvwebclient

## Проверка примера

> Для работы расширения требуется задать адрес Web-клиента в Справочнике системных настроек и адрес сервера Р7/OnlyOffice в конфигурационном файле Web-клиента.

1. Открыть конструктор веб-разметок.
2. В разметке просмотра документа на событие "Перед стартом согласования" элемента управления agreementManagement назначить обработчик attachPdfa.
3. Создать карточку документа, приложить к ней .docx-файл и отправить на согласование.
4. К документу будет добавлен первый файл из списка, сконвертированный в PDF/A.