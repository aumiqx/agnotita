/**
 * Subdomain Manager
 *
 * Creates subdomains on Hostinger shared hosting via their API or cPanel.
 *
 * Supports two approaches:
 * 1. Hostinger hPanel API (preferred — if API access is available)
 * 2. cPanel UAPI (fallback — most shared hosting providers support this)
 *
 * Env:
 *   HOSTINGER_API_KEY   — for hPanel API approach
 *   CPANEL_URL          — for cPanel approach (e.g., https://yourdomain.com:2083)
 *   CPANEL_USER         — cPanel username
 *   CPANEL_TOKEN        — cPanel API token
 *   BASE_DOMAIN         — the parent domain (e.g., "agnotita.com")
 */

/**
 * Create a subdomain for a business site.
 *
 * Example: createSubdomain("zostel-varanasi", "agnotita.com")
 * Result: zostel-varanasi.agnotita.com -> /public_html/zostel-varanasi/
 *
 * @param {string} subdomain - subdomain name (e.g., "zostel-varanasi")
 * @param {string} domain - optional base domain override
 * @returns {Promise<{ url: string, documentRoot: string }>}
 */
export async function createSubdomain(subdomain, domain) {
  const baseDomain = domain || process.env.BASE_DOMAIN;

  if (!baseDomain) {
    console.warn("[subdomain] No BASE_DOMAIN set. Skipping subdomain creation.");
    return { url: `${subdomain}.example.com`, documentRoot: `/public_html/${subdomain}` };
  }

  // Sanitize subdomain name
  const sanitized = subdomain
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  // Try Hostinger API first, then cPanel
  if (process.env.HOSTINGER_API_KEY) {
    return await createViaHostingerAPI(sanitized, baseDomain);
  }

  if (process.env.CPANEL_URL && process.env.CPANEL_TOKEN) {
    return await createViaCPanel(sanitized, baseDomain);
  }

  console.warn("[subdomain] No Hostinger API key or cPanel credentials found.");
  console.warn("[subdomain] Set HOSTINGER_API_KEY or CPANEL_URL + CPANEL_TOKEN + CPANEL_USER.");
  console.warn(`[subdomain] You'll need to manually create: ${sanitized}.${baseDomain}`);

  return {
    url: `https://${sanitized}.${baseDomain}`,
    documentRoot: `/public_html/${sanitized}`,
  };
}

/**
 * Create subdomain via Hostinger hPanel API.
 *
 * API docs: https://developers.hostinger.com
 *
 * Steps:
 * 1. POST /api/subdomains with { subdomain, domain }
 * 2. Set document root to /public_html/<subdomain>
 * 3. Wait for DNS propagation (usually instant on Hostinger)
 *
 * @returns {Promise<{ url: string, documentRoot: string }>}
 */
async function createViaHostingerAPI(subdomain, baseDomain) {
  const apiKey = process.env.HOSTINGER_API_KEY;

  // TODO: Implement when Hostinger API access is confirmed
  // The Hostinger API is in beta and may require business plan or higher.
  //
  // Expected request:
  // POST https://api.hostinger.com/v1/subdomains
  // Headers: Authorization: Bearer <apiKey>
  // Body: {
  //   "subdomain": "zostel-varanasi",
  //   "domain": "agnotita.com",
  //   "document_root": "/public_html/zostel-varanasi"
  // }
  //
  // Expected response:
  // { "id": 123, "subdomain": "zostel-varanasi.agnotita.com", "status": "active" }

  console.log(`[subdomain] Hostinger API: would create ${subdomain}.${baseDomain}`);
  console.log("[subdomain] Hostinger API integration pending");

  return {
    url: `https://${subdomain}.${baseDomain}`,
    documentRoot: `/public_html/${subdomain}`,
  };
}

/**
 * Create subdomain via cPanel UAPI.
 *
 * cPanel UAPI docs: https://api.docs.cpanel.net/openapi/cpanel/operation/SubDomain-addsubdomain/
 *
 * Steps:
 * 1. POST to cPanel UAPI SubDomain::addsubdomain
 * 2. Verify creation
 *
 * @returns {Promise<{ url: string, documentRoot: string }>}
 */
async function createViaCPanel(subdomain, baseDomain) {
  const cpanelUrl = process.env.CPANEL_URL;
  const cpanelUser = process.env.CPANEL_USER;
  const cpanelToken = process.env.CPANEL_TOKEN;

  const documentRoot = `/public_html/${subdomain}`;

  try {
    // cPanel UAPI endpoint for subdomain creation
    const url = `${cpanelUrl}/execute/SubDomain/addsubdomain`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `cpanel ${cpanelUser}:${cpanelToken}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        domain: subdomain,
        rootdomain: baseDomain,
        dir: documentRoot,
      }),
      signal: AbortSignal.timeout(30000),
    });

    if (!response.ok) {
      throw new Error(`cPanel API error: ${response.status}`);
    }

    const data = await response.json();

    if (data.status === 1) {
      console.log(`[subdomain] Created: ${subdomain}.${baseDomain}`);
      return {
        url: `https://${subdomain}.${baseDomain}`,
        documentRoot,
      };
    } else {
      // Check if it already exists (not an error)
      const errorMsg = data.errors?.[0] || "Unknown error";
      if (errorMsg.includes("already exists")) {
        console.log(`[subdomain] Already exists: ${subdomain}.${baseDomain}`);
        return { url: `https://${subdomain}.${baseDomain}`, documentRoot };
      }

      throw new Error(`cPanel error: ${errorMsg}`);
    }
  } catch (err) {
    console.error(`[subdomain] Failed to create ${subdomain}.${baseDomain}:`, err.message);
    throw err;
  }
}
