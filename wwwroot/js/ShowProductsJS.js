async function openModal(params) {
    const guid = params.guid;
    const modal = $("#modal-products");

    if (guid === undefined) {
        alert("Произошла ошибка!");
        return;
    }

    const myObj = { connectionString: undefined };
    if (!(await GetConnectionString(myObj))) {
        return;
    }

    $.ajax({
        type: 'GET',
        url: myObj.connectionString + '/FridgeProducts/' + guid,
        success: function (response) {
            const list = document.getElementById('myProductsList');
            list.innerHTML = '';

            if (response !== undefined) {
                response.forEach(function (item) {
                    const listItem = createListItem(item.name +' - '+ item.quantity);
                    list.appendChild(listItem);
                });
            } else {
                const listItem = createListItem('В холодильнике ничего не содержится!');
                list.appendChild(listItem);
            }

            modal.modal('show');
            setupCloseButton(modal);
        },
        error: function (response) {
            alert(response.responseText);
        }
    });
}

function createListItem(text) {
    const listItem = document.createElement('li');
    listItem.textContent = text;
    return listItem;
}

function setupCloseButton(modal) {
    const buttonClose = modal.find("#buttonClose");
    const buttonClose2 = modal.find("#buttonClose2");

    buttonClose.click(function () {
        closeModal(modal);
    });

    buttonClose2.click(function () {
        closeModal(modal);
    });
}

function closeModal(modal) {
    $(modal).modal('hide');
}