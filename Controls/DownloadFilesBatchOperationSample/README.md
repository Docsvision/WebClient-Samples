﻿# DownloadFilesBatchOperationSample

Этот каталог содержит пример реализации элемента управления "DownloadFilesBatchOperationSample".

## Настройка среды

Пример рассчитан на версию Web-клиента 18 (6.1) или выше.

**Перечень необходимых инструментов:** 
* [Visual Studio 2022](https://www.visualstudio.com)
* [NodeJS v16.20.0+](https://nodejs.org/en/)

## Сборка и установка

1. Открыть /Samples.sln
2. Собрать проект Controls > DownloadFilesBatchOperationSample > DownloadFilesBatchOperationSampleDesignerExtension
3. Собрать проект Controls > DownloadFilesBatchOperationSample > DownloadFilesBatchOperationSampleServerExtension
4. Открыть консоль в папке Controls > DownloadFilesBatchOperationSample > DownloadFilesBatchOperationSampleWebExtension и выполнить команду `npm install` и `npm run build:prod`
5. Скопировать каталог SamplesOutput\Plugins\DownloadFilesBatchOperationSampleDesignerExtension в каталог "Путь к директории с исполняемым файлом конструктора Web-разметок\Plugins"
6. Скопировать каталог SamplesOutput\Site\Extensions\DownloadFilesBatchOperationSampleServerExtension в каталог "Путь к сайту Web-клиента\Extensions"
7. Скопировать каталог SamplesOutput\Site\Content\Modules\DownloadFilesBatchOperationSample в каталог "Путь к сайту Web-клиента\Content\Modules"
8. Перезапустить Web-сервис

## Проверка примера

1. Запустить конструктор разметок
2. В разметку WebFrame -> Папка добавить контрол "Group operations / Download files (sample)"
3. Сохранить разметку
4. Откыть каталог с документами в Web-клиенте
5. Включить режим групповых операций и убедиться, что появился новый элемент управления

## Проект DownloadFilesBatchOperationSampleDesignerExtension

Проект-расширение для конструктора разметок. Содержит описание элемента управления "Group operations / Download files (sample)" для WebLayoutsDesigner.
Демонстрирует описание и подключение нового контрола, используя класс ControlTypeDescription, 

## Проект DownloadFilesBatchOperationSampleServerExtension

Содержит контроллер, в котором формируется список файлов документа, который запрашивается элементом управления DownloadFilesBatchOperationSample.

## Проект DownloadFilesBatchOperationSampleWebExtension

Проект-расширение клиентской части Web-клиент. Содержит реализацию элемента управления DownloadFilesBatchOperationSample.
