﻿# TableControl

Этот пример содержит серверное расширение для отображения данных из связанных карточек в табличном контроле. 
В разметку карточки "Документ УД/Исходящий" добавляется таблица контрагентов, в колонках которой автоматически показываются e-mail и телефон выбранной в строке организации, загружаемые с сервера отдельным запросом.

## Настройка среды

Пример рассчитан на версию Web-клиента 18 (6.1) или выше.

**Перечень необходимых инструментов:** 
* [Visual Studio 2022](https://www.visualstudio.com)
* [NodeJS v16.20.0+](https://nodejs.org/en/)

## Сборка

1. Открыть /Samples.sln
2. Собрать проект ServerExtensions > TableControl > TableControlServerExtension
3. Открыть консоль в папке ServerExtensions > TableControl > TableControlWebExtension и выполнить команду npm install, потом  npm update и в конце npm run build:prod
4. Скопировать каталог SamplesOutput\Site\Content\Modules\TableControlWebExtension в каталог "Путь к сайту Web-клиента\Content\Modules"
5. Скопировать каталог SamplesOutput\Site\Extensions\TableControlServerExtension в каталог "Путь к сайту Web-клиента\Extensions"
6. Перезапустить Web-сервис

## Проверка примера

1. Запустить конструктор разметок
2. Скопировать разметку просмотра исходящего документа
3. Выбрать условия использования этой разметки
4. Открыть разметку и добавить в нее элемент управления "Таблица" в режиме "Редактирование по месту" и 3 столбца. Для таблицы в поле Источник данных (Data Source) секцию Partners Receivers.
5. В первый столбец поместить элемент управления Подразделение котрагента (Partner's department) в режиме "Редактирование по месту", задать имя samplePartnersDepartment. Значение Поле данных (Data Field) выбрать Partner company.
6. Во второй столбец поместить элемент управления Метка (Label), задать имя sampleDepartmentEmail
7. В третий столбец поместить элемент управления Метка (Label), задать имя sampleDepartmentPhone
8. На событие On card opened элемента root задать функцию sampleDocumentViewCardOpened 
9. Сохранить разметку
10. Перезапустить Web-сервис
11. Открыть карточку с этой разметкой, добавить строку в таблицу, выбрать контрагента, обновить страницу.
12. Убедиться, что почта и телефон контаргента заполнились.

## Проект TableControlServerExtension

Проект-расширение для Web-клиент. Содержит бизнес-логику и скрипт для отображения данных из связанных карточек в табличном контроле.
Демонстрирует расширение функционала с помощью добавления новых сервисов, контроллеров.
Реализован контроллер SamplePartnersController с методом GetPartnersInfo, который вызывает сервис ISamplePartnersService,
 для получения информации о контрагентах:  Phone, Email, Name.

## Проект TableControlWebExtension

Содержит клиентский скрипт с функцией sampleDocumentViewCardOpened, которая вызывается на событие On card opened.
Она отправляет запрос на сервер getPartnersInfo и заполняет таблицу вернувшимися данными.