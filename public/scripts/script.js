$(document).ready(function(){
    $('[name="product"]').on('change', function() {
        $('[name="price"]').val($(this).val());
    });
});

function addProduct(){
    var product = $( "#product option:selected" ).text();
    var quantity = document.bill.quantity.value;
    var mrp = document.bill.price.value;
    var price = quantity * document.bill.price.value;
    var total = price + +document.bill.totalAmount.value;

    if(product === 0){
        alert("Please select a product");
    }else{
        var tr = document.createElement('tr');

        var td1 = tr.appendChild(document.createElement('td'));
        var td2 = tr.appendChild(document.createElement('td'));
        var td3 = tr.appendChild(document.createElement('td'));
        var td4 = tr.appendChild(document.createElement('td'));

        td1.setAttribute('class', 'product');
        td2.setAttribute('class', 'quantity');
        td3.setAttribute('class', 'mrp');
        td4.setAttribute('class', 'total');

        td1.innerHTML = product;
        td2.innerHTML = quantity;
        td3.innerHTML = mrp;
        td4.innerHTML = price;

        document.getElementById("billTable").appendChild(tr);

        document.getElementById("product").value = 0;
        document.getElementById("quantity").value = 1;
        document.getElementById("price").value= 0;
        document.getElementById("totalAmount").value = total;
    }
}

function postData(){
    var ary = [];
    $(function () {
        $('#billTable tr:not(:first-child)').each(function (a, b) {
            var product = $('.product', b).text();
            var productCode = ReturnCode(product);
            var productName = ReturnName(product);
            var quantity = $('.quantity', b).text();
            var mrp = $('.mrp', b).text();
            var total = $('.total', b).text();
            ary.push({ ProductCode: productCode, ProductName: productName, Quantity: quantity, MRP: mrp, Total: total });
           
        });
        var jsonArray = JSON.stringify(ary);
        //postRoute(jsonArray);
        postRoute(ary);
    });
}
function postRoute(data){
    $.ajax({
        type: 'post',
        url: '/generatebill',
        data:{
            data: data,
            phone: document.getElementById('phone').value,
            amount: document.getElementById('totalAmount').value
        },
        success:function(data){
            location.reload();
        }
    });
}

//Returns first part of string
function ReturnCode(str){
    return str.substring(0, str.indexOf("-"));
}

//Returns Second Part of string
function ReturnName(str){
    return str.split('-')[1];
}