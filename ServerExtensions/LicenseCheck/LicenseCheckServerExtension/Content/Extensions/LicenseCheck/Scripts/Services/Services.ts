// type $CustomLibraryServices = WebClient.$LicenseCheckController & WebClient.$SomeAnotherService & WebClient.$AnotherOneService;

type $CheckLicenseServices = WebClient.$LicenseCheckController;

function getServices(control: WebClient.LayoutControl) {
    return control.layout.params.services.with<$CheckLicenseServices>();
}