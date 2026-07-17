using DocsVision.BackOffice.ObjectModel;
using DocsVision.Platform.ObjectModel;

namespace NetStatSolution.ObjectModel;

public class NetstatSolutionCard : BaseCard
{
    // В начале идет объявление всех доступных полей. Всегда типа ObjectProperty. 
    // Рекомендуется использовать название поля из схемы метаданных с добавлением суффикса Property
    public static readonly ObjectProperty MainInfoProperty;
    public static readonly ObjectProperty JournalProperty;

    // Обязательный статический конструктор,
    // в котором должна быть выполнена регистрация всех объявленных ранее свойств
    static NetstatSolutionCard()
    {
        // В метод Register передаем название поля (как в схеме метаданных)
        // его тип (как определен выше) и тип самой секции (текущий класс)
        MainInfoProperty = ObjectProperty.Register(
            nameof(MainInfo),
            typeof(ObjectCollection<NetstatSolutionCardMainInfo>),
            typeof(NetstatSolutionCard));

        JournalProperty = ObjectProperty.Register(
            nameof(Journal),
            typeof(ObjectCollection<NetstatSolutionCardJournal>),
            typeof(NetstatSolutionCard));
    }

    // Конструктор для новой карточки
    internal NetstatSolutionCard() : base()
    {
    }

    // Конструктор для существующей карточки с загрузкой данных
    internal NetstatSolutionCard(ObjectInitializationData data) : base(data)
    {
    }

    public NetstatSolutionCardMainInfo MainInfo
    {
        get
        {
            if (((ObjectCollection<NetstatSolutionCardMainInfo>)GetValue(MainInfoProperty)).Count == 0)
            {
                ((ObjectCollection<NetstatSolutionCardMainInfo>)GetValue(MainInfoProperty)).Add(new NetstatSolutionCardMainInfo());
            }

            return ((ObjectCollection<NetstatSolutionCardMainInfo>)GetValue(MainInfoProperty)).First();
        }
    }

    public ObjectCollection<NetstatSolutionCardJournal> Journal
    {
        get
        {
            return (ObjectCollection<NetstatSolutionCardJournal>)GetValue(JournalProperty);
        }
        set
        {
            SetValue(JournalProperty, value);
        }
    }
}
