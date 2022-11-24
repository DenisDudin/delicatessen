function openDrawer() {
    let checked = document.querySelector('input[type=checkbox]').checked;
    let drawer = document.getElementById('menu-drawer');
    drawer.setAttribute('opened', checked);
}

document.querySelectorAll('.nav-links__item').forEach(function(item) {
  item.addEventListener('click', function(e) {
    let drawer = document.getElementById('menu-drawer');
    drawer.setAttribute('opened', false);
  })
})