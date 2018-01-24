namespace WebClient {
    export interface SampleLinkImplState extends BaseControlImplState, SampleLinkState {
        tabStop: boolean;
        url: string;
        text: string;
    }

    export class SampleLinkImpl extends BaseControlImpl<SampleLinkParams, SampleLinkImplState> {

        constructor(props: SampleLinkParams) {
            super(props);
        }

        protected getText() {
            return this.state.text ? this.state.text : this.state.url;
        }

        renderControl() {
            return (
                <div>
                    <a href={this.state.url} tabIndex={this.getTabIndex()} target="_blank">{this.getText()}</a>
                </div>
            );
        }
    }   
}