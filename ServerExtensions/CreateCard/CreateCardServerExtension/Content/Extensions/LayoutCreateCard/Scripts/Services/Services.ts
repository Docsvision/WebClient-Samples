
// type $SampleServices = $SampleDocumentController & $SomeAnotherService & $AnotherOneService;
type $SampleServices = WebClient.$SampleDocumentController;

function getServices(control: WebClient.LayoutControl) {
    return control.layout.params.services.with<$SampleServices>();
}