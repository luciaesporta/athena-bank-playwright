import { defineConfig, devices } from '@playwright/test';
import { ENV, ConfigHelpers } from './config/environment';

export default defineConfig({
  testDir: './tests',
  reporter: process.env.CI
    ? [['list'], ['html', { open: 'never' }]]
    : [['html', { open: 'on-failure' }]],
  workers: process.env.CI ? 2 : undefined,
  timeout: 60000,
  use: {
    baseURL: ENV.baseUrl,
    trace: 'retain-on-failure',
    actionTimeout: ConfigHelpers.getTimeout('elementVisible'),
    navigationTimeout: ConfigHelpers.getTimeout('pageLoad'),
  },

  testMatch: /.*\.(spec|setup)\.(ts|js|mjs)/,

  projects: [
    {
      name: 'setup',
      testMatch: /.*transaction\.setup\.ts/,
    },

    {
      name: 'auth-tests',
      use: { ...devices['Desktop Chrome'] },
      testMatch: /.*auth\.spec\.ts/,
      dependencies: [], 
    },

    {
      name: 'auth-api-tests',
      use: { ...devices['Desktop Chrome'] },
      testMatch: /.*auth\.api\.spec\.ts/,
      dependencies: [],
    },

    {
      name: 'transfer-api-tests',
      use: { ...devices['Desktop Chrome'] },
      testMatch: /.*transfer\.api\.spec\.ts/,
      dependencies: [],
    },

    {
      name: 'signup-tests',
      use: { ...devices['Desktop Chrome'] },
      testMatch: /.*signup\.spec\.ts/,
      dependencies: [],
    },

    {
      name: 'transaction-tests',
      use: { ...devices['Desktop Chrome'] },
      testMatch: /.*transactions\.spec\.ts/,
      dependencies: ['setup'], 
    },

    {
      name: 'funding-tests',
      use: { ...devices['Desktop Chrome'] },
      testMatch: /.*funding\.spec\.ts$/,
      dependencies: [], 
    },

    {
      name: 'freeze-account-tests',
      use: { ...devices['Desktop Chrome'] },
      testMatch: /.*freezeAccount\.spec\.ts$/,
      dependencies: [], 
    },

    {
      name: 'bank-accounts-tests',
      use: { ...devices['Desktop Chrome'] },
      testMatch: /.*bankAccounts\.spec\.ts$/,
      dependencies: [], 
    },
  ],
});
