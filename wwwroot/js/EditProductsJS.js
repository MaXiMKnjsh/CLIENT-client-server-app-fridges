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
async function openModal(guid) {
    // селектор jQuery
    const modal = $("#modal-editing");

    const myObj = { connectionString: undefined };
    if (!(await GetConnectionString(myObj))) {
        return;
    }

    const products = await GetProducts(guid, myObj);
    if (products === false) {
        return;
    }

    const productsDiv = document.getElementById("productsDiv");

    if (products !== undefined) {
        products.forEach(function (item) {
            var button = productsDiv.querySelector(`#product-${item.productGuid}`);
            button.classList.add('btn-success');
        });
    }

    modal.modal('show');

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
        rewriteObject(newProductsInfo, modal, myObj);
    });
    modal.on('hidden.bs.modal', function () {
        const buttons = productsDiv.querySelectorAll(".btn-success");
        buttons.forEach(function (button) {
            button.classList.remove("btn-success");
            button.classList.add("btn-secondary");
        });
    });
}
async function rewriteObject(newProductsInfo, modal, myObj) { // доделай эндпоинт в api
    $.ajax({
        method: "PUT",
        url: myObj.connectionString + "/Fridges",
        contentType: 'application/json',
        data: JSON.stringify(newProductsInfo),
        success:
            function (response) {
                modal.modal("hide");
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
function changeClass(button) {
    button.classList.toggle('btn-success');
    button.classList.toggle('btn-secondary');
}