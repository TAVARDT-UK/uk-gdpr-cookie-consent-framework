/**
 * TAVARDT UK | Lightweight UK GDPR & PECR Cookie Consent Manager
 * https://tools.tavardt.com/uk/consent-mode-v2-checker/
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'tavardt_consent_uk';

  function getSavedConsent() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }

  function saveConsent(analytics, marketing) {
    const record = {
      analytics: !!analytics,
      marketing: !!marketing,
      timestamp: new Date().toISOString(),
      version: '1.0'
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
    } catch {}

    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        'analytics_storage': analytics ? 'granted' : 'denied',
        'ad_storage': marketing ? 'granted' : 'denied',
        'ad_user_data': marketing ? 'granted' : 'denied',
        'ad_personalization': marketing ? 'granted' : 'denied'
      });
    }

    const banner = document.getElementById('tavardt-consent-banner');
    if (banner) banner.remove();
  }

  function init() {
    const existing = getSavedConsent();
    if (existing) {
      if (typeof window.gtag === 'function') {
        window.gtag('consent', 'update', {
          'analytics_storage': existing.analytics ? 'granted' : 'denied',
          'ad_storage': existing.marketing ? 'granted' : 'denied',
          'ad_user_data': existing.marketing ? 'granted' : 'denied',
          'ad_personalization': existing.marketing ? 'granted' : 'denied'
        });
      }
      return;
    }

    if (document.getElementById('tavardt-consent-banner')) return;

    const banner = document.createElement('div');
    banner.id = 'tavardt-consent-banner';
    banner.setAttribute('role', 'region');
    banner.setAttribute('aria-label', 'Privacy and Cookie Consent Preferences');
    banner.style.cssText = 'position:fixed;bottom:20px;left:20px;right:20px;max-width:540px;margin:0 auto;background:#0a0a0f;color:#e2e8f0;border:1px solid rgba(255,255,255,0.15);border-radius:16px;padding:24px;box-shadow:0 20px 40px rgba(0,0,0,0.6);z-index:999999;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;font-size:14px;line-height:1.5;';

    banner.innerHTML = `
      <div style="margin-bottom:16px;">
        <strong style="display:block;font-size:16px;margin-bottom:6px;color:#ffffff;">Privacy and Cookie Governance</strong>
        <p style="margin:0;color:#94a3b8;font-size:13px;">We utilise essential cookies to guarantee application functionality. With your permission, analytical and performance cookies help us refine user experience. Learn more in our <a href="https://ag.tavardt.com/uk/privacy/" target="_blank" rel="noopener" style="color:#a78bfa;text-decoration:underline;">Privacy Policy</a>.</p>
      </div>
      <div style="display:flex;gap:10px;justify-content:flex-end;flex-wrap:wrap;">
        <button id="tavardt-btn-reject" style="background:transparent;border:1px solid rgba(255,255,255,0.2);color:#cbd5e1;padding:8px 16px;border-radius:8px;cursor:pointer;font-weight:600;font-size:13px;">Reject All</button>
        <button id="tavardt-btn-accept" style="background:#5b3cf5;border:none;color:#ffffff;padding:8px 18px;border-radius:8px;cursor:pointer;font-weight:600;font-size:13px;">Accept All</button>
      </div>
    `;

    document.body.appendChild(banner);

    document.getElementById('tavardt-btn-accept')?.addEventListener('click', () => saveConsent(true, true));
    document.getElementById('tavardt-btn-reject')?.addEventListener('click', () => saveConsent(false, false));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
