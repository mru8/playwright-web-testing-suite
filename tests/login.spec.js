import {test, expect} from '@playwright/test';

test('user can login with valid credentials', async ({ page }) => {

    await page.goto("http://127.0.0.1:5500/app/index.html");
    
    await page.getByLabel('Email').fill('test@example.com');
    await page.getByLabel('Password').fill('Test@123');

    await page.getByRole('button', {name: 'Login'}).click();

    await expect(
        page.getByRole('heading', { name: 'Dashboard' })
    ).toBeVisible();
});

test('shows error when email is empty', async ({page}) => {
    await page.goto('http://127.0.0.1:5500/app/index.html');

    await page.getByLabel('Password').fill('Test@123');
    await page.getByRole('button', {name:'Login'}).click();

    await expect(page.getByText('Email is required')).toBeVisible();
});

test('shows error when password is empty', async ({ page }) => {
    await page.goto('http://127.0.0.1:5500/app/index.html');

    await page.getByLabel('Email').fill('test@example.com');
    await page.getByRole('button', { name: 'Login '}).click();

    await expect(page.getByText('Password is required')).toBeVisible();
});

test('shows error for invalid credentials', async ({ page }) => {
    await page.goto('http://127.0.0.1:5500/app/index.html')

    await page.getByLabel('Email').fill('wrong@example.com');
    await page.getByLabel('Password').fill('Wrong@123');
    await page.getByRole('button', {name:'Login'}).click();

    await expect(page.getByText('Invalid email or password')).toBeVisible();
});

test('user can logout from dasshboard', async({ page }) => {
    await page.goto('http://127.0.0.1:5500/app/index.html');

    await page.getByLabel('Email').fill('test@example.com');
    await page.getByLabel('Password').fill('Test@123');
    await page.getByRole('button', { name: 'Login'}).click();

    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();

    await page.getByRole('button', { name: 'Logout' }).click();

    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
});

