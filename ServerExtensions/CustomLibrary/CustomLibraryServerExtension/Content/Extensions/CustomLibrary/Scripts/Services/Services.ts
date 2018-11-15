
// type $CustomLibraryServices = WebClient.$CustomLibraryController & WebClient.$SomeAnotherService & WebClient.$AnotherOneService;

type $CustomLibraryServices = WebClient.$CustomLibraryController;

function getServices(control: WebClient.LayoutControl) {
    return control.layout.params.services.with<$CustomLibraryServices>();
}