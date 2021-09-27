# Link

Требует подключенного расширения дизайнера разметок UrlPropertyDesignerExtension

Этот каталог содержит пример реализации элемента управления "Link".

## Настройка среды

**Перечень необходимых инструментов:** 
* [Visual Studio 2017/2019](https://www.visualstudio.com)
* [NodeJS v14.17.0+](https://nodejs.org/en/)

## Сборка и установка

1. Открыть /Samples.sln
4. Открыть консоль в папке Controls > Link > LinkWebExtension и выполнить команду npm install, потом  npm update и в конце npm run build:prod
3. Скопировать каталог SamplesOutput\Plugins\LinkDesignerExtension в каталог "Путь к установленному Web-клиент\Plugins"
4. Скопировать каталог SamplesOutput\Site\Content\Modules\LinkWebExtension в каталог "Путь к установленному Web-клиент\Site\Content\Modules"
5. Перезапустить IIS

## Проверка примера

1. Запустить конструктор разметок
2. Импортировать решение из файла SampleLinkControlDescriptionLayout.xml
3. Сделать решение LinkControlDescriptionLayout активным для карточки типа Документ вида ДокументУД/Исходящий
4. Открыть разметку LinkControlDescriptionLayout
5. Задать желаемые параметры элемента управления "Sample link"
6. Сохранить разметку
7. Перезапустить IIS
8. Открыть карточку с этой разметкой
9. Убедиться, что появился новый элемент управления

### Описание контрола SampleLinkControlDescription.xml

Демонстрирует добавление нового контрола без написания расширения для конструктора разметок.
Для этого необходимо описать контрол в xml файле, используя уже подключенные к конструктору свойства и ресурсы.


## Проект LinkClinetExtension

Проект-расширение клиентской части Web-клиент. Содержит клиентский скрипт и стили для SampleLink.
