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


