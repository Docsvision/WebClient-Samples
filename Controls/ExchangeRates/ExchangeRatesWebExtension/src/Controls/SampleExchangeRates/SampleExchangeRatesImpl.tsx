import { SampleExchangeRatesParams } from "./SampleExchangeRates";
import React from "react";
import { BaseControlState } from "@docsvision/webclient/System/BaseControl";
import { BaseControlImpl } from "@docsvision/webclient/System/BaseControlImpl";
import { formatString } from "@docsvision/webclient/System/StringUtils";

const exchangeRatesSourceUrl: string = 'http://data.fixer.io/api/latest?access_key={0}';

export interface SampleExchangeRatesState extends SampleExchangeRatesParams, BaseControlState {
	exchangeRatesData: any;
}

export class SampleExchangeRatesImpl extends BaseControlImpl<SampleExchangeRatesParams, SampleExchangeRatesState> {
	constructor(props: SampleExchangeRatesParams, state: SampleExchangeRatesState) {
		super(props, state);
	}

	async componentWillMount() {
		super.componentWillMount();

		const url = formatString(exchangeRatesSourceUrl, this.props.apiToken);
		const response = await fetch(url);
		const data = await response.json();

		let rates = [];
		rates.push(this.calcRates(data, 'RUB', 'USD'));
		rates.push(this.calcRates(data, 'RUB', 'EUR'));

		this.setState({
			exchangeRatesData: {
				date: data["date"],
				rates: rates
			}
		})
	}

	calcRates(data: any, source: string, target: string) {
		return {
			source,
			target,
			value: (data.rates[source] / data.rates[target])
		}
	}

	roundValue(value: number): number {
		return Math.ceil(value * 100) / 100;
	}

	renderControl() {
		if (!this.state.exchangeRatesData) {
			return null;
		}

		let rows = this.state.exchangeRatesData.rates.map((rate: any) => {
			const text = formatString("1 {0} = {1} {2}", rate.target, this.roundValue(rate.value), rate.source);
			return (
				<div key={rate.target} className={rate.target}>{text}</div>
			)
		});

		return (
			<div>
				<div className="header">{formatString("Курсы валют на {0}:", this.state.exchangeRatesData.date)}</div>
				{rows}
			</div>
		);
	}
}   