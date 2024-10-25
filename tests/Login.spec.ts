import { LoginPage } from '../pages/loginPage';
import {test, expect} from './test-fixtures';

const generateRandomcredentials = () => {

  const randomCredentials = Math.random().toString().substring(8);
  return{
      username: `user_${randomCredentials}@gmx.com`,
      password: `pass_${randomCredentials}`
  }
}

test.describe('Login Tests', () => {
   let loginPage;

  test.beforeEach(async ({ page }) => {
    // Launch URL
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });


  // Test 1: Login with valid user and capture the URL
  test('Login with valid user should pass and check the URL', async ({username, password}) => {
    await loginPage.login(username, password);
    const isSuccess = await loginPage.isLoginSuccessfull();
    expect(isSuccess).toBeTruthy(); 
  });

  // Test 2: Login with blank username and password and check URL
  test('Login with blank user should fail and check the URL', async () => {
    await loginPage.login("", "");
    const isFailed = await loginPage.isLoginFailed();
    expect(isFailed).toBeTruthy();  // Assert that URL contains 'login-failed'
  });

  // Test 3: Login with random username and password and check URL
  test('Login with random user should fail and check the URL', async () => {
    const randomCredentials = generateRandomcredentials();
    await loginPage.login(randomCredentials.username, randomCredentials.password);
    const isFailed = await loginPage.isLoginFailed();
    expect(isFailed).toBeTruthy();  // Assert that URL contains 'login-failed'
  });

  // Test 4: Check if return to login exists after failed login and validate
  test('Check if return to login exists after failed login and validate', async () => {
    await loginPage.login('invalid_user@gmx.com', 'wrongpassword');
    
    // Check if the "Zurück zum Login" button is visible
    const isReturnButtonVisible = await loginPage.isReturnToLoginButtonVisible();
    expect(isReturnButtonVisible).toBeTruthy();  // Assert the return button is present

    // Click the "Zurück zum Login" button
    await loginPage.clickReturnToLogin();

    // After returning to the login page, check if the login button is visible
    const isLoginButtonVisible = await loginPage.isLoginButtonVisible();
    expect(isLoginButtonVisible).toBeTruthy();  // Assert the login button is visible
  });
});
