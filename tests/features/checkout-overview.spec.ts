import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutInfoPage } from '../../pages/CheckoutInfoPage';
import { CheckoutOverviewPage } from '../../pages/CheckoutOverviewPage';
import users from '../../test-data/users.json';
import products from '../../test-data/products.json';
import checkout from '../../test-data/checkout.json';

test.describe('Checkout Overview Step', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(users.standardUser.username, users.standardUser.password);

    const inventory = new InventoryPage(page);
    await inventory.addProductToCart(products.singleProduct);
    await inventory.openCart();

    const cart = new CartPage(page);
    await cart.proceedToCheckout();

    const checkoutInfo = new CheckoutInfoPage(page);
    await checkoutInfo.fillCheckoutInfo(
      checkout.valid.firstName,
      checkout.valid.lastName,
      checkout.valid.postalCode
    );
  });

  test('Verify product in overview', async ({ page }) => {
    const overview = new CheckoutOverviewPage(page);
    await overview.expectProductInOverview(products.singleProduct);
    await overview.expectSummaryTotalContains('Total');
  });

  test('Canceling checkout returns to cart', async ({ page }) => {
    const overview = new CheckoutOverviewPage(page);
    await overview.cancelCheckout();

    const inventory = new InventoryPage(page);
    await inventory.openCart();

    const cart = new CartPage(page);
    await cart.expectPageLoaded();
  });
});
