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

                    const quantityWrapper = createProduct('div', 'category-item__quantity-wrapper', '', product)
                    const minus = createProduct('button', "category-item__btn-quantity", "-", quantityWrapper);
                    const inner = createProduct('div', 'category-item__inner', '', quantityWrapper);
                    const quantity = createProduct('p', "category-item__quantity", '1', inner);
                    const weight = createProduct('span', "category-item__weight", productItem.weight, inner);
                    const plus = createProduct('button',"category-item__btn-quantity", '+', quantityWrapper);
    
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

    const quantityWrapper = createProduct('div', 'category-item__quantity-wrapper', '', cartProduct)
    const minus = createProduct('button', "category-item__btn-quantity", "-", quantityWrapper);
    const inner = createProduct('div', 'category-item__inner', '', quantityWrapper);
    const quantity = createProduct('p', "category-item__quantity", quantityProduct, inner);
    const weight = createProduct('span', "category-item__weight", weightProduct, inner);
    const plus = createProduct('button',"category-item__btn-quantity", '+', quantityWrapper);

    const productPrice = createProduct('div', 'cart-list__price', `${price} руб.`, cartProduct);

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
    document.querySelector('#total-weight').innerHTML = `${summ('.category-item__weight')} гр.`;
    document.querySelector('#grand-total').innerHTML = `${summ('.cart-list__price')} руб.`;
}

function summ(unit) {
    let summ = 0;
    document.querySelectorAll(unit).forEach(item => {
        summ += parseInt(item.innerHTML.match(/\d+/));
    })

    return summ;
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
