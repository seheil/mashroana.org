import { describe, expect, it } from "vitest";

describe("GitHub CMS OAuth configuration", () => {
  it("reaches GitHub OAuth with the configured client credentials without logging the secret", async () => {
    const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;
    const clientSecret = process.env.GITHUB_OAUTH_CLIENT_SECRET;

    expect(clientId).toBeTruthy();
    expect(clientSecret).toBeTruthy();

    const response = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code: "invalid-test-code" }),
    });
    const payload = await response.json() as { access_token?: string; error?: string };

    expect(response.ok).toBe(true);
    expect(payload.access_token).toBeUndefined();
    expect(payload.error).toBeTruthy();
  }, 15000);
});
