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
            alert('Характеристика существует в лицензии');
        else
            alert('Характеристика не существует в лицензии');
    });
}