function openModal(params) {
    const modal = $("#modal-confirmation");

    if (
        params.name === undefined ||
        params.guid === undefined ||
        params.owner === undefined ||
        params.year === undefined ||
        params.modelGuid === undefined
    ) {
        alert("Произошла ошибка!");
        return;
    }

    modal.modal('show');

    const fName = modal.find("#name");
    const fYear = modal.find("#year");
    const fOwner = modal.find("#owner");

    const selectElement = document.getElementById("modelSelect");
    const desiredValue = params.modelGuid;
    for (let i = 0; i < selectElement.options.length; i++) {
        if (selectElement.options[i].value === desiredValue) {
            selectElement.selectedIndex = i;
            break;
        }
    }

    fName.val(params.name);
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
        const newFridgeInfo = {
            fridgeGuid: params.guid,
            name: fName.val(),
            modelGuid: selectElement.value,
            ownerName: fOwner.val().length > 0 ? fOwner.val() : null
        };
        rewriteObject(newFridgeInfo, modal);
    });
}

async function rewriteObject(newFridgeInfo, modal) {
    const myObj = { connectionString: undefined };

    if (!(await GetConnectionString(myObj))) {
        return;
    }

    $.ajax({
        method: "PUT",
        url: `${myObj.connectionString}/Fridges`,
        contentType: 'application/json',
        data: JSON.stringify(newFridgeInfo),
        success: function (response) {
            modal.modal("hide");
            location.reload();
            console.log(response);
        },
        error: function (response) {
            alert("Произошла ошибка при запросе к серверу!");
            console.log(response);
        }
    });

    closeModal(modal);
}

function closeModal(modal) {
    $(modal).modal('hide');
}