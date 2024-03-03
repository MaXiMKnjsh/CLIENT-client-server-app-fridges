function changeClass(button) {
    button.classList.toggle('btn-secondary');
    button.classList.toggle('btn-success');
}

$('#myForm').submit(async function (event) {
    event.preventDefault();

    const name = $('#name').val();
    const ownerName = $('#ownerName').val();
    const selectedModelGuid = $('#model').val();

    const myObj = { connectionString: undefined };
    if (!(await GetConnectionString(myObj))) {
        return;
    }

    try {
        const fridgeGuid = await CreateFridge(name, ownerName, selectedModelGuid, myObj.connectionString);
        if (fridgeGuid === false) {
            console.log("Холодильник не был создан!");
            return;
        }

        console.log("Холодильник создан!");

        if (!(await AddProducts(myObj.connectionString, fridgeGuid))) {
            console.log("Продукты не были добавлены!");
            return;
        }

        console.log("Продукты добавлены!");
        location.reload();
    } catch (error) {
        console.log(error);
    }

});

async function AddProducts(connectionString, fridgeGuid) {
    return new Promise((resolve, reject) => {
        const productsDiv = $('#productsDiv');
        if (productsDiv.length === 0) {
            resolve(false);
        }

        const successButtons = $('#productsDiv').find('.btn-success');
        const productsGuids = successButtons.map(function () {
            return $(this).data('guid');
        }).get();

        const url = `${connectionString}/FridgeProducts/AddProducts?fridgeGuid=${fridgeGuid}`;

        $.ajax({
            url: url,
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(productsGuids),
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
        const url = `${connectionString}/Fridges?name=${name}&ownerName=${ownerName}&modelGuid=${selectedModelGuid}`;

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