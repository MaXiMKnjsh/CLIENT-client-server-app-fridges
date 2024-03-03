let guid, myObj;
async function GetProducts(guid, myObj) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "GET",
            url: `${myObj.connectionString}/FridgeProducts/${guid}`,
            success: function (response) {
                resolve(response);
            },
            error: function (response) {
                alert("Произошла ошибка при запросе к серверу!");
                console.log(response);
                reject(false);
            }
        });
    });
}

async function openModalSet(_guid) {
    const modal = $("#modal-editing");

    guid = _guid;
    _myObj = { connectionString: undefined };
    if (!(await GetConnectionString(_myObj))) {
        return;
    }

    try {
        var products = await GetProducts(guid, myObj);
        if (products === false) {
            return;
        }
    } catch (error) {
        console.log(error);
    }

    const productsDiv = $(modal).find("#productsDiv");

    if (products !== undefined) {
        products.forEach(function (item) {
            var button = productsDiv.find(`.my-button[data-guid="${item.productGuid}"]`);
            button.removeClass('btn-secondary');
            button.addClass('btn-success');
        });
    }

    modal.modal('show');
}

async function rewriteObject(productsList, modal, myObj, fridgeGuid) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            method: "PUT",
            url: myObj.connectionString + "/FridgeProducts/" + fridgeGuid,
            contentType: 'application/json',
            data: JSON.stringify(productsList),
            success: function (response) {
                modal.modal("hide");
                console.log(response);
                resolve();
            },
            error: function (response) {
                alert("Произошла ошибка при запросе к серверу!");
                console.log(response);
                reject();
            }
        });
    });
}

function closeModal(modal) {
    $(modal).modal('hide');
}

function changeClass(button) {
    button.classList.toggle('btn-success');
    button.classList.toggle('btn-secondary');
}

function attachEventHandlers() {
    const modal = $("#modal-editing");
    const buttonSave = modal.find("#buttonSave");
    const buttonClose = modal.find("#buttonClose");
    const buttonClose2 = modal.find("#buttonClose2");

    modal.on('hidden.bs.modal', function () {
        const buttons = document.querySelectorAll("#productsDiv .btn-success");
        buttons.forEach(function (button) {
            button.classList.remove("btn-success");
            button.classList.add("btn-secondary");
        });
    });

    buttonClose.click(function () {
        closeModal(modal);
    });

    buttonClose2.click(function () {
        closeModal(modal);
    });

    buttonSave.click(function () {
        const productsList = [];
        const productsButtons = document.querySelectorAll("#productsDiv .btn-success");
        productsButtons.forEach(function (item) {
            const prGuid = item.dataset.guid;
            productsList.push(prGuid);
        });

        rewriteObject(productsList, modal, myObj, guid);
    });
}

$(document).ready(function () {
    attachEventHandlers();
});