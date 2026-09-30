const loginForm = document.getElementById('login-form');
if (loginForm) {
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.getElementById('error-message');

    loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if(!email){
        errorMessage.textContent = 'Email is required';
        return;
    }

    if(!password){
        errorMessage.textContent = 'Password is required';
        return;
    }

    const validEmail = 'test@example.com';
    const validPassword = 'Test@123';

    if (email === validEmail && password === validPassword) {
        window.location.href = 'dashboard.html';
        return;
    }

    errorMessage.textContent = 'Invalid email or password';
    });
}

const logoutButton = document.getElementById('logout-button');

if (logoutButton) {
    logoutButton.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
}

const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const products = document.querySelectorAll('.product');

if (searchButton) {
    searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value.toLowerCase();

        products.forEach(product => {
            const productName = product.dataset.name;

            if (productName.includes(searchTerm)) {
                product.style.display = '';
            } else {
                product.style.display = 'none';
            }

        });
    });
}

const categoryFilter = document.getElementById('category-filter');

if (categoryFilter) {
    categoryFilter.addEventListener('change', () => {
        const selectedCategory = categoryFilter.value;

        products.forEach(product => {
            const productCategory = product.dataset.category;

            if (
                selectedCategory === 'all' ||
                productCategory === selectedCategory
            ) {
                product.style.display = '';
            } else {
                product.style.display = 'none';
            }
        });
    });
}

let cart = [];

const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.getElementById('cart-count');
const cartItemLabel = document.getElementById('cart-item-label');
const clearCartButton = document.getElementById('clear-cart');

const addToCartButtons = document.querySelectorAll('.product button');

function renderCart() {
        let total = 0;
        let count = 0;
        cartItems.innerHTML = '';

        cart.forEach(item => {
            total += item.price * item.quantity;
            count += item.quantity;

            const cartItem = document.createElement('div');

            cartItem.textContent = `${item.name} - Quantity: ${item.quantity} - Price: Rs. ${item.price * item.quantity }`;

            const removeButton = document.createElement('button');

            removeButton.textContent = 'Remove';
            removeButton.addEventListener('click', () => {
               item.quantity--;

               if (item.quantity === 0) {
                cart = cart.filter(cartProduct => cartProduct.name !== item.name);
               }

                renderCart();
            });

            cartItem.appendChild(removeButton);

            cartItems.appendChild(cartItem);

        });

        cartTotal.textContent = `Total: Rs. ${total}`;
        cartCount.textContent = count;
        cartItemLabel.textContent = count === 1 ? 'item' : 'items';
}

addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const product = button.closest('.product');
        const productName = product.dataset.name;
        const productPrice = Number(product.dataset.price);

        const existingProduct = cart.find(item => item.name === productName);
        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push({
                name: productName,
                price:productPrice,
                quantity: 1
            });
        }
        
        renderCart();
        
        console.log(cart);
    });
});

clearCartButton.addEventListener('click', () => {
    cart = [];
    renderCart();
});

