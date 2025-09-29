import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { MenuPage } from '../../pages/MenuPage';
import users from '../../test-data/users.json';

test.describe('Menu Feature', () => {
  test('User can logout', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(users.standardUser.username, users.standardUser.password);

    const menu = new MenuPage(page);
    await menu.openMenu();
    await menu.logout();
  });
});
