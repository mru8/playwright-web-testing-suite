const { test, expect } = require('@playwright/test');

test('user can sort products by price low to high', async ({ page }) => {
    await page.goto('http://127.0.0.1:5500/app/index.html');

    await page.locator('#email').fill('test@example.com');
    await page.locator('#password').fill('Test@123');
    await page.locator('button[type="submit"]').click();

    await expect(page).toHaveURL(/dashboard\.html/);

    const sortDropdown = page.locator('#sort-products');

    await sortDropdown.selectOption('price-low');

    const productList = page.locator('.product');

    const firstProductPrice = await productList.nth(0).getAttribute('data-price');
    const lastProductPrice = await productList.nth((await productList.count()) - 1).getAttribute('data-price');

    const firstPrice = Number(firstProductPrice);
    const lastPrice = Number(lastProductPrice);

    const firstProductName = await productList.nth(0).getAttribute('data-name');

    expect(firstPrice).toBeLessThan(lastPrice);
    expect(firstProductName).toBe('t-shirt');

    const secondProductName = await productList.nth(1).getAttribute('data-name');
    expect(secondProductName).toBe('shoes');

    const thirdProductName = await productList.nth(2).getAttribute('data-name');
    expect(thirdProductName).toBe('headphones');

    const fourthProductName = await productList.nth(3).getAttribute('data-name');
    expect(fourthProductName).toBe('laptop'); 
});

test('user can sort products by price high to low', async ({ page }) => {
    await page.goto('http://127.0.0.1:5500/app/index.html');
    await page.locator('#email').fill('test@example.com');
    await page.locator('#password').fill('Test@123');
    await page.locator('button[type="submit"]').click();

    await expect(page).toHaveURL(/dashboard\.html/);

    const sortDropdown = page.locator('#sort-products');

    await sortDropdown.selectOption('price-high');

    const productList = page.locator('.product');

    const firstProductName = await productList.nth(0).getAttribute('data-name');
    expect(firstProductName).toBe('laptop');

    const secondProductName = await productList.nth(1).getAttribute('data-name');
    expect(secondProductName).toBe('headphones');

    const thirdProductName = await productList.nth(2).getAttribute('data-name');
    expect(thirdProductName).toBe('shoes');

    const fourthProductName = await productList.nth(3).getAttribute('data-name');
    expect(fourthProductName).toBe('t-shirt');
});