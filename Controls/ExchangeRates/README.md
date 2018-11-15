# ExchangeRates

Этот каталог содержит пример реализации элемента управления "ExchangeRates".

## Настройка среды

**Перечень необходимых инструментов:** 
* [Visual Studio 2017](https://www.visualstudio.com)
* [TypeScript 2.8](https://www.typescriptlang.org)
* [Web Compiler](https://marketplace.visualstudio.com/items?itemName=MadsKristensen.WebCompiler)
* Включенные в **Visual Studio** опции  [NuGet Package Restore](https://docs.microsoft.com/en-us/nuget/consume-packages/package-restore#enabling-and-disabling-package-restore)

## Сборка и установка

1. Открыть /Samples.sln
2. Собрать проект Controls > ExchangeRates > ExchangeRatesDesignerExtension
3. Собрать проект Controls > ExchangeRates > ExchangeRatesWebExtension
4. Скопировать каталог SamplesOutput\Plugins\ExchangeRatesDesignerExtension в каталог "Путь к установленному Web-клиент\Plugins"
5. Скопировать каталог SamplesOutput\Site\Content\Extensions\ExchangeRates в каталог "Путь к установленному Web-клиент\Site\Content\Extensions"
6. Перезапустить IIS

## Проверка примера

1. Запустить конструктор разметок
2. Скопировать любую разметку для карточки вида "Служебная записка"
3. Выбрать условия использования этой разметки
4. Открыть разметку и добавить в нее новый элемент управления "Sample exchange rates"
5. Зарегистрировать бесплатный аккаунт на сайте https://fixer.io/signup/free
6. Перейти по ссылке https://fixer.io/quickstart и скопировать ключ доступа к API
7. Задать параметру "Ключ доступа к API" данного элемента управления значение вашего ключа из шага выше
8. Задать остальные желаемые параметры элемента управления
9. Сохранить разметку
10. Перезапустить IIS
11. Открыть карточку с этой разметкой
12. Убедиться, что появился новый элемент управления

### Описание контрола SampleExchangeRatesControlDescription.xml

Демонстрирует добавление нового контрола без написания расширения для конструктора разметок.
Для этого необходимо описать контрол в xml файле, используя уже подключенные к конструктору свойства и ресурсы.

## Проект ExchangeRatesWebExtension

Проект-расширение клиентской части Web-клиент. Содержит клиентский скрипт и стили для SampleExchangeRates.