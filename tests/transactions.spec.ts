import { test as base, expect } from '../fixtures/PageFixtures';
import { PageDashboard } from '../pages/pageDashboard';
import { ENV } from '../config/environment';
import { getUserEmailFromFile, getJwtFromStorage } from '../utils/authUtils';

const { receiver } = ENV.testCredentials;

const testSendsMoneyUser = base.extend({
  storageState: 'playwright/.senderMoneyUser.json',
});

const testReceivesMoneyUser = base.extend({
  storageState: 'playwright/.receiverMoneyUser.json',
});

const testNewUserWithBankAccount = base.extend({
  storageState: 'playwright/.newUserWithBankAccount.json',
});

base.beforeEach(async ({ pageDashboard }) => {
  await pageDashboard.visitDashboardPage();
});

testNewUserWithBankAccount('TC1 - Verify user can create a bank account correctly', async ({ pageDashboard }) => {
  await expect(pageDashboard.dashboardTitle).toBeVisible({ timeout: 5000 });
  const accountCreated = await pageDashboard.createBankAccount('Débito', '1000');
  expect(accountCreated).toBe(true);
});

testSendsMoneyUser('TC2 - Verify user can send money to another user', async ({ pageDashboard, modalTransferMoney }) => {
  await expect(pageDashboard.dashboardTitle).toBeVisible({ timeout: 5000 });
  await pageDashboard.buttonSendMoney.click();
  await modalTransferMoney.completeAndSendMoneyTransfer(receiver.email, '25');
});

testReceivesMoneyUser('TC3 - Verify user receives money from another user', async ({ pageDashboard }) => {
  await expect(pageDashboard.dashboardTitle).toBeVisible({ timeout: 5000 });
  await expect(pageDashboard.receivedTransferEmailRow.first()).toBeVisible();
});

testReceivesMoneyUser('TC4 - Verify money transfer via API', async ({ pageDashboard, request }) => {
  const emailSentUser = await getUserEmailFromFile('playwright/.senderMoneyUser.data.json');
  const jwt = await getJwtFromStorage('playwright/.senderMoneyUser.json');
  const randomAmount = PageDashboard.generateRandomAmount();
  await pageDashboard.transferMoneyViaAPI(request, jwt, receiver.email, randomAmount);
  await pageDashboard.verifyTransferOnDashboard(emailSentUser, randomAmount);
});
