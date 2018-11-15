function extendedCardCheckDates(sender: WebClient.DateTimePicker) {
    let layout = sender.layout;
    getServices(sender).extendedCardController.getExtendedCardModel(layout.cardInfo.id).then((response) => {
        let createDate = new Date(response.createDate);
        let regDateControl = layout.controls.regDate as WebClient.DateTimePicker;
        if (regDateControl.params.value > createDate) {
            alert('Дата регистрации документа больше даты создания документа');
        } else if (regDateControl.params.value < createDate) {
            alert('Дата создания документа больше даты регистрации документа');
        } else {
            alert('Дата регистрации документа равна дате создания документа');
        } 

    });
}

