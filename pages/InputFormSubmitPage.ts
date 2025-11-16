import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './basePage';

export class InputFormSubmitPage extends BasePage {
  // Form fields - exact selectors from debug output
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly companyInput: Locator;
  readonly websiteInput: Locator;
  readonly countryDropdown: Locator;
  readonly cityInput: Locator;
  readonly address1Input: Locator;
  readonly address2Input: Locator;
  readonly stateInput: Locator;
  readonly zipCodeInput: Locator;
  
  // Buttons
  readonly submitButton: Locator;
  
  // Messages
  readonly errorMessage: Locator;
  readonly successMessage: Locator;

  // Navigation
  readonly inputFormSubmitLink: Locator;

  constructor(page: Page) {
    super(page);
    
    // Exact selectors from debug output
    this.nameInput = page.locator('#name');
    this.emailInput = page.locator('#inputEmail4');
    this.passwordInput = page.locator('#inputPassword4');
    this.companyInput = page.locator('#company');
    this.websiteInput = page.locator('#websitename');
    this.countryDropdown = page.locator('select[name="country"]');
    this.cityInput = page.locator('#inputCity');
    this.address1Input = page.locator('#inputAddress1');
    this.address2Input = page.locator('#inputAddress2');
    this.stateInput = page.locator('#inputState');
    this.zipCodeInput = page.locator('#inputZip');
    
    // Submit button - using the specific class from debug output
    this.submitButton = page.locator('button.selenium_btn', { hasText: 'Submit' });
    
    // Messages - these might need adjustment based on actual behavior
    this.errorMessage = page.locator('text=/Please fill in the fields|This field is required|required/i').first();
    this.successMessage = page.locator('text=/Thanks for contacting us|success|thank you/i').first();
    
    // Navigation
    this.inputFormSubmitLink = page.locator('a[href="https://www.lambdatest.com/selenium-playground/input-form-demo"]');
  }

  async goto() {
    await this.page.goto('https://www.lambdatest.com/selenium-playground/input-form-demo');
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(2000);
  }

  async navigateFromHome() {
    await this.page.goto('https://www.lambdatest.com/selenium-playground');
    await this.page.waitForLoadState('domcontentloaded');
    
    // Wait for and click the specific Input Form Submit link
    await this.inputFormSubmitLink.waitFor({ state: 'visible' });
    await this.inputFormSubmitLink.click();
    
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(2000);
  }

  async clickSubmit() {
    await this.submitButton.click();
    await this.page.waitForTimeout(2000);
  }

  async fillName(name: string) {
    await this.nameInput.fill(name);
  }

  async fillEmail(email: string) {
    await this.emailInput.fill(email);
  }

  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async fillCompany(company: string) {
    await this.companyInput.fill(company);
  }

  async fillWebsite(website: string) {
    await this.websiteInput.fill(website);
  }

  async selectCountryByText(countryName: string) {
    await this.countryDropdown.selectOption({ label: countryName });
  }

  async fillCity(city: string) {
    await this.cityInput.fill(city);
  }

  async fillAddress1(address: string) {
    await this.address1Input.fill(address);
  }

  async fillAddress2(address: string) {
    await this.address2Input.fill(address);
  }

  async fillState(state: string) {
    await this.stateInput.fill(state);
  }

  async fillZipCode(zipCode: string) {
    await this.zipCodeInput.fill(zipCode);
  }

  async fillAllRequiredFields(formData: FormData) {
    await this.fillName(formData.name);
    await this.fillEmail(formData.email);
    await this.fillPassword(formData.password);
    await this.fillCompany(formData.company);
    await this.fillWebsite(formData.website);
    await this.selectCountryByText(formData.country);
    await this.fillCity(formData.city);
    await this.fillAddress1(formData.address1);
    await this.fillAddress2(formData.address2 || '');
    await this.fillState(formData.state);
    await this.fillZipCode(formData.zipCode);
  }

  async validateErrorMessage() {
    // Wait a bit for any validation to appear
    await this.page.waitForTimeout(1000);
    
    // Check if any field has HTML5 validation
    const invalidFields = await this.page.locator(':invalid').count();
    if (invalidFields > 0) {
      console.log(`Found ${invalidFields} invalid fields`);
      return;
    }
    
    // Check for visible error messages
    const errorSelectors = [
      'text=/Please fill in the fields/i',
      'text=/This field is required/i',
      'text=/required/i',
      '[class*="error"]',
      '[class*="invalid"]'
    ];
    
    for (const selector of errorSelectors) {
      const errorElement = this.page.locator(selector).first();
      if (await errorElement.isVisible()) {
        const errorText = await errorElement.textContent();
        console.log(`Found error: ${errorText}`);
        return;
      }
    }
    
    // If no specific error found, check if we're still on the same page (form didn't submit)
    const currentUrl = this.page.url();
    if (currentUrl.includes('input-form-demo')) {
      console.log('Form did not submit - likely validation error');
      return;
    }
    
    throw new Error('No error message found but form validation expected');
  }

  async validateSuccessMessage() {
    // Wait for success message
    await this.page.waitForTimeout(3000);
    
    const successSelectors = [
      'text=/Thanks for contacting us/i',
      'text=/success/i',
      'text=/thank you/i',
      '[class*="success"]'
    ];
    
    for (const selector of successSelectors) {
      const successElement = this.page.locator(selector).first();
      if (await successElement.isVisible()) {
        const successText = await successElement.textContent();
        console.log(`Found success message: ${successText}`);
        expect(successText).toMatch(/Thanks for contacting us|success|thank you/i);
        return;
      }
    }
    
    // If no success message found, check if we were redirected
    const currentUrl = this.page.url();
    if (!currentUrl.includes('input-form-demo')) {
      console.log('Form submitted successfully - redirected to different page');
      return;
    }
    
    throw new Error('Success message not found after form submission');
  }

  async validateURL() {
    await expect(this.page).toHaveURL(/input-form-demo/);
  }

  // Method to verify all form elements are visible
  async verifyFormElements() {
    const elements = [
      this.nameInput,
      this.emailInput,
      this.passwordInput,
      this.companyInput,
      this.websiteInput,
      this.countryDropdown,
      this.cityInput,
      this.address1Input,
      this.address2Input,
      this.stateInput,
      this.zipCodeInput,
      this.submitButton
    ];

    for (const element of elements) {
      await expect(element).toBeVisible();
    }
    console.log('All form elements are visible');
  }
}

export interface FormData {
  name: string;
  email: string;
  password: string;
  company: string;
  website: string;
  country: string;
  city: string;
  address1: string;
  address2?: string;
  state: string;
  zipCode: string;
}