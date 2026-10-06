class DashboardPage {
    constructor(page) {
        this.page = page;
        
        this.dashboardHeading = page.getByRole('heading', { name: 'Dashboard' });
        this.productsHeading = page.getByRole('heading', { name: 'Products'});
        
        this.searchInput = page.getByRole('textbox', { name: 'Search products' });
        this.searchButton = page.getByRole('button', { name: 'Search'});

        this.categoryFilter = page.getByRole('combobox', { name: 'Filter by category:' });

        this.sortDropdown = page.locator('#sort-products');
    }

    async searchProduct(product) {
        await this.searchInput.fill(product);
        await this.searchButton.click();
    }

    async filterByCategory(category) {
        await this.categoryFilter.selectOption(category);

    }

    async sortProducts(sortOption) {
        await this.sortDropdown.selectOption(sortOption);
    }

    async addProductToCart(productName){
        await this.page
            .locator(`.product[data-name="${productName}"]`)
            .getByRole('button', { name: 'Add to Cart'})
            .click();
    }

    async removeProductFromCart(productName) {
        const cartItem = this.page
            .locator('#cart-items div')
            .filter({ hasText: productName });
        
        await cartItem.getByRole('button', { name: 'Remove' }).click();
    }

    async clearCart() {
        await this.page.locator('#clear-cart').click();
    }

    async logout() {
        await this.page.getByRole('button', { name: 'Logout' }).click();
    }
}

module.exports = DashboardPage;