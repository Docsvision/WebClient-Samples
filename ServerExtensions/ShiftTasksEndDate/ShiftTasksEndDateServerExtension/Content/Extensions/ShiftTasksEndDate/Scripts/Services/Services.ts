// type $ShiftTasksEndDateServices = WebClient.$AdvancedDocumentController & WebClient.$SomeAnotherService & WebClient.$AnotherOneService;

type $ShiftTasksEndDateServices = WebClient.$AdvancedDocumentController;

function getServices(control: WebClient.LayoutControl) {
    return control.layout.params.services.with<$ShiftTasksEndDateServices>();
}