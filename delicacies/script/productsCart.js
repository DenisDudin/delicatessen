"use strict";

$(document).ready ( function(){
    var data = (function () {
        var data = null;
        $.ajax({
            'async': false,
            'global': false,
            'url': 'data.json',
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

                    const wrapper = createProduct('div', 'category-item__wrapper', '', product);
                    const name = createProduct('p', 'category-item__name', item.name, wrapper);
                    const pack = createProduct('p', 'category-item__pack', `Тип упаковки: ${productItem.pack}`, wrapper);

                    const minus = createProduct('button', "category-item__btn-quantity", "-", product);
                    const inner = createProduct('div', 'category-item__inner', '', product);
                    const quantity = createProduct('p', "category-item__quantity", '1', inner);
                    const weight = createProduct('span', "category-item__weight", productItem.weight, inner);
                    const plus = createProduct('button',"category-item__btn-quantity", '+', product);
    
                    const price = createProduct('p', 'category-item__price', `${productItem.price} руб.`, product);

                    const btn = createProduct('button', 'category-item__btn', 'В корзину', product);          
    
                })
            })
    
            container.appendChild(category);
            container.appendChild(listProducts);

        })

        const categoryList = document.querySelectorAll('.category-name');
        categoryList.forEach(item => {
            item.addEventListener(`click`, (e) => {
                e.target.nextSibling.classList.toggle('category-list__active');
            });
        });

   

        const productList = document.querySelectorAll('.category-list__item');
        productList.forEach(item => {
            item.addEventListener('click', (e) => {

                
                if (e.target.className == 'category-item__btn') {
                    addProductToCart(item);
                } else if (e.target.className == 'category-item__btn-quantity') {
                    changeQuantity(item, e.target.innerHTML);
                }

            });
        })

    })();
});

function changeQuantity(product, sign) {
    const quantity = product.querySelector('.category-item__quantity');
    const number = quantity.innerHTML;
    const weight = product.querySelector('.category-item__weight');
    const price = product.querySelector('.category-item__price');

    if (sign === '+') {
        quantity.innerHTML = +number + 1;
    } else if (sign === '-' && +number > 1) {
        quantity.innerHTML = +number - 1;
    }

    weight.innerHTML = +weight.innerHTML/number*quantity.innerHTML;
    price.innerHTML = `${+price.innerHTML.slice(0, -4)/number*quantity.innerHTML} руб.` ;
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
    const name = item.querySelector('.category-item__name').innerHTML;
    const pack = item.querySelector('.category-item__pack').innerHTML;
    const quantityProduct = item.querySelector('.category-item__quantity').innerHTML;
    const weightProduct = item.querySelector('.category-item__weight').innerHTML;
    const price = parseInt(item.querySelector('.category-item__price').innerHTML, 10);

    const cartProduct = createProduct('div', 'cart-list__product', '', cartList)

    const wrapper = createProduct('div', 'cart-list__wrapper', '', cartProduct);
    const productName = createProduct('p', 'cart-list__name', name, wrapper);
    const productPack = createProduct('span', 'cart-list__pack', pack, wrapper);

    const minus = createProduct('button', "category-item__btn-quantity", "-", cartProduct);
    const inner = createProduct('div', 'category-item__inner', '', cartProduct);
    const quantity = createProduct('p', "category-item__quantity", quantityProduct, inner);
    const weight = createProduct('span', "category-item__weight", weightProduct, inner);
    const plus = createProduct('button',"category-item__btn-quantity", '+', cartProduct);

    const productPrice = createProduct('div', 'cart-list__price', price, cartProduct);

    const deleteBtn = createProduct('button', 'cart-list__del', 'X', cartProduct);
    deleteBtn.onclick = function() {
        cartProduct.remove();
    }
}
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
