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
        const container = document.getElementById("modal-wrapper");
    
        categories.forEach(element => {
            const category = document.createElement('div');
            category.className = 'modal-price__title';
            category.innerHTML = element.name;
            
    
            const list = document.createElement('div');
            list.className = 'modal-price__list';
    
            element.products.forEach(item => {
                item.characteristics.forEach(productItem => {
                    const product = document.createElement('div');
                    product.className = 'modal-price__item';
    
                    const name = document.createElement('p');
                    name.className = 'modal-price__text';
                    name.innerHTML = item.name;
                    product.appendChild(name);
    
                    // const pack = document.createElement('p');
                    // pack.className = 'modal-price__characteristics';
                    // pack.innerHTML = productItem.package;
                    // product.appendChild(pack);
    
                    const price = document.createElement('p');
                    price.className = 'modal-price__price';
                    // price.innerHTML = productItem.price + ' руб.';
                    price.innerHTML = '--- руб.'
                    product.appendChild(price);
    
                    list.appendChild(product);
                })
            })
    
            container.appendChild(category);
            container.appendChild(list);
        });
    })();
});

let modal = document.getElementById('modal-price');
const btn = document.querySelectorAll(".prices");
const span = document.getElementsByClassName("close")[0];

btn.forEach(item => {
    item.addEventListener('click', (e) => {
        modal.style.display = "block";
    
        // if (e.target.getAttribute('data-product-7') == '') {
        //     document.querySelector('.modal-price__title[data-product-7]').scrollIntoView();
        //     document.querySelector('.modal-price__title[data-product-7]').style.color = 'red';
        // }
    });
});

span.onclick = function() {
    modal.style.display = "none";
    document.body.style.overflow = 'visible';
};

document.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        document.body.style.overflow = 'visible';
    }
};
