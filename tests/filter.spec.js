const { test, expect } = require('@playwright/test');

test("user can filter products by category", async ({ page }) => {
    await page.goto('http://127.0.0.1:5500/app/index.html');

    await page.getByLabel('Email').fill('test@example.com');
    await page.getByLabel('Password').fill('Test@123');
    await page.getByRole('button', { name: 'Login' }).click();

    await page.getByLabel('Filter by category:').selectOption('Electronics');

    await expect(page.getByText('Laptop')).toBeVisible();
    await expect(page.getByText('Headphones')).toBeVisible();
    await expect(page.getByText('T-Shirt')).toBeHidden();
    await expect(page.getByText('Shoes')).toBeHidden();
});