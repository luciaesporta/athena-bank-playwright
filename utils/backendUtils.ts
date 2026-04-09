import { APIRequestContext, expect } from "@playwright/test";
import { ConfigHelpers, API_ENDPOINTS } from "../config/environment";
import type { TestUser } from "../types";

function generateUniqueEmail(baseEmail: string): string {
    const [user, domain] = baseEmail.split('@');
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 10000);
    return `${user}${timestamp}${random}@${domain}`;
}

export class BackendUtils {
  static async createUserViaAPI(request: APIRequestContext, user: TestUser) {
    const email = generateUniqueEmail(user.email);

    const response = await request.post(ConfigHelpers.getApiEndpoint(API_ENDPOINTS.AUTH.SIGNUP), {
      headers: { "Content-Type": "application/json" },
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: email,
        password: user.password,
      },
    });

    expect(response.status()).toBe(201);

    return { email, password: user.password };
  }
}
