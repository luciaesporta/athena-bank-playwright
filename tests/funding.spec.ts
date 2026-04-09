import { test, expect } from '../fixtures/PageFixtures';
import { Logger } from '../utils/Logger';
import { ENV } from '../config/environment';

const { validUser } = ENV.testCredentials;

test.beforeEach(async ({ pageDashboard, pageAuth }) => {
    await pageAuth.visitLoginPage();
    await pageAuth.loginSuccessfully(validUser.email, validUser.password);
    await pageDashboard.visitDashboardPage();
});

test('TC1 - Add funds successfully', async ({ modalFunding }) => {
    Logger.step('Add funds successfully', { action: 'addFundsSuccessfully' });
    await modalFunding.addFunds('100');
    Logger.info('Add funds test completed successfully');
});

test('TC2 - Cancel add funds', async ({ pageDashboard, modalFunding }) => {
    Logger.step('Cancel add funds', { action: 'cancelAddFunds' });
    await modalFunding.cancelAddFunds();
    await expect(pageDashboard.dashboardTitle).toBeVisible({ timeout: 7000 });
    Logger.info('Cancel add funds test completed successfully');
});
