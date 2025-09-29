import { Page, Locator, expect } from '@playwright/test';
import { LoginPage } from './LoginPage';

export class MenuPage {
  readonly page: Page;
  readonly menuButton: Locator;
  readonly logoutLink: Locator;
  readonly resetAppStateLink: Locator;
  readonly allItemsLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
    this.resetAppStateLink = page.locator('#reset_sidebar_link');
    this.allItemsLink = page.locator('#inventory_sidebar_link');
  }

  async openMenu() {
    await this.menuButton.click();
  }

  async logout() {
    await this.logoutLink.click();
    const loginPage = new LoginPage(this.page);
    await loginPage.expectPageLoaded();
  }

  async resetAppState() {
    await this.resetAppStateLink.click();
  }

  async navigateToAllItems() {
    await this.allItemsLink.click();
  }

  async expectMenuVisible() {
    await expect(this.logoutLink).toBeVisible();
    await expect(this.resetAppStateLink).toBeVisible();
  }
}
