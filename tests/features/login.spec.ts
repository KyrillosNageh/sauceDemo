import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import users from '../../test-data/users.json';
import { InventoryPage } from '@pages/InventoryPage';

test.describe('Login Feature', () => {
  test('Standard user can login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(users.standardUser.username, users.standardUser.password);
    
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.expectPageLoaded();
  });

  test('Locked out user shows error message', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('locked_out_user', users.standardUser.password);
    await loginPage.expectErrorMessage(
      'Epic sadface: Sorry, this user has been locked out.'
    );
  });
});
