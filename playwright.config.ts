import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html'],
    ['json', { outputFile: 'test-results.json' }],
    ['junit', { outputFile: 'results.xml' }]
  ],
  
  use: {
    baseURL: 'https://www.lambdatest.com',
    trace: 'on',
    video: 'on',
    screenshot: 'on',
    actionTimeout: 30000,
    navigationTimeout: 30000,
  },

  // Local projects for testing
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
  ],

  timeout: 60000,
  expect: {
    timeout: 10000
  }
});

// LambdaTest specific configuration
export const lambdatestConfig = {
  use: {
    baseURL: 'https://www.lambdatest.com',
    trace: 'on',
    video: 'on',
    screenshot: 'on',
    actionTimeout: 30000,
    navigationTimeout: 30000,
    connectOptions: {
      wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify({
        browserName: 'Chrome',
        platform: 'Windows 10',
        version: 'latest',
        build: 'Playwright 101 Assignment',
        name: 'Playwright Assignment Test',
        user: process.env.LT_USERNAME,
        accessKey: process.env.LT_ACCESS_KEY,
        network: true,
        video: true,
        console: true,
        visual: true,
      }))}`
    }
  }
};