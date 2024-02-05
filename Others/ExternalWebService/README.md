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

Пример рассчитан на версию Web-клиента 18 (6.1) или выше.

**Перечень необходимых инструментов:** 
* [Visual Studio 2022](https://www.visualstudio.com)
* [Docsvision Resource Kit](https://docsvision.itsm365.com/sd/operator/#uuid:KB$2437101)


## Сборка

1. Открыть /Samples.sln
2. Собрать проект Others > ExternalWebService > WebService
3. Собрать проект Others > ExternalWebService > WebServiceClient
4. На сервере Docsvision установить Docsvision Resource Kit. С помощью утилиты DVCardManager следует загрузить 
в БД Docsvision библиотеку ReportsLibrary из каталога `ExternalWebService\CardDefs\ReportsLibrary`. Подробное описание процедуры загрузки пользовательской 
библиотеки карточек содержится в документации разработчика Docsvision.
5. Перезапустить Web-сервис


## Проверка примера

1. Отредактировать в файле SamplesOutput\ExternalWebService\WebService\appsettings.json параметры ServerAddress и BaseName так, чтобы они указывали на рабочий сервер Доксвижн и базу.
2. Запустить WebService из папки SamplesOutput\ExternalWebService\WebService.
- На Windows запустить WebService.exe из под учетной записи DocsVision Web-клиент. 
- На Linux запустить командой dotnet WebService.dll 
  Для запуска под нужной учетной записью можно задать параметры "SystemUserAccount" и "SystemUserPassword" в appsettings.json.
3. Запустить приложение SamplesOutput\ExternalWebService\WebServiceClient\WebServiceClient.exe. В выводе консоли отобразится результат выполнения операций.

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