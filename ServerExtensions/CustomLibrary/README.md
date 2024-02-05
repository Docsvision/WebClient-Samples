# CustomLibrary

Этот пример серверного расширения демонстрирует пример взаимодейстия с пользовательским типом карточки DocsVision.
В библиотеке Sample custom library реализован тип карточки Custom Directory, который представляет из себя справочник
с полем Counter, значение которого получается скриптом и выводится во всплывающем окне.

## Настройка среды

Пример рассчитан на версию Web-клиента 18 (6.1) или выше.

**Перечень необходимых инструментов:** 
* [Visual Studio 2022](https://www.visualstudio.com)
* [NodeJS v16.20.0+](https://nodejs.org/en/)
* [Docsvision Resource Kit](https://docsvision.itsm365.com/sd/operator/#uuid:KB$2437101)
* [Docsvision DVExplorer](https://docsvision.itsm365.com/sd/operator/#uuid:KB$2437101)

## Сборка

1. Открыть /Samples.sln
2. Собрать проекты ServerExtensions > CustomLibrary > CustomLibrary.ObjectModel и CustomLibraryServerExtension
3. Открыть консоль в папке ServerExtensions > CustomLibrary > CustomLibraryWebExtension и выполнить команду npm install, потом  npm update и в конце npm run build:prod
4. Скопировать каталог SamplesOutput\Site\Extensions\CustomLibraryServerExtension в каталог "Путь к сайту Web-клиента\Extensions"
5. Скопировать каталог SamplesOutput\Site\Content\Modules\CustomLibraryWebExtension в каталог "Путь к сайту Web-клиента\Content\Modules"
6. (Внимание! Перед выполнением следующего шага, рекомендуется сделать резервную копию базы данных DocsVision)
На сервере Docsvision установить Docsvision Resource Kit, установить обновление DVExplorer. С помощью утилиты DVCardManager следует загрузить 
в БД Docsvision библиотеку CustomCardLib из каталога SamplesOutput\SamplesCardDefs\CustomLibrary. Подробное описание процедуры загрузки пользовательской 
библиотеки карточек содержится в документации разработчика Docsvision. 
7. С помощью утилиты DVExplorer подключиться к БД, открыть карточку справочника Custom Directory, добавить строку секции MainInfo 
и установить значение 777 в поле Counter. Сохранить изменения. Подробное описание работы с утилитой DVExplorer содержится в документации 
разработчика Docsvision. 
8. Перезапустить Web-сервис на сервере Docsvision.
9. Перезапустить Web-сервис на сервере Docsvision Web-клиент.

## Проверка примера

1. Запустить конструктор разметок
2. Скопировать любую разметку просмотра
3. Выбрать условия использования этой разметки
4. В разметке просмотра на событие OnCardOpened элемента root указать обработчик с названием getCustomData 
5. Сохранить разметку
6. Перезапустить Web-сервис
7. Создать карточку документа
8. При открытии разметки просмотра появится всплывающее сообщение: 'Custom data: 777'

## Каталог CardDefs

Содержит описание библиотеки Sample custom library, в которой описан тип карточки CustomDirectory - справочник, в 
секции MainInfo которого есть поле Counter. Подробности содержатся в документации разработчика Docsvision.

## Проект CustomLibrary.ObjectModel

Проект содержит объектную модель карточки типа CustomDirectory. Подробности содержатся в документации разработчика Docsvision.

## Проект CustomLibraryServerExtension

Проект-расширение для Web-клиент. Содержит сервис по работе со справочником CustomDirectory, методы контроллера CustomLibrary 
для взаимодейстия с клиентскими скриптами веб-приложения.

## Проект CustomLibraryWebExtension

Содержит клиентский скрипт getCustomData.
