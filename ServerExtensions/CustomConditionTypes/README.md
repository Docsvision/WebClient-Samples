﻿# CustomConditionTypes

Этот пример серверного расширения демонстрирует добавление условия выбора разметок по группе, пользователю, роли.
После сохранения изменений в конструкторе разметок, разметка отображается в соответствии с заданными условиями.

## Настройка среды

Пример рассчитан на версию Web-клиента 18 (6.1) или выше.

**Перечень необходимых инструментов:** 
* [Visual Studio 2022](https://www.visualstudio.com)
* [NodeJS v16.20.0+](https://nodejs.org/en/)

## Сборка

1. Открыть /Samples.sln
2. Собрать проект ServerExtensions > CustomConditionTypes > CustomConditionTypesDesignerExtension
3. Собрать проект ServerExtensions > CustomConditionTypes > CustomConditionTypesLayoutExtension
4. Собрать проект ServerExtensions > CustomConditionTypes > CustomConditionTypesInterfaces
5. Скопировать каталог SamplesOutput\Plugins\CustomConditionTypesDesignerExtension в каталог "Путь к директории с исполняемым файлом конструктора Web-разметок\Plugins"
6. Скопировать каталог SamplesOutput\Plugins\CustomConditionTypesInterfaces в каталог "Путь к директории с исполняемым файлом конструктора Web-разметок\Plugins"
7. Скопировать каталог SamplesOutput\Site\Extensions\CustomConditionTypesInterfaces в каталог "Путь к сайту Web-клиента\Extensions"
8. Скопировать каталог SamplesOutput\Site\Extensions\CustomConditionTypesLayoutExtension в каталог "Путь к сайту Web-клиента\Extensions"
9. Перезапустить Web-сервис

## Проверка примера

1. Запустить конструктор разметок
2. Выбрать или создать любую разметку в локации WebFrame/MainMenu
3. Открыть вкладку условия использования разметки
4. Добавить новое условие выбора или изменить существующее
5. Изменить в условии выбора роль, группу, пользователя или все сразу
6. Запустить web-клиент 
7. Можно заметить, что заданная разметка отображается только если выполняются условия выбора разметки 


## Проект CustomConditionTypesDesignerExtension

Проект-расширение для конструктора разметок. Содержит класс CustomConditionTypesProvider, 
в котором реализованы методы для отображения новых условий выбора разметки по группе, пользователю, роли

## Проект CustomConditionTypesLayoutExtension

Проект-расширение для Web-клиент, которое позволяет определить - выполняется условие выбора разметки или нет для текущего контекста.
**При внесении изменений необходимо увеличивать номер версии расширения в AssemblyFileVersion**

## Проект CustomConditionTypesInterfaces

Проект-расширение для конструктора разметок и серверного расширения, содержащий все константные значения для этих проектов.

