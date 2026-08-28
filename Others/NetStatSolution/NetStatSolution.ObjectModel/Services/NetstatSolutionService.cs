using DocsVision.BackOffice.ObjectModel.Services;
using DocsVision.Platform.ObjectModel;

namespace NetStatSolution.ObjectModel.Services;

internal class NetstatSolutionService : ContextService, INetstatSolutionService
{
    IKindService KindService => Context.GetService<IKindService>();

    IStateService StateService => Context.GetService<IStateService>();

    public NetstatSolutionCard CreateCard(string name, string address, int type)
    {
        NetstatSolutionCard card = new NetstatSolutionCard();
        card.MainInfo.Name = name;
        card.MainInfo.Address = address;
        card.MainInfo.Type = type;
        card.Description = $"Узел {name}";

        // Для нормального открытия карточки, работающей с конструкторами необходимо установить вид карточки и её состояние
        card.SystemInfo.CardKind = KindService.GetCardType(NetstatSolutionCardDefs.ID).RootKind;
        card.SystemInfo.State = StateService.GetPreferredCardKindSetting(card.SystemInfo.CardKind).FirstState;

        base.Context.AddObject(card);
        return card;
    }

    public NetstatSolutionCardJournal AddJournalEntry(NetstatSolutionCard card, DateTime date, bool result)
    {
        var journalEntry = new NetstatSolutionCardJournal
        {
            Date = date,
            Result = result
        };

        card.Journal ??= new ObjectCollection<NetstatSolutionCardJournal>();
        card.Journal.Add(journalEntry);

        return journalEntry;
    }
}
