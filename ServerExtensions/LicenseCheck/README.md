# LicenseCheck

Этот пример содержит проверку наличия дополнительной опции лицензионного ключа.

## Настройка среды

Пример рассчитан на версию Web-клиента 18 (6.1) или выше.

**Перечень необходимых инструментов:** 
* [Visual Studio 2022](https://www.visualstudio.com)
* [NodeJS v16.20.0+](https://nodejs.org/en/)

## Сборка

1. Открыть /Samples.sln
2. Собрать проект ServerExtensions > LicenseCheck > LicenseCheckServerExtension
3. Открыть консоль в папке ServerExtensions > LicenseCheck > LicenseCheckWebExtension и выполнить команду npm install, потом  npm update и в конце npm run build:prod
4. Скопировать каталог SamplesOutput\Site\Content\Modules\LicenseCheckWebExtension в каталог "Путь к сайту Web-клиента\Content\Modules"
5. Скопировать каталог SamplesOutput\Site\Extensions\LicenseCheckServerExtension в каталог "Путь к сайту Web-клиента\Extensions"
6. Перезапустить Web-сервис

## Проверка примера

1. Запустить конструктор разметок
2. Скопировать любую разметку просмотра
3. Выбрать условия использования этой разметки
4. Открыть разметку и добавить в нее элемент управления "Кнопка"
5. На событие onClick задать функцию checkLicenseFeature 
6. Сохранить разметку
7. Перезапустить Web-сервис
8. Открыть карточку с этой разметкой
9. Убедиться, что появился новый элемент управления (кнопка)
10. Нажать на кнопку. Должно появиться сообщение с результатом проверки

## Проект LicenseCheckServerExtension

Проект-расширение для Web-клиент. Содержит бизнес-логику и скрипт для проверки наличия дополнительной опции лицензионного ключа.
В данном примере это опция Docsvision Card Builder.
Демонстрирует расширение функционала с помощью добавления новых сервисов, контроллеров.
Реализован контроллер LicenseCheckController с методом CheckFeature, который вызывает сервис ILicenseCheckService


## Проект LicenseCheckWebExtension

Содержит скрипт, который при нажатии на кнопку с помощью сервиса requestManager отправляется запрос на сервер. Пользователю отображается сообщение о наличии или отсутствии опции.