# Playwright LambdaTest Assignment

## Setup Instructions

1. **Clone Repository**
   ```bash
   git clone https://github.com/ahsan-00/playwright-lambdatest-assignment.git
   cd playwright-lambdatest-assignment
   ```
2. **Setup Environment Variables**
   ```bash
    export LT_USERNAME= ahsanhabib.sqa
    export LT_ACCESS_KEY= n6FOzLDsmEhJcP6M77jJiL9Lwfg3PcA14RRgKmUZ4RQfucEBjY
   ```

3. **Install Dependencies**
   ```bash
    npm install
    npx playwright install
   ```
4. **Run Tests**
   ```bash
    # Run all tests
    npm test

    # Run specific test
    npx playwright test tests/simple-form-demo.spec.js
   ```
## Test Scenarios Covered
    1. Simple Form Demo - Form input validation
    2. Drag & Drop Sliders - Slider interaction
    3. Input Form Submit - Form submission with validation

## Test Scenarios Covered
    Parallel execution on 2 different browser/OS combinations
    Network logs, video recordings, screenshots enabled
    Console logs captured


## 🎯 Key Professional Practices

1. **Use Multiple Locator Strategies**:
   - Role-based: `getByRole()`
   - ID-based: `locator('#id')`
   - Text-based: `getByText()`

2. **Enable All Required Logs**:
   ```javascript
   // In capabilities
   'network': true,
   'video': true,
   'console': true

3. **Parallel Execution**:
    Configure 2 different browser environments in playwright.config.js

4. **Error Handling**:
    Add proper try-catch blocks and validation assertions

## 📊 Submission Checklist
    All 3 test scenarios implemented
    Tests run on LambdaTest Grid
    Parallel execution on 2 browser/OS combinations
    All required logs enabled
    Private GitHub repository shared
    Gitpod configuration included
    Detailed README.md provided
    Test IDs from LambdaTest recorded