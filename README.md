# UK GDPR & PECR Cookie Consent Framework

[![Diagnostic Suite](https://img.shields.io/badge/TAVARDT-Verification%20Suite-5b3cf5.svg)](https://tools.tavardt.com/uk/)
[![JavaScript](https://img.shields.io/badge/JavaScript-Node.js-yellow.svg)](https://nodejs.org/)
[![UK Governance](https://img.shields.io/badge/Compliance-UK%20GDPR%20%26%20PECR-00C853.svg)](https://ag.tavardt.com/uk/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

A lightweight, zero-dependency, privacy-first cookie consent manager and Google Consent Mode v2 implementation engineered strictly for United Kingdom legal standards. Complies with UK GDPR, the Data Protection Act 2018, and the Privacy and Electronic Communications Regulations (PECR).

Maintained by the engineering practice at **TAVARDT**.

***

## 1. Architectural Overview and Consent Signals

The framework provides client-side cookie governance and tag consent management with zero external dependencies. It executes in less than 4KB to maintain optimal Core Web Vitals while strictly enforcing prior consent before non-essential tracking occurs:

* **Strict Default Denied Posture**: Configures all measurement and advertising storage parameters to denied prior to script execution. This prevents tracking pixels from storing or reading cookies before the visitor grants explicit permission.
* **Google Consent Mode v2 Native Integration**: Synchronises user choices with `ad_storage`, `analytics_storage`, `ad_user_data`, and `ad_personalization`. Signals update dynamically via the global `gtag` API as soon as user interaction occurs.
* **Persistent Preference Storage**: Stores user decisions in `localStorage` under the dedicated key `tavardt_consent_uk`. Cached preferences automatically restore consent states on subsequent page views without re-displaying the banner.
* **Accessible and Non-Coercive UI**: Injects an accessible banner element with ARIA region roles and semantic markup. The banner provides equal visual prominence to acceptance and rejection options to eliminate dark pattern coercion.

***

## 2. Regulatory Risk Vectors and Operational Impact

Deploying analytics and advertising tags without verifiable, prior consent exposes organisations operating in the United Kingdom to severe legal and technical consequences. The framework mitigates four critical compliance risks:

* **PECR Regulation 6 Enforcement**: Storing or accessing information on user terminal equipment without prior consent violates PECR standards. The framework guarantees that non-essential cookies remain blocked until affirmative consent is registered.
* **Dark Pattern and Asymmetric Choice Sanctions**: Presenting obscure rejection paths or pre-ticked preferences violates Information Commissioner Office guidelines. The interface provides symmetric accept and reject controls to ensure compliance with valid consent criteria.
* **Consent Mode v2 Disruption**: Google requires verifiable consent signals (`ad_user_data` and `ad_personalization`) to maintain conversion modelling and remarketing in the UK. Operating without v2 compliance leads to degraded measurement accuracy and ad account limitations.
* **Performance and Core Web Vitals Degradation**: Bulky third-party consent management platforms inject excessive script payloads that bloat Interaction to Next Paint (INP) and Largest Contentful Paint (LCP). This sub-4KB vanilla implementation executes instantly without layout shift or thread contention.

***

## 3. Integration and Baseline Configuration

Deploy the framework by placing the default Consent Mode configuration in the document head prior to loading Google Tag Manager or any tracking scripts:

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

### Core Execution Lifecycle

The runtime script manages consent lifecycle events through four deterministic steps:

* **Stored Preference Verification**: Inspects local storage for existing records under `tavardt_consent_uk`. If valid consent exists, it updates `gtag` immediately and halts DOM injection.
* **Accessible Banner Creation**: Injects the container element with role region and aria-label attributes when no prior decision exists. The banner contains straightforward disclosure language and accessible action buttons.
* **Affirmative Event Handling**: Listens for click events on `#tavardt-btn-accept` and `#tavardt-btn-reject`. Acceptance enables analytics and marketing parameters, whereas rejection explicitly denies all non-essential categories.
* **Consent Dispatch and Teardown**: Dispatches `gtag('consent', 'update', ...)` commands to propagate new preferences across all active tags. The script then persists the timestamped decision and removes the banner from the DOM.

***

## 4. Frequently Asked Technical Questions (FAQ)

### How does the framework enforce compliance with UK PECR Regulation 6 and UK GDPR consent standards?
The framework establishes a strict default denied state for all non-essential tracking parameters prior to tag execution. It guarantees that analytical and marketing storage remain blocked until the user provides affirmative consent through symmetric action buttons.

### What specific parameters does Google Consent Mode v2 require and how are they updated?
Consent Mode v2 requires explicit state management for ad storage, analytics storage, ad user data, and ad personalization. The framework updates these four parameters simultaneously via window gtag upon user interaction and propagates them to active tags.

### How does the framework persist visitor preferences across page navigations without re-prompting?
User preferences are stored in local storage under the dedicated tavardt_consent_uk key alongside an ISO timestamp and schema version. Upon subsequent page loads, the script reads this record and dispatches updated consent signals without rendering the banner.

### Why does the banner interface present equal prominence for rejection and acceptance controls?
Information Commissioner Office guidance mandates that rejecting non-essential cookies must be as easy and clear as accepting them. Presenting symmetric controls prevents coercive dark patterns and ensures legal validity under British data protection standards.

### What performance advantages does this zero-dependency implementation provide over standard commercial CMPs?
With an unminified footprint under 4KB, the framework executes with near-zero execution overhead and avoids third-party network roundtrips. This lightweight architecture preserves Core Web Vitals including Interaction to Next Paint and Largest Contentful Paint.

***

## Useful Links

* Corporate Portal: https://ag.tavardt.com/uk/
* Diagnostic Suite: https://tools.tavardt.com/uk/
* Technical Contact: https://ag.tavardt.com/uk/contact/

***

## License

Released under the MIT License.

***

© 2026 TAVARDT. All rights reserved.
