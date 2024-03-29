﻿# DataGridControlServerExtension

Этот пример серверного расширения демонстрирует реализацию плагина для контрола DataGridControl.
Плагин загружает информацию о файлах для документа.

## Настройка среды

Пример рассчитан на версию Web-клиента 18 (6.1) или выше.

**Перечень необходимых инструментов:** 
* [Visual Studio 2017/2019/2022](https://www.visualstudio.com)
* [NodeJS v16.20.0+](https://nodejs.org/en/)

## Сборка

1. Открыть /Samples.sln
2. Собрать проект ServerExtensions > DataGridControlExtension > DataGridControlServerExtension 
3. Скопировать каталог SamplesOutput\Site\Extensions\DataGridControlServerExtension в каталог "Путь к сайту Web-клиента\Extensions"
4. Скопировать файл SamplesOutput\Site\Extensions\ru\DataGridControlServerExtension.resources.dll в каталог "Путь к сайту Web-клиента\Extensions\ru"
5. Перезапустить Web-сервис

## Проверка примера

1. Запустить конструктор разметок
2. Скопировать любую разметку просмотра документа
3. Выбрать условия использования этой разметки
4. Добавить в разметку контрол "Data grid control" / "Контрол табличных данных", указать в свойстве "Plugin" / "Название плагина" значение "Files".
5. Сохранить разметку
6. Перезапустить Web-сервис
7. Создать карточку документа, добавить файлы, обновить страницу
8. В карточке документа должен появиться добавленный контрол в виде таблицы с тремя колонками - имя, версия и размер.


## Проект DataGridControlServerExtension

Проект-расширение для Web-клиент. Содержит плагин "Files" (FilesDataGridControlPlugin), реализующий загрузку информации о файлах документа.
