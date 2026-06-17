const products = [
    {
        id: 1,
        name: "Camomila, Baunilha e Mel",
        price: 15.99,
        image: "images/img1.png",
        category: "Chás - 500g"
    },
    {
        id: 2,
        name: "Chá Preto",
        price: 12.99,
        image: "images/img2.png",
        category: "Chás - 500g"
    },
    {
        id: 3,
        name: "Chá Branco com Frutas Vermelhas",
        price: 14.99,
        image: "images/img3.png",
        category: "Chás - 500g"
    },
    {
        id: 4,
        name: "Chá Verde",
        price: 13.99,
        image: "images/img4.png",
        category: "Chás - 500g"
    },
    {
        id: 5,
        name: "Chá de Frutas Vermelhas",
        price: 21.99,
        image: "images/img5.png",
        category: "Chás - 500g"
    },
    {
        id: 6,
        name: "Chá Mediterrâneo",
        price: 26.59,
        image: "images/img6.png",
        category: "Chás - 500g"
    },
    {
        id: 7,
        name: "Filtro Artesanal",
        price: 17.99,
        image: "images/img7.png",
        category: "Acessórios"
    },
    {
        id: 8,
        name: "Infusor de Aço Inox",
        price: 11.99,
        image: "images/img8.png",
        category: "Acessórios"
    },
    {
        id: 9,
        name: "Medidor 60g/40g",
        price: 49.99,
        image: "images/img9.png",
        category: "Acessórios"
    },
    {
        id: 10,
        name: "Garrafa Térm. Mandala",
        price: 49.99,
        image: "images/img10.png",
        category: "Garrafas Térmicas - 750ml"
    },
    {
        id: 11,
        name: "Garrafa Térm. Rosas",
        price: 49.99,
        image: "images/img11.png",
        category: "Garrafas Térmicas - 750ml"
    },
    {
        id: 12,
        name: "Garrafa Térm. Japão",
        price: 35.99,
        image: "images/img12.png",
        category: "Garrafas Térmicas - 750ml"
    },
    {
        id: 13,
        name: "Caneca - Pássaros",
        price: 35.99,
        image: "images/img13.png",
        category: "Canecas com Infusor - 500ml"
    },
    {
        id: 14,
        name: "Caneca - Japão",
        price: 35.99,
        image: "images/img14.png",
        category: "Canecas com Infusor - 500ml"
    },
    {
        id: 15,
        name: "Caneca - Transparente",
        price: 35.99,
        image: "images/img15.png",
        category: "Canecas com Infusor - 500ml"
    },
    {
        id: 16,
        name: "Jarra - Chá Quente",
        price: 109.99,
        image: "images/img16.png",
        category: "Jarras 1,5l"
    },
    {
        id: 17,
        name: "Jarra com Infusor - Chá Gelado 1,5l",
        price: 120.99,
        image: "images/img17.png",
        category: "Jarras 1,5l"
    },
    {
        id: 18,
        name: "Jarra Verde - Chá Gelado 1l",
        price: 94.99,
        image: "images/img18.png",
        category: "Jarras 1,5l"
    },
];

const productsGrid = document.getElementById("products-grid");

function renderProducts() {
    if (!productsGrid) return;

    productsGrid.innerHTML = '';

    products.forEach(product => {
        const productHTML = `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <p style="color: #aaa; font-size:1.2rem; margin: 5px 0;">${product.category}</p>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-price">R$ ${product.price.toFixed(2).replace('.', ',')}</p>
                <button class="add-to-cart-btn" data-id="${product.id}">
                    Adicionar ao Carrinho
                </button>
            </div>
        `;
        productsGrid.innerHTML += productHTML;
    });
}

renderProducts();