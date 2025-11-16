export const TestData = {
  message: 'Welcome to LambdaTest',
  slider: {
    initialValue: 15,
    targetValue: 95
  },
  form: {
    validData: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'Password123',
      company: 'Test Company Inc',
      website: 'https://www.testcompany.com',
      country: 'United States',
      city: 'New York',
      address1: '123 Main Street',
      address2: 'Suite 100',
      state: 'NY',
      zipCode: '10001'
    },
    // You can add invalid data for negative testing if needed
    invalidData: {
      name: '',
      email: 'invalid-email',
      password: '123',
      company: '',
      website: 'invalid-website',
      country: '',
      city: '',
      address1: '',
      state: '',
      zipCode: '123'
    }
  },
  urls: {
    seleniumPlayground: 'https://www.lambdatest.com/selenium-playground',
    simpleFormDemo: 'https://www.lambdatest.com/selenium-playground/simple-form-demo',
    dragDropSliders: 'https://www.lambdatest.com/selenium-playground/drag-drop-range-sliders',
    inputFormSubmit: 'https://www.lambdatest.com/selenium-playground/input-form-demo'
  }
};