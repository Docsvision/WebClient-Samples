/* Обработчики событий просмотра документа */

function sampleDocumentViewCardOpened(sender, e) {
    outgoingDocumentViewCardOpened(sender, e);
    sampleDocument_loadPartnersInfo();
}

// Загрузить телефоны и email контрагентов
function sampleDocument_loadPartnersInfo() {    
    let controls = layoutManager.cardLayout.controls;
    let samplePartnersDepartmentControls = controls.samplePartnersDepartment as WebClient.Department[];
    if (!controls.sampleDepartmentEmail || !controls.sampleDepartmentPhone || !controls.samplePartnersDepartment || samplePartnersDepartmentControls.length === 0) return;

    // Получить идентификатор из каждого контрола контрагента в таблице
    let departmentIds = samplePartnersDepartmentControls
        .filter(function (control) { return control.hasValue() })
        .map(function (control) { return control.params.value.id });
    // Загрузить телефон и email для строк, где выбраны подразделения
    if (departmentIds.length > 0) {
        WebClient.samplePartnersController.GetPartnersInfo(departmentIds).done(
            function (infoList) {
                // Заполнить departmentMail и departmentPhone в каждой строке таблицы с полученными данными
                departmentIds.forEach(function (departmentId, idIndex) {
                    let partnersControls = controls.samplePartnersDepartment && samplePartnersDepartmentControls.filter(
                        function (control) { return control.hasValue() && control.params.value.id === departmentId; });
                    if (partnersControls) {
                        partnersControls.forEach((partnersControl) => {
                            let rowIndex = samplePartnersDepartmentControls.indexOf(partnersControl);
                            controls.sampleDepartmentEmail[rowIndex].params.text = infoList[idIndex].email;
                            controls.sampleDepartmentPhone[rowIndex].params.text = infoList[idIndex].phone;
                        });
                    }
                });
            }
        );
    }
    // Сбрасывает телефон и email для строк, в которых не выбраны подразделения
    samplePartnersDepartmentControls.forEach(function (partnersControl, rowIndex) {
        if (!partnersControl.hasValue()) {
            controls.sampleDepartmentEmail[rowIndex].params.text = '';
            controls.sampleDepartmentPhone[rowIndex].params.text = '';
        }
    });
}