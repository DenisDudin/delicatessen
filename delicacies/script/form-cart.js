"use strict"

$(document).ready(function () {
    $("#form-purchase").submit(function () {

        let formID = $(this).attr('id');
        let formNm = $('#' + formID);

        let data_order = createArrayProduct();
        if (data_order.length === 0) {
            alert("Выберите товар");
            return false;
        }
        var data_send = {
            action : 'send_cart',
            data_user : formNm.serialize(),
            data_order : data_order,
        };

        $.ajax({
            type: "POST",
            url: '../delicacies/blocks/ajax/send-purchase.php',
            data: data_send,
            beforeSend: function () {
                $(formNm).html('<p style="text-align:center">Отправка...</p>');
            },
            success: function (data) {
                $(formNm).html('<p style="text-align:center">'+data+'</p>');
            },
            error: function (jqXHR, text, error) {
                $(formNm).html(error);
            }
        });
        return false;
    });
});

function createArrayProduct() {
    let arrayPoduct = [];
    document.querySelectorAll('.cart-list__product').forEach(item => {
        let product = new Object();
        product.name = item.querySelector('.cart-list__name').innerHTML;
        product.pack = item.querySelector('.cart-list__pack').innerHTML;
        product.quantity = item.querySelector('.category-item__quantity').innerHTML;
        product.price = item.querySelector('.cart-list__price').innerHTML.match(/\d+/);
        console.log(item.querySelector('.cart-list__price'));
        product.weight = item.querySelector('.cart-list__weight').innerHTML.match(/\d+/);
        arrayPoduct.push(JSON.stringify(product));
        
    })
    return arrayPoduct;
}