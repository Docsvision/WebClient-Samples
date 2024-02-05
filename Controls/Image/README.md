# Image

Требует подключенного расширения дизайнера разметок UrlProprtyDesignerExtension

Этот каталог содержит пример реализации элемента управления "Image".

## Настройка среды

Пример рассчитан на версию Web-клиента 18 (6.1) или выше.

**Перечень необходимых инструментов:** 
* [Visual Studio 2022](https://www.visualstudio.com)
* [NodeJS v16.20.0+](https://nodejs.org/en/)

## Сборка и установка

1. Открыть /Samples.sln
2. Собрать проект Controls > Image > ImageDesignerExtension
3. Собрать проект Controls > Image > ImageServerExtension
4. Открыть консоль в папке Controls > Image > ImageWebExtension и выполнить команду npm install, потом  npm update и в конце npm run build:prod
5. Собрать проект ControlProperties > Url > UrlPropertyDesignerExtension
6. Скопировать каталог SamplesOutput\Plugins\ImageDesignerExtension в каталог "Путь к директории с исполняемым файлом конструктора Web-разметок\Plugins"
7. Скопировать каталог SamplesOutput\Site\Extensions\ImageServerExtension в каталог "Путь к сайту Web-клиента\Extensions"
8. Скопировать каталог SamplesOutput\Site\Content\Modules\ImageWebExtension в каталог "Путь к сайту Web-клиента\Content\Modules"
9. Скопировать каталог SamplesOutput\Plugins\UrlPropertyDesignerExtension в каталог "Путь к директории с исполняемым файлом конструктора Web-разметок\Plugins"
10. Перезапустить Web-сервис

## Проверка примера

1. Запустить конструктор разметок
2. Скопировать любую разметку
3. Выбрать условия использования этой разметки
4. Открыть разметку и добавить в нее новый элемент управления "Пример изображения"
5. Задать желаемые параметры элемента управления. 
Внимание! При указании URL адрес должен быть доступен согласно политике CORS. Большинство серверов не разрешают запросы из веб-приложений, расположенных на других доменах. Политике CORS гарантированно удовлетворяют адреса внутри Web-клиента, например "Content/App/Assets/Images/favorite-empty.svg".
6. Сохранить разметку
7. Перезапустить Web-сервис
8. Открыть карточку с этой разметкой
9. Убедиться, что появился новый элемент управления

## Проект ImageDesignerExtension

Проект-расширение для конструктора разметок. Содержит описание элемента управления "Пример изображения" для WebLayoutsDesigner.
Демонстрирует описание и подключение нового контрола, используя класс ControlTypeDescription, 
задание ему стандартных свойств, реализованных в  WebLayoutsDesigner (см. PropertyFactory.GetNameProperty()) и
добавление кастомных свойств, используя класс PropretyDescription (см. свойство Slider, ImageHeight). 
Для кастомного свойства Slider реализован свой редактор (SliderEditor.xaml)

## Проект ImageServerExtension

Проект-расширение для Web-клиент. Содержит бизнес-логику и реализацию элемента управления на сервере. 
Демонстрирует работу с кастомным свойством Slider - преобразование его значения (string) в рабочую модель (List<SliderItemDataModel>) 
с помощью класса SliderConverter и метода ConvertForDisplay. Эта модель дублируется на клиенте ISliderItem[]. 
Таким образом реализована связка List<SliderItemDataModel> - JSON - ISliderItem[] между сервером и клиентом.
С помощью Slider можно пролистывать несколько изображений, вешая обработчики onClick на соответсвующие элементы разметки.

## Проект ImageWebExtension

Содержит скрипты и стили контрола SampleImage.
