# LicenseCheck

Этот пример содержит проверку наличия дополнительной опции лицензионного ключа.

## Настройка среды

**Перечень необходимых инструментов:** 
* [Visual Studio](https://www.visualstudio.com)
* [TypeScript 2.2](https://www.typescriptlang.org)
* Включенные в **Visual Studio** опции  [NuGet Package Restore](https://docs.microsoft.com/en-us/nuget/consume-packages/package-restore#enabling-and-disabling-package-restore)

## Сборка

1. Открыть /Samples.sln
2. Собрать проект ServerExtensions > LicenseCheck > LicenseCheckServerExtension
3. Скопировать каталог SamplesOutput\Site\Content\Extensions\LicenseCheck в каталог "Путь к установленному Web-клиент\Site\Content"
4. Скопировать каталог SamplesOutput\Site\Bin\LicenseCheckServerExtension в каталог "Путь к установленному Web-клиент\Site\Bin"
5. В конфигурационном файле Web-клиент Web.config в секции Docsvision > Platform > Extensions добавить строку:
```xml
	 <Extension TypeName="LicenseCheckServerExtension.LayoutWebClientExtension, LicenseCheckServerExtension" Target="WebClient"/>
```
6. Перезапустить IIS

## Проверка примера

1. Запустить конструктор разметок
2. Скопировать любую разметку просмотра
3. Выбрать условия использования этой разметки
4. Открыть разметку и добавить в нее элемент управления "Кнопка"
5. На событие onClick задать функцию checkLicenseFeature 
6. Сохранить разметку
7. Перезапустить IIS
8. Открыть карточку с этой разметкой
9. Убедиться, что появился новый элемент управления (кнопка)
10. Нажать на кнопку. Должно появиться сообщение с результатом проверки

## Проект LicenseCheckServerExtension

Проект-расширение для Web-клиент. Содержит бизнес-логику и скрипт для проверки наличия дополнительной опции лицензионного ключа.
В данном примере это опция Docsvision Card Builder.
Демонстрирует расширение функционала с помощью добавления новых сервисов, контроллеров.
Реализован контроллер LicenseCheckController с методом CheckFeature, который вызывает сервис ILicenseCheckService

При нажатии на кнопку с помощью объекта requestManager отправляется запрос на сервер. Пользователю отображается сообщение о наличии или отсутствии опции.

