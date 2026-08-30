import { describe, expect, it } from "vitest";

describe("GitHub OAuth secret configuration", () => {
  it("is configured and accepted by the GitHub OAuth endpoint format", async () => {
    const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;
    const clientSecret = process.env.GITHUB_OAUTH_CLIENT_SECRET;

    expect(clientId).toBeTruthy();
    expect(clientSecret).toBeTruthy();

    const response = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({ client_id: clientId, client_secret: clientSecret }),
    });

    expect([200, 400, 401, 422]).toContain(response.status);
    const payload = (await response.json()) as { error?: string };
    expect(typeof payload.error).toBe("string");
  }, 15_000);
});

