const cartCount = document.getElementById('cart-count');
const cartCountHeader = document.getElementById('cart-count-header');
const cartModal = document.getElementById('cart-modal');
const openCartBtn = document.getElementById('open-cart');
const closeCartBtn = document.getElementById('close-cart');
const continueShoppingBtn = document.getElementById('btn-continue-shopping');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalValue = document.getElementById('cart-total-price');

let cart = JSON.parse(localStorage.getItem('infusoesCart')) || [];

// Abrir e fechar carrinho
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

// Adicionar produto ao carrinho (sem abrir a barra lateral automaticamente)
function addToCart(id, name, price, image = 'images/imagem.jpg') {
    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ id, name, price, image, quantity: 1 });
    }

    updateCart();
}

// Diminuir quantidade (ou remover do carrinho)
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

// Remover item completamente (Ícone de fechar/excluir no carrinho)
function removeAllFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

// Atualizar interface do carrinho e estado dos botões nos cards
function updateCart() {
    localStorage.setItem('infusoesCart', JSON.stringify(cart));

    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

    // Atualiza contadores no header e no modal
    if (cartCount) cartCount.innerText = totalItems;
    if (cartCountHeader) cartCountHeader.innerText = `(${totalItems} ${totalItems === 1 ? 'item' : 'itens'})`;

    // Renderizar lista de itens do carrinho
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

    // Atualiza os botões "-" nos cards dos produtos na loja
    updateProductButtons();
}

// Ativa/Desativa o botão "-" nos cards da loja
function updateProductButtons() {
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
        const id = parseInt(card.getAttribute('data-id'));
        const minusBtn = card.querySelector('.remove-from-cart-btn');

        if (minusBtn) {
            const inCart = cart.find(item => item.id === id);
            
            // Só adiciona a classe 'active' se o produto estiver no carrinho com quantidade > 0
            if (inCart && inCart.quantity > 0) {
                minusBtn.classList.add('active');
            } else {
                minusBtn.classList.remove('active');
            }
        }
    });
}

// Execução segura ao carregar o script
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateCart);
} else {
    updateCart();
}
