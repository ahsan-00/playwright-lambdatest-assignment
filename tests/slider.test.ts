import { test, expect } from '@playwright/test';
import { DragDropSlidersPage } from '../pages/DragDropSlidersPage';

test('Drag & Drop Sliders Test', async ({ page }) => {
  const dragDropSlidersPage = new DragDropSlidersPage(page);

  // Step 1: Navigate directly to the drag & drop sliders page
  await dragDropSlidersPage.goto();
  
  // Step 2: Validate that the URL contains "drag-drop-range-sliders"
  await dragDropSlidersPage.validateURL();
  
  // Step 3: Verify initial slider value is 15
  console.log('Verifying initial slider value...');
  await dragDropSlidersPage.validateSliderValue(15);
  
  // Step 4: Drag the slider to 95
  console.log('Dragging slider to 95...');
  await dragDropSlidersPage.dragSliderToValue(95);
  
  // Step 5: Validate whether the range value shows 95
  console.log('Validating final slider value...');
  await dragDropSlidersPage.validateSliderValue(95);
});

// Alternative test with debugging
test('Drag & Drop Sliders Test - Debug Version', async ({ page }) => {
  const dragDropSlidersPage = new DragDropSlidersPage(page);

  // Go directly to the page to avoid navigation issues
  await page.goto('https://www.lambdatest.com/selenium-playground/drag-drop-range-sliders-demo');
  
  // Take screenshot for debugging
  await page.screenshot({ path: 'screenshots/before-slider.png' });
  
  // Wait for page to load completely
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(3000);
  
  // Find all sliders on the page for debugging
  const sliders = await page.locator('input[type="range"]').all();
  console.log(`Found ${sliders.length} sliders on the page`);
  
  // Find the specific slider with value 15
  const targetSlider = page.locator('input[type="range"][value="15"]').first();
  
  // Verify slider exists and is visible
  await expect(targetSlider).toBeVisible();
  
  // Get initial value
  const initialValue = await targetSlider.inputValue();
  console.log(`Initial slider value: ${initialValue}`);
  
  // Set new value
  await targetSlider.fill('95');
  await page.waitForTimeout(1000);
  
  // Get final value
  const finalValue = await targetSlider.inputValue();
  console.log(`Final slider value: ${finalValue}`);
  
  // Take screenshot after interaction
  await page.screenshot({ path: 'screenshots/after-slider.png' });
  
  // Validate
  expect(parseInt(finalValue)).toBe(95);
});