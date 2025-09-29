import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutInfoPage } from '../../pages/CheckoutInfoPage';
import { CheckoutOverviewPage } from '../../pages/CheckoutOverviewPage';
import { CheckoutCompletePage } from '../../pages/CheckoutCompletePage';

import users from '../../test-data/users.json';
import products from '../../test-data/products.json';
import checkout from '../../test-data/checkout.json';

test.describe('Swag Labs - E2E Checkout Flow', () => {
  test('Standard user completes checkout for a product', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutInfoPage = new CheckoutInfoPage(page);
    const checkoutOverviewPage = new CheckoutOverviewPage(page);
    const checkoutCompletePage = new CheckoutCompletePage(page);

    await test.step('Navigate and log in', async () => {
      await loginPage.goto();
      await loginPage.login(users.standardUser.username, users.standardUser.password);
      await inventoryPage.expectPageLoaded();
    });

    await test.step('Add product to cart', async () => {
      await inventoryPage.addProductToCart(products.singleProduct);
      await inventoryPage.expectCartBadgeCount(1);
    });

    await test.step('Open cart and verify item', async () => {
      await inventoryPage.openCart();
      await cartPage.expectPageLoaded();
      await cartPage.expectProductInCart(products.singleProduct);
    });

    await test.step('Proceed to checkout', async () => {
      await cartPage.proceedToCheckout();
      await checkoutInfoPage.expectPageLoaded();
    });

    await test.step('Fill checkout information', async () => {
      const { firstName, lastName, postalCode } = checkout.valid;
      await checkoutInfoPage.fillCheckoutInfo(firstName, lastName, postalCode);
      await checkoutOverviewPage.expectPageLoaded();
    });

    await test.step('Verify overview and complete checkout', async () => {
      await checkoutOverviewPage.expectProductInOverview(products.singleProduct);
      await checkoutOverviewPage.expectSummaryTotalContains('Total');
      await checkoutOverviewPage.finishCheckout();
      await checkoutCompletePage.expectPageLoaded();
    });
  });
});
