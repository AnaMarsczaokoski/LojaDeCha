const cartCount = document.getElementById('cart-count');
const cartModal = document.getElementById('cart-modal');
const openCartBtn = document.getElementById('open-cart');
const closeCartBtn = document.getElementById('close-cart');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalValue = document.getElementById('cart-total-value');


let cart = JSON.parse(localStorage.getItem('gunnerCart')) || [];


if (openCartBtn) {
    openCartBtn.addEventListener('click', () => cartModal.classList.add(active));
}
if (closeCartBtn) {
    closeCartBtn.addEventListener('click', () => cartModal.classList.remove(active));
}


const existing = cart.find(item => item.id === id);