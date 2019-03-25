# ControlsRelation

Этот каталог содержит пример взаимодействия контролов.
При установке чека в чек-боксе, отобразить другой скрытый ЭУ. 

## Настройка среды

**Перечень необходимых инструментов:** 
* [NodeJS v10.6+](https://nodejs.org/en/)

## Сборка и установка


1. Открыть консоль в папке ControlsRelationWebExtension и выполнить команду npm install и npm run build:prod
2. Скопировать каталог SamplesOutput\Site\Content\Modules\ControlsRelationWebExtension в каталог "Путь к установленному Web-клиент\Site\Content\Modules"
3. Перезапустить IIS

## Проверка примера

1. Запустить конструктор разметок
2. Импортировать решение из файла ControlsRelationLayout.xml
2'. Либо создать собственное решение, создать для него разметку, добавить туда block, в него checkbox и label,
для label снять флаг со свойства Visibility и записать отображаемое имя в свойство Text, для checkbox добавить на onDataChanged вызов функции showRelatedControl:ControlsRelationExt
(пишется showRelatedControl:ControlsRelationExt без скобок и без кавычек, где showRelatedControl - имя функции, а ControlsRelationExt - псевдоним расширения, настроенный в ImportControlsRelationWebExtension.js).
3. Сделать решение ControlsRelationLayout или собственное активным для карточки типа Документ вида ДокументУД/Исходящий
4. На разметке расположен checkbox и label, причем label скрыт
5. Перезапустить IIS
6. Открыть документ ДокументУД\Исходящий и нажать кнопку редактировать. При этом должна открыться разметка с checkbox.
7. При нажатии на checkbox, элемент управления label должен появиться.

## Проект ControlsRelationWebExtension

Проект-расширение клиентской части Web-клиент. Содержит клиентский скрипт c функцией showRelatedControl реализующей взаимодействие контролов.

Внимание! Данный пример демонстрирует только доступ к элементу разметки. 
При реализации расширений рекомендуется использовать экспорт разметок в виде Решения.