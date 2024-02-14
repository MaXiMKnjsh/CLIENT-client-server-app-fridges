function openModal(params) {
    const guid = params.guid;
    const name = params.name;
    // селектор jQuery
    const modal = $("#modal-confirmation");

    if (name === undefined || guid === undefined) {
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
        removeObject(guid, modal);
    });
}

function removeObject(guid, modal) {
    // получаем url на api
    var connectionString;
    $.ajax({
        url: '/staticconfig.json',
        dataType: 'json',
        success: function (data) {
            // Работа с данными из appsettings.json
            connectionString = data.ConnectionStrings.ApiString;
        },
        error: function (response) {
            alert("Произошла ошибка при чтении статических файлов!");
            console.log(response);
            return;
        }
    }); // вынеси этот метод в отдельный js файл броу

    //метод jQuery для асинхронного http запроса к серверу
    $.ajax({
        type: "DELETE",
        url: connectionString + "/Fridges/" + guid,
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
