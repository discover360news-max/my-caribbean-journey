/**
 * Cloudflare Pages Function — OAuth Callback
 * Route: GET /api/auth/callback
 *
 * GitHub redirects here after the user authorizes the app.
 * Exchanges the authorization code for an access token and
 * returns it to Decap CMS via postMessage.
 *
 * Requires environment variables:
 *   GITHUB_CLIENT_ID     — from your GitHub OAuth App
 *   GITHUB_CLIENT_SECRET — from your GitHub OAuth App (mark as secret)
 */
export async function onRequestGet(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  if (!code) {
    return oauthResponse("error", { error: "No authorization code received." });
  }

  if (!env.GITHUB_CLIENT_ID || !env.GITHUB_CLIENT_SECRET) {
    return oauthResponse("error", {
      error: "Server misconfiguration: OAuth credentials are not set.",
    });
  }

  try {
    const tokenRes = await fetch(
      "https://github.com/login/oauth/access_token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          client_id: env.GITHUB_CLIENT_ID,
          client_secret: env.GITHUB_CLIENT_SECRET,
          code,
        }),
      }
    );

    const data = await tokenRes.json();

    if (data.error) {
      return oauthResponse("error", {
        error: data.error_description || data.error,
      });
    }

    return oauthResponse("success", {
      token: data.access_token,
      provider: "github",
    });
  } catch (err) {
    return oauthResponse("error", { error: err.message });
  }
}

/**
 * Returns an HTML page that sends the token back to Decap CMS
 * via window.opener.postMessage — the protocol Decap expects.
 */
function oauthResponse(status, content) {
  const contentJson = JSON.stringify(content);
  const html = `<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body>
<script>
(function () {
  var content = ${contentJson};
  var status = ${JSON.stringify(status)};
  function sendMessage(e) {
    window.opener.postMessage(
      "authorization:github:" + status + ":" + JSON.stringify(content),
      e.origin
    );
  }
  window.addEventListener("message", sendMessage, false);
  window.opener.postMessage("authorizing:github", "*");
})();
</script>
</body></html>`;

  return new Response(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
