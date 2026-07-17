namespace NetStatSolution.ObjectModel.Services;

public interface INetstatSolutionService
{
    NetstatSolutionCard CreateCard(string name, string address, int type);

    NetstatSolutionCardJournal AddJournalEntry(NetstatSolutionCard card, DateTime date, bool result);
}
