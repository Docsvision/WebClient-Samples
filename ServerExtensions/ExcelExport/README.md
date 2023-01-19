# ExcelExportServerExtension

Этот пример серверного расширения, позволяющего вмешаться в процесс экспорта представления в Excel.

## Настройка среды

**Перечень необходимых инструментов:** 
* [Visual Studio 2019](https://www.visualstudio.com) и выше

## Сборка

1. Открыть /Samples.sln
2. Собрать проект ExcelExportServerExtension
3. Скопировать каталог SamplesOutput\Site\Extensions\ExcelExportServerExtension в каталог "Путь к установленному Web-клиент\Site\Extensions"
4. Перезапустить IIS на сервере Docsvision 5.
5. Перезапустить IIS на сервере Docsvision 5 Web-клиент.

## Проверка примера

1. Открыть папку в Веб-клиенте Docsvision.
2. Нажать кнопку «Экспортировать в Excel».
3. Загрузится документ в формате XLSX, содержащий выгрузку представления со всеми колонками и выделенными цветом нечетными строками.