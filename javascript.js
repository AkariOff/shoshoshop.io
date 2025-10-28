// Данные товаров с улучшенными описаниями
const products = [
    {
        id: 1,
        name: "Футболка Premium Cotton",
        price: 1299,
        description: "Мягкая хлопковая футболка премиум-качества. Идеальна для повседневной носки и создания стильных образов.",
        image: "https://via.placeholder.com/400x400/6366f1/ffffff?text=Футболка+Premium",
        category: "clothing",
        sizes: ["S", "M", "L", "XL"],
        badge: "Хит продаж"
    },
    {
        id: 2,
        name: "Худи Comfort Fit",
        price: 3499,
        description: "Теплое и уютное худи с современным кроем. Отлично сочетается с джинсами и спортивной обувью.",
        image: "https://via.placeholder.com/400x400/ec4899/ffffff?text=Худи+Comfort",
        category: "clothing",
        sizes: ["S", "M", "L", "XL"],
        badge: "Новинка"
    },
    {
        id: 3,
        name: "Часы Chrono Sport",
        price: 4599,
        description: "Стильные спортивные часы с водонепроницаемостью 100м. Хронограф и календарь в одном дизайне.",
        image: "https://via.placeholder.com/400x400/10b981/ffffff?text=Часы+Sport",
        category: "accessories",
        badge: "Эксклюзив"
    },
    {
        id: 4,
        name: "Футболка Essential",
        price: 999,
        description: "Базовая футболка отличного качества. Универсальный вариант для любого гардероба.",
        image: "https://via.placeholder.com/400x400/6366f1/ffffff?text=Футболка+Basic",
        category: "clothing",
        sizes: ["S", "M", "L"]
    },
    {
        id: 5,
        name: "Худи Oversize",
        price: 3799,
        description: "Модное худи оверсайз кроя. Создает расслабленный и стильный look в любых ситуациях.",
        image: "https://via.placeholder.com/400x400/ec4899/ffffff?text=Худи+Oversize",
        category: "clothing",
        sizes: ["M", "L", "XL"],
        badge: "Тренд"
    },
    {
        id: 6,
        name: "Часы Elegance Pro",
        price: 5299,
        description: "Элегантные классические часы с сапфировым стеклом. Подчеркнут ваш стиль в деловой обстановке.",
        image: "https://via.placeholder.com/400x400/10b981/ffffff?text=Часы+Elegance",
        category: "accessories",
        badge: "Премиум"
    },
    {
        id: 7,
        name: "Шорты Urban Style",
        price: 2199,
        description: "Стильные шорты для городского образа жизни. Комфортные и практичные для теплой погоды.",
        image: "https://via.placeholder.com/400x400/f59e0b/ffffff?text=Шорты+Urban",
        category: "clothing",
        sizes: ["S", "M", "L", "XL"],
        badge: "Лето 2024"
    },
    {
        id: 8,
        name: "Браслет Minimalist",
        price: 899,
        description: "Элегантный минималистичный браслет из нержавеющей стали. Подходит для ежедневной носки.",
        image: "https://via.placeholder.com/400x400/8b5cf6/ffffff?text=Браслет+Minimal",
        category: "accessories"
    },
    {
        id: 9,
        name: "Футболка Graphic Print",
        price: 1599,
        description: "Футболка с уникальным графическим принтом. Выразите свой стиль через искусство.",
        image: "https://via.placeholder.com/400x400/6366f1/ffffff?text=Футболка+Graphic",
        category: "clothing",
        sizes: ["S", "M", "L", "XL"],
        badge: "Арт-коллекция"
    },
    {
        id: 10,
        name: "Цепочка Silver Line",
        price: 1899,
        description: "Стильная серебряная цепочка с современным дизайном. Идеальное дополнение к любому образу.",
        image: "https://via.placeholder.com/400x400/6b7280/ffffff?text=Цепочка+Silver",
        category: "accessories",
        badge: "Бестселлер"
    },
    {
        id: 11,
        name: "Худи Tech Fleece",
        price: 4299,
        description: "Инновационное худи из технологичного флиса. Легкое, теплое и стильное.",
        image: "https://via.placeholder.com/400x400/ec4899/ffffff?text=Худи+Tech",
        category: "clothing",
        sizes: ["S", "M", "L", "XL"],
        badge: "Технологии"
    },
    {
        id: 12,
        name: "Набор браслетов Modern",
        price: 1299,
        description: "Набор из трех стильных браслетов для создания многослойного образа.",
        image: "https://via.placeholder.com/400x400/8b5cf6/ffffff?text=Браслеты+Set",
        category: "accessories",
        badge: "Комплект"
    }
];

// Функция для отображения товаров
function displayProducts(productsToShow = products) {
    const container = document.getElementById('products-container');
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
                <img src="${product.image}" alt="${product.name}" class="product-image" 
                     onerror="this.src='https://via.placeholder.com/400x400/6366f1/ffffff?text=FashionStore'">
                ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
            </div>
            <div class="product-name">${product.name}</div>
            <div class="product-price">${product.price.toLocaleString()} ₽</div>
            <div class="product-description">${product.description}</div>
            ${product.sizes ? `
                <div class="product-sizes">
                    <span class="size-label">Доступные размеры:</span>
                    <div class="size-badges">
                        ${product.sizes.map(size => `<span class="size-badge">${size}</span>`).join('')}
                    </div>
                </div>
            ` : ''}
            <button class="add-to-cart" onclick="addToCart(${product.id})">
                🛒 Добавить в корзину
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
            </button>
        `;

        container.appendChild(productCard);
    });
}

// Функция фильтрации по категориям
function showCategory(category) {
    const buttons = document.querySelectorAll('.category-btn');
    buttons.forEach(btn => {
        btn.classList.remove('active');
        btn.style.transform = 'translateY(0)';
    });
    
    event.target.classList.add('active');
    event.target.style.transform = 'translateY(-2px)';

    let filteredProducts = products;
    if (category !== 'all') {
        filteredProducts = products.filter(product => product.category === category);
    }

    // Добавляем анимацию появления
    const container = document.getElementById('products-container');
    container.classList.add('loading');
    
    setTimeout(() => {
        displayProducts(filteredProducts);
        container.classList.remove('loading');
    }, 300);
}

// Функция добавления в корзину с улучшенным UI
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const button = event.target;
        const originalText = button.innerHTML;
        
        // Анимация добавления
        button.innerHTML = '✅ Добавлено!';
        button.style.background = 'var(--success)';
        button.disabled = true;
        
        // Создаем всплывающее уведомление
        showNotification(`"${product.name}" добавлен в корзину!`);
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.style.background = '';
            button.disabled = false;
        }, 2000);
    }
}

// Функция показа уведомлений
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--success);
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: var(--shadow-lg);
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
        font-weight: 500;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('products-container')) {
        // Задержка для плавного появления
        setTimeout(() => {
            displayProducts();
        }, 200);
    }
});
