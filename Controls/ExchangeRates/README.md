# ExchangeRates

Этот каталог содержит пример реализации элемента управления "ExchangeRates".

## Настройка среды

**Перечень необходимых инструментов:** 
* [Visual Studio 2017/2019](https://www.visualstudio.com)
* [NodeJS v12.16.1+](https://nodejs.org/en/)

## Сборка и установка

1. Открыть /Samples.sln
2. Открыть консоль в папке Controls > ExchangeRates > ExchangeRatesWebExtension и выполнить команду `npm install` и `npm run build:prod`
3. Скопировать каталог SamplesOutput\Plugins\SampleExchangeRatesDesignerExtension в каталог "Путь к установленному Web-клиент\Plugins"
4. Скопировать каталог SamplesOutput\Site\Content\Modules\ExchangeRatesWebExtension в каталог "Путь к установленному Web-клиент\Site\Content\Modules"
5. Перезапустить IIS

## Проверка примера

1. Запустить конструктор разметок
2. Импортировать решение из файла SampleExchangeRatesControlDescriptionLayout.xml
3. Сделать решение SampleExchangeRatesControlDescriptionLayout активным для карточки типа Документ вида ДокументУД/Исходящий
4. Открыть разметку SampleExchangeRatesControlDescriptionLayout
4. Зарегистрировать бесплатный аккаунт на сайте https://fixer.io/signup/free
5. Перейти по ссылке https://fixer.io/quickstart и скопировать ключ доступа к API
6. Задать параметру "Ключ доступа к API" элемента управления "Sample Link" значение вашего ключа из шага выше
7. Задать остальные желаемые параметры элемента управления
8. Сохранить разметку
9. Перезапустить IIS
10. Открыть карточку с этой разметкой
11. Убедиться, что появился новый элемент управления

### Описание контрола SampleExchangeRatesControlDescription.xml

Демонстрирует добавление нового контрола без написания расширения для конструктора разметок.
Для этого необходимо описать контрол в xml файле, используя уже подключенные к конструктору свойства и ресурсы.

## Проект ExchangeRatesWebExtension

Проект-расширение клиентской части Web-клиент. Содержит клиентский скрипт и стили для SampleExchangeRates.
