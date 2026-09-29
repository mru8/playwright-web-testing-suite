const { test, expect } = require('@playwright/test');
test("user can add a product to cart", async ({ page }) => {
    await page.goto('http://127.0.0.1:5500/app/index.html');

    await page.getByLabel('Email').fill('test@example.com');
    await page.getByLabel('Password').fill('Test@123');

    await page.getByRole('button', { name: 'Login' }).click();

    await page.getByRole('button', { name: 'Add to Cart' }).first().click();
    await expect(page.getByText('laptop - Quantity: 1')).toBeVisible();
});

test("user can increase product quantity in cart", async ({ page }) => {
    await page.goto('http://127.0.0.1:5500/app/index.html');

    await page.getByLabel('Email').fill('test@example.com');
    await page.getByLabel('Password').fill('Test@123');

    await page.getByRole('button', { name: 'Login' }).click();

    await page.getByRole('button', { name: 'Add to Cart' }).first().click();
    await page.getByRole('button', { name: 'Add to Cart' }).first().click();

    await expect(page.getByText('laptop - Quantity: 2')).toBeVisible();
});

test("user can add different products to cart", async ({ page }) => {
    await page.goto('http://127.0.0.1:5500/app/index.html');

    await page.getByLabel('Email').fill('test@example.com')
    await page.getByLabel('Password').fill('Test@123');

    await page.getByRole('button', { name: 'Login' }).click();

    await page.getByRole('button', { name: 'Add to Cart'}).nth(1).click();

    await expect(page.getByText('headphones - Quantity: 1')).toBeVisible();
});