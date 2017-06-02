namespace WebClient {
    @controller("LicenseCheck")
    export class LicenseCheckController extends ServerController {
        @action
        public CheckFeature(): JQueryDeferred<Boolean> {
            return super.postAction(arguments);
        }
    }
    export var licenceCheckController: LicenseCheckController = new LicenseCheckController();
}

function checkLicenseFeature() {
    var res = WebClient.licenceCheckController.CheckFeature();
    res.done((data) => {
        if (data)
            alert('Feature exists in license');
        else
            alert('Feature not exists in license');
    });
}