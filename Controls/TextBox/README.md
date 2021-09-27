# TextBox

Требует подключенного расширения дизайнера разметок UrlProprtyDesignerExtension

Этот каталог содержит пример реализации элемента управления "TextBox".

## Настройка среды

**Перечень необходимых инструментов:** 
* [Visual Studio 2017/2019](https://www.visualstudio.com)
* [NodeJS v14.17.0+](https://nodejs.org/en/)

## Сборка и установка

1. Открыть /Samples.sln
2. Собрать проект Controls > TextBox > TextBoxDesignerExtension
3. Открыть консоль в папке Controls > TextBox > TextBoxWebExtension и выполнить команду npm install, потом  npm update и в конце npm run build:prod
4. Скопировать каталог SamplesOutput\Plugins\TextBoxDesignerExtension в каталог "Путь к установленному Web-клиент\Plugins"
5. Скопировать каталог SamplesOutput\Site\Content\Modules\TextBoxWebExtension в каталог "Путь к установленному Web-клиент\Site\Content\Modules"
6. Выполнить инструкции по сборке и установке семпла ControlProperties > Url
7. Перезапустить IIS

## Проверка примера

1. Запустить конструктор разметок
2. Скопировать любую разметку
3. Выбрать условия использования этой разметки
4. Открыть разметку и добавить в нее новый элемент управления "Пример текста"
5. Задать желаемые параметры элемента управления
6. Сохранить разметку
7. Перезапустить IIS
8. Открыть карточку с этой разметкой
9. Убедиться, что появился новый элемент управления

## Проект TextBoxDesignerExtension

Проект-расширение для конструктора разметок. Содержит описание элемента управления "Пример текста" для WebLayoutsDesigner.
Демонстрирует описание и подключение нового контрола, используя класс ControlTypeDescription, 
задание ему стандартных свойств, реализованных в  WebLayoutsDesigner (см. PropertyFactory.GetNameProperty()) и
добавление кастомного свойства, используя класс PropretyDescription (см. свойство Url). 

## Проект CheckBoxWebExtension

Проект-расширение клиентской части Web-клиент. Содержит клиентский скрипт, отрисовывающий textbox и картинку (свойство Url), и стили для TextBox. 