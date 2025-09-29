import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';
import users from '../../test-data/users.json';
import products from '../../test-data/products.json';

test.describe('Cart Feature', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(users.standardUser.username, users.standardUser.password);
  });

  test('View cart products', async ({ page }) => {
    const inventory = new InventoryPage(page);
    await inventory.addProductToCart(products.singleProduct);
    await inventory.openCart();

    const cart = new CartPage(page);
    await cart.expectProductInCart(products.singleProduct);
  });

  test('Remove products from cart', async ({ page }) => {
    const inventory = new InventoryPage(page);
    await inventory.addProductToCart(products.singleProduct);
    await inventory.openCart();

    const cart = new CartPage(page);
    await cart.removeProductFromCart(products.singleProduct);
    await cart.expectCartEmpty();
  });
});
