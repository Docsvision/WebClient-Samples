namespace WebClient {
    export class SamplePartnersController {        
        public GetPartnersInfo(partnerIds: string[]) {                        
            var url = urlStore.urlResolver.resolveUrl("GetPartnersInfo", "SamplePartners");
            var data = {
                "partnerIds": partnerIds
            };
            return requestManager.post(url, JSON.stringify(data));  
        }
    }
    export var samplePartnersController: SamplePartnersController = new SamplePartnersController();
}

