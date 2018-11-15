namespace WebClient {

    export class SampleExchangeRatesParams extends BaseControlParams {
        @r standardCssClass?: string = "sample-exchange-rates";
        /** ключ доступа к API */
        @r apiToken: string;
    }

    export class SampleExchangeRates extends BaseControl<SampleExchangeRatesParams, SampleExchangeRatesState> {
        protected createParams() {
            return new SampleExchangeRatesParams;
        }

        private get SampleExchangeRatesImpl(): SampleExchangeRatesImpl {
            return this.controlImpl as SampleExchangeRatesImpl;
        }

        protected createImpl() {
            return new SampleExchangeRatesImpl(this.props, this.state);
        }
    }

    // Регистрируем контрол под именем SampleLink в controlFactory
    controlFactory.register("SampleExchangeRates", () => SampleExchangeRates);
}