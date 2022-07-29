function checkEdit() {
    let fileImg = document.getElementById("imgEdit").files;
    if (fileImg.length === 0){
        editNoUpFile();
    }else {
        editYesUpFile()
    }
}


function getEdit(id) {
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: "http://localhost:8080/products/" + id,
        //xử lý khi thành công
        success: function (data) {
            showEdit(data);
        },
        error: function (err) {
            console.log(err)
        }
    })

}

function showEdit(product) {
    document.getElementById("nameEdit").value = product.name;
    document.getElementById("priceEdit").value = product.price;
    document.getElementById("dateEdit").value = product.date;
    document.getElementById("imageEdit").src = product.img;
    document.getElementById("id").value = product.id;
}

function editNoUpFile() {
    let id = $("#id").val();
    let name = $("#nameEdit").val();
    let price = $("#priceEdit").val();
    let date = $("#dateEdit").val();
    let img = document.getElementById("imageEdit").src;
    let product = {
        id: id,
        name: name,
        price: price,
        date: date,
        img: img
    }
    callEdit(product);

}

function callEdit(product){
    $.ajax({
        type: "PUT",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: "http://localhost:8080/products",
        data: JSON.stringify(product),
        //xử lý khi thành công
        success: function (data) {
            getData();
        },
        error: function (err) {
            console.log(err)
        }
    })
}

function editYesUpFile() {
    let id = $("#id").val();
    let name = $("#nameEdit").val();
    let price = $("#priceEdit").val();
    let date = $("#dateEdit").val();
    let fileImg = document.getElementById("imgEdit").files;
    let formData = new FormData();
    formData.append("file", fileImg[0]);
    $.ajax({
        contentType: false,
        processData: false,
        type: "POST",
        data: formData,
        url: "http://localhost:8080/products/upImg",
        success: function (data) {
            let product = {
                id: id,
                name: name,
                price: price,
                date: date,
                img: data
            }
            callEdit(product)
        }
    });
}
