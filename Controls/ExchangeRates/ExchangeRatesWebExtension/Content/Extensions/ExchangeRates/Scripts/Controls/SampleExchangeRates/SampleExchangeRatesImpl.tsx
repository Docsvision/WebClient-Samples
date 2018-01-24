namespace WebClient {
    const exchangeRatesSourceUrl: string = 'http://api.fixer.io/latest?base=RUB&symbols=USD,EUR';

    export interface SampleExchangeRatesImplState extends BaseControlImplState, SampleExchangeRatesState {
        exchangeRatesData: any;
    }

    export class SampleExchangeRatesImpl extends BaseControlImpl<SampleExchangeRatesParams, SampleExchangeRatesImplState> {

        componentWillMount() {
            super.componentWillMount();

            fetch(exchangeRatesSourceUrl)
                .then(l => l.json())
                .then(data => this.setState({
                    exchangeRatesData: data
                }));
        }

        roundValue(value: number): number {
            return Math.ceil(value * 100) / 100;
        }

        renderControl() {
            if (!this.state.exchangeRatesData) {
                return null;
            }
            let data = this.state.exchangeRatesData;
            let rows = Object.keys(data.rates).map(l => <div key={l} className={l}>{"1 {0} = {1} {2}".format(l, this.roundValue(1 / data.rates[l]), data.base)}</div>);
            return (
                <div>
                    <div className="header">{"Курсы валют на {0}:".format(data.date)}</div>
                    {rows}
                </div>);
        }
    }   
}