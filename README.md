# UK GDPR & PECR Cookie Consent Framework

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Diagnostic Suite](https://img.shields.io/badge/TAVARDT-Verification%20Suite-5b3cf5.svg)](https://tools.tavardt.com/uk/)
[![UK Governance](https://img.shields.io/badge/Compliance-UK%20GDPR%20%26%20PECR-00C853.svg)](https://ag.tavardt.com/uk/)

A lightweight, zero-dependency, privacy-first cookie consent manager and Google Consent Mode v2 implementation engineered strictly for United Kingdom legal standards (UK GDPR, Data Protection Act 2018, and Privacy and Electronic Communications Regulations).

Maintained by the engineering practice at **TAVARDT UK**.

***

## 1. Architectural Highlights

* **Sub-4KB Footprint:** Zero external libraries, zero bloat, instant execution without impacting Core Web Vitals.
* **Google Consent Mode v2 Native:** Enforces default `denied` state for analytics, ads, personal data, and ad personalisation before tag firing.
* **Granular Preference Management:** Independent categories for Necessary, Analytics, and Marketing cookies.
* **Full Keyboard Accessibility:** Fully navigable via keyboard controls, respecting WCAG 2.1 AA standards.

***

## 2. Quick Start Integration

### HTML & Baseline Initialisation

Include the baseline script in your document head before loading Google Tag Manager or any tracking scripts:

```html
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}

  gtag('consent', 'default', {
    'ad_storage': 'denied',
    'analytics_storage': 'denied',
    'ad_user_data': 'denied',
    'ad_personalization': 'denied',
    'wait_for_update': 500
  });
</script>
<script src="src/tavardt-consent.js" defer></script>
```

***

## 3. Online Diagnostic Verification

Verify that your website correctly implements Consent Mode v2 and complies with British privacy requirements using the free diagnostic suite:

* [Consent Mode v2 Auditor](https://tools.tavardt.com/uk/consent-mode-v2-checker/): Checks tag sequencing and consent signals.
* [Security Headers Compliance Check](https://tools.tavardt.com/uk/security-headers-check/): Audits CSP, HSTS, and referrer boundaries.
* [Core Web Vitals Real-Time Benchmark](https://tools.tavardt.com/uk/core-web-vitals-checker/): Tests LCP, INP, and CLS metrics.
* Full Diagnostic Suite: 20 free technical tools.

***

## 4. Professional Engineering & Compliance Audits

For enterprise web development, bespoke performance architecture, and full privacy compliance audits across the UK:

* **UK Headquarters:** Portal Institucional
* **Web Engineering Services:** [https://ag.tavardt.com/uk/web-design/](https://ag.tavardt.com/uk/web-design/)
* **Contact Engineering Directorate:** [Canal de Contato](https://ag.tavardt.com/uk/contact/)

***

## License

Released under the MIT License. Copyright (c) 2026 TAVARDT.
