document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('purchase-form');
    const productNameInput = document.getElementById('product-name');
    const productCategorySelect = document.getElementById('product-category');
    const productQuantityInput = document.getElementById('product-quantity');
    const shoppingList = document.getElementById('shopping-list');

    // Cargar la lista guardada en el navegador al iniciar
    let items = JSON.parse(localStorage.getItem('shopping_items')) || [];
    renderList();

    // Evento para agregar un nuevo producto
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = productNameInput.value.trim();
        const category = productCategorySelect.value;
        const quantity = productQuantityInput.value.trim();

        if (name === '' || quantity === '') return;

        const newItem = {
            id: Date.now(),
            name: name,
            category: category,
            quantity: quantity,
            completed: false
        };

        items.push(newItem);
        saveAndRender();
        form.reset();
        productNameInput.focus();
    });

    // Función para renderizar (dibujar) la lista en pantalla
    function renderList() {
        shoppingList.innerHTML = '';

        if (items.length === 0) {
            shoppingList.innerHTML = '<p style="text-align: center; color: #888; padding: 15px;">Tu lista está vacía. ¡Agrega tu primer producto!</p>';
            return;
        }

        items.forEach(item => {
            const li = document.createElement('li');
            if (item.completed) {
                li.classList.add('completed');
            }

            li.innerHTML = `
                <div class="item-info">
                    <span class="name">${item.name} (${item.category})</span>
                    <span class="details">Cant: ${item.quantity}</span>
                </div>
                <div class="item-actions">
                    <button class="btn-check" onclick="toggleItem(${item.id})" title="Marcar como comprado">✅</button>
                    <button class="btn-delete" onclick="deleteItem(${item.id})" title="Eliminar">🗑️</button>
                </div>
            `;

            shoppingList.appendChild(li);
        });
    }

    // Guardar en localStorage y actualizar la vista
    function saveAndRender() {
        localStorage.setItem('shopping_items', JSON.stringify(items));
        renderList();
    }

    // Funciones globales para los botones de cada ítem
    window.toggleItem = function(id) {
        items = items.map(item => {
            if (item.id === id) {
                return { ...item, completed: !item.completed };
            }
            return item;
        });
        saveAndRender();
    };

    window.deleteItem = function(id) {
        items = items.filter(item => item.id !== id);
        saveAndRender();
    };
});


