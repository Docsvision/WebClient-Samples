using DocsVision.BackOffice.ObjectModel;
using DocsVision.Platform.ObjectModel;

namespace NetStatSolution.ObjectModel;

public sealed class NetstatSolutionCardJournal : BaseCardSectionRow
{
    // В начале идет объявление всех доступных полей. Всегда типа ObjectProperty. 
    // Рекомендуется использовать название поля из схемы метаданных с добавлением суффикса Property
    public static readonly ObjectProperty DateProperty; // Название узла
    public static readonly ObjectProperty ResultProperty; // IP-адрес узла

    // Обязательный статический конструктор, в котором должна быть выполнена регистрация всех объявленных ранее свойств
    static NetstatSolutionCardJournal()
    {
        // В метод Register передаем название поля (как в схеме метаданных),
        // его тип (как определен выше) и тип самой секции (текущий класс)
        DateProperty = ObjectProperty.Register(nameof(Date), typeof(DateTime), typeof(NetstatSolutionCardJournal));
        ResultProperty = ObjectProperty.Register(nameof(Result), typeof(bool), typeof(NetstatSolutionCardJournal));
    }

    // Конструктор для новой карточки
    internal NetstatSolutionCardJournal()
    {
    }

    // Конструктор для существующей карточки с загрузкой данных	
    internal NetstatSolutionCardJournal(ObjectInitializationData data)
        : base(data)
    {
    }

    // Публичные свойства для обращения получения и записи значения соответствующего поля
    // Тип свойства соответствует типу поля в схеме метаданных
    // Для ссылочных полей тип соответствует типу сущности, на которую идет ссылка

    public DateTime Date
    {
        get { return (DateTime)GetValue(DateProperty); }
        set { SetValue(DateProperty, value); }
    }

    public bool Result
    {
        get { return (bool)GetValue(ResultProperty); }
        set { SetValue(ResultProperty, value); }
    }
}
