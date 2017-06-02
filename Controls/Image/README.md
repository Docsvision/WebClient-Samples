# Image

Требует подключенного расширения дизайнера разметок UrlProprtyDesignerExtension

Этот каталог содержит пример реализации элемента управления "Image".

## Настройка среды

**Перечень необходимых инструментов:** 
* [Visual Studio](https://www.visualstudio.com)
* [TypeScript](https://www.typescriptlang.org)
* [Web Compiler](https://marketplace.visualstudio.com/items?itemName=MadsKristensen.WebCompiler)
* Включенные в **Visual Studio** опции  [NuGet Package Restore](https://docs.microsoft.com/en-us/nuget/consume-packages/package-restore#enabling-and-disabling-package-restore)

## Сборка и установка

1. Открыть /Samples.sln
2. Собрать проект Controls > Image > ImageDesignerExtension
3. Собрать проект Controls > Image > ImageServerExtension
4. Скопировать каталог SamplesOutput\Plugins\ImageDesignerExtension в каталог "Путь к установленному Web-клиент\Plugins"
5. Скопировать каталог SamplesOutput\Site\Bin\ImageServerExtension в каталог "Путь к установленному Web-клиент\Site\Bin"
6. Скопировать каталог SamplesOutput\Site\Content\Extensions\ImageSample в каталог "Путь к установленному Web-клиент\Site\Content"
7. В конфигурационном файле Web-клиент Web.config в секции Docsvision > Platform > Extensions добавить строку: 
```xml
	<Extension TypeName="ImageServerExtension.LayoutWebClientExtension, ImageServerExtension" Target="WebClient"/>
```
8. Перезапустить IIS

## Проверка примера

1. Запустить конструктор разметок
2. Скопировать любую разметку
3. Выбрать условия использования этой разметки
4. Открыть разметку и добавить в нее новый элемент управления "Пример изображения"
5. Задать желаемые параметры элемента управления
6. Сохранить разметку
7. Перезапустить IIS
8. Открыть карточку с этой разметкой
9. Убедиться, что появился новый элемент управления

## Проект ImageDesignerExtension

Проект-расширение для конструктора разметок. Содержит описание элемента управления "Пример изображения" для WebLayoutsDesigner.
Демонстрирует описание и подключение нового контрола, используя класс ControlTypeDescription, 
задание ему стандартных свойств, реализованных в  WebLayoutsDesigner (см. PropertyFactory.GetNameProperty()) и
добавление кастомных свойств, используя класс PropretyDescription (см. свойство Slider, ImageHeight). 
Для кастомного свойства Slider реализован свой редактор (SliderEditor.xaml)

## Проект ImageServerExtension

Проект-расширение для Web-клиент. Содержит бизнес-логику и реализацию элемента управления на клиенте. 
Демонстрирует работу с кастомным свойством Slider - преобразование его значения (string) в рабочую модель (List<SliderItemDataModel>) 
с помощью класса SliderConverter и метода ConvertForDisplay. Эта модель дублируется на клиенте ISliderItem[]. 
Таким образом реализована связка List<SliderItemDataModel> - JSON - ISliderItem[] между сервером и клиентом.
С помощью Slider можно пролистывать несколько изображений, вешая обработчики onClick на соответсвующие элементы разметки.
