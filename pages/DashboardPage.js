class DashboardPage {
    constructor(page) {
        this.page = page;
        this.dashboardHeading = page.getByRole('heading', { name: 'Dashboard' });
        this.productsHeading = page.getByRole('heading', { name: 'Products'});
    }

}

module.exports = DashboardPage;