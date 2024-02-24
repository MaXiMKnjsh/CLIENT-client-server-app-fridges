function openModal(params) {
    // селектор jQuery
    const modal = $("#modal-confirmation");

    if (params.name === undefined || params.guid === undefined
        || params.owner === undefined || params.year === undefined
        || params.modelGuid === undefined) {
        alert("Произошла ошибка!");
        return;
    }

    modal.modal('show');

    const fName = modal.find("#name");
    const fYear = modal.find("#year");
    const fModel = modal.find("#model");
    const fOwner = modal.find("#owner");

    fName.val(params.name);
    //fModel.val(params.model); сделай список моделей бро
    fYear.val(params.year);
    fOwner.val(params.owner);

    const buttonSave = modal.find("#buttonSave");
    const buttonClose = modal.find("#buttonClose");
    const buttonClose2 = modal.find("#buttonClose2");

    buttonClose.click(function () {
        closeModal(modal);
    });

    buttonClose2.click(function () {
        closeModal(modal);
    });

    buttonSave.click(function () {
        rewriteObject(params);
    });
}

async function rewriteObject(params) {

    const myObj = { connectionString: undefined };
    if (!(await GetConnectionString(myObj)))
        return;

    let newFridgeInfo = {
        fridgeGuid: params.guid,
        Name: params.name,
        ModelGuid:params.modelGuid,
        OwnerName: params.owner
    };

    //метод jQuery для асинхронного https запроса к серверу
    $.ajax({
        type: "PUT",
        url: myObj.connectionString + "/Fridges",
        contentType: 'application/json',
        data: JSON.stringify(newFridgeInfo),
        success:
            function (response) {
                modal.modal("hide");
                location.reload();
                console.log(response);
            },
        error:
            function (response) {
                alert("Произошла ошибка при запросе к серверу!");
                console.log(response);
            }
    });

    closeModal(modal);
}
function closeModal(modal) {
    $(modal).modal('hide');
}
