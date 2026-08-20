// ==========================================
// ShoshoShop - Основной скрипт
// ==========================================

// ==========================================
// 1. ДАННЫЕ ТОВАРОВ
// ==========================================
const products = [
    {
        id: 1,
        name: "Футболка Premium Cotton",
        price: 1299,
        description: "Мягкая хлопковая футболка премиум-качества. Идеальна для повседневной носки.",
        image: "img/футболка.jpg",
        category: "clothing",
        sizes: ["S", "M", "L", "XL"],
        badge: "Хит продаж"
    },
    {
        id: 2,
        name: "Худи Comfort Fit",
        price: 3499,
        description: "Теплое и уютное худи с современным кроем. Отлично сочетается с джинсами.",
        image: "img/худи.jpg",
        category: "clothing",
        sizes: ["S", "M", "L", "XL"],
        badge: "Новинка"
    },
    {
        id: 3,
        name: "Часы Chrono Sport",
        price: 4599,
        description: "Стильные спортивные часы с водонепроницаемостью 100м. Хронограф и календарь.",
        image: "img/часы.jpg",
        category: "accessories",
        badge: "Эксклюзив"
    },
    {
        id: 4,
        name: "Кроссовки Urban Style",
        price: 5299,
        description: "Стильные городские кроссовки с амортизацией. Комфорт на весь день.",
        image: "img/кроссовки.jpg",
        category: "shoes",
        sizes: ["38", "39", "40", "41", "42", "43"],
        badge: "Популярное"
    },
    {
        id: 5,
        name: "Кожаная сумка",
        price: 3899,
        description: "Элегантная кожаная сумка через плечо. Вместительная и стильная.",
        image: "img/сумка.jpg",
        category: "accessories",
        badge: "Люкс"
    },
    {
        id: 6,
        name: "Солнечные очки",
        price: 2199,
        description: "Стильные солнечные очки с UV-защитой. Подходят для любого сезона.",
        image: "img/очки.jpg",
        category: "accessories",
        badge: "Стиль"
    },
    {
        id: 7,
        name: "Футболка Basic",
        price: 899,
        description: "Классическая футболка для повседневной носки. Отличное качество по доступной цене.",
        image: "img/футболка.jpg",
        category: "clothing",
        sizes: ["S", "M", "L"],
        badge: "Выгодно"
    },
    {
        id: 8,
        name: "Худи Oversize",
        price: 3799,
        description: "Модное худи оверсайз кроя. Создает расслабленный и стильный look.",
        image: "img/худи.jpg",
        category: "clothing",
        sizes: ["M", "L", "XL"],
        badge: "Тренд"
    }
];

// ==========================================
// 2. КОРЗИНА (с безопасной загрузкой)
// ==========================================
function loadCart() {
    try {
        const saved = localStorage.getItem('cart');
        return saved ? JSON.parse(saved) : [];
    } catch (e) {
        console.error('Ошибка загрузки корзины:', e);
        return [];
    }
}

function saveCart() {
    try {
        localStorage.setItem('cart', JSON.stringify(cart));
    } catch (e) {
        console.error('Ошибка сохранения корзины:', e);
    }
}

let cart = loadCart();

// ==========================================
// 3. ОТОБРАЖЕНИЕ ТОВАРОВ (с экранированием HTML)
// ==========================================
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function displayProducts(productsToShow = products) {
    const container = document.getElementById('products-container');
    if (!container) return;
    
    container.innerHTML = '';

    if (productsToShow.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
                <h3 style="color: var(--gray); margin-bottom: 20px;">😔 Товары не найдены</h3>
                <p style="color: var(--gray);">Попробуйте выбрать другую категорию</p>
            </div>
        `;
        return;
    }

    productsToShow.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card fade-in';
        productCard.setAttribute('data-category', product.category);

        productCard.innerHTML = `
            <div class="product-image-container">
                <img src="${escapeHtml(product.image)}" 
                     alt="${escapeHtml(product.name)}" 
                     class="product-image"
                     onerror="this.src='https://via.placeholder.com/400x400/6366f1/ffffff?text=ShoshoShop'">
                ${product.badge ? `<div class="product-badge">${escapeHtml(product.badge)}</div>` : ''}
            </div>
            <div class="product-name">${escapeHtml(product.name)}</div>
            <div class="product-price">${product.price.toLocaleString()} ₽</div>
            <div class="product-description">${escapeHtml(product.description)}</div>
            ${product.sizes && product.sizes.length ? `
                <div class="product-sizes">
                    <span class="size-label">Доступные размеры:</span>
                    <div class="size-badges">
                        ${product.sizes.map(size => `<span class="size-badge">${escapeHtml(size)}</span>`).join('')}
                    </div>
                </div>
            ` : ''}
            <button class="add-to-cart" data-product-id="${product.id}">
                🛒 Добавить в корзину
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
            </button>
        `;

        // ✅ Добавление обработчика через JS (не inline onclick)
        const button = productCard.querySelector('.add-to-cart');
        button.addEventListener('click', function() {
            addToCart(product.id, 1, this);
        });

        container.appendChild(productCard);
    });
}

// ==========================================
// 4. ФИЛЬТРАЦИЯ ПО КАТЕГОРИЯМ
// ==========================================
function showCategory(category, clickedBtn) {
    // ✅ Используем переданную кнопку вместо event.target
    const buttons = document.querySelectorAll('.category-btn');
    buttons.forEach(btn => {
        btn.classList.remove('active');
        btn.style.transform = 'translateY(0)';
    });
    
    if (clickedBtn) {
        clickedBtn.classList.add('active');
        clickedBtn.style.transform = 'translateY(-2px)';
    }

    let filteredProducts = products
