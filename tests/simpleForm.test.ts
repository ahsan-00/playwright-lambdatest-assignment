import { test, expect } from '@playwright/test';

test('Simple Form Demo Test', async ({ page }) => {
  // Step 1: Open LambdaTest's Selenium Playground
  await page.goto('https://www.lambdatest.com/selenium-playground');
  
  // Step 2: Click "Simple Form Demo"
  await page.click('a[href*="simple-form-demo"]');
  
  // Step 3: Validate that the URL contains "simple-form-demo"
  await expect(page).toHaveURL(/simple-form-demo/);
  
  // Step 4: Create a variable for a string value
  const testMessage = "Welcome to LambdaTest";
  
  // Step 5: Use this variable to enter values in the "Enter Message" text box
  await page.fill('input#user-message', testMessage);
  
  // Step 6: Click "Get Checked Value"
  await page.click('button:has-text("Get Checked Value")');
  
  // Step 7: Validate whether the same text message is displayed
  const displayedMessage = await page.textContent('#message');
  expect(displayedMessage).toBe(testMessage);
});