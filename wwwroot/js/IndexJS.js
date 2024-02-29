async function AddDefaultQuantities() {
    const myObj = { connectionString: undefined };
    if (!(await GetConnectionString(myObj))) {
        return;
    }

    $.ajax({
        method: "PUT",
        url: `${myObj.connectionString}/FridgeProducts`,
        contentType: 'application/json',
        success: function (response) {
            
            console.log(response);
        },
        error: function (response) {
            alert("Произошла ошибка при запросе к серверу!");
            console.log(response);
        }
    });
}