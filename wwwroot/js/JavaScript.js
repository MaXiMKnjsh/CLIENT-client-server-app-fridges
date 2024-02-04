function openModal(params) {
    const url = params.url;
    const guid = params.guid;
    // селектор jQuery
    const modal = $("#myModal");
    const buttonOk = $("#buttonOk");
    const buttonClose = $("#buttonClose");

    if (url === undefined || guid === undefined) {
        alert("Произошла ошибка!");
        return;
    }

    modal.modal("show");
}
function removeObject() {
    // метод jQuery для асинхронного http запроса к серверу
    $.ajax({
        type: "DELETE",
        url: url,
        data: { "guid": guid },
        success:
            function () {
                modal.modal("hide");
            },
        //failure:
        //    function () {

        //    },
        error:
            function () {
            }
    });
}
function closeModal() {
    modal.modal("hide");
}