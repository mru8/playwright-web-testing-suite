const { test, expect } = require('@playwright/test');


test.describe('Cart functionality', () => {
    test.beforeEach(async ({ page }) => {
    await page.goto('http://127.0.0.1:5500/app/index.html');

    await page.fill('#email', 'test@example.com');
    await page.fill('#password', 'Test@123');

    await page.click('button[type="submit"]');
});

    test("user can add a product to cart", async ({ page }) => {
    await page.getByRole('button', { name: 'Add to Cart' }).first().click();
    await expect(page.getByText('laptop - Quantity: 1')).toBeVisible();
});

test("user can increase product quantity in cart", async ({ page }) => {
    await page.getByRole('button', { name: 'Add to Cart' }).first().click();
    await page.getByRole('button', { name: 'Add to Cart' }).first().click();

    await expect(page.getByText('laptop - Quantity: 2')).toBeVisible();
});

test("user can add different products to cart", async ({ page }) => {
    await page.getByRole('button', { name: 'Add to Cart'}).nth(1).click();

    await expect(page.getByText('headphones - Quantity: 1')).toBeVisible();
});

test("user can decrease product quantity using remove button", async ({ page }) => {
   await page.locator('.product[data-name="laptop"] button').click();
   await page.locator('.product[data-name="laptop"] button').click();

   const removeButton = page.getByRole('button', { name: 'Remove' });
   await removeButton.click();

   const cartItem = page.locator('#cart-items div').filter({ hasText: 'laptop'});

   await expect(cartItem).toHaveText('laptop - Quantity: 1 - Price: Rs. 60000Remove');
});

test('user can remove product when quantity reaches zero', async ({ page }) => {
    await page.locator('.product[data-name="laptop"] button').click();

    const removeButton = page.getByRole('button', { name: 'Remove '});

    await removeButton.click();

    const cartItem = page.locator('#cart-items div').filter({ hasText: 'laptop' });

    await expect(cartItem).toHaveCount(0);
});

test('cart calculates total price correctly', async ({ page }) => {
    await page.locator('.product[data-name="laptop"] button').click();
    await page.locator('.product[data-name="laptop"] button').click();
    await page.locator('.product[data-name="headphones"] button').click();
    
    await expect(page.locator('#cart-total')).toHaveText('Total: Rs. 123000');
});

test('cart count updates with product quantity', async ({ page }) => {
    await page.locator('.product[data-name="laptop"] button').click();
    await page.locator('.product[data-name="laptop"] button').click();
    await page.locator('.product[data-name="headphones"] button').click();

    await expect(page.locator('#cart-count')).toHaveText('3');
});

test('user can clear the cart', async ({ page }) => {
    await page.locator('.product').filter({ hasText: 'Laptop' }).getByRole('button', { name: 'Add to Cart'}).click();

    await expect(page.locator('#cart-items')).toContainText('laptop');

    await page.click('#clear-cart');
    
    await expect(page.locator('#cart-items')).toBeEmpty();
    await expect(page.locator('#cart-total')).toHaveText('Total: Rs. 0');
    await expect(page.locator('#cart-count')).toHaveText('0');
});
});

