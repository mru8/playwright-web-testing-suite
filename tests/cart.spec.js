const { test, expect } = require('@playwright/test');

const LoginPage = require('../pages/LoginPage');
const DashboardPage = require('../pages/DashboardPage');

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);

    await page.goto('http://127.0.0.1:5500/app/index.html');
    await loginPage.login('test@example.com', 'Test@123');
})

test.describe('Cart functionality', () => {
    

    test("user can add a product to cart", async ({ page }) => {
        const dashboardPage = new DashboardPage(page);

        await dashboardPage.addProductToCart('laptop');
        
        await expect(page.getByText('laptop - Quantity: 1')).toBeVisible();
});

test("user can increase product quantity in cart", async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    
    await dashboardPage.addProductToCart('laptop');
    await dashboardPage.addProductToCart('laptop');

    await expect(page.getByText('laptop - Quantity: 2')).toBeVisible();
});

test("user can add different products to cart", async ({ page }) => {
    const dashboardPage = new DashboardPage(page);

    await dashboardPage.addProductToCart('headphones');
    
    await expect(page.getByText('headphones - Quantity: 1')).toBeVisible();
});

test("user can decrease product quantity using remove button", async ({ page }) => {
   const dashboardPage = new DashboardPage(page);

   await dashboardPage.addProductToCart('laptop');
   await dashboardPage.addProductToCart('laptop');

   await dashboardPage.removeProductFromCart('laptop');

   const cartItem = page.locator('#cart-items div').filter({ hasText: 'laptop'});

   await expect(cartItem).toHaveText('laptop - Quantity: 1 - Price: Rs. 60000Remove');
});

test('user can remove product when quantity reaches zero', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);

    await dashboardPage.addProductToCart('laptop');

    await dashboardPage.removeProductFromCart('laptop');

    const cartItem = page.locator('#cart-items div').filter({ hasText: 'laptop' });

    await expect(cartItem).toHaveCount(0);
});

test('cart calculates total price correctly', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
   
    await dashboardPage.addProductToCart('laptop');
    await dashboardPage.addProductToCart('laptop');
    await dashboardPage.addProductToCart('headphones');
    
    await expect(page.locator('#cart-total')).toHaveText('Total: Rs. 123000');
});

test('cart count updates with product quantity', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);

    await dashboardPage.addProductToCart('laptop');
    await dashboardPage.addProductToCart('laptop');
    await dashboardPage.addProductToCart('headphones');

    await expect(page.locator('#cart-count')).toHaveText('3');
});

test('user can clear the cart', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);

    await dashboardPage.addProductToCart('laptop');

    await expect(page.locator('#cart-items')).toContainText('laptop');

    await dashboardPage.clearCart();
    
    await expect(page.locator('#cart-items')).toBeEmpty();
    await expect(page.locator('#cart-total')).toHaveText('Total: Rs. 0');
    await expect(page.locator('#cart-count')).toHaveText('0');
});
});

