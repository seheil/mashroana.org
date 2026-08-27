import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function callback(request: VercelRequest, response: VercelResponse) {
  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GITHUB_OAUTH_CLIENT_SECRET;
  const origin = process.env.SITE_ORIGIN;
  const code = typeof request.query.code === "string" ? request.query.code : "";
  if (!clientId || !clientSecret || !origin || !code) {
    return response.status(400).send("GitHub CMS OAuth is not configured correctly.");
  }

  const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code }),
  });
  const result = await tokenResponse.json() as { access_token?: string };
  if (!result.access_token) return response.status(401).send("GitHub authorization was not completed.");

  response.setHeader("Content-Type", "text/html; charset=utf-8");
  response.status(200).send(`<!doctype html><html><body><script>
    window.opener.postMessage('authorization:github:success:' + JSON.stringify({ token: ${JSON.stringify(result.access_token)}, provider: 'github' }), ${JSON.stringify(origin)});
    window.close();
  </script><p>تم الربط بنجاح. يمكنك إغلاق هذه النافذة.</p></body></html>`);
}
