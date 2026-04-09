import { test, expect } from '../fixtures/PageFixtures';
import { Logger } from '../utils/Logger';
import { TEST_CONSTANTS, createTestUser, ROUTES } from '../constants/testConstants';
import type { Page } from '@playwright/test';
import type { TestUser } from '../types';
import { PageAuth } from '../pages/pageAuth';
import { PageDashboard } from '../pages/pageDashboard';
import { PageSignUp } from '../pages/pageSignUp';

async function setupUserWithBankAccount(page: Page, user: TestUser) {
    Logger.step(`Setting up user: ${user.email}`);

    const pageSignUp = new PageSignUp(page);
    const pageAuth = new PageAuth(page);
    const pageDashboard = new PageDashboard(page);

    await page.goto(ROUTES.SIGNUP);
    await pageSignUp.signUpUser(user.firstName, user.lastName, user.email, user.password);

    await pageAuth.loginSuccessfully(user.email, user.password);
    await pageDashboard.visitDashboardPage();
    await pageDashboard.createBankAccount(TEST_CONSTANTS.ACCOUNT_TYPE, TEST_CONSTANTS.INITIAL_AMOUNT);

    Logger.info(`User ${user.email} setup completed with bank account`);
}

test.beforeEach(async ({ pageAuth }) => {
    await pageAuth.visitLoginPage();
});

test('TC1 - Freeze account successfully', async ({ page, modalFreezeAccount }) => {
    const user = createTestUser('freeze');

    Logger.step('Test freeze account successfully', { testName: 'TC1 - Freeze account successfully' });

    await setupUserWithBankAccount(page, user);
    await page.waitForLoadState('networkidle');

    await modalFreezeAccount.freezeAccount();
    await expect(modalFreezeAccount.freezeSuccessMessage).toBeVisible();

    Logger.info('Account frozen successfully');
});

test('TC2 - Unfreeze account successfully', async ({ page, modalFreezeAccount }) => {
    const user = createTestUser('unfreeze');

    Logger.step('Test unfreeze account successfully', { testName: 'TC2 - Unfreeze account successfully' });

    await setupUserWithBankAccount(page, user);
    await page.waitForLoadState('networkidle');

    await modalFreezeAccount.freezeAccount();
    await expect(modalFreezeAccount.freezeSuccessMessage).toBeVisible();

    await page.waitForLoadState('networkidle');

    await modalFreezeAccount.unfreezeAccount();
    await expect(modalFreezeAccount.unfreezeSuccessMessage).toBeVisible();

    Logger.info('Account unfrozen successfully');
});
