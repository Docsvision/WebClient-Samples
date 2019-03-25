# ShiftTasksEndDate

Этот пример серверного расширения демонстрирует реализацию автоматических изменений данных связанных карточек.
После сохранения карточки Документа ищутся все его связанные задания, и срок исполнения для отправленных на исполнение заданий переносится на 3 дня вперед.

## Настройка среды

**Перечень необходимых инструментов:** 
* [Visual Studio 2017](https://www.visualstudio.com)
* [NodeJS v10.6+](https://nodejs.org/en/)

## Сборка

1. Открыть /Samples.sln
2. Собрать проект ServerExtensions > ShiftTasksEndDate > ShiftTasksEndDateServerExtension
3. Открыть консоль в папке ServerExtensions > ShiftTasksEndDate > ShiftTasksEndDateWebExtension и выполнить команду npm install и npm run build:prod
4. Скопировать каталог SamplesOutput\Site\Extensions\ShiftTasksEndDateServerExtension в каталог "Путь к установленному Web-клиент\Site\Extensions"
5. Скопировать файл SamplesOutput\Site\Extensions\ru\ShiftTasksEndDateServerExtension.resources.dll в каталог "Путь к установленному Web-клиент\Site\Extensions\ru"
6. Скопировать файл SamplesOutput\Site\Extensions\uk\ShiftTasksEndDateServerExtension.resources.dll в каталог "Путь к установленному Web-клиент\Site\Extensions\uk"
7. Скопировать каталог SamplesOutput\Site\Content\Modules\ShiftTasksEndDateWebExtension в каталог "Путь к установленному Web-клиент\Site\Content\Modules"
8. Перезапустить IIS

## Проверка примера

1. Запустить конструктор разметок
2. Скопировать любую разметку редактирования
3. Выбрать условия использования этой разметки
4. В разметке редактирования на событие OnCardSaved элемента root прикрепляем обработчик с названием shiftTasksEndDate 
5. Сохранить разметку
6. Перезапустить IIS
7. Создать карточку документа
8. Добавить дочерние задания (не группы заданий), отправить на исполнение
9. Нажать на редактирование карточки, изменить что-нибудь, сохранить
10. Можно заметить, что срок исполнения для отправленных на исполнение заданий сдвинулся на 3 дня


## Проект ShiftTasksEndDateServerExtension

Проект-расширение для Web-клиент. Содержит бизнес-логику изменения данных связанных карточек.
Демонстрирует расширение функционала с помощью добавления новых сервисов, контроллеров.
Реализован контроллер AdvancedDocumentController с методом ShiftTasksEndDate, который вызывает сервис IShiftTasksEndDateService.

## Проект ShiftTasksEndDateWebExtension

Проект-расширение клиентской части Web-клиент. Содержит клиентский скрипт функции shiftTasksEndDate, которая вызывается на событие OnCardSaved.
С помощью requestManager.post отправляем запрос на сервер для изменения даты.

