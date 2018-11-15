// type $SampleServices = WebClient.$SamplePartnersController & WebClient.AnotherService;

type $SampleServices = WebClient.$SamplePartnersController;

function getServices(control: WebClient.LayoutControl) {
    return control.layout.params.services.with<$SampleServices>();
}