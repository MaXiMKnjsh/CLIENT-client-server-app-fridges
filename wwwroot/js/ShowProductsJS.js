async function openModal(params) {
    const guid = params.guid;
    /*const url = params.url;*/
    const modal = $("#modal-products");

    if (guid === undefined /*|| url === undefined*/) {
        alert("Произошла ошибка!");
        return;
    }

    // получаем url на api
    const myObj = { connectionString: undefined };
    if (!(await GetConnectionString(myObj)))
        return;

    $.ajax({
        type: 'GET',
        url: myObj.connectionString + '/FridgeProducts/' + guid,
        success: function (responce) {
            let list = document.getElementById('myProductsList');
            list.innerHTML = '';

            if (!(responce === undefined)) {
                responce.forEach(function (item) {
                    // Создаем элементы и добавляем содержимое полей guid и name
                    let listItem = document.createElement('li');
                    listItem.textContent = item.name + ' - ' + item.quantity;

                    // Добавляем элемент в HTML-структуру
                    list.appendChild(listItem);
                });
            }
            else {
                // Создаем элементы и добавляем содержимое полей guid и name
                let listItem = document.createElement('li');
                listItem.textContent = 'В холодильнике ничего не содержится!';

                // Добавляем элемент в HTML-структуру
                list.appendChild(listItem);
            }
            modal.modal('show');

            const buttonClose = modal.find("#buttonClose");
            const buttonClose2 = modal.find("#buttonClose2");

            buttonClose.click(function () {
                closeModal(modal);
            });

            buttonClose2.click(function () {
                closeModal(modal);
            });
        },
        error: function (responce) {
            alert(responce.responseText);
        }
    });
}

function closeModal(modal) {
    $(modal).modal('hide');
}