namespace WebClient {

    export class SampleExchangeRatesParams extends BaseControlParams {
        @r standardCssClass?: string = "sample-exchange-rates";
    }

    export interface SampleExchangeRatesState extends SampleExchangeRatesParams, BaseControlState {
    }

    export class SampleExchangeRates extends BaseControl<SampleExchangeRatesParams, SampleExchangeRatesState> {
        protected createParams() {
            return new SampleExchangeRatesParams;
        }

        private get SampleExchangeRatesImpl(): SampleExchangeRatesImpl {
            return this.controlImpl as SampleExchangeRatesImpl;
        }

        componentWillMount() {
            super.componentWillMount();
            console.log(this.state);
        }

        render() {
            return <SampleExchangeRatesImpl {...this.state} ref={this.attachControl} />;
        }
    }

    // Регистрируем контрол под именем SampleLink в controlFactory
    controlFactory.register("SampleExchangeRates", () => SampleExchangeRates);
}