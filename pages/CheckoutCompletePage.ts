import { Page, Locator, expect } from '@playwright/test';

export class CheckoutCompletePage {
  readonly page: Page;
  readonly header: Locator;
  readonly backHomeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = page.locator('.complete-header');
    this.backHomeButton = page.locator('[data-test="back-to-products"]');
  }

  async backHome() {
    await this.backHomeButton.click();
  }

  async expectPageLoaded() {
    await expect(this.header).toHaveText('Thank you for your order!');
    await expect(this.backHomeButton).toBeVisible();
  }
}
