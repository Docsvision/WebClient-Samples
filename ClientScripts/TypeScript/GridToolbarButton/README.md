﻿# GridToolbarButtonWebExtension

Этот каталог содержит пример для взаимодействия с панелью настроек таблицы.

## Настройка среды

**Перечень необходимых инструментов:** 
* [NodeJS v14.17.0+](https://nodejs.org/en/)

## Сборка и установка

1. Открыть консоль в папке GridToolbarButtonWebExtension и выполнить команду npm install, потом  npm update и в конце npm run build:prod
2. Скопировать каталог SamplesOutput\Site\Content\Modules\GridToolbarButtonWebExtension в каталог "Путь к установленному Web-клиент\Site\Content\Modules"
3. Перезапустить IIS

## Проверка примера

1. Открыть папку с таблицей и нажать на информационную кнопку в панели настроек таблицы.
2. Убедиться, что открылось модальное окно с информацией, в котором отображается количество загруженных карточек на данный момент и количество непрочитанных из них.

## Проект GridToolbarButtonWebExtension

Проект-расширение клиентской части Web-клиент. Содержит клиентский скрипт позволяющий открыть модальное окно нажатием на кнопку в панели настроек таблицы.

Внимание! Данный пример демонстрирует только изменение панели настроек в таблице с помощью скрипта.