import { Page, Locator, expect } from '@playwright/test';

export class CheckoutOverviewPage {
  readonly page: Page;
  readonly header: Locator;
  readonly summaryTotal: Locator;
  readonly finishButton: Locator;
  readonly cancelButton: Locator;
  readonly itemsContainer: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = page.locator('.title'); // instead of .subheader
    this.summaryTotal = page.locator('.summary_total_label');
    this.finishButton = page.locator('[data-test="finish"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
    this.itemsContainer = page.locator('.cart_list');
  }

  async finishCheckout() {
    await this.finishButton.click();
  }

  async cancelCheckout() {
    await this.cancelButton.click();
  }

  async expectPageLoaded() {
    await expect(this.header).toHaveText('Checkout: Overview');
    await expect(this.summaryTotal).toBeVisible();
  }

  async expectProductInOverview(productName: string) {
    const product = this.itemsContainer.locator('.inventory_item_name', { hasText: productName });
    await expect(product).toBeVisible();
  }

  async expectSummaryTotalContains(text: string) {
    await expect(this.summaryTotal).toContainText(text);
  }
}
