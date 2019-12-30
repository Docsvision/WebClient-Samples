# ExternalWebService

Это демонстрационный вариант Web-сервиса, содержащего пример взаимодействия с платформой DocsVision. 

Web-сервис позволяет выполнять следующие действия с платформой DocsVision:
1. Получить информацию о карточке документа по её идентификатору
2. Создать карточку документа по переданной модели
3. Обновить данные карточки документа
4. Удалить карточку документа по её идентификатору
5. Изменить состояние карточки документа
6. Прикрепить файл к карточке документа
7. Получить файл по его идентификатору
8. Получить результат выполнения расширенного отчета

## Настройка среды

**Перечень необходимых инструментов:** 
* [Visual Studio 2017](https://www.visualstudio.com)
* [Docsvision 5 Resource Kit](http://bit.ly/2qEerjr)


## Сборка

1. Открыть /Samples.sln
2. Собрать проект Others > ExternalWebService > WebService
3. Собрать проект Others > ExternalWebService > WebServiceClient
4. На сервере Docsvision 5 установить Docsvision 5 Resource Kit, установить обновление DVExplorer. С помощью утилиты DVCardManager следует загрузить 
в БД Docsvision библиотеку ReportsLibrary из каталога `ExternalWebService\CardDefs\ReportsLibrary`. Подробное описание процедуры загрузки пользовательской 
библиотеки карточек содержится в документации разработчика Docsvision 5.
5. Перезапустить IIS


## Проверка примера

Первый вариант запуска веб-сервиса:

1. Запустить WebService: Debug > Start new instance
2. Запустить WebServiceClient Debug > Start new instance

Второй вариант запуска веб-сервиса:

1. Опубликовать проект WebService: WebService > Publish в желаемую директорию, директорию можно менять в параметре Targer Location, например, `\SamplesOutput\ExternalWebService\WebService`
2. Запустить IIS, создать новый пул приложений, в расширенных настройках значение параметра Identity заменить на свою учетную запись DocsVision Web-клиент, Enable 32-bit Applications установить в true  . 
ВАЖНО! Для корректной работы должен быть создан пул приложений, на котором работает StorageServer, как правило на рабочей машине он расположен в директории `C:\Program Files (x86)\Docsvision\Platform\5.5\Site\`
3. Создать новый сайт, изменить значение порта на любой кроме 80, например, 81. В качестве пути выбрать директорию, в которую был опубликован проект.
4. В настройках Properties > Settings проекта WebServiceClient поменять значение параметра WebServiceUrl на url созданного веб-приложения, например, `http://localhost:81/`
5. Пересобрать WebServiceClient
6. Запустить приложение WebServiceClient.exe расположенное в директории `SamplesOutput\ExternalWebService\WebServiceClient`

## Каталог CardDefs

Содержит описание библиотеки ReportsLibrary с одним расширенным отчетом,
который возвращает описание карточки (поле description) по её идентификатору


## Проект WebService.Interfaces

Проект содержит общие модели для веб-сервиса и клиентского приложения.

## Проект WebService

Предоставляет API для взаимодействия с сервером DocsVision. Содержит сервис DocumentService для работы с карточками типа Document.
Так же включает в себя ReportService, содержащий метод для выполнения расширенного отчета.

## Проект WebServiceClient

Содержит пример консольной утилиты для взаимодействия с веб-сервисом посредством WebApi.