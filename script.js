// Данные товаров
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

// Корзина
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Функция для отображения товаров
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
                <img src="${product.image}" alt="${product.name}" class="product-image" 
                     onerror="this.src='https://via.placeholder.com/400x400/6366f1/ffffff?text=ShoshoShop'">
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

    const container = document.getElementById('products-container');
    if (container) {
        container.classList.add('loading');
        
        setTimeout(() => {
            displayProducts(filteredProducts);
            container.classList.remove('loading');
        }, 300);
    }
}

// Функция добавления в корзину
function addToCart(productId, quantity = 1) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({
                ...product,
                quantity: quantity
            });
        }
        
        // Сохраняем в localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Обновляем счетчик корзины
        updateCartCounter();
        
        // Анимация кнопки
        const button = event.target;
        const originalText = button.innerHTML;
        
        button.innerHTML = '✅ Добавлено!';
        button.style.background = 'var(--success)';
        button.disabled = true;
        
        // Показываем уведомление
        showNotification(`"${product.name}" добавлен в корзину!`);
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.style.background = '';
            button.disabled = false;
        }, 2000);
    }
}

// Функция обновления счетчика корзины
function updateCartCounter() {
    const cartCounter = document.getElementById('cart-counter');
    if (cartCounter) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCounter.textContent = totalItems;
        cartCounter.style.display = totalItems > 0 ? 'flex' : 'none';
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

// Функция отображения корзины
function displayCart() {
    const cartContainer = document.getElementById('cart-container');
    const cartTotal = document.getElementById('cart-total');
    const emptyCart = document.getElementById('empty-cart');
    const cartItems = document.getElementById('cart-items');
    
    if (!cartContainer) return;
    
    if (cart.length === 0) {
        emptyCart.style.display = 'block';
        cartItems.style.display = 'none';
        return;
    }
    
    emptyCart.style.display = 'none';
    cartItems.style.display = 'block';
    
    cartItems.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/100x100/6366f1/ffffff?text=ShoshoShop'">
            </div>
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p class="cart-item-price">${item.price.toLocaleString()} ₽ × ${item.quantity}</p>
                ${item.sizes ? `<p class="cart-item-size">Размер: ${item.sizes[0]}</p>` : ''}
            </div>
            <div class="cart-item-total">
                <span>${itemTotal.toLocaleString()} ₽</span>
            </div>
            <div class="cart-item-actions">
                <div class="quantity-controls">
                    <button onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
                <button class="remove-btn" onclick="removeFromCart(${item.id})">
                    🗑️ Удалить
                </button>
            </div>
        `;
        
        cartItems.appendChild(cartItem);
    });
    
    cartTotal.textContent = total.toLocaleString();
}

// Функция обновления количества товара
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            localStorage.setItem('cart', JSON.stringify(cart));
            displayCart();
            updateCartCounter();
        }
    }
}

// Функция удаления из корзины
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
    updateCartCounter();
    showNotification('Товар удален из корзины');
}

// Функция очистки корзины
function clearCart() {
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
    updateCartCounter();
    showNotification('Корзина очищена');
}

// Функция оформления заказа
function checkout() {
    if (cart.length === 0) {
        showNotification('Корзина пуста!');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    showNotification(`Заказ оформлен! Сумма: ${total.toLocaleString()} ₽`);
    clearCart();
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация счетчика корзины
    updateCartCounter();
    
    // Отображение товаров на странице каталога
    if (document.getElementById('products-container')) {
        setTimeout(() => {
            displayProducts();
        }, 200);
    }
    
    // Отображение корзины на странице корзины
    if (document.getElementById('cart-container')) {
        displayCart();
    }
});
