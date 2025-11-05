// Telegram Web App Integration
class TelegramApp {
    constructor() {
        this.tg = window.Telegram?.WebApp;
        this.init();
    }

    init() {
        if (this.tg) {
            // Инициализация Telegram Web App
            this.tg.expand();
            this.tg.enableClosingConfirmation();
            
            // Устанавливаем тему
            this.setTheme();
            
            // Слушаем изменения темы
            this.tg.onEvent('themeChanged', this.setTheme.bind(this));
            this.tg.onEvent('viewportChanged', this.handleViewport.bind(this));
            
            // Настраиваем основную кнопку
            this.setupMainButton();
            
            // Показываем интерфейс Telegram
            this.showTelegramUI();
        } else {
            // Режим браузера - скрываем Telegram UI
            this.hideTelegramUI();
        }
    }

    setTheme() {
        if (this.tg) {
            const theme = this.tg.colorScheme;
            document.documentElement.setAttribute('data-theme', theme);
            
            if (theme === 'dark') {
                document.documentElement.style.setProperty('--dark', '#f8fafc');
                document.documentElement.style.setProperty('--light', '#1f2937');
                document.documentElement.style.setProperty('--gray-light', '#374151');
            } else {
                document.documentElement.style.setProperty('--dark', '#1f2937');
                document.documentElement.style.setProperty('--light', '#f8fafc');
                document.documentElement.style.setProperty('--gray-light', '#e5e7eb');
            }
        }
    }

    setupMainButton() {
        if (this.tg) {
            const mainButton = this.tg.MainButton;
            
            // Обновляем кнопку при изменении корзины
            this.updateMainButton();
            
            // Обработчик нажатия на основную кнопку
            mainButton.onClick(() => {
                if (window.location.pathname.includes('cart.html') || cart.length > 0) {
                    this.openCart();
                } else {
                    this.openCatalog();
                }
            });
        }
    }

    updateMainButton() {
        if (this.tg) {
            const mainButton = this.tg.MainButton;
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            
            if (totalItems > 0) {
                const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                mainButton.setText(`🛒 Корзина: ${totalPrice.toLocaleString()} ₽`);
                mainButton.show();
            } else {
                mainButton.setText('🛍️ Перейти в каталог');
                mainButton.show();
            }
        }
    }

    showTelegramUI() {
        // Добавляем класс для стилей Telegram
        document.body.classList.add('telegram-app');
        
        // Создаем Telegram header
        this.createHeader();
        
        // Адаптируем контейнер
        const container = document.querySelector('.container');
        if (container) {
            container.classList.add('tg-container');
        }
        
        // Адаптируем карточки товаров
        const productCards = document.querySelectorAll('.product-card');
        productCards.forEach(card => {
            card.classList.add('tg-product-card');
        });
        
        // Адаптируем категории
        const categories = document.querySelector('.categories');
        if (categories) {
            categories.classList.add('tg-categories');
        }
    }

    hideTelegramUI() {
        document.body.classList.remove('telegram-app');
    }

    createHeader() {
        const header = document.createElement('div');
        header.className = 'tg-header';
        header.innerHTML = `
            <button class="tg-back-btn" onclick="tgApp.goBack()">←</button>
            <div class="tg-title" id="tg-title">ShoshoShop</div>
            <button class="tg-menu-btn" onclick="tgApp.showMenu()">☰</button>
        `;
        
        document.body.insertBefore(header, document.body.firstChild);
        
        // Обновляем заголовок в зависимости от страницы
        this.updateTitle();
    }

    updateTitle() {
        const titleElement = document.getElementById('tg-title');
        if (titleElement) {
            const path = window.location.pathname;
            if (path.includes('cart.html')) {
                titleElement.textContent = 'Корзина';
            } else if (path.includes('catalog.html')) {
                titleElement.textContent = 'Каталог';
            } else {
                titleElement.textContent = 'ShoshoShop';
            }
        }
    }

    goBack() {
        if (window.history.length > 1) {
            window.history.back();
        } else {
            this.tg?.close();
        }
    }

    showMenu() {
        if (this.tg) {
            this.tg.showPopup({
                title: 'Меню',
                message: 'Выберите действие',
                buttons: [
                    { id: 'catalog', type: 'default', text: '🛍️ Каталог' },
                    { id: 'cart', type: 'default', text: '🛒 Корзина' },
                    { id: 'close', type: 'cancel', text: 'Закрыть' }
                ]
            }, (buttonId) => {
                switch (buttonId) {
                    case 'catalog':
                        window.location.href = 'catalog.html';
                        break;
                    case 'cart':
                        window.location.href = 'cart.html';
                        break;
                }
            });
        }
    }

    openCart() {
        window.location.href = 'cart.html';
    }

    openCatalog() {
        window.location.href = 'catalog.html';
    }

    // Метод для отправки данных в Telegram
    sendData(data) {
        if (this.tg) {
            this.tg.sendData(JSON.stringify(data));
        }
    }

    // Показать уведомление в стиле Telegram
    showNotification(message) {
        if (this.tg) {
            this.tg.showPopup({
                title: 'Уведомление',
                message: message,
                buttons: [{ type: 'ok' }]
            });
        } else {
            // Стандартное уведомление для браузера
            showNotification(message);
        }
    }
}

// Инициализация Telegram App
let tgApp;

// Обновляем корзину для работы с Telegram
const originalUpdateCartCounter = updateCartCounter;
updateCartCounter = function() {
    originalUpdateCartCounter();
    if (tgApp) {
        tgApp.updateMainButton();
    }
};

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
    tgApp = new TelegramApp();
    
    // Добавляем анимированный фон
    const bg = document.createElement('div');
    bg.className = 'animated-bg';
    document.body.appendChild(bg);
    
    // Добавляем класс для мобильной прокрутки
    document.body.classList.add('mobile-scroll');
});