function checkLicenseFeature(sender: WebClient.CustomButton) {
    getServices(sender).licenseCheckController.checkLicenseFeature().done((data) => {
        if (data) {
            alert('Характеристика существует в лицензии');
        } else {
            alert('Характеристика не существует в лицензии');
        }
    });
}