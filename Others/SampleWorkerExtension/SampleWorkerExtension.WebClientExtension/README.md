# SampleWorkerExtension

Этот пример содержит создание сообщения для воркер-сервиса в серверном расширении веб-клиента.

## Настройка среды

**Перечень необходимых инструментов:** 
* [Visual Studio 2017/2019](https://www.visualstudio.com)
* [NodeJS v14.17.0+](https://nodejs.org/en/)

## Сборка

1. Открыть /Samples.sln
2. Собрать проект Others > SampleWorkerExtension > SampleWorkerExtension.WebClientServerExtension
3. Открыть консоль в папке Others > SampleWorkerExtension > SampleWorkerExtension.WebClientExtension > SampleWorkerExtension.WebExtension и выполнить команду npm install, потом  npm update и в конце npm run build:prod
4. Скопировать каталог SamplesOutput\Site\Content\Modules\SampleWorkerWebExtension в каталог "Путь к установленному Web-клиент\Site\Content\Modules"
5. Скопировать каталог SamplesOutput\Site\Extensions\SampleWorkerExtension.ServerExtension в каталог "Путь к установленному Web-клиент\Site\Extensions"
6. Перезапустить IIS

## Проверка примера

1. Запустить конструктор разметок
2. Скопировать любую разметку просмотра
3. Выбрать условия использования этой разметки
4. Открыть разметку и добавить в нее элемент управления "Кнопка"
5. На событие onClick задать функцию sendConversionTask 
6. Сохранить разметку
7. Перезапустить IIS
8. Открыть карточку с этой разметкой
9. Убедиться, что появился новый элемент управления (кнопка, при нажатии на которую создается исходящий документ)
10. Должен открыться исходящий документ, с заданными аттрибутами.

## Проект SampleWorkerExtension.ServerExtension

Проект-расширение для Web-клиент. Содержит скрипт для создания сообщения для воркер-сервиса. 
Демонстрирует расширение функционала с помощью добавления новых сервисов, контроллеров.
Реализован контроллер SampleWorkerController с методом SendToWorker, который вызывает сервис ISampleWorkerService,
в сервисе осуществляется создание сообщения для воркер-сервиса с переданным идентификатором карточки, откуда был вызван скрипт


## Проект SampleWorkerExtension.WebClientServerExtension

Содержит клиентские скрипты, в которых при нажатии на кнопку с помощью сервиса requestManager отправляется запрос на сервер. После конвертации файла в pdf, файл отображается в карточке