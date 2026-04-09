import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ModalFunding extends BasePage {
    readonly addFundsDashboardButton: Locator;
    readonly accountCombobox: Locator;
    readonly accountComboboxOption: Locator;
    readonly amountInput: Locator;
    readonly addFundsButton: Locator;
    readonly successMessage: Locator;
    readonly cancelButton: Locator;

    constructor(page: Page) {
        super(page);
        this.addFundsDashboardButton = this.page.getByTestId('boton-agregar-fondos');
        this.accountCombobox = this.page.getByRole('combobox', { name: 'Cuenta *' });
        this.accountComboboxOption = this.page.getByRole('option', { name: '•••• ' });
        this.amountInput = this.page.getByRole('spinbutton', { name: 'Monto' });
        this.addFundsButton = this.page.getByRole('button', { name: 'Agregar fondos' });
        this.successMessage = this.page.getByText('Fondos agregados exitosamente', { exact: false });
        this.cancelButton = this.page.getByTestId('boton-cancelar-agregar-fondos');
    }

    async addFunds(amount: string) {
        await this.addFundsDashboardButton.click();
        await this.accountCombobox.click();
        await this.accountComboboxOption.click();
        await this.amountInput.fill(amount);
        await this.addFundsButton.click();
        await expect(this.successMessage).toBeVisible();
    }

    async cancelAddFunds() {
        await this.addFundsDashboardButton.click();
        await this.accountCombobox.click();
        await this.accountComboboxOption.click();
        await this.cancelButton.click();
        await this.page.waitForLoadState('networkidle');
    }
}