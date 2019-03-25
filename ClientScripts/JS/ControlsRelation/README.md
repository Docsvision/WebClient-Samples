# ControlsRelation

Этот каталог содержит пример взаимодействия контролов.
При установке чека в чек-боксе, отобразить другой скрытый ЭУ. 

## Настройка среды

**Перечень необходимых инструментов:** 
* [Visual Studio 2017](https://www.visualstudio.com)
* Включенные в **Visual Studio** опции  [NuGet Package Restore](https://docs.microsoft.com/en-us/nuget/consume-packages/package-restore#enabling-and-disabling-package-restore)

## Сборка и установка

1. Открыть /Samples.sln
2. Собрать проект ClientScripts > JS > ControlsRelation > ControlsRelationWebExtension
3. Скопировать каталог SamplesOutput\Site\Content\Modules\ControlsRelationJS в каталог "Путь к установленному Web-клиент\Site\Content\Modules"
4. Перезапустить IIS

## Проверка примера

1. Запустить конструктор разметок
2. Импортировать решение из файла ControlsRelationLayout.xml
2'. Либо создать собственное решение, создать для него разметку, добавить туда block, в него checkbox и label,
для label снять флаг со свойства Visibility и записать отображаемое имя в свойство Text, для checkbox добавить на onDataChanged вызов функции showRelatedControl
(пишется showRelatedControl без скобок и без кавычек).
3. Сделать решение ControlsRelationLayout или собственное активным для карточки типа Документ вида ДокументУД/Исходящий
4. На разметке расположен checkbox и label, причем label скрыт
5. Перезапустить IIS
6. Открыть документ ДокументУД\Исходящий и нажать кнопку редактировать. При этом должна открыться разметка с checkbox.
7. При нажатии на checkbox, элемент управления label должен появиться.

## Проект ControlsRelationWebExtension

Проект-расширение клиентской части Web-клиент. Содержит клиентский скрипт c функцией showRelatedControl реализующей взаимодействие контролов.

Внимание! Данный пример демонстрирует только доступ к элементу разметки. 
При реализации расширений рекомендуется использовать экспорт разметок в виде Решения.