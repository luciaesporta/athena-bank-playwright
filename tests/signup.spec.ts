import { test, expect } from '../fixtures/PageFixtures';
import { Logger } from '../utils/Logger';
import { PageSignUp } from '../pages/pageSignUp';
import { Routes } from '../support/routes';
import { ENV } from '../config/environment';

const { validUser } = ENV.testCredentials;

test.beforeEach(async ({ pageSignUp }) => {
  Logger.step('Navigate to signup page', { action: 'visitSignUpPage' });
  await pageSignUp.visitSignUpPage();
});

test('TC1 - Sign up successfully via UI', async ({ pageSignUp, page }) => {
  Logger.step('Execute UI signup test', { testName: 'TC1 - Sign up successfully via UI' });
  const randomEmail = PageSignUp.generateUniqueEmail(validUser.email);
  await pageSignUp.signUpUser(validUser.firstName, validUser.lastName, randomEmail, validUser.password);
  await expect(page.getByText(pageSignUp.messageCreationAccount)).toBeVisible();
  Logger.info('UI signup test completed successfully');
});

test('TC2 - Sign up successfully via API', async ({ pageSignUp, request }) => {
  Logger.step('Execute API signup test', { testName: 'TC2 - Sign up successfully via API' });
  const { response, uniqueEmail } = await pageSignUp.signUpUserViaAPI(request, validUser);
  await pageSignUp.validateSignupAPIResponse(response, validUser, uniqueEmail);
  Logger.info('API signup test completed successfully');
});

test('TC3 - User is redirected to login flow once the account is created', async ({ pageSignUp, page }) => {
  Logger.step('Execute signup with redirection test', { testName: 'TC3 - User is redirected to login flow once the account is created' });
  const randomEmail = PageSignUp.generateUniqueEmail(validUser.email);
  Logger.info(`Testing signup with email: ${randomEmail}`);
  await pageSignUp.signUpUser(validUser.firstName, validUser.lastName, randomEmail, validUser.password);
  await expect(page.getByText(pageSignUp.messageCreationAccount)).toBeVisible({ timeout: 10000 });
  await page.waitForURL(Routes.login);
  await page.waitForTimeout(2000);
  Logger.info('Signup redirection test completed successfully');
});

test('TC4 -  Sign up fails due to email already registered', async ({ pageSignUp, page }) => {
  Logger.step('Execute signup failure test', { testName: 'TC4 - Sign up fails due to email already registered' });
  await pageSignUp.signUpUser(validUser.firstName, validUser.lastName, validUser.email, validUser.password);
  await expect(page.getByText(pageSignUp.messageEmailAlreadyUsed)).toBeVisible();
  Logger.info('Signup failure test completed successfully');
});

test('TC5 - Sign up successfully verifying API response', async ({ pageSignUp }) => {
  Logger.step('Execute signup with API verification test', { testName: 'TC5 - Sign up successfully verifying API response' });
  await pageSignUp.signUpUserViaUIWithAPIVerification(validUser);
  Logger.info('Signup with API verification test completed successfully');
});

test('TC6 - Sign up: handles 409 (email already in use) without navigation', async ({ pageSignUp }) => {
  Logger.step('Execute 409 error handling test', { testName: 'TC6 - Sign up: handles 409 (email already in use) without navigation' });
  await pageSignUp.testSignupWith409Error(validUser);
  Logger.info('409 error handling test completed successfully');
});