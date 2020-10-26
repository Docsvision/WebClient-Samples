# ExtendedCardInfo

Этот пример разработки и подключения собственного серверного расширения для чтения значения полей, загруженных и не загруженных на страницу.

## Настройка среды

**Перечень необходимых инструментов:** 
* [Visual Studio 2017/2019](https://www.visualstudio.com)
* [NodeJS v12.16.1+](https://nodejs.org/en/)

## Сборка

1. Открыть /Samples.sln
2. Собрать проект ServerExtensions > ExtendedCardInfo > ExtendedCardInfoServerExtension
3. Открыть консоль в папке ServerExtensions > ExtendedCardInfo > ExtendedCardInfoWebExtension и выполнить команду npm install, потом  npm update и в конце npm run build:prod
4. Скопировать каталог SamplesOutput\Site\Extensions\ExtendedCardInfoServerExtension в каталог "Путь к установленному Web-клиент\Site\Extensions"
5. Скопировать файл SamplesOutput\Site\Extensions\ru\ExtendedCardInfoServerExtension.resources.dll в каталог "Путь к установленному Web-клиент\Site\Extensions\ru"
6. Скопировать файл SamplesOutput\Site\Extensions\uk\ExtendedCardInfoServerExtension.resources.dll в каталог "Путь к установленному Web-клиент\Site\Extensions\uk"
7. Скопировать каталог SamplesOutput\Site\Content\Modules\ExtendedCardInfoWebExtension в каталог "Путь к установленному Web-клиент\Site\Content\Modules"
8. Перезапустить IIS

## Проверка примера

1. Запустить конструктор разметок
2. Скопировать любую разметку просмотра
3. Выбрать условия использования этой разметки
4. Открыть разметку и для контрола RegDate(для разных видов карточки может варьироваться название (RegistrationDate)) на событие onChanged 
привязать функцию extendedCardCheckDates 
5. Сохранить разметку
6. Перезапустить IIS
7. Открыть карточку с этой разметкой
8. Убедиться, что при изменении даты появляется сообщение.

## Проект ExtendedCardInfoServerExtension

Проект-расширение для Web-клиент. Содержит бизнес-логику для чтения значения полей, загруженных и не загруженных на страницу.
Демонстрирует расширение функционала с помощью добавления новых сервисов, контроллеров.
Реализован контроллер ExtendedCardController с методом Get, который вызывает сервис IExtendedCardService,
 для чтения не загружаемых на страницу полей документа:  
	CreateDate 
    ChangeDate
    Description
    BarCode

## Проект ExtendedCardInfoWebExtension

Проект-расширение клиентской части Web-клиент. Содержит клиентский скрипт функции extendedCardCheckDates, которая вызывается на событие onChanged контрола RegDate.
С помощью requestManager.get отправляем запрос на сервер для получения расширенной модели IExtendedCardModel и сравниваем поля.

