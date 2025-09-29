import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutInfoPage } from '../../pages/CheckoutInfoPage';
import users from '../../test-data/users.json';
import products from '../../test-data/products.json';
import checkout from '../../test-data/checkout.json';

test.describe('Checkout Info Step', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(users.standardUser.username, users.standardUser.password);

    const inventory = new InventoryPage(page);
    await inventory.addProductToCart(products.singleProduct);
    await inventory.openCart();

    const cart = new CartPage(page);
    await cart.proceedToCheckout();
  });

  test('Fill checkout form successfully', async ({ page }) => {
    const checkoutInfo = new CheckoutInfoPage(page);
    await checkoutInfo.fillCheckoutInfo(
      checkout.valid.firstName,
      checkout.valid.lastName,
      checkout.valid.postalCode
    );
  });

  test('Canceling checkout returns to cart', async ({ page }) => {
    const checkoutInfo = new CheckoutInfoPage(page);
    await checkoutInfo.cancelCheckout();

    const cart = new CartPage(page);
    await cart.expectPageLoaded();
  });

  test('Validation error when first name is missing', async ({ page }) => {
    const checkoutInfo = new CheckoutInfoPage(page);
    await checkoutInfo.fillCheckoutInfo(
      checkout.missingFirstName.firstName,
      checkout.missingFirstName.lastName,
      checkout.missingFirstName.postalCode
    );
    await checkoutInfo.expectValidationError('Error: First Name is required');
  });
});
