import { defineConfig } from '@playwright/test';

const user = process.env.LT_USERNAME;
const accessKey = process.env.LT_ACCESS_KEY;

if (!user || !accessKey) {
  console.error('❌ LambdaTest credentials not found!');
  process.exit(1);
}

console.log(`🔐 Using LambdaTest account: ${user}`);

const getCapabilities = (browserName: string, platform: string, testName: string) => {
  return {
    'browserName': browserName,
    'browserVersion': 'latest',
    'LT:Options': {
      'platform': platform,
      'build': 'Playwright 101 Assignment',
      'name': testName,
      'user': user,
      'accessKey': accessKey,
      'network': true,
      'video': true,
      'console': true,
      'visual': true,
    }
  };
};

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries: 0,
  workers: 2,
  
  reporter: [
    ['html'],
    ['json', { outputFile: 'lambda-test-results.json' }],
    ['line']
  ],

  use: {
    baseURL: 'https://www.lambdatest.com',
    trace: 'on',
    video: 'on',
    screenshot: 'on',
    actionTimeout: 60000,
    navigationTimeout: 60000,
    ignoreHTTPSErrors: true,
  },

  projects: [
    // Windows 10 + Chrome
    {
      name: 'lambda-chrome-win10',
      use: {
        connectOptions: {
          wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(getCapabilities('Chrome', 'Windows 10', 'Playwright Assignment - Chrome Win10')))}`
        }
      },
    },

    // macOS Catalina + Firefox
    {
      name: 'lambda-firefox-macos',
      use: {
        connectOptions: {
          wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(getCapabilities('Firefox', 'macOS Catalina', 'Playwright Assignment - Firefox macOS')))}`
        }
      },
    },
  ],

  timeout: 120000,
});