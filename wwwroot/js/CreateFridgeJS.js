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


$('#myForm').submit(async function (event) {
    event.preventDefault(); // Предотвращаем отправку формы по умолчанию

    // Получаем значения элементов формы
    const name = $('#name').val();
    const ownerName = $('#ownerName').val();
    const selectedModelGuid = $('#model').val();

    // получаем url на api
    const myObj = { connectionString: undefined };
    if (!(await GetConnectionString(myObj)))
        return;

    const fridgeGuid = await CreateFridge(name, ownerName, selectedModelGuid, myObj.connectionString);
    if (fridgeGuid === false) {
        console.log("Холодильник не был создан!");
        return;
    } else { console.log("Холодильник создан!"); }

    if (!(await AddProducts(myObj.connectionString, fridgeGuid))) {
        console.log("Продукты не были добавлены!");
        return;
    } else { console.log("Продукты добавлены!"); }
});

async function AddProducts(connectionString, fridgeGuid) { // думай как передать сюда список дурачила)))
    return new Promise((resolve, reject) => {
        const productsDiv = $('#productsDiv');
        if (productsDiv.length === 0)
            resolve(false);

        const successButtons = $('#productsDiv').find('.btn-success'); // нахожу нажатые кнопки для перебора продуктов из них
        const productsGuids = [];
        successButtons.each(function () {
            const productGuid = $(this).data('guid');
            productsGuids.push(productGuid);
        });

        var url = connectionString + "/FridgeProducts/AddProducts?fridgeGuid=" + fridgeGuid;

        var x = JSON.stringify(productsGuids);
        $.ajax({
            url: url,
            method: 'POST',
            contentType: 'application/json',
            data: x,
            success: function () {
                resolve(true);
            },
            error: function (response) {
                alert("Произошла ошибка при запросе к серверу!");
                console.log(response);
                reject(false);
            }
        });
    });
}

async function CreateFridge(name, ownerName, selectedModelGuid, connectionString) {
    return new Promise((resolve, reject) => {
        var url = connectionString + "/Fridges" + "?name=" + name + "&ownerName=" + ownerName + "&modelGuid=" + selectedModelGuid;

        // Отправляем post-запрос
        $.ajax({ 
            url: url,
            method: 'POST',
            success: function (data) {
                resolve(data);
            },
            error: function (response) {
                alert("Произошла ошибка при запросе к серверу!");
                console.log(response);
                reject(false);
            }
        });
    });
}