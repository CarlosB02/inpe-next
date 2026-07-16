let cachedToken: { token: string; expiresAt: number } | null = null;

export async function getAdminToken(): Promise<string | null> {
  // 1. If permanent token is configured directly in .env.local, use it
  if (process.env.SHOPIFY_ADMIN_TOKEN) {
    return process.env.SHOPIFY_ADMIN_TOKEN;
  }

  // 2. Otherwise, check if client ID and secret are configured
  const clientId = process.env.SHOPIFY_ADMIN_CLIENT_ID;
  const clientSecret = process.env.SHOPIFY_ADMIN_CLIENT_SECRET;
  const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;

  if (!clientId || !clientSecret || !domain) {
    return null;
  }

  const now = Date.now();

  // Re-use cached token if still valid (with a 5-minute safety margin)
  if (cachedToken && cachedToken.expiresAt > now + 5 * 60 * 1000) {
    return cachedToken.token;
  }

  try {
    const res = await fetch(`https://${domain}/admin/oauth/access_token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: clientId,
        client_secret: clientSecret,
      }),
    });

    const data = await res.json();
    if (!res.ok || !data.access_token) {
      console.error('Failed to exchange Shopify Admin Client Credentials:', data);
      return null;
    }

    cachedToken = {
      token: data.access_token,
      expiresAt: now + (data.expires_in || 86400) * 1000,
    };

    return cachedToken.token;
  } catch (err) {
    console.error('Error fetching admin token from Shopify OAuth:', err);
    return null;
  }
}
