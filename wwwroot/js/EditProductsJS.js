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
async function openModal(_guid) {
    guid = _guid;
    myObj = { connectionString: undefined };
    if (!(await GetConnectionString(myObj))) { return; }

    // получаю строку подключения к api
    try {
        var products = await GetProducts(guid, myObj);
        if (products === false) {
            return;
        }
    }
    catch (error)
    {
        console.log(error);
    }

    const modal = $("#modal-editing");

    // отмечаю продукты, котоыре уже есть в холодильнике
    MarkProducts(modal,products);

    modal.modal('show');
}
async function MarkProducts(modal,products) {
    const productsDiv = $(modal).find("#productsDiv");
    if (products !== undefined) {
        products.forEach(function (product) {
            const productDiv = productsDiv.find(`div[data-guid="${product.productGuid}"]`);

            const productButton = productDiv.find('button');
            const productCountField = productDiv.find('input');

            productCountField.val(product.quantity);

            productButton.removeClass('btn-secondary');
            productButton.addClass('btn-success');
        });
    }
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
        const inputs = document.querySelectorAll("#productsDiv input");
        inputs.forEach(function (input) {
            input.value = "0";
        });
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
        const productsList =[];
        const productDivs = document.querySelectorAll("#productsDiv div[data-guid]");
        productDivs.forEach(function (productDiv) {
            const buttonElement = productDiv.querySelector("button.btn-success");
            const inputElement = productDiv.querySelector("input");
            if (buttonElement && inputElement) {
                const prodGuid = buttonElement.getAttribute("data-guid");
                const prodCount = inputElement.value;

                productsList.push({
                    ProductGuid: prodGuid,
                    Quantity: prodCount
                });
            }
        });

        rewriteObject(productsList, modal, myObj, guid);
    });
}
$(document).ready(function () {
    attachEventHandlers();
});