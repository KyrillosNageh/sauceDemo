import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import users from '../../test-data/users.json';
import products from '../../test-data/products.json';

test.describe('Inventory Feature', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(users.standardUser.username, users.standardUser.password);
  });

  test('Add product from inventory page', async ({ page }) => {
    const inventory = new InventoryPage(page);
    await inventory.addProductToCart(products.singleProduct);
    await inventory.expectCartBadgeCount(1);
  });

  test('Remove product from inventory page', async ({ page }) => {
    const inventory = new InventoryPage(page);
    await inventory.addProductToCart(products.singleProduct);
    await inventory.removeProductFromCart(products.singleProduct);
    await inventory.expectCartBadgeCount(0);
  });
});
