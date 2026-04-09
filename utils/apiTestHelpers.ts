import { expect, type APIRequestContext } from '@playwright/test';
import { ENV, API_ENDPOINTS } from '../config/environment';
import type { LoginSuccessBody, TestUser } from '../types';

export function getBackendBaseUrl(): string {
    const configuredApiUrl = process.env.API_URL || ENV.apiUrl;
    const cleanedUrl = configuredApiUrl.endsWith('/') ? configuredApiUrl.slice(0, -1) : configuredApiUrl;
    return cleanedUrl.endsWith('/api') ? cleanedUrl.slice(0, -4) : cleanedUrl;
}

export async function loginUser(apiContext: APIRequestContext, email: string, password: string): Promise<LoginSuccessBody> {
    const response = await apiContext.post(`/api${API_ENDPOINTS.AUTH.LOGIN}`, {
        data: { email, password },
    });
    expect(response.status()).toBe(200);
    return (await response.json()) as LoginSuccessBody;
}

export async function ensureUserCanLogin(apiContext: APIRequestContext, user: TestUser): Promise<LoginSuccessBody> {
    const loginResponse = await apiContext.post(`/api${API_ENDPOINTS.AUTH.LOGIN}`, {
        data: { email: user.email, password: user.password },
    });

    if (loginResponse.status() === 200) {
        return (await loginResponse.json()) as LoginSuccessBody;
    }

    const signupResponse = await apiContext.post(`/api${API_ENDPOINTS.AUTH.SIGNUP}`, {
        data: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password,
        },
    });
    expect([200, 201, 400, 409]).toContain(signupResponse.status());
    return loginUser(apiContext, user.email, user.password);
}
