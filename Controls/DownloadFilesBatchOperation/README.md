# DownloadFilesGroupOperation

Этот каталог содержит пример реализации элемента управления "DownloadFilesGroupOperation".

## Настройка среды

**Перечень необходимых инструментов:** 
* [Visual Studio 2017/2019](https://www.visualstudio.com)
* [NodeJS v12.16.1+](https://nodejs.org/en/)

## Сборка и установка

1. Открыть /Samples.sln
2. Собрать проект Controls > DownloadFilesGroupOperation > DownloadFilesGroupOperationDesignerExtension
3. Собрать проект Controls > DownloadFilesGroupOperation > DownloadFilesGroupOperationServerExtension
4. Открыть консоль в папке Controls > DownloadFilesGroupOperation > DownloadFilesGroupOperationWebExtension и выполнить команду `npm install` и `npm run build:prod`
5. Скопировать каталог SamplesOutput\Plugins\DownloadFilesGroupOperationDesignerExtension в каталог "Путь к установленному Web-клиент\Plugins"
6. Скопировать каталог SamplesOutput\Site\Extensions\DownloadFilesGroupOperationServerExtension в каталог "Путь к установленному Web-клиент\Site\Extensions"
7. Скопировать каталог SamplesOutput\Site\Content\Modules\DownloadFilesGroupOperation в каталог "Путь к установленному Web-клиент\Site\Content\Modules"
8. Перезапустить IIS

## Проверка примера

1. Запустить конструктор разметок
2. В разметку WebFrame -> Grid group operations добавить контрол "Group operations / Download files"
3. Сохранить разметку
4. Откыть каталог с документами в Web-клиенте
5. Включить режим групповых операций и убедиться, что появился новый элемент управления

## Проект DownloadFilesGroupOperationDesignerExtension

Проект-расширение для конструктора разметок. Содержит описание элемента управления "Group operations / Download files" для WebLayoutsDesigner.
Демонстрирует описание и подключение нового контрола, используя класс ControlTypeDescription, 

## Проект DownloadFilesGroupOperationServerExtension

Содержит контроллер, в котором формируется список файлов документа, который запрашивается элементом управления DownloadFilesGroupOperation.

## Проект DownloadFilesGroupOperationWebExtension

Проект-расширение клиентской части Web-клиент. Содержит реализацию элемента управления DownloadFilesGroupOperation.
