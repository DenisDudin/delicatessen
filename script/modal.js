"use strict"

let modal = document.getElementById('modal-price');
const btn = document.querySelectorAll(".prices");
const span = document.getElementsByClassName("close")[0];

btn.forEach(item => {
    item.addEventListener('click', (e) => {
        modal.style.display = "block";
        document.body.style.overflow = 'hidden';

        if (e.target.getAttribute('data-product-7') == '') {
            document.querySelector('.modal-price__title[data-product-7]').scrollIntoView();
            document.querySelector('.modal-price__title[data-product-7]').style.color = 'red';
        }
    });
});

span.onclick = function() {
    modal.style.display = "none";
};

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};
