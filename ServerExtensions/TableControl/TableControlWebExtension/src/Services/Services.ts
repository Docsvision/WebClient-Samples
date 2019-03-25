import { $SamplePartnersController } from "./SamplePartnersController";
import { LayoutControl } from "@docsvision/webclient/System/BaseControl";

export type $SampleServices = $SamplePartnersController;

export function getServices(control: LayoutControl) {
    return control.layout.params.services.with<$SampleServices>();
}