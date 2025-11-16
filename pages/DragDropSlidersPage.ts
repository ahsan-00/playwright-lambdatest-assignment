import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './basePage';

export class DragDropSlidersPage extends BasePage {
  readonly defaultValue15Slider: Locator;
  readonly sliderValueText: Locator;
  readonly dragDropSlidersLink: Locator;

  constructor(page: Page) {
    super(page);
    
    // Updated locators based on LambdaTest page structure
    this.defaultValue15Slider = page.locator('input[value="15"]').first();
    
    // For the slider value display - it's usually a span or output element near the slider
    this.sliderValueText = page.locator('.sliderContainer output, .sp__range output, output[for*="slider"]').first();
    
    // Updated link locator
    this.dragDropSlidersLink = page.locator('a:has-text("Drag & Drop Sliders")');
  }

  async goto() {
    await this.page.goto('https://www.lambdatest.com/selenium-playground/drag-drop-range-sliders-demo');
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(2000); // Additional short wait
  }

  async navigateFromHome() {
    await this.page.goto('https://www.lambdatest.com/selenium-playground');
    await this.page.waitForLoadState('domcontentloaded');
    await this.dragDropSlidersLink.click();
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(2000); // Additional short wait
  }

  async getCurrentSliderValue(): Promise<number> {
    // Try multiple approaches to get the slider value
    try {
      // Method 1: Get value from input element
      const inputValue = await this.defaultValue15Slider.inputValue();
      console.log(`Input value: ${inputValue}`);
      return parseInt(inputValue);
    } catch (error) {
      // Method 2: Get value from display text
      try {
        const valueText = await this.sliderValueText.textContent();
        console.log(`Display value: ${valueText}`);
        return parseInt(valueText || '15');
      } catch (error2) {
        // Method 3: Fallback - get value attribute
        const valueAttr = await this.defaultValue15Slider.getAttribute('value');
        console.log(`Value attribute: ${valueAttr}`);
        return parseInt(valueAttr || '15');
      }
    }
  }

  async dragSliderToValue(targetValue: number) {
    console.log(`Dragging slider to value: ${targetValue}`);
    
    // Method 1: Directly set the value using fill (most reliable for range inputs)
    await this.defaultValue15Slider.fill(targetValue.toString());
    
    // Wait for any animations or updates
    await this.page.waitForTimeout(1000);
    
    // Verify the value was set
    const currentValue = await this.getCurrentSliderValue();
    console.log(`Slider value after drag: ${currentValue}`);
    
    // If fill didn't work, try keyboard method
    if (currentValue !== targetValue) {
      console.log('Fill method did not work, trying keyboard method...');
      await this.defaultValue15Slider.focus();
      
      // Calculate how many arrow key presses needed
      const difference = targetValue - currentValue;
      const key = difference > 0 ? 'ArrowRight' : 'ArrowLeft';
      const presses = Math.abs(difference);
      
      for (let i = 0; i < presses; i++) {
        await this.page.keyboard.press(key);
        await this.page.waitForTimeout(50);
      }
    }
  }

  async validateSliderValue(expectedValue: number) {
    const actualValue = await this.getCurrentSliderValue();
    console.log(`Validating slider value - Expected: ${expectedValue}, Actual: ${actualValue}`);
    expect(actualValue).toBe(expectedValue);
  }

  async validateURL() {
    await expect(this.page).toHaveURL(/drag-drop-range-sliders/);
  }

  // Alternative method using mouse drag (if needed)
  async dragSliderWithMouse(targetValue: number) {
    const slider = this.defaultValue15Slider;
    
    // Get slider dimensions
    const boundingBox = await slider.boundingBox();
    if (!boundingBox) throw new Error('Slider not found');
    
    // Calculate position to click (assuming slider range 0-100)
    const currentValue = await this.getCurrentSliderValue();
    const percentage = (targetValue - currentValue) / 100;
    const targetX = boundingBox.x + boundingBox.width * (0.5 + percentage * 0.4);
    const targetY = boundingBox.y + boundingBox.height / 2;
    
    // Drag the slider
    await this.page.mouse.move(boundingBox.x + boundingBox.width / 2, boundingBox.y + boundingBox.height / 2);
    await this.page.mouse.down();
    await this.page.mouse.move(targetX, targetY, { steps: 10 });
    await this.page.mouse.up();
    
    await this.page.waitForTimeout(1000);
  }
}