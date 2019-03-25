# TableControl

Этот пример содержит серверное расширение для отображения данных из связанных карточек в табличном контроле. 
В разметку карточки "Документ УД/Исходящий" добавляется таблица контрагентов, в колонках которой автоматически показываются e-mail и телефон выбранной в строке организации, загружаемые с сервера отдельным запросом.

## Настройка среды

**Перечень необходимых инструментов:** 
* [Visual Studio 2017](https://www.visualstudio.com)
* [NodeJS v10.6+](https://nodejs.org/en/)

## Сборка

1. Открыть /Samples.sln
2. Собрать проект ServerExtensions > TableControl > TableControlServerExtension
3. Открыть консоль в папке ServerExtensions > TableControl > TableControlWebExtension и выполнить команду npm install и npm run build:prod
4. Скопировать каталог SamplesOutput\Site\Content\Modules\TableControlWebExtension в каталог "Путь к установленному Web-клиент\Site\Content\Modules"
5. Скопировать каталог SamplesOutput\Site\Extensions\TableControlServerExtension в каталог "Путь к установленному Web-клиент\Site\Extensions"
6. Перезапустить IIS

## Проверка примера

1. Запустить конструктор разметок
2. Скопировать разметку просмотра исходящего документа
3. Выбрать условия использования этой разметки
4. Открыть разметку и добавить в нее элемент управления "Таблица" и 3 столбца. Для таблицы в поле Источник данных (Data Source) секцию Partners Receivers.
5. В первый столбец поместить элемент управления Подразделение котрагента (Partner's department), задать имя samplePartnersDepartment. Значение Поле данных (Data Field) выбрать Partner company.
6. Во второй столбец поместить элемент управления Метка (Label), задать имя sampleDepartmentEmail
7. В третий столбец поместить элемент управления Метка (Label), задать имя sampleDepartmentPhone
8. На событие On card opened элемента root задать функцию sampleDocumentViewCardOpened 
9. Сохранить разметку
10. Перезапустить IIS
11. Открыть карточку с этой разметкой
12. Убедиться, что появился новый элемент управления 

## Проект TableControlServerExtension

Проект-расширение для Web-клиент. Содержит бизнес-логику и скрипт для отображения данных из связанных карточек в табличном контроле.
Демонстрирует расширение функционала с помощью добавления новых сервисов, контроллеров.
Реализован контроллер SamplePartnersController с методом GetPartnersInfo, который вызывает сервис ISamplePartnersService,
 для получения информации о контрагентах:  Phone, Email, Name.

## Проект TableControlWebExtension

Содержит клиентский скипрт с функцией sampleDocumentViewCardOpened, которая вызывается на событие On card opened.
Она отправляет запрос на сервер getPartnersInfo и заполняет таблицу вернувшимися данными.