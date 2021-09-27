# CheckBox

Этот каталог содержит пример реализации элемента управления "CheckBox".

## Настройка среды

**Перечень необходимых инструментов:** 
* [Visual Studio 2017/2019](https://www.visualstudio.com)
* [NodeJS v14.17.0+](https://nodejs.org/en/)

## Сборка и установка

1. Открыть /Samples.sln
2. Собрать проект Controls > CheckBox > CheckBoxDesignerExtension
3. Открыть консоль в папке Controls > CheckBox > CheckBoxWebExtension и выполнить команду `npm install` и `npm run build:prod`
4. Скопировать каталог SamplesOutput\Plugins\CheckBoxDesignerExtension в каталог "Путь к установленному Web-клиент\Plugins"
5. Скопировать каталог SamplesOutput\Site\Content\Modules\CheckBoxWebExtension в каталог "Путь к установленному Web-клиент\Site\Content\Modules"
6. Перезапустить IIS


## Проверка примера

1. Запустить конструктор разметок
2. Скопировать любую разметку для карточки вида "Служебная записка"
3. Выбрать условия использования этой разметки
4. Открыть разметку и добавить в нее новый элемент управления "Пример флага"
5. Задать желаемые параметры элемента управления
6. Сохранить разметку
7. Перезапустить IIS
8. Открыть карточку с этой разметкой
9. Убедиться, что появился новый элемент управления

## Проект CheckBoxDesignerExtension

Проект-расширение для конструктора разметок. Содержит описание элемента управления "Пример флага" для WebLayoutsDesigner.
Демонстрирует описание и подключение нового контрола, используя класс ControlTypeDescription, 
задание ему стандартных свойств, реализованных в  WebLayoutsDesigner (см. PropertyFactory.GetNameProperty()) и
добавление кастомного свойства, используя класс PropretyDescription (см. свойство DefaultValue). 
Для свойства Поле секции (источник данных), реализован редактор, фильтрующий поля по типу boolean. (класс BooleanMetadataEditor)

## Проект CheckBoxWebExtension

Проект-расширение клиентской части Web-клиент. Содержит клиентский скрипт и стили для CheckBox.