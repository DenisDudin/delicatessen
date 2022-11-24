"use strict";
// import data from '../../data.json' assert {type: 'json'};

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
    
    const categoies = data.categories;
    const container = document.getElementById("category-list");

    categoies.forEach(element => {
        const newItem = document.createElement('div');
        newItem.className = 'category-list__item';

        const nameItem = document.createElement('div');
        nameItem.className = 'category-list__name';
        nameItem.innerHTML = element.name;
        newItem.appendChild(nameItem);

        const wrapper = document.createElement('div');
        wrapper.className = 'category-list__wrapper';
        newItem.appendChild(wrapper);

        const products = document.createElement('ul');
        products.className = 'category-list__products';
        wrapper.appendChild(products);

        element.products.forEach(productItem => {
            const product = document.createElement('li');
            product.innerHTML = productItem.name;
            products.appendChild(product);
        })

        const more = document.createElement('a');
        more.className = 'category-list__more';
        more.id = element.id;
        more.innerHTML = 'Подробнее'
        wrapper.appendChild(more);

        const img = document.createElement('img');
        img.src = element.img;
        img.className = 'category-list__img'
        newItem.appendChild(img);

        container.append(newItem);
    });

    const modal = document.querySelector('.more-about');

    document.getElementById("category-list").addEventListener('click', (e) => {
        if(e.target.classList == 'category-list__more'){
            const container = document.createElement('div');
            container.className = 'more-about__container';
            modal.appendChild(container);
            

            categoies.forEach(item => {
                if(item.id === e.target.getAttribute('id')){
                    const title = document.createElement('div');
                    title.className = 'more-about__title';
                    title.innerHTML = item.name + ':';
                    container.appendChild(title);

                    const wrapper = document.createElement('div');
                    wrapper.className = 'more-about__wrapper';
                    container.appendChild(wrapper);

                    const products = document.createElement('div');
                    products.className = 'more-about__products';

                    const characteristics = document.createElement('div');
                    characteristics.className = 'more-about__characteristics';
                    

                    item.products.forEach(element => {
                        element.characteristics.forEach(item => {
                            const product = document.createElement('a');
                            product.className = 'more-about__product-name';
                            product.innerHTML = element.name;
                            products.appendChild(product);

                            const {pack, price, shelfLife} = item;

                            const property = document.createElement('p');
                            property.className = 'more-about__characteristic';
                            property.innerHTML = `Вес: весовой товар <br>
                            Тип упаковки: ${pack}
                            <br>
                            Срок годности: ${shelfLife} 
                            <span class="more-about__price">${price} руб.</span>`;
                            characteristics.appendChild(property);


                            product.addEventListener('click', ()=> {
                                document.querySelector('.more-about__product-name--active').classList.remove('more-about__product-name--active');
                                product.classList.add('more-about__product-name--active');

                                document.querySelector('.more-about__characteristic--active').classList.remove('more-about__characteristic--active');
                                property.classList.add('more-about__characteristic--active');

                            })
                        })
                        
                    })
                
                    characteristics.firstChild.classList.add('more-about__characteristic--active');
                    products.firstChild.classList.add('more-about__product-name--active');
                    
                    wrapper.appendChild(products);
                    wrapper.appendChild(characteristics);

                }
            })

            document.body.style.overflow = 'hidden';
            modal.style.display = 'block';
        }
    })

    document.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            document.body.style.overflow = 'visible';
            const modalContainer = document.querySelector('.more-about__container');
            modalContainer.remove();
        }
    };

})();
});



