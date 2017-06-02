namespace WebClient.LayoutExtension {

    export class SampleImageParams extends BaseControlParams {
        @r standardCssClass?: string = "sample-image";

        @r sliderItems: ISliderItem[];
        @rw url?: string;
        @rw description?: string;
        @rw imageHeight?: number;
        @rw imageWidth?: number;
        @r currentIndex?: number;
        @r sliderMode?: boolean;
    }

    export interface SampleImageState extends SampleImageParams, BaseControlState {
    }

    export class SampleImage extends BaseControl<SampleImageParams, SampleImageState> {
        protected createParams() {
            return new SampleImageParams();
        }

        private get sampleImageImpl(): SampleImageImpl {
            return this.controlImpl as any;
        }

        @handler("binding")
        protected set binding(binding: IBindingResult<ISliderItem[]>) {
            this.state.sliderItems = binding && binding.value;
        }

        @api addSliderItem(sliderItem: ISliderItem) {
            this.sampleImageImpl.addSliderItem(sliderItem);
        }

        @api removeSliderItem(sliderItemUrl: string) {
            this.sampleImageImpl.removeSliderItem(sliderItemUrl);
        }

        render() {
            return <SampleImageImpl {...this.state} ref={this.attachControl} />;
        }
    }

    // Регистрируем контрол под именем SampleImage в controlFactory
    controlFactory.register("SampleImage", () => SampleImage);
}