import {test, expect} from '@playwright/test';

const LoginPage = require('../pages/LoginPage');
const DashboardPage = require('../pages/DashboardPage');

test.beforeEach(async ({ page }) => {
    await page.goto('http://127.0.0.1:5500/app/index.html');
});

test('user can login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
 
    await loginPage.login('test@example.com', 'Test@123');

    await expect(
        page.getByRole('heading', { name: 'Dashboard' })
    ).toBeVisible();
});

test('shows error when email is empty', async ({page}) => {
    await page.getByLabel('Password').fill('Test@123');
    await page.getByRole('button', {name:'Login'}).click();

    await expect(page.getByText('Email is required')).toBeVisible();
});

test('shows error when password is empty', async ({ page }) => {
    await page.getByLabel('Email').fill('test@example.com');
    await page.getByRole('button', { name: 'Login'}).click();

    await expect(page.getByText('Password is required')).toBeVisible();
});

test('shows error for invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login('wrong@example.com', 'Wrong@123');
    await expect(page.getByText('Invalid email or password')).toBeVisible();
});

test('user can logout from dasshboard', async({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.login('test@example.com', 'Test@123');
    
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();

    await dashboardPage.logout();
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
});

