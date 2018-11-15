# HyperComments

Этот каталог содержит пример реализации элемента управления "HyperComments".

## Настройка среды

**Перечень необходимых инструментов:** 
* [Visual Studio 2017](https://www.visualstudio.com)
* [TypeScript 2.8](https://www.typescriptlang.org)
* [Web Compiler](https://marketplace.visualstudio.com/items?itemName=MadsKristensen.WebCompiler)
* Включенные в **Visual Studio** опции  [NuGet Package Restore](https://docs.microsoft.com/en-us/nuget/consume-packages/package-restore#enabling-and-disabling-package-restore)

## Сборка и установка

1. Открыть /Samples.sln
2. Собрать проект Controls > HyperComments > HyperCommentsDesignerExtension
3. Собрать проект Controls > HyperComments > HyperCommentsWebExtension
4. Скопировать каталог SamplesOutput\Plugins\HyperCommentsDesignerExtension в каталог "Путь к установленному Web-клиент\Plugins"
5. Скопировать каталог SamplesOutput\Site\Content\Extensions\HyperComments в каталог "Путь к установленному Web-клиент\Site\Content\Extensions"
6. Перезапустить IIS

## Регистрация виджета HyperComments
1. Перейти на сайт https://www.hypercomments.com
2. Нажать на кнопку "Войти"
3. Авторизоваться под аккаунтом Google
4. Выбрать лицензию и следовать инструкциям
5. Нажать на кнопку "Установить"
6. Ввести адрес сайта (Допустимо имя сайта в локальной сети)
7. Выбрать тип виджета - HTML Custom code
8. Нажать "Далее"
9. Нажать "Готово"
10. Перейти на страницу "Виджет - Общее"
11. Под заголовком указан идентификатор виджета ID: ######, его следует запомнить, он потребуется далее
12. Установить галку напротив настройки "Get-параметры
Учитывать GET параметры и генерировать новый виджет комментирования для отдельной страницы."
13. Нажать на кнопку "Сохранить"


## Проверка примера

1. Запустить конструктор разметок
2. Скопировать любую разметку для карточки вида "Служебная записка"
3. Выбрать условия использования этой разметки
4. Открыть разметку и добавить в нее новый элемент управления "Hyper comments"
5. Задать значение свойства "Widget id" идентификатором из п.11 регистрации виджета 
6. Сохранить разметку
7. Перезапустить IIS
8. Открыть карточку с этой разметкой
9. Убедиться, что появился новый элемент управления

## Проект HyperCommentsDesignerExtension

Проект-расширение для конструктора разметок. Содержит описание элемента управления "HyperComments" для WebLayoutsDesigner.
Демонстрирует описание и подключение нового контрола, используя класс ControlTypeDescription, 
задание ему стандартных свойств, реализованных в  WebLayoutsDesigner (см. PropertyFactory.GetNameProperty()) и
добавление кастомного свойства, используя класс PropretyDescription (см. свойство WidgetId). 

## Проект HyperCommentsWebExtension

Проект-расширение клиентской части Web-клиент. Содержит пример одного из способов интеграции со сторонними веб приложениями.
