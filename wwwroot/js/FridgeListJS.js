function openModal(params) {
    const url = params.url;
    const guid = params.guid;
    const name = params.name;
    // селектор jQuery
    const modal = $("#modal-confirmation");

    if (url === undefined || guid === undefined) {
        alert("Произошла ошибка!");
        return;
    }

    modal.find(".modal-body").html(`<p>Вы действительно хотите удалить ${name}?<p>`);
    modal.modal('show');

    const buttonRemove = modal.find("#buttonRemove");
    const buttonClose = modal.find("#buttonClose");
    const buttonClose2 = modal.find("#buttonClose2");

    buttonClose.click(function () {
        closeModal(modal);
    });

    buttonClose2.click(function () {
        closeModal(modal);
    });

    buttonRemove.click(function () {
        removeObject(url, guid, modal);
    });
}

function removeObject(url, guid, modal) {
    //метод jQuery для асинхронного http запроса к серверу
    $.ajax({
        type: "DELETE",
        url: url + "/" + guid,
        success:
            function (response) {
                modal.modal("hide");
                console.log(response);
                location.reload();
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
