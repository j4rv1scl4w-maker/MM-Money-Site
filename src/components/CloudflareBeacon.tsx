import Script from 'next/script';

/**
 * Cookieless Cloudflare Web Analytics. Renders nothing when the token is unset,
 * so local builds and deploys without the Actions variable stay beacon-free.
 * The token is public in the page; it is not a secret.
 */
export default function CloudflareBeacon() {
  const token = process.env.NEXT_PUBLIC_CF_BEACON_TOKEN?.trim();
  if (!token) return null;

  return (
    <Script
      id="cf-beacon"
      src="https://static.cloudflareinsights.com/beacon.min.js"
      strategy="afterInteractive"
      data-cf-beacon={JSON.stringify({ token })}
    />
  );
}
