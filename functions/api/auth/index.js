/**
 * Cloudflare Pages Function — OAuth Start
 * Route: GET /api/auth
 *
 * Redirects the user to GitHub's OAuth authorization page.
 * Requires environment variable: GITHUB_CLIENT_ID
 * Set this in Cloudflare Pages → Settings → Environment variables.
 */
export async function onRequestGet(context) {
  const { env } = context;

  if (!env.GITHUB_CLIENT_ID) {
    return new Response(
      "Server misconfiguration: GITHUB_CLIENT_ID is not set.",
      { status: 500 }
    );
  }

  const params = new URLSearchParams({
    client_id: env.GITHUB_CLIENT_ID,
    scope: "repo,user",
    state: crypto.randomUUID(),
  });

  return Response.redirect(
    `https://github.com/login/oauth/authorize?${params}`,
    302
  );
}
