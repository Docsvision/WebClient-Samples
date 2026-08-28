using DocsVision.BackOffice.ObjectModel;
using DocsVision.Platform.ObjectModel;

namespace NetStatSolution.ObjectModel;

public class NetstatSolutionCardMainInfo : BaseCardSectionRow
{
    // В начале идет объявление всех доступных полей. Всегда типа ObjectProperty. 
    // Рекомендуется использовать название поля из схемы метаданных с добавлением суффикса Property
    public static readonly ObjectProperty NameProperty; // Название узла
    public static readonly ObjectProperty AddressProperty; // IP-адрес узла
    public static readonly ObjectProperty TypeProperty; // Тип узла
    public static readonly ObjectProperty IsCheckedProperty; //Требуется проверка
    public static readonly ObjectProperty LastResultProperty; //Результат последней проверки

    // Обязательный статический конструктор, в котором должна быть выполнена регистрация всех объявленных ранее свойств
    static NetstatSolutionCardMainInfo()
    {
        // В метод Register передаем название поля (как в схеме метаданных),
        // его тип (как определен выше) и тип самой секции (текущий класс)
        NameProperty = ObjectProperty.Register(
            nameof(Name),
            typeof(string),
            typeof(NetstatSolutionCardMainInfo));

        AddressProperty = ObjectProperty.Register(
            nameof(Address),
            typeof(string),
            typeof(NetstatSolutionCardMainInfo));

        TypeProperty = ObjectProperty.Register(
            nameof(Type),
            typeof(int),
            typeof(NetstatSolutionCardMainInfo));

        IsCheckedProperty = ObjectProperty.Register(
            nameof(IsChecked),
            typeof(bool),
            typeof(NetstatSolutionCardMainInfo));

        LastResultProperty = ObjectProperty.Register(
            nameof(LastResult),
            typeof(bool),
            typeof(NetstatSolutionCardMainInfo));
    }

    // Конструктор для новой карточки
    internal NetstatSolutionCardMainInfo()
    {
    }

    // Конструктор для существующей карточки с загрузкой данных	
    internal NetstatSolutionCardMainInfo(ObjectInitializationData data)
        : base(data)
    {
    }

    // Публичные свойства для обращения получения и записи значения соответствующего поля
    // Тип свойства соответствует типу поля в схеме метаданных
    // Для ссылочных полей тип соответствует типу сущности, на которую идет ссылка.

    public string Name
    {
        get { return (string)GetValue(NameProperty); }
        set { SetValue(NameProperty, value); }
    }

    public string Address
    {
        get { return (string)GetValue(AddressProperty); }
        set { SetValue(AddressProperty, value); }
    }

    public int Type
    {
        get { return (int)GetValue(TypeProperty); }
        set { SetValue(TypeProperty, value); }
    }

    public bool IsChecked
    {
        get { return (bool)GetValue(IsCheckedProperty); }
        set { SetValue(IsCheckedProperty, value); }
    }

    public bool LastResult
    {
        get { return (bool)GetValue(LastResultProperty); }
        set { SetValue(LastResultProperty, value); }
    }
}
