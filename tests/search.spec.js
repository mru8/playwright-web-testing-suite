const {test, expect } = require('@playwright/test');
test("user can search for a product", async ({ page }) => {
    await page.goto('http://127.0.0.1:5500/app/index.html');

    await page.getByLabel('Email').fill('test@example.com');
    await page.getByLabel('Password').fill('Test@123');
    await page.getByRole('button', { name: 'Login' }).click();

    await page.getByPlaceholder('Search products').fill('head');
    await page.getByRole('button', { name: 'Search' }).click();

    await expect(page.getByText('Headphones')).toBeVisible();
    await expect(page.getByText('Laptop')).toBeHidden();
    await expect(page.getByText('T-Shirt')).toBeHidden();
    await expect(page.getByText('Shoes')).toBeHidden();
});

test("search returns no products for an invalid search", async ({ page }) => {
    await page.goto('http://127.0.0.1:5500/app/index.html');

    await page.getByLabel('Email').fill('test@example.com');
    await page.getByLabel('Password').fill('Test@123');
    await page.getByRole('button', { name: 'Login' }).click();

    await page.getByPlaceholder('Search products').fill('tablet');
    await page.getByRole('button', { name: 'Search' }).click();

    await expect(page.getByText('Laptop')).toBeHidden();
    await expect(page.getByText('Headphones')).toBeHidden();
    await expect(page.getByText('T-Shirt')).toBeHidden();
    await expect(page.getByText('Shoes')).toBeHidden();
});