async function getCustomData(sender: WebClient.Layout) {    
    let data = await getServices(sender).customLibraryController.getCustomData();   
    alert('Custom data: ' + data);
}