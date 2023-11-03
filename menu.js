let btnMenu = document.getElementById('btn-menu')
let menuMobile = document.getElementById('menu-mobile')
let overlayMobile = document.getElementById('overlay-menu')

btnMenu.addEventListener('click', () => {
    menuMobile.classList.add('abrir-menu')
})

menuMobile.addEventListener('click', () => {
    menuMobile.classList.remove('abrir-menu')
})

overlayMobile.addEventListener('click', () => {
    menuMobile.classList.remove('abrir-menu')
})