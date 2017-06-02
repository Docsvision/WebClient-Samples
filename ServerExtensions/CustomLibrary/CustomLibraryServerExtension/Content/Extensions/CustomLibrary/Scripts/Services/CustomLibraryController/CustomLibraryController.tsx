namespace WebClient {
    @controller("CustomLibrary")
    export class CustomLibraryController extends ServerController {
        @action
        public GetCustomData(): JQueryDeferred<Number> {
            return super.postAction(arguments);
        }
    }
    export var customLibaryController: CustomLibraryController = new CustomLibraryController();
}

function getCustomData() {
    var res = WebClient.customLibaryController.GetCustomData();
    res.done((data) => {   
          alert('Custom data: ' + data);     
    });
}
