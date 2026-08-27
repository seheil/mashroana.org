import type { VercelRequest, VercelResponse } from "@vercel/node";

export default function auth(request: VercelRequest, response: VercelResponse) {
  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;
  const origin = process.env.SITE_ORIGIN;
  if (!clientId || !origin) {
    return response.status(500).send("GitHub CMS OAuth is not configured yet.");
  }
  const state = typeof request.query.state === "string" ? request.query.state : "";
  const authorizationUrl = new URL("https://github.com/login/oauth/authorize");
  authorizationUrl.searchParams.set("client_id", clientId);
  authorizationUrl.searchParams.set("redirect_uri", `${origin}/api/callback`);
  authorizationUrl.searchParams.set("scope", "repo");
  authorizationUrl.searchParams.set("state", state);
  response.redirect(authorizationUrl.toString());
}
