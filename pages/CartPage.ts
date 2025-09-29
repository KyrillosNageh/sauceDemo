import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartContainer: Locator;
  readonly header: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartContainer = page.locator('#cart_contents_container');
    this.header = page.locator('.title'); // if the cart page uses .title for the header
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }

  async removeProductFromCart(productName: string) {
    const item = this.cartContainer.locator('.cart_item').filter({ hasText: productName });
    await expect(item).toBeVisible();
    await item.locator('button').click();
  }

  async expectPageLoaded() {
    await expect(this.header).toHaveText('Your Cart');
    await expect(this.page).toHaveURL(/\/cart\.html$/);
  }

  async expectProductInCart(productName: string) {
    const item = this.cartContainer.locator('.cart_item').filter({ hasText: productName });
    await expect(item).toBeVisible();
  }

  async expectCartItemCount(expectedCount: number) {
    const items = this.cartContainer.locator('.cart_item');
    await expect(items).toHaveCount(expectedCount);
  }

  async expectCartEmpty() {
    await this.expectCartItemCount(0);
  }
}
