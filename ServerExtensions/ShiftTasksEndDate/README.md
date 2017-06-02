# ShiftTasksEndDate

Этот пример серверного расширения демонстрирует реализацию автоматических изменений данных связанных карточек.
После сохранения карточки Документа ищутся все его связанные задания, и срок исполнения заданий переносится на 3 дня вперед.

## Настройка среды

**Перечень необходимых инструментов:** 
* [Visual Studio](https://www.visualstudio.com)
* [TypeScript](https://www.typescriptlang.org)
* Включенные в **Visual Studio** опции  [NuGet Package Restore](https://docs.microsoft.com/en-us/nuget/consume-packages/package-restore#enabling-and-disabling-package-restore)

## Сборка

1. Открыть /Samples.sln
2. Собрать проект ServerExtensions > ShiftTasksEndDate > ShiftTasksEndDateServerExtension
3. Скопировать каталог SamplesOutput\Site\Bin\ShiftTasksEndDateServerExtension в каталог "Путь к установленному Web-клиент\Site\Bin"
4. Скопировать файл SamplesOutput\Site\Bin\ru\ShiftTasksEndDateServerExtension.resources.dll в каталог "Путь к установленному Web-клиент\Site\Bin\ru"
5. Скопировать файл SamplesOutput\Site\Bin\uk\ShiftTasksEndDateServerExtension.resources.dll в каталог "Путь к установленному Web-клиент\Site\Bin\uk"
6. Скопировать каталог SamplesOutput\Site\Content\Extensions\ShiftTasksEndDate в каталог "Путь к установленному Web-клиент\Site\Content\Extensions"
7. В конфигурационном файле Web-клиент Web.config в секции Docsvision > Platform > Extensions добавить строку:
```xml
	 <Extension TypeName="ShiftTasksEndDateServerExtension.LayoutWebClientExtension, ShiftTasksEndDateServerExtension" Target="WebClient"/>
```
8. Перезапустить IIS

## Проверка примера

1. Запустить конструктор разметок
2. Скопировать любую разметку редактирования
3. Выбрать условия использования этой разметки
4. В разметке редактирования на событие OnCardSaved элемента root прикрепляем обработчик с названием shiftTasksEndDate 
5. Сохранить разметку
6. Перезапустить IIS
7. Создать карточку документа
8. Добавить дочерние задания (не группы заданий)
9. Нажать на редактирование карточки, изменить что-нибудь, сохранить
10. Можно заметить, что срок исполнения задний сдвинулся на 3 дня


## Проект ShiftTasksEndDateServerExtension

Проект-расширение для Web-клиент. Содержит бизнес-логику изменения данных связанных карточек.
Демонстрирует расширение функционала с помощью добавления новых сервисов, контроллеров.
Реализован контроллер AdvancedDocumentController с методом ShiftTasksEndDate, который вызывает сервис IShiftTasksEndDateService.

## Проект ShiftTasksEndDateWebExtension

Проект-расширение клиентской части Web-клиент. Содержит клиентский скрипт функции shiftTasksEndDate, которая вызывается на событие OnCardSaved.
С помощью requestManager.post отправляем запрос на сервер для изменения даты.

