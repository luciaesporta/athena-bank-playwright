const tseslint = require('@typescript-eslint/eslint-plugin');
const tsparser = require('@typescript-eslint/parser');
const playwright = require('eslint-plugin-playwright');

module.exports = [
    {
        ignores: ['node_modules/**', 'dist/**', 'playwright-report/**', 'test-results/**'],
    },
    {
        files: ['**/*.ts'],
        languageOptions: {
            parser: tsparser,
            parserOptions: {
                project: './tsconfig.json',
                ecmaVersion: 2020,
                sourceType: 'module',
            },
            globals: {
                require: 'readonly',
                module: 'readonly',
                process: 'readonly',
                __dirname: 'readonly',
                console: 'readonly',
            },
        },
        plugins: {
            '@typescript-eslint': tseslint,
            playwright,
        },
        rules: {
            ...tseslint.configs.recommended.rules,
            ...playwright.configs['flat/recommended'].rules,
            'no-console': 'warn',
            'prefer-const': 'error',
            '@typescript-eslint/no-explicit-any': 'error',
            '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
            '@typescript-eslint/explicit-function-return-type': 'off',
            'playwright/no-wait-for-timeout': 'error',
            'playwright/no-force-option': 'warn',
            'playwright/prefer-web-first-assertions': 'error',
        },
    },
];
