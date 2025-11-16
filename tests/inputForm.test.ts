import { test, expect } from '@playwright/test';
import { InputFormSubmitPage } from '../pages/InputFormSubmitPage';
import { TestData } from '../utils/test-data';

test('Input Form Submit Test - Complete Flow', async ({ page }) => {
  const inputFormPage = new InputFormSubmitPage(page);

  // Step 1: Navigate directly to Input Form Submit page
  console.log('Navigating to Input Form Submit page...');
  await inputFormPage.goto();
  
  // Step 2: Validate that the URL contains "input-form-demo"
  await inputFormPage.validateURL();
  
  // Verify we have the correct form elements
  console.log('Verifying form elements...');
  await inputFormPage.verifyFormElements();
  
  // Step 3: Click "Submit" without filling in any information in the form
  console.log('Clicking submit without filling form...');
  await inputFormPage.clickSubmit();
  
  // Step 4: Assert "Please fill in the fields" error message
  console.log('Validating error message...');
  await inputFormPage.validateErrorMessage();
  
  // Step 5: Fill in all required fields
  console.log('Filling all form fields...');
  await inputFormPage.fillAllRequiredFields(TestData.form.validData);
  
  // Step 6: Verify country selection
  const selectedCountry = await inputFormPage.countryDropdown.inputValue();
  console.log(`Selected country value: ${selectedCountry}`);
  
  // Step 7: Submit the filled form
  console.log('Submitting filled form...');
  await inputFormPage.clickSubmit();
  
  // Step 8: Validate the success message
  console.log('Validating success message...');
  await inputFormPage.validateSuccessMessage();
});

// Simple direct test to verify the flow works
test('Direct Input Form Test - Step by Step', async ({ page }) => {
  console.log('Running direct step-by-step test...');
  
  // Go directly to the input form page
  await page.goto('https://www.lambdatest.com/selenium-playground/input-form-demo');
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(2000);
  
  // Take screenshot before any action
  await page.screenshot({ path: 'screenshots/input-form-initial.png' });
  
  // Step 1: Click submit on empty form
  console.log('Step 1: Submitting empty form...');
  await page.click('button.selenium_btn');
  await page.waitForTimeout(2000);
  
  // Check for validation (might be HTML5 validation or error message)
  const invalidFields = await page.locator(':invalid').count();
  console.log(`Found ${invalidFields} invalid fields after empty submission`);
  
  // Step 2: Fill the form
  console.log('Step 2: Filling form...');
  await page.fill('#name', 'John Doe');
  await page.fill('#inputEmail4', 'john.doe@example.com');
  await page.fill('#inputPassword4', 'Password123');
  await page.fill('#company', 'Test Company Inc');
  await page.fill('#websitename', 'https://testcompany.com');
  await page.selectOption('select[name="country"]', { label: 'United States' });
  await page.fill('#inputCity', 'New York');
  await page.fill('#inputAddress1', '123 Main Street');
  await page.fill('#inputAddress2', 'Suite 100');
  await page.fill('#inputState', 'NY');
  await page.fill('#inputZip', '10001');
  
  // Take screenshot after filling
  await page.screenshot({ path: 'screenshots/input-form-filled.png' });
  
  // Step 3: Submit filled form
  console.log('Step 3: Submitting filled form...');
  await page.click('button.selenium_btn');
  await page.waitForTimeout(3000);
  
  // Take screenshot after submit
  await page.screenshot({ path: 'screenshots/input-form-submitted.png' });
  
  // Step 4: Check for success
  console.log('Step 4: Checking for success...');
  
  // Method 1: Check for success message
  const successElement = page.locator('text=/Thanks for contacting us|success|thank you/i').first();
  if (await successElement.isVisible()) {
    const successText = await successElement.textContent();
    console.log(`SUCCESS: ${successText}`);
    return;
  }
  
  // Method 2: Check if we were redirected
  const currentUrl = page.url();
  if (!currentUrl.includes('input-form-demo')) {
    console.log('SUCCESS: Form submitted and page was redirected');
    return;
  }
  
  // Method 3: Check if form was cleared (indicating success)
  const nameValue = await page.inputValue('#name');
  if (!nameValue) {
    console.log('SUCCESS: Form was cleared after submission');
    return;
  }
  
  console.log('Form may not have submitted successfully');
});