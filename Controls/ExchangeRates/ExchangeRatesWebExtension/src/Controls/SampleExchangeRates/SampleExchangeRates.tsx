
import { SampleExchangeRatesState, SampleExchangeRatesImpl } from "./SampleExchangeRatesImpl";
import { BaseControlParams, BaseControl } from "@docsvision/webclient/System/BaseControl";
import { r } from "@docsvision/webclient/System/Readonly";

export class SampleExchangeRatesParams extends BaseControlParams {
	@r standardCssClass?: string = "sample-exchange-rates";
	/** ключ доступа к API */
	@r apiToken: string;
}

export class SampleExchangeRates extends BaseControl<SampleExchangeRatesParams, SampleExchangeRatesState> {
	protected createParams() {
		return new SampleExchangeRatesParams;
	}

	protected createImpl() {
		return new SampleExchangeRatesImpl(this.props, this.state);
	}
}

