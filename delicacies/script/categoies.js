"use strict";
// import data from '../../data.json' assert {type: 'json'};

$(document).ready ( function(){
    var data = (function () {
        var data = null;
        $.ajax({
            'async': false,
            'global': false,
            'url': 'data.json',
            // 'url': '../delicacies/data.json',
            'dataType': "json",
            'success': function (json) {
                data = json;
            }
        });
    
    const categoies = data.categories;
    const container = document.getElementById("category-list");

    categoies.forEach(element => {
        const newItem = createItem('div', 'category-list__item', '', container);
        const nameItem = createItem('div', 'category-list__name', element.name, newItem);

        const wrapper = createItem('div', 'category-list__wrapper', '', newItem);
        const products = createItem('ul', 'category-list__products', '', wrapper);
        element.products.forEach(productItem => {
            const product = createItem('li', 'pdsa', productItem.name, products);
        })

        const more = createItem('a', 'category-list__more', 'Подробнее', wrapper);
        more.id = element.id;

        const img = createItem('img', 'category-list__img', '', newItem);
        img.src = element.img;
    });


    const modal = document.querySelector('.more-about');

    document.getElementById("category-list").addEventListener('click', (e) => {
        if(e.target.classList == 'category-list__more'){
            const container = createItem('div', 'more-about__container', '', modal);

            categoies.forEach(item => {
                if(item.id === e.target.getAttribute('id')){
                    const title = createItem('div', 'more-about__title', `${item.name}:`, container);

                    const wrapper = document.createElement('div');
                    wrapper.className = 'more-about__wrapper';
                    container.appendChild(wrapper);

                    const products = document.createElement('div');
                    products.className = 'more-about__products';
                    const img = createItem('img', 'more-about__img', '', container);
                    img.src = item.img;

                    item.products.forEach((element, index1) => {
                        const product = createItem('div', 'more-about__product-name', element.name, products);
                        const characteristics = createItem('div', 'more-about__characteristics', '', product);

                        const packsWrapper = createItem('div', 'more-about__packs-wrapper', 'Тип упаковки:', characteristics);
                        

                        element.characteristics.forEach((item, index2) => {
                            const {pack, price, shelfLife} = item;

                            const packType = createItem('button', 'more-about__pack', pack, packsWrapper);
                            packType.setAttribute('number', index2)

                            const property = createItem('p',
                            'more-about__characteristic',
                            `Вес: весовой товар <br>
                            Срок годности: ${shelfLife}<br> 
                            <span class="more-about__price">${price} руб.</span>`,
                            characteristics);
                            property.setAttribute('number', index2)

                            if(index1 === 0 && index2 === 0) {
                                characteristics.classList.add('more-about__characteristics--active');
                                property.classList.add('more-about__characteristic--active');
                                packType.classList.add('more-about__pack--active');
                            }

                            product.addEventListener('click', (e)=> {
                                const nameActive = 'more-about__product-name--active'
                                document.querySelector(`.${nameActive}`).classList.remove(nameActive);
                                product.classList.add(nameActive);

                                const listActive = 'more-about__characteristics--active';
                                document.querySelector(`.${listActive}`).classList.remove(listActive);
                                characteristics.classList.add(listActive);

                                const characteristicActive = 'more-about__characteristic--active';
                                document.querySelector(`.${characteristicActive}`).classList.remove(characteristicActive);
                                property.classList.add(characteristicActive);

                                const packActive = 'more-about__pack--active';
                                document.querySelector(`.${packActive}`).classList.remove(packActive);
                                packType.classList.add(packActive);

                                if (e.target.className === 'more-about__pack') {
                                    document.querySelector(`.${packActive}`).classList.remove(packActive);
                                    e.target.classList.add(packActive);

                                    product.querySelector(`.${characteristicActive}`).classList.remove(characteristicActive);
                                    product.querySelector(`p[number='${e.target.getAttribute('number')}']`).classList.add(characteristicActive);

                                    console.log(product.querySelector(`p[number='${e.target.getAttribute('number')}']`));
                  
                                    // console.log(product.querySelector('[number="1"], div'));
                                }

                            });

                    
                        })
                        
                    })
                
                    // 
                    products.firstChild.classList.add('more-about__product-name--active');
                    
                    wrapper.appendChild(products);
               

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

function createItem(type, classN, text, parent) {
    const item = document.createElement(type);
    item.className = classN;
    item.innerHTML = text;
    parent.appendChild(item);

    return item;
}



