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

    if(product === 0){
        alert("Please select a product");
    }else{
        var tr = document.createElement('tr');

        var td1 = tr.appendChild(document.createElement('td'));
        var td2 = tr.appendChild(document.createElement('td'));
        var td3 = tr.appendChild(document.createElement('td'));
        var td4 = tr.appendChild(document.createElement('td'));

        td1.innerHTML = product;
        td2.innerHTML = quantity;
        td3.innerHTML = mrp;
        td4.innerHTML = price;

        document.getElementById("billTable").appendChild(tr);
    }
}

function postData(){
    var myRows = [];
    var $headers = $("th");
    var $rows = $("tbody tr").each(function(index) {
    $cells = $(this).find("td");
    myRows[index] = {};
    $cells.each(function(cellIndex) {
        myRows[index][$($headers[cellIndex]).html()] = $(this).html();
    });    
    });

    // Let's put this in the object like you want and convert to JSON (Note: jQuery will also do this for you on the Ajax request)
    var myObj = {};
    myObj.myrows = myRows;
    alert("Error");
    /*
    $.ajax({
        type: 'post',
        url: '/generatebill',
        data:{
            item: item
        },
        success:function(data){
            location.reload();
        }
    });
    */
}