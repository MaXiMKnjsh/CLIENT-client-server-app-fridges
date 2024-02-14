function changeClass(button) {
    if (button.classList.contains('btn-secondary')) {
        button.classList.remove('btn-secondary');
        button.classList.add('btn-success');
    }
    else {
        button.classList.remove('btn-success');
        button.classList.add('btn-secondary');
    }
}


$('#myForm').submit(function (event) {
    event.preventDefault(); // Предотвращаем отправку формы по умолчанию

    // Получаем значения элементов формы
    const name = $('#name').val();
    const ownerName = $('#ownerName').val();
    const selectedModelGuid = $('#model').val();

    // получаем url на api
    var connectionString;
    $.ajax({
        url: '/staticconfig.json',
        dataType: 'json',
        success: function (data) {
            // Работа с данными из appsettings.json
            connectionString = data.ConnectionStrings.ApiString;
            SendPostRequest(name, ownerName, selectedModelGuid, connectionString);
        },
        error: function (response) {
            alert("Произошла ошибка при чтении статических файлов!");
            console.log(response);
            return;
        }
    });
});

function SendPostRequest(name, ownerName, selectedModelGuid, connectionString) {
    // Создаем URL с параметрами
    var url = connectionString + "/Fridges" + "?name=" + name + "&ownerName=" + ownerName + "&modelGuid=" + selectedModelGuid;

    // Отправляем post-запрос
    $.ajax({
        url: url,
        method: 'POST',
        success: function (response) {
            location.reload();
            console.log(response);
        },
        error: function (response) {
            alert("Произошла ошибка при запросе к серверу!");
            console.log(response);
        }
    });
}