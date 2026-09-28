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

const addToCartButtons = document.querySelectorAll('.product button');

addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const product = button.closest('.product');
        const productName = product.dataset.name;

        const existingProduct = cart.find(item => item.name === productName);
        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push({
                name: productName,
                quantity: 1
            });
        }
        
        cartItems.innerHTML = '';

        cart.forEach(item => {
            const cartItem = document.createElement('p');

            cartItem.textContent = `${item.name} - Quantity: ${item.quantity}`;

            cartItems.appendChild(cartItem);
        });

        console.log(cart);
    });
});
