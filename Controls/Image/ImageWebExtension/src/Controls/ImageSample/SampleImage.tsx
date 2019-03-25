
import { SampleImageState, SampleImageImpl } from "./SampleImageImpl";
import { ISliderItem } from "./Data/ISliderItem";
import { BaseControlParams, BaseControl } from "@docsvision/webclient/System/BaseControl";
import { r } from "@docsvision/webclient/System/Readonly";
import { rw } from "@docsvision/webclient/System/Readwrite";
import { handler, at } from "@docsvision/webclient/System/Handler";
import { IBindingResult } from "@docsvision/webclient/System/IBindingResult";


export class SampleImageParams extends BaseControlParams {
    @r standardCssClass?: string = "sample-image";

    @r sliderItems: ISliderItem[];
    @rw urlAddress?: string;
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
