﻿# GridHoverPanelGrouping

Этот каталог содержит пример добавления элемента в панель при наведении, который находится в ячейке шапки таблицы.

## Настройка среды

**Перечень необходимых инструментов:** 
* [NodeJS v14.17.0+](https://nodejs.org/en/)

## Сборка и установка

1. Открыть консоль в папке GridHoverPanelGroupingWebExtension и выполнить команду npm install, потом  npm update и в конце npm run build:prod
2. Скопировать каталог SamplesOutput\Site\Content\Modules\GridHoverPanelGroupingWebExtension в каталог "Путь к установленному Web-клиент\Site\Content\Modules"
3. Перезапустить IIS

## Проверка примера

1. Открыть папку с таблицей.
2. Навести курсором на ячейку в столбце таблицы, которая доступна для группировки.
3. После нажатия на иконку "Сгруппировать по столбцу", должна открыться боковая панель, если она была закрыта, и добавиться колонка в группируемых элементах.

## Проект GridHoverPanelGroupingWebExtension

Проект-расширение клиентской части Web-клиент. Содержит клиентский скрипт позволяющий добавить элемент в панель при наведении, отрисовать элемент в её ячейках, при нажатии на который группирует по столбцу.

Внимание! Данный пример демонстрирует только взаимодействие элемента в панели при наведении и группировки с помощью скрипта.