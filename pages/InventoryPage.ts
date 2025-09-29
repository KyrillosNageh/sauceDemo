import { Page, Locator, expect } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly inventoryContainer: Locator;
  readonly shoppingCart: Locator;
  readonly title: Locator;
  readonly sortDropdown: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryContainer = page.locator('[data-test="inventory-container"]');
    this.shoppingCart = page.locator('#shopping_cart_container');
    this.title = page.locator('.title');
    this.sortDropdown = page.locator('[data-test="product_sort_container"]');
  }

  private addToCartButton(productName: string): Locator {
    return this.page
      .locator('.inventory_item')
      .filter({ has: this.page.locator('.inventory_item_name', { hasText: productName }) })
      .locator('button');
  }

  private removeFromCartButton(productName: string): Locator {
    return this.page
      .locator('.inventory_item')
      .filter({ has: this.page.locator('.inventory_item_name', { hasText: productName }) })
      .locator('button', { hasText: 'Remove' });
  }

  async addProductToCart(productName: string) {
    const button = this.addToCartButton(productName);
    await expect(button).toBeVisible();
    await button.click();
  }

  async removeProductFromCart(productName: string) {
    const button = this.removeFromCartButton(productName);
    await expect(button).toBeVisible();
    await button.click();
  }

  async openCart() {
    await this.shoppingCart.click();
  }

  async sortProducts(option: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.sortDropdown.selectOption(option);
  }

  async expectPageLoaded() {
    await expect(this.title).toHaveText('Products');
    await expect(this.inventoryContainer).toBeVisible();
  }

  async expectProductVisible(productName: string) {
    const product = this.page.locator('.inventory_item_name', { hasText: productName });
    await expect(product).toBeVisible();
  }

  async expectCartBadgeCount(expectedCount: number) {
    const badge = this.page.locator('.shopping_cart_badge');
    if (expectedCount === 0) {
      await expect(badge).toHaveCount(0);
    } else {
      await expect(badge).toHaveText(String(expectedCount));
    }
  }

  async expectSortedBy(rule: 'az' | 'za' | 'lohi' | 'hilo') {
    if (rule === 'az' || rule === 'za') {
      const names = await this.page.locator('.inventory_item_name').allTextContents();
      const sorted = [...names].sort((a, b) => a.localeCompare(b));
      if (rule === 'za') sorted.reverse();
      expect(names).toEqual(sorted);
    } else {
      const prices = await this.page.locator('.inventory_item_price').allTextContents();
      const numericPrices = prices.map(p => parseFloat(p.replace('$', '')));
      const sorted = [...numericPrices].sort((a, b) => a - b);
      if (rule === 'hilo') sorted.reverse();
      expect(numericPrices).toEqual(sorted);
    }
  }
}
