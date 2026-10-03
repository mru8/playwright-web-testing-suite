class DashboardPage {
    constructor(page) {
        this.page = page;
        this.dashboardHeading = page.getByRole('heading', { name: 'Dashboard' });
        this.productsHeading = page.getByRole('heading', { name: 'Products'});
        this.searchInput = page.getByRole('textbox', { name: 'Search products' });
        this.searchButton = page.getByRole('button', { name: 'Search'});
    }

    async searchProduct(product) {
        await this.searchInput.fill(product);
        await this.searchButton.click();
    }
}

module.exports = DashboardPage;