# 🏦 Athena Bank Fintech - Playwright Automation Testing

A comprehensive end-to-end testing suite for the Athena Bank Fintech application using Playwright and TypeScript.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
- [Running Tests](#running-tests)
- [CI/CD Pipeline](#cicd-pipeline)
- [Test Reports](#test-reports)
- [Test Data Management](#test-data-management)
- [Page Object Model](#page-object-model)
- [Contributing](#contributing)
- [Troubleshooting](#troubleshooting)

## 🎯 Overview

This project provides automated testing for the Athena Bank Fintech application, covering critical user journeys including:

- **Authentication**: Login, Signup, and session management
- **Bank Account Management**: Creating and managing bank accounts
- **Money Transfers**: Sending and receiving money between users
- **API Testing**: Independent backend API validation and response verification (decoupled from frontend)

## 🎬 Demo Animations

Here are some .gif recordings showcasing key user flows in the Athena Bank app:

- **Signup:**

  <img src="https://github.com/user-attachments/assets/fc02f395-0b4c-4ba1-a2fe-f7fccb0010a7" alt="sign up test cases" width="600"/>

- **Authentication:** Login workflow

  <img src="https://github.com/user-attachments/assets/a4f26876-1345-4fee-8a29-73a9ba3fa61a" alt="auth test cases" width="600"/>

- **Transactions:** Sending and receiving money

  <img src="https://github.com/user-attachments/assets/2dde0610-c005-4672-9758-3cf31ec2fc60" alt="transactions test cases" width="600"/>



## ✨ Features

- 🔧 **Page Object Model**: Maintainable and reusable test code
- 📊 **Comprehensive Reporting**: HTML reports with screenshots and videos
- 🔄 **CI/CD Integration**: Automated testing on GitHub Actions
- 📈 **GitHub Pages**: Automated test report deployment
- 🛠️ **API Testing**: Backend validation alongside UI tests
- 📝 **Data-Driven Testing**: JSON-based test data management
- 📱 **Cross-Browser Support**: Chrome, Firefox, Safari, and Edge

## 📁 Project Structure

```
playwright/
├── .github/workflows/          # CI/CD pipeline configuration
│   └── tests.yml              # GitHub Actions workflow
├── data/                       # Test data files
│   └── testData.json          # User credentials and test data
├── pages/                      # Page Object Model classes
│   ├── modalCreateBankAccount.ts
│   ├── modalTransferMoney.ts
│   ├── pageDashboard.ts
│   ├── pageLogin.ts
│   └── pageSignUp.ts
├── support/                    # Support utilities
│   └── routes.ts              # Application routes
├── tests/                      # Test specifications
│   ├── auth.spec.ts           # Authentication tests (no setup required)
│   ├── signup.spec.ts         # Signup tests (no setup required)
│   ├── transactions.spec.ts   # Money transfer tests
│   └── transaction.setup.ts   # Setup for transaction tests only
├── utils/                      # Utility functions
│   └── backendUtils.ts        # API testing utilities
├── playwright.config.ts       # Playwright configuration
└── package.json               # Project dependencies
```

## 🔧 Prerequisites

Before running the tests, ensure you have:

- **Node.js** (v16 or higher)
- **npm** (v8 or higher)
- **Git** for version control
- **MongoDB** (for the backend application)

## 🚀 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/luciaesporta/athena-bank-playwright.git
cd athena-bank-playwright
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Install Playwright Browsers

```bash
npx playwright install
```

### 4. Configure Environment Variables

Copy the example file and fill in your credentials:

```bash
cp .env.example .env
```

Edit `.env` with the credentials for your test accounts:

```
BASE_URL=http://localhost:3000
API_URL=http://localhost:6007/api

TEST_VALID_EMAIL=your-test-user@example.com
TEST_VALID_PASSWORD=yourpassword

TEST_SENDER_EMAIL=your-sender@example.com
TEST_SENDER_PASSWORD=yourpassword

TEST_RECEIVER_EMAIL=your-receiver@example.com
TEST_RECEIVER_PASSWORD=yourpassword
```

### 5. Set Up the Application

The tests require the Athena Bank Fintech application to be running. Clone and set up the application:

```bash
# Clone the application repository
git clone https://github.com/Atenea-Conocimientos/redux-athena-bank.git app

# Navigate to backend
cd app/backend
npm install

# Create environment file
echo "MONGO_URI=mongodb://localhost:27017/athena-bank" > .env
echo "JWT_SECRET=your-jwt-secret" >> .env
echo "PORT=6007" >> .env
echo "VITE_API_URL=http://localhost:6007/api" >> .env

# Start the backend
npm run dev
```

In a new terminal:

```bash
# Navigate to frontend
cd app/frontend
npm install

# Start the frontend
npm run dev
```

### 5. Verify Setup

Ensure both applications are running:
- **Backend**: http://localhost:6007
- **Frontend**: http://localhost:3000

## 🧪 Running Tests

### Optimized Test Execution

The project uses an optimized configuration that separates tests by type for better performance:

- **Auth Tests**: Run without setup (fast execution)
- **Signup Tests**: Run without setup (fast execution)  
- **Transaction Tests**: Run with specific setup (creates test users)

### Run All Tests

```bash
npm test
```

### Run Tests by Type

```bash
# API tests only
npm run test:api

# Authentication tests
npx playwright test --project=auth-tests

# Signup tests
npx playwright test --project=signup-tests

# Transaction tests (with setup)
npx playwright test --project=transaction-tests
```

### Run Tests in Different Modes

```bash
npm run test:headed   # see the browser
npm run test:debug    # step-by-step debugger
npm run test:ui       # Playwright UI mode
```

### View Reports

```bash
npm run test:report
```

## 🔄 CI/CD Pipeline

The project includes a comprehensive GitHub Actions workflow (`.github/workflows/tests.yml`) that:

1. **Sets up the environment** with MongoDB service
2. **Clones and configures** the Athena Bank application
3. **Starts backend and frontend** services
4. **Runs the test suite** with Playwright
5. **Generates and deploys** test reports to GitHub Pages

### Workflow Features

- ✅ **Automated Setup**: Backend and frontend deployment
- ✅ **Database Integration**: MongoDB service for data persistence
- ✅ **Test Execution**: Full test suite with HTML reporting
- ✅ **Report Deployment**: Automatic deployment to GitHub Pages
- ✅ **Artifact Storage**: Test reports saved as GitHub artifacts

### Viewing CI/CD Results

After a successful workflow run, test reports are available at:
```
https://luciaesporta.github.io/athena-bank-playwright/report-{BUILD_NUMBER}/
```

## 📊 Test Reports

The project generates comprehensive test reports including:

- **HTML Reports**: Detailed test results with screenshots
- **Video Recordings**: Test execution videos for failed tests
- **Trace Files**: Step-by-step test execution traces
- **Screenshots**: Visual evidence of test execution

### Accessing Reports

1. **Local Reports**: After running tests, view with `npx playwright show-report`
2. **CI/CD Reports**: Available on GitHub Pages after workflow completion
3. **Artifacts**: Downloadable from GitHub Actions workflow runs

## 📝 Test Data Management

Test credentials are loaded from environment variables — never hardcoded. Copy `.env.example` to `.env` and fill in your values (see Setup Instructions above).

Non-sensitive test data (account types, amounts, routes) lives in `data/testData.json` and `constants/testConstants.ts`.

## 🏗️ Page Object Model

The project follows the Page Object Model pattern for maintainable test code:

### Page Classes

- **`PageAuth`**: Authentication page interactions and validations
- **`PageSignUp`**: User registration functionality
- **`PageDashboard`**: Main application dashboard
- **`ModalCreateBankAccount`**: Bank account creation modal
- **`ModalTransferMoney`**: Money transfer functionality

### Example Usage

```typescript
import { PageAuth } from '../pages/pageAuth';

test('User can login successfully', async ({ page }) => {
  const pageAuth = new PageAuth(page);
  await pageAuth.visitLoginPage();
  await pageAuth.loginAndRedirectionToDashboardPage(
    "user@example.com", 
    "password123"
  );
});
```

## 🧪 Test Coverage

### Authentication Tests (`auth.spec.ts`)
- ✅ Successful login with dashboard redirection
- ✅ Login failure with wrong password
- ✅ Login validation with empty email field
- ✅ Login validation with invalid email format
- ✅ Route protection for non-authenticated users

### Signup Tests (`signup.spec.ts`)
- ✅ Successful user registration
- ✅ Signup failure due to existing email
- ✅ Redirection to login after account creation
- ✅ API-based signup validation
- ✅ HTTP status code verification

### Transaction Tests (`transactions.spec.ts`)
- ✅ Bank account creation
- ✅ Money transfer between users
- ✅ Money reception verification
- ✅ API-based transaction validation

## 🔧 Configuration

### Playwright Configuration (`playwright.config.ts`)

```typescript
export default defineConfig({
  testDir: './tests',
  reporter: 'html',
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'setup',
      testMatch: /.*transaction\.setup\.ts/,
    },
    {
      name: 'auth-tests',
      use: { ...devices['Desktop Chrome'] },
      testMatch: /.*auth\.spec\.ts/,
      dependencies: [], // No setup required
    },
    {
      name: 'signup-tests',
      use: { ...devices['Desktop Chrome'] },
      testMatch: /.*signup\.spec\.ts/,
      dependencies: [], // No setup required
    },
    {
      name: 'transaction-tests',
      use: { ...devices['Desktop Chrome'] },
      testMatch: /.*transactions\.spec\.ts/,
      dependencies: ['setup'], // Setup required
    },
  ],
});
```

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `BASE_URL` | Frontend URL | `http://localhost:3000` |
| `API_URL` | Backend API URL | `http://localhost:6007/api` |
| `TEST_VALID_EMAIL` | Main test account email | — |
| `TEST_VALID_PASSWORD` | Main test account password | — |
| `TEST_SENDER_EMAIL` | Sender test account email | — |
| `TEST_SENDER_PASSWORD` | Sender test account password | — |
| `TEST_RECEIVER_EMAIL` | Receiver test account email | — |
| `TEST_RECEIVER_PASSWORD` | Receiver test account password | — |
| `MONGO_URI` | MongoDB connection string (CI only) | — |
| `JWT_SECRET` | JWT secret (CI only) | — |

### Debug Mode

Run tests in debug mode for step-by-step execution:

```bash
npx playwright test --debug
```
