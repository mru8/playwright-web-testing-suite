const { test, expect } = require('@playwright/test');

const LoginPage = require('../pages/LoginPage');
const DashboardPage = require('../pages/DashboardPage');

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);

    await page.goto('http://127.0.0.1:5500/app/index.html');
    await loginPage.login('test@example.com', 'Test@123');
})

test('dashboard is visible after login', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);

    await expect(dashboardPage.dashboardHeading).toBeVisible();
    await expect(dashboardPage.productsHeading).toBeVisible();
    await expect(dashboardPage.searchInput).toBeVisible();
});