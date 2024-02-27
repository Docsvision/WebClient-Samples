# ConverionSampleServerExtension

Этот пример серверного расширения демонстрирует пример взаиможействия с сервисом конвертации.

## Настройка среды

**Перечень необходимых инструментов:** 
* [Visual Studio 2019+](https://www.visualstudio.com)
* [NodeJS v14.17.0+](https://nodejs.org/en/)

> Для работы расширения требуется наличие в лицензии фичи **Docsvision Сервис конвертации файлов**.

## Сборка

1. Открыть /Samples.sln
2. Собрать проект ServerExtensions > ConverionSample > ConverionSampleServerExtension
3. Открыть консоль в папке ServerExtensions > ConverionSample > ConversionSampleWebExtension `npm install`, `npm update` и `npm run build:prod`
4. Скопировать каталог SamplesOutput\Site\Content\Modules\ConversionSampleWebExtension в каталог "Путь к установленному Web-клиент\Site\Content\Modules"
5. Скопировать каталог SamplesOutput\Site\Extensions\ConverionSampleServerExtension в каталог "Путь к установленному Web-клиент\Site\Extensions"
6. Перезапустить IIS на сервере Docsvision 5.
7. Перезапустить IIS на сервере Docsvision 5 Web-клиент.

## Проверка примера

> Для работы расширения требуется задать адрес Web-клиента в Справочнике системных настроек и адрес сервера Р7/OnlyOffice в конфигурационном файле Web-клиента.

1. Открыть конструктор веб-разметок.
2. В разметке просмотра документа на событие "Перед стартом согласования" элемента управления agreementManagement назначить обработчик attachPdfa.
3. Создать карточку документа, приложить к ней .docx-файл и отправить на согласование.
4. К документу будет добавлен первый файл из списка, сконвертированный в PDF/A.