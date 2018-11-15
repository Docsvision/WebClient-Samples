
// type $CustomLibraryServices = WebClient.$ExtendedCardController & WebClient.$SomeAnotherService & WebClient.$AnotherOneService;

type $ExtendedCardServices = WebClient.$ExtendedCardController;

function getServices(control: WebClient.LayoutControl) {
    return control.layout.params.services.with<$ExtendedCardServices>();
}