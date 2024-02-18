async function GetConnectionString(myObj) {
    try {
        const data = await $.ajax({
            url: '/staticconfig.json',
            dataType: 'json'
        });

        myObj.connectionString = data.ConnectionStrings.ApiString;
        return true;
    } catch (error) {
        alert("Произошла ошибка при чтении статических файлов!");
        console.log(error);
        return false;
    }
}