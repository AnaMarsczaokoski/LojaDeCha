const cartCount = document.getElementById('cart-count');
const cartCountHeader = document.getElementById('cart-count-header');
const cartModal = document.getElementById('cart-modal');
const openCartBtn = document.getElementById('open-cart');
const closeCartBtn = document.getElementById('close-cart');
const continueShoppingBtn = document.getElementById('btn-continue-shopping');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalValue = document.getElementById('cart-total-price');

let cart = JSON.parse(localStorage.getItem('infusoesCart')) || [];

if (openCartBtn) {
    openCartBtn.addEventListener('click', () => {
        if (cartModal) cartModal.classList.add('active');
    });
}

if (closeCartBtn) {
    closeCartBtn.addEventListener('click', () => {
        if (cartModal) cartModal.classList.remove('active');
    });
}

if (continueShoppingBtn) {
    continueShoppingBtn.addEventListener('click', () => {
        if (cartModal) cartModal.classList.remove('active');
    });
}

function addToCart(id, name, price, image = 'images/imagem.jpg') {
    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ id, name, price, image, quantity: 1 });
    }

    updateCart();
}

function removeFromCart(id) {
    const existing = cart.find(item => item.id === id);

    if (existing) {
        if (existing.quantity > 1) {
            existing.quantity -= 1;
        } else {
            cart = cart.filter(item => item.id !== id);
        }
    }

    updateCart();
}

function removeAllFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

function updateCart() {
    localStorage.setItem('infusoesCart', JSON.stringify(cart));

    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

    if (cartCount) cartCount.innerText = totalItems;
    if (cartCountHeader) cartCountHeader.innerText = `(${totalItems} ${totalItems === 1 ? 'item' : 'itens'})`;

    if (cartItemsContainer) {
        cartItemsContainer.innerHTML = '';

        if (cart.length === 0) {
            cartItemsContainer.innerHTML =
                '<p style="text-align:center; font-size:1.4rem; padding-top:20px; color: #666;">Seu carrinho está vazio.</p>';
        }

        let totalAmount = 0;

        cart.forEach(item => {
            totalAmount += item.price * item.quantity;

            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');

            itemElement.innerHTML = `
                <img src="${item.image || 'images/imagem.jpg'}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-info">
                    <h4 class="cart-item-title">${item.name} (${item.quantity}x)</h4>
                    <p class="cart-item-price">R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}</p>
                </div>
                <button class="remove-item-btn" onclick="removeAllFromCart(${item.id})">&times;</button>
            `;

            cartItemsContainer.appendChild(itemElement);
        });

        if (cartTotalValue) {
            cartTotalValue.innerText = `R$ ${totalAmount.toFixed(2).replace('.', ',')}`;
        }
    }

    updateProductButtons();
}

function updateProductButtons() {
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
        const id = parseInt(card.getAttribute('data-id'));
        const minusBtn = card.querySelector('.remove-from-cart-btn');

        if (minusBtn) {
            const inCart = cart.find(item => item.id === id);
            
            if (inCart && inCart.quantity > 0) {
                minusBtn.classList.add('active');
            } else {
                minusBtn.classList.remove('active');
            }
        }
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateCart);
} else {
    updateCart();
}
