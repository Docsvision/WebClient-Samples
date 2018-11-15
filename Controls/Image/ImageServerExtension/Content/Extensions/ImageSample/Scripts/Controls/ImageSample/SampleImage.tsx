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

    export class SampleImage extends BaseControl<SampleImageParams, SampleImageState> {
        protected createParams() {
            return new SampleImageParams();
        }

        @handler("binding")
        protected set binding(binding: IBindingResult<ISliderItem[]>) {
            if (binding && binding.value) {
                this.sliderItems = binding.value;
            }
        }

        @handler(() => at(SampleImageParams).sliderItems)
        set sliderItems(value: ISliderItem[]) {
            // Устанавливаем sliderMode и currentIndex вместе с значением sliderItems
            this.state.sliderItems = value;
            this.state.sliderMode = true;
            this.state.currentIndex = 0;
        }

        addSliderItem(sliderItem: ISliderItem) {
            this.getImpl<SampleImageImpl>().addSliderItem(sliderItem);
        }

        removeSliderItem(sliderItemUrl: string) {
            this.getImpl<SampleImageImpl>().removeSliderItem(sliderItemUrl);
        }

        protected createImpl() {
            return new SampleImageImpl(this.props, this.state);
        }
    }

    // Регистрируем контрол под именем SampleImage в controlFactory
    controlFactory.register("SampleImage", () => SampleImage);
}