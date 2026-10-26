/**
 * Google AdSense Helper & Loader
 * OmniScore PRO
 * 
 * Manages dynamic script loading, publisher verification meta tags,
 * and ad slot execution with ad-blocker protection and dev placeholders.
 */

declare global {
  interface Window {
    adsbygoogle?: Array<Record<string, unknown>>;
  }
}

export function getAdSenseClientId(): string {
  const envId = (import.meta.env.VITE_ADSENSE_CLIENT_ID as string) || '';
  const trimmed = envId.trim();
  if (!trimmed) return '';
  if (trimmed.startsWith('pub-')) {
    return `ca-${trimmed}`;
  }
  return trimmed;
}

export function isAdSenseConfigured(): boolean {
  const clientId = getAdSenseClientId();
  return Boolean(clientId && clientId.startsWith('ca-pub-') && clientId.length > 10);
}

export function isTestMode(): boolean {
  const testEnv = (import.meta.env.VITE_ADSENSE_TEST_MODE as string) || '';
  if (testEnv.toLowerCase() === 'false') return false;
  // If not configured, default to test/placeholder mode so user can see where ads will show
  return !isAdSenseConfigured() || testEnv.toLowerCase() === 'true';
}

let scriptInjected = false;

/**
 * Initializes Google AdSense tags in document.head
 */
export function initAdSense(): void {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  const clientId = getAdSenseClientId();
  if (!clientId || scriptInjected) return;

  try {
    // 1. Inject meta tag if not present
    let metaTag = document.querySelector('meta[name="google-adsense-account"]');
    if (!metaTag) {
      metaTag = document.createElement('meta');
      metaTag.setAttribute('name', 'google-adsense-account');
      metaTag.setAttribute('content', clientId);
      document.head.appendChild(metaTag);
    }

    // 2. Inject AdSense script
    const existingScript = document.querySelector(`script[src*="pagead2.googlesyndication.com"]`);
    if (!existingScript) {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(clientId)}`;
      script.crossOrigin = 'anonymous';
      document.head.appendChild(script);
    }

    scriptInjected = true;
  } catch (err) {
    console.warn('[AdSense] Failed to initialize AdSense tags:', err);
  }
}

/**
 * Safely triggers an ad unit request to adsbygoogle
 */
export function pushAdUnit(): void {
  if (typeof window === 'undefined') return;
  try {
    window.adsbygoogle = window.adsbygoogle || [];
    window.adsbygoogle.push({});
  } catch (err) {
    // Ad-blockers or duplicate pushes can throw an error; suppress gracefully
    console.debug('[AdSense] Ad push suppressed or blocked:', err);
  }
}
