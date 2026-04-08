import { test, expect } from '@playwright/test';
import { PageAuth } from '../pages/pageAuth';
import { PageDashboard } from '../pages/pageDashboard';
import { ModalFunding } from '../pages/modalFunding';
import { Logger } from '../utils/Logger';
import { ENV } from '../config/environment';

const { validUser } = ENV.testCredentials;

let pageAuth: PageAuth;
let pageDashboard: PageDashboard;
let modalFunding: ModalFunding;

test.beforeEach(async ({ page }) => {
    pageAuth = new PageAuth(page);
    pageDashboard = new PageDashboard(page);
    modalFunding = new ModalFunding(page);
    await pageDashboard.visitDashboardPage();
});

test('TC1 - Add funds successfully', async () => {
    Logger.step('Add funds successfully', { action: 'addFundsSuccessfully' });
    await pageAuth.loginSuccessfully(validUser.email, validUser.password);
    await pageDashboard.visitDashboardPage();
    await modalFunding.addFunds('100');
    Logger.info('Add funds test completed successfully');
});

test('TC2 - Cancel add funds', async () => {
    Logger.step('Cancel add funds', { action: 'cancelAddFunds' });
    await pageAuth.loginSuccessfully(validUser.email, validUser.password);
    await pageDashboard.visitDashboardPage();
    await modalFunding.cancelAddFunds();
    await expect(pageDashboard.dashboardTitle).toBeVisible({ timeout: 7000 });
    Logger.info('Cancel add funds test completed successfully');
});