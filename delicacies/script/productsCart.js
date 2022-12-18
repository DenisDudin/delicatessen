"use strict";

$(document).ready ( function(){
    let data = (function () {
        let data = null;
        $.ajax({
            'async': false,
            'global': false,
            // 'url': '../delicacies/data.json',
            'url': '../../data.json',
            'dataType': "json",
            'success': function (json) {
                data = json;
            }
        });

        const categories = data.categories;
        const container = document.getElementById("products-list");

        categories.forEach(element => {
            const category = document.createElement('div');
            category.className = 'category-name';
            category.innerHTML = element.name;

            const listProducts = document.createElement('ul');
            listProducts.className = 'cart-category-list';
    
            element.products.forEach(item => {
                item.characteristics.forEach(productItem => {
                    const product = createProduct('a', 'cart-category-list__item category-item', '', listProducts);
                    product.id = productItem.id;

                    const wrapper = createProduct('div', 'category-item__wrapper', '', product);
                    const name = createProduct('p', 'category-item__name', item.name, wrapper);
                    const pack = createProduct('p', 'category-item__pack', `Тип упаковки: ${productItem.pack}`, wrapper);

                    const quantityWrapper = createProduct('div', 'category-item__quantity-wrapper', '', product)
                    const minus = createProduct('button', "category-item__btn-quantity", "-", quantityWrapper);
                    const inner = createProduct('div', 'category-item__inner', '', quantityWrapper);
                    const quantity = createProduct('p', "category-item__quantity", '1', inner);
                    const weight = createProduct('span', "category-item__weight", `~${productItem.weight} гр`, inner);
                    const plus = createProduct('button',"category-item__btn-quantity", '+', quantityWrapper);
    
                    const priceWrapper = createProduct('div', 'category-item__price-wrapper', '', product);
                    const price = createProduct('p', 'category-item__price', `${Math.round(productItem.price*productItem.weight/1000)} руб`, priceWrapper);
                    const priceWeight = createProduct('p', 'category-item__price-weight', `${productItem.price} руб/кг`, priceWrapper);

                    const btn = createProduct('button', 'category-item__btn', 'В корзину', product);          
    
                })
            })
    
            container.appendChild(category);
            container.appendChild(listProducts);

        })

        const categoryList = document.querySelectorAll('.category-name');
        categoryList.forEach(item => {
            item.addEventListener(`click`, (e) => {
                e.target.classList.toggle('category-name--active')
                e.target.nextSibling.classList.toggle('cart-category-list--active');
            });
        });

   

        const productList = document.querySelectorAll('.cart-category-list__item');
        productList.forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target.className == 'category-item__btn') {
                    addProductToCart(item);
                } else if (e.target.className == 'category-item__btn-quantity') {
                    changeQuantity('.category-item__quantity', '.category-item__weight', '.category-item__price', item, e.target.innerHTML);
                }

            });
        })

    })();
});

function changeQuantity(classQuantity, classWeight, classPrice, product, sign) {
    const quantity = product.querySelector(classQuantity);
    const number = quantity.innerHTML;
    const weight = product.querySelector(classWeight);
    const price = product.querySelector(classPrice);

    console.log(quantity, number, weight, price);

    if (sign === '+') {
        quantity.innerHTML = +number + 1;
    } else if (sign === '-' && +number > 1) {
        quantity.innerHTML = +number - 1;
    }

    weight.innerHTML = `~${+weight.innerHTML.match(/\d+/)/number*quantity.innerHTML} гр`;
    price.innerHTML = `${+price.innerHTML.slice(0, -4)/number*quantity.innerHTML} руб` ;
}

function createProduct(type, classN, text, parent) {
    const item = document.createElement(type);
    item.className = classN;
    item.innerHTML = text;
    parent.appendChild(item);

    return item;
}

const cartList = document.getElementById('cart-list');

function addProductToCart(item) {
    const id = item.id;
    const name = item.querySelector('.category-item__name').innerHTML;
    const pack = item.querySelector('.category-item__pack').innerHTML;
    const quantityProduct = item.querySelector('.category-item__quantity').innerHTML;
    const weightProduct = item.querySelector('.category-item__weight').innerHTML;
    const price = parseInt(item.querySelector('.category-item__price').innerHTML, 10);

    
    if (cartList.querySelector(`[id="${id}"]`)) {
        const repeatItem = cartList.querySelector(`[id="${id}"]`);
        const quantityItem = repeatItem.querySelector('.category-item__quantity');
        quantityItem.innerHTML = +quantityItem.innerHTML + +quantityProduct;

        const weightItem = repeatItem.querySelector('.category-item__weight');
        weightItem.innerHTML = `~${+weightItem.innerHTML.match(/\d+/) + +weightProduct.match(/\d+/)} гр`;

        const priceItem = repeatItem.querySelector('.cart-list__price');
        priceItem.innerHTML = `${ parseInt(priceItem.innerHTML.match(/\d+/)) + price} руб`;
        return;
    }

    const cartProduct = createProduct('div', 'cart-list__product', '', cartList);
    cartProduct.id = id;

    const wrapper = createProduct('div', 'cart-list__wrapper', '', cartProduct);
    const productName = createProduct('p', 'cart-list__name', name, wrapper);
    const productPack = createProduct('span', 'cart-list__pack', pack, wrapper);

    const quantityWrapper = createProduct('div', 'category-item__quantity-wrapper cart-list__quantity-wrapper', '', cartProduct)
    const minus = createProduct('button', "category-item__btn-quantity", "-", quantityWrapper);
    const inner = createProduct('div', 'category-item__inner', '', quantityWrapper);
    const quantity = createProduct('p', "category-item__quantity", quantityProduct, inner);
    const weight = createProduct('span', "category-item__weight cart-list__weight", `~${weightProduct.match(/\d+/)} гр`, inner);
    const plus = createProduct('button',"category-item__btn-quantity", '+', quantityWrapper);

    const productPrice = createProduct('div', 'cart-list__price', `${price} руб`, cartProduct);

    document.querySelectorAll('.cart-list__product').forEach(item => {
        item.addEventListener('click', (e) => {
        if (e.target.className == 'category-item__btn-quantity') {
            e.stopImmediatePropagation();
            changeQuantity('.category-item__quantity', '.category-item__weight', '.cart-list__price', item, e.target.innerHTML);
        }
    })
    
    });

    const deleteBtn = createProduct('button', 'cart-list__del', '', cartProduct);
    deleteBtn.onclick = function() {
        cartProduct.remove();
    }
}

let observer = new MutationObserver(recalculation);
observer.observe(cartList, {childList:true, subtree: true});

function recalculation() {
    document.querySelector('#total-weight').innerHTML = `${summ('.cart-list__weight')} гр.`;
    document.querySelector('#grand-total').innerHTML = `${summ('.cart-list__price')} руб`;
    // if (summ('.cart-list__weight') >= 10000) {
    //     document.querySelector('#grand-total').innerHTML = `${summ('.cart-list__price')*0.95} руб`;
    // } else {
    //     document.querySelector('#grand-total').innerHTML = `${summ('.cart-list__price')} руб`;
    // }
    
}

function summ(unit) {
    let summ = 0;
    document.querySelectorAll(unit).forEach(item => {
        summ += parseInt(item.innerHTML.match(/\d+/));
    })

    return summ;
}

let today = new Date();
let dd = today.getDate();
let mm = today.getMonth() + 1;
let yyyy = today.getFullYear();
if(dd<10){
    dd='0'+dd
} 
if(mm<10){
    mm='0'+mm
} 

today = yyyy+'-'+mm+'-'+dd;
document.getElementById("cart-date").setAttribute("min", today);


window.addEventListener("DOMContentLoaded", function() {
    [].forEach.call( document.querySelectorAll('#tel-order'), function(input) {
    var keyCode;
    function mask(event) {
        event.keyCode && (keyCode = event.keyCode);
        var pos = this.selectionStart;
        if (pos < 3) event.preventDefault();
        var matrix = "+7 (___) ___ ____",
            i = 0,
            def = matrix.replace(/\D/g, ""),
            val = this.value.replace(/\D/g, ""),
            new_value = matrix.replace(/[_\d]/g, function(a) {
                return i < val.length ? val.charAt(i++) || def.charAt(i) : a
            });
        i = new_value.indexOf("_");
        if (i != -1) {
            i < 5 && (i = 3);
            new_value = new_value.slice(0, i)
        }
        var reg = matrix.substr(0, this.value.length).replace(/_+/g,
            function(a) {
                return "\\d{1," + a.length + "}"
            }).replace(/[+()]/g, "\\$&");
        reg = new RegExp("^" + reg + "$");
        if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
        if (event.type == "blur" && this.value.length < 5)  this.value = ""
    }

    input.addEventListener("input", mask, false);
    input.addEventListener("focus", mask, false);
    input.addEventListener("blur", mask, false);
    input.addEventListener("keydown", mask, false)

  });

});

// let modal = document.getElementById('modal-price');
// const btn = document.querySelectorAll(".prices");
// const span = document.getElementsByClassName("close")[0];

// btn.forEach(item => {
//     item.addEventListener('click', (e) => {
//         modal.style.display = "block";
    
//         // if (e.target.getAttribute('data-product-7') == '') {
//         //     document.querySelector('.modal-price__title[data-product-7]').scrollIntoView();
//         //     document.querySelector('.modal-price__title[data-product-7]').style.color = 'red';
//         // }
//     });
// });

// span.onclick = function() {
//     modal.style.display = "none";
//     document.body.style.overflow = 'visible';
// };

// document.onclick = function(event) {
//     if (event.target == modal) {
//         modal.style.display = "none";
//         document.body.style.overflow = 'visible';
//     }
// };
