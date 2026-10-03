class DashboardPage {
    constructor(page) {
        this.page = page;
        
        this.dashboardHeading = page.getByRole('heading', { name: 'Dashboard' });
        this.productsHeading = page.getByRole('heading', { name: 'Products'});
        
        this.searchInput = page.getByRole('textbox', { name: 'Search products' });
        this.searchButton = page.getByRole('button', { name: 'Search'});

        this.categoryFilter = page.getByRole('combobox', { name: 'Filter by category:' });
    }

    async searchProduct(product) {
        await this.searchInput.fill(product);
        await this.searchButton.click();
    }

    async filterByCategory(category) {
        await this.categoryFilter.selectOption(category);

    }
}

module.exports = DashboardPage;