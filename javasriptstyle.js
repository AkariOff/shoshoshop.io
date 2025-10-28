// Обновите начало файла с подсчетом статистики
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('products-container')) {
        // Обновляем статистику
        updateCategoryStats();
        
        // Задержка для плавного появления
        setTimeout(() => {
            displayProducts();
        }, 200);
    }
});

// Функция обновления статистики категорий
function updateCategoryStats() {
    const allCount = products.length;
    const clothingCount = products.filter(p => p.category === 'clothing').length;
    const accessoriesCount = products.filter(p => p.category === 'accessories').length;
    
    document.getElementById('all-count').textContent = allCount;
    document.getElementById('clothing-count').textContent = clothingCount;
    document.getElementById('accessories-count').textContent = accessoriesCount;
}

// Обновите функцию showCategory для обновления статистики
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

    // Обновляем статистику при переключении
    updateCategoryStats();
    
    // Добавляем анимацию появления
    const container = document.getElementById('products-container');
    container.classList.add('loading');
    
    setTimeout(() => {
        displayProducts(filteredProducts);
        container.classList.remove('loading');
    }, 300);
}