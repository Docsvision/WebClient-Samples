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

        // Пример, как создать контрол без impl-класса. Просто возвращаем экземпляр ControlImpl, передавая ему функцию отрисовки.
        // Данный способ можно применять в случае если контрол достаточно простой
        protected createImpl() {
            return new ControlImpl(this.props, this.state, this.renderControl.bind(this));
        }

        protected getText() {
            return this.state.text ? this.state.text : this.state.url;
        }

        renderControl() {
            return (
                <div>
                    <a href={this.state.url} tabIndex={this.controlImpl.getTabIndex()} target="_blank">
                        { this.getText() }
                    </a>
                </div>
            );
        }
    }

    // Регистрируем контрол под именем SampleLink в controlFactory
    controlFactory.register("SampleLink", () => SampleLink);
}