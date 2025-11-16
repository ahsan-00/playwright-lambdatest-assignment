import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './basePage';

export class SimpleFormPage extends BasePage {
  readonly enterMessageInput: Locator;
  readonly getCheckedValueButton: Locator;
  readonly yourMessageText: Locator;

  constructor(page: Page) {
    super(page);
    
    // Using different locator strategies as required
    // 1. CSS Selector
    this.enterMessageInput = page.locator('input#user-message');
    
    // 2. XPath
    this.getCheckedValueButton = page.locator('button:has-text("Get Checked Value")');
    
    // 3. CSS with text content
    this.yourMessageText = page.locator('#message').first();
  }

  async goto() {
    await this.page.goto('https://www.lambdatest.com/selenium-playground/simple-form-demo');
    await this.page.waitForLoadState('networkidle');
  }

  async enterMessage(message: string) {
    await this.enterMessageInput.fill(message);
  }

  async clickGetCheckedValue() {
    await this.getCheckedValueButton.click();
  }

  async getYourMessage(): Promise<string> {
    return await this.yourMessageText.textContent() || '';
  }

  async validateYourMessage(expectedMessage: string) {
    const actualMessage = await this.getYourMessage();
    expect(actualMessage).toBe(expectedMessage);
  }

  async validateURL() {
    await expect(this.page).toHaveURL(/simple-form-demo/);
  }
}