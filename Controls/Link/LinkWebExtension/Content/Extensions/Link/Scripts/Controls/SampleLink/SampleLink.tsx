namespace WebClient {

    export class SampleLinkParams extends BaseControlParams {
        @r standardCssClass?: string = "sample-link";

        // Параметр url обязателен для контрола, поэтому без знака "?"
        @rw url: string;
        @rw tabStop?: boolean;
        @rw text?: string;
    }

    export interface SampleLinkState extends SampleLinkParams, BaseControlState {
    }

    export class SampleLink extends BaseControl<SampleLinkParams, SampleLinkState> {
        protected createParams() {
            return new SampleLinkParams();
        }

        private get SampleLinkImpl(): SampleLinkImpl {
            return this.controlImpl as SampleLinkImpl;
        }

        render() {
            return <SampleLinkImpl {...this.state} ref={this.attachControl} />;
        }
    }

    // Регистрируем контрол под именем SampleLink в controlFactory
    controlFactory.register("SampleLink", () => SampleLink);
}