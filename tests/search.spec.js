const {test, expect } = require('@playwright/test');
const DashboardPage = require('../pages/DashboardPage');
const LoginPage = require('../pages/LoginPage');

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);

    await page.goto('http://127.0.0.1:5500/app/index.html');
    await loginPage.login('test@example.com', 'Test@123');
})

test("user can search for a product", async ({ page }) => {
    const dashboardPage = new DashboardPage(page);

    await dashboardPage.searchProduct('head');

    await expect(page.getByText('Headphones')).toBeVisible();
    await expect(page.getByText('Laptop')).toBeHidden();
    await expect(page.getByText('T-Shirt')).toBeHidden();
    await expect(page.getByText('Shoes')).toBeHidden();
});

test("search returns no products for an invalid search", async ({ page }) => {
    const dashboardPage = new DashboardPage(page);

    await dashboardPage.searchProduct('tablet');

    await expect(page.getByText('Laptop')).toBeHidden();
    await expect(page.getByText('Headphones')).toBeHidden();
    await expect(page.getByText('T-Shirt')).toBeHidden();
    await expect(page.getByText('Shoes')).toBeHidden();
});