// Данные товаров
const products = [
    {
        id: 1,
        name: "Футболка хлопковая",
        price: 1299,
        description: "Мягкая хлопковая футболка премиум-качества",
        image: "футболка.jpg",
        category: "clothing",
        sizes: ["S", "M", "L", "XL"]
    },
    {
        id: 2,
        name: "Худи утепленное",
        price: 3499,
        description: "Теплое худи для холодной погоды",
        image: "худи.jpg",
        category: "clothing",
        sizes: ["S", "M", "L", "XL"]
    },
    {
        id: 3,
        name: "Часы спортивные",
        price: 4599,
        description: "Водонепроницаемые спортивные часы",
        image: "часы.jpg",
        category: "accessories"
    },
    {
        id: 4,
        name: "Футболка базовая",
        price: 999,
        description: "Классическая футболка для повседневной носки",
        image: "футболка.jpg",
        category: "clothing",
        sizes: ["S", "M", "L"]
    },
    {
        id: 5,
        name: "Худи оверсайз",
        price: 3799,
        description: "Стильное худи свободного кроя",
        image: "худи.jpg",
        category: "clothing",
        sizes: ["M", "L", "XL"]
    },
    {
        id: 6,
        name: "Часы классические",
        price: 5299,
        description: "Элегантные классические часы",
        image: "часы.jpg",
        category: "accessories"
    }
];

// Функция для отображения товаров
function displayProducts(productsToShow = products) {
    const container = document.getElementById('products-container');
    container.innerHTML = '';

    productsToShow.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.setAttribute('data-category', product.category);

        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.src='https://via.placeholder.com/300x300?text=Нет+изображения'">
            <div class="product-name">${product.name}</div>
            <div class="product-price">${product.price} руб.</div>
            <div class="product-description">${product.description}</div>
            ${product.sizes ? `
                <div style="margin-bottom: 10px;">
                    <strong>Размеры:</strong> ${product.sizes.join(', ')}
                </div>
            ` : ''}
            <button class="add-to-cart" onclick="addToCart(${product.id})">
                🛒 Добавить в корзину
            </button>
        `;

        container.appendChild(productCard);
    });
}

// Функция фильтрации по категориям
function showCategory(category) {
    const buttons = document.querySelectorAll('.category-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    let filteredProducts = products;
    if (category !== 'all') {
        filteredProducts = products.filter(product => product.category === category);
    }

    displayProducts(filteredProducts);
}

// Функция добавления в корзину
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        alert(`Товар "${product.name}" добавлен в корзину!`);
        // Здесь можно добавить логику для реальной корзины
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('products-container')) {
        displayProducts();
    }
});