getData();

function create(data) {
    let name = $("#name").val();
    let price = $("#price").val();
    let date = $("#date").val();
    let product = {
        name: name,
        price: price,
        date: date,
        img: data
    }
    $.ajax({
        type: "POST",
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

function getData() {
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: "http://localhost:8080/products",
        //xử lý khi thành công
        success: function (data) {
            console.log("data")
            console.log(data)
            showData(data.content);
        },
        error: function (err) {
            console.log(err)
        }
    })
}

function showData(data) {
    let str = "";
    for (const d of data) {
        str += ` 
         <tr>
            <td>${d.id}</td>
            <td>${d.name}</td>
            <td>${d.price}</td>
            <td><img src="${d.img}" width="200" height="200"></td>
            <td>${d.date}</td>
            <td><button type="button" class="btn btn-warning"  data-toggle="modal" data-target="#myModalEdit" onclick="getEdit(${d.id})">Edit</button></td>
            <td><button type="button" class="btn btn-danger" onclick="deleteProduct(${d.id})">Delete</button></td>
        </tr>`;
    }

    document.getElementById("show").innerHTML = str;
}


function uploadFile() {
    let fileImg = document.getElementById("img").files;
    if (fileImg.length === 0) {
        alert("ảnh chưa up");
        return;
    }
    let formData = new FormData();
    formData.append("file", fileImg[0]);
    $.ajax({
        contentType: false,
        processData: false,
        type: "POST",
        data: formData,
        url: "http://localhost:8080/products/upImg",
        success: function (data) {
            create(data);
        }
    });
}

function deleteProduct(id) {
    confirm("bạn muốn xóa không ?") ?
        $.ajax({
            type: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            url: "http://localhost:8080/products/" + id,
            //xử lý khi thành công
            success: function (data) {
                getData();
            },
            error: function (err) {
                console.log(err)
            }
        }) : ""
}


function search() {
    let search = document.getElementById("search").value;
    console.log(search)
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: "http://localhost:8080/products/search?name=" + search,
        //xử lý khi thành công
        success: function (data) {
            showData(data);
        },
        error: function (err) {
            console.log(err)
        }
    })

}