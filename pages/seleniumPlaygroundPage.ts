import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './basePage';

export class SeleniumPlaygroundPage extends BasePage {
  readonly simpleFormDemoLink: Locator;

  constructor(page: Page) {
    super(page);
    this.simpleFormDemoLink = page.locator('a[href*="simple-form-demo"]');
  }

  async goto() {
    await this.page.goto('https://www.lambdatest.com/selenium-playground');
    await this.page.waitForLoadState('networkidle');
  }

  async clickSimpleFormDemo() {
    await this.simpleFormDemoLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  async validateURLContains(text: string) {
    await expect(this.page).toHaveURL(new RegExp(text));
  }
}