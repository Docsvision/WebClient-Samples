
import React from "react";
import { SampleImageParams } from "./SampleImage";
import { ISliderItem } from "./Data/ISliderItem";
import { BaseControlState } from "@docsvision/webclient/System/BaseControl";
import { BaseControlImpl } from "@docsvision/webclient/System/BaseControlImpl";
import { newValueIfUndefined } from "@docsvision/webclient/System/NewValueIfUndefined";

export interface SampleImageState extends SampleImageParams, BaseControlState {
}

export class SampleImageImpl extends BaseControlImpl<SampleImageParams, SampleImageState> {
    constructor(props: SampleImageParams, state: SampleImageState) {
        super(props, state);

        this.getImageStyle = this.getImageStyle.bind(this);
        this.canSlideLeft = this.canSlideLeft.bind(this);
        this.canSlideRight = this.canSlideRight.bind(this);
    }


    protected getCssStyle(): React.CSSProperties {
        var style = super.getCssStyle();
        if (this.state.imageWidth) {
            // BaseControl.getCssStyle возвращает this.state.customCssStyle (который может быть настроен через скрипты)
            // Вызов newValueIfUndefined означает, что мы задаем значение width только в том случае, 
            // если оно не было задано this.state.customCssStyle (чтобы не затереть значение, которое задано через скрипты)
            style.width = newValueIfUndefined(style.width, this.state.imageWidth + "px");
        }
        return style;
    }


    protected getImageStyle() {
        var style: any = {};
        style.background = 'url("' + this.state.urlAddress + '") 0 0 / cover no-repeat';
        if (this.state.imageHeight) {
            style.height = this.state.imageHeight + "px";
        }
        if (this.state.imageWidth) {
            style.width = this.state.imageWidth + "px";
        }
        return style;
    }

    protected canSlideLeft(): boolean {
        return this.state.sliderMode && this.state.currentIndex > 0;
    }

    protected canSlideRight(): boolean {
        return this.state.sliderMode && this.state.currentIndex < this.state.sliderItems.length - 1;
    }

    protected slide(shift: number) {
        this.state.currentIndex += shift;
        this.forceUpdate();
    }

    renderControl() {
        if (this.state.sliderMode && this.state.sliderItems.length > 0) {
            var currentSliderItem = this.state.sliderItems[this.state.currentIndex];
            this.state.urlAddress = currentSliderItem.url;
            this.state.description = currentSliderItem.description;
        }

        return (
            <div>
                <div className="image" style={this.getImageStyle()}>
                    <div className="nav-buttons">
                        {this.canSlideLeft() && <span className="left-nav" onClick={this.slide.bind(this, -1)} />}
                        {this.canSlideRight() && <span className="right-nav" onClick={this.slide.bind(this, 1)} />}
                    </div>
                </div>
                <div className="description-container">
                    <span>{this.state.description}</span>
                </div>
            </div>);
    }

    addSliderItem(sliderItem: ISliderItem) {
        this.state.sliderItems.push(sliderItem);
        this.forceUpdate();
    }

    removeSliderItem(sliderItemUrl: string) {
        this.state.sliderItems = this.state.sliderItems.filter(l => l.url != sliderItemUrl);
        this.forceUpdate();
    }
}   
