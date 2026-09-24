# Build 3 completion — PRP Reference P267

Implements PRP P266: conversion, trust, quote-led pricing and enquiry quality, preserving the approved Build 2 yellow/charcoal design and existing information architecture.

## Scope completed

Reworked Pricing, expanded the local employer brief form, added one Use Cases page, strengthened homepage and Why iHire trust copy, aligned How It Works with quote review and customer selection, centralised contact placeholders and documented the future enquiry data contract. No dependencies, external services, accounts, CRM integration, portal or calculator were added. No deployment, commit or push was performed.

## Files changed

Added:

- `src/data/business.ts`
- `src/lib/enquiry.ts`
- `src/components/ContactDetails.astro`
- `src/components/PricingContent.astro`
- `src/pages/use-cases.astro`
- `src/styles/conversion.css`
- `BUILD3-REPORT.md`

Updated:

- `src/components/ContactForm.astro`
- `src/components/CTASection.astro`
- `src/components/Footer.astro`
- `src/components/LearnHub.astro`
- `src/layouts/Layout.astro`
- `src/layouts/DiscoveryLayout.astro`
- `src/pages/[page].astro`
- `src/pages/index.astro`
- `src/pages/roles/[slug].astro`
- `src/data/site.ts`
- `src/data/discovery.ts`
- `tests/site.spec.ts`
- `README.md`
- `AGENTS.md`

Generated production output and the review screenshots listed below were refreshed. Existing Build 1/2 screenshots were preserved. This list is based on implementation actions, not a Git diff: the project directory is not a Git repository.

## Pricing changes

`/pricing/` now leads with “Pricing built around the role you need.” It explains the six-step quote process: brief, scope, recruit/validate the market, establish employment and infrastructure needs, provide a clear quote, then the customer decides. Quote review precedes commitment and the customer selects the employee.

Cost factors include role, responsibilities, skills, experience, country, candidate salary expectations, hours, headcount, equipment, connectivity, power resilience, specialist infrastructure and employment requirements. The quote-component section describes employee cost, iHire service, equipment, connectivity, power resilience and role-specific requirements as possible inclusions, not automatic entitlements. Separate setup charges and ongoing inclusions must be confirmed. No salary bands, package prices, savings guarantees or internal margin are published.

The pricing CTA is consistently **Get an Indicative Quote**. General employer CTAs remain **Find Talent**; supporting process guidance uses **How It Works**. The future estimator is a restrained explanatory note, not a disabled or apparently broken tool.

## Enquiry changes

The shared employer form on Hire Talent and Contact captures:

- Contact: name, company, work email, phone and country.
- Staffing: role/job title, headcount, main responsibilities, required skills, required experience, preferred working hours and desired start timeframe.
- Talent preference: no preference, Sri Lanka, Philippines, India, Fiji or open to recommendation.
- Equipment/infrastructure: standard laptop, additional monitors, headset, specialist hardware, connectivity, UPS/power backup and unsure/recommend a setup.
- Additional information.

Name, company, valid email, country, role, positive whole-number headcount, responsibilities and skills are required. Experience, hours and other details may remain open for discussion. The form uses visible labels, semantic groups, native validation and a custom message for whitespace-only required text. Country/option identifiers are stable; talent availability caveats remain visible.

**Current behaviour:** “Download my staffing brief” creates a readable local `.txt` file. It does not send an enquiry, request a quote, persist personal data in browser storage or commit the user to a hire. A clear notice appears before the form and by the download action. The button stays disabled until JavaScript is ready; the non-JavaScript explanation remains visible when scripts cannot run. This also avoids relying on browser-specific `noscript` rendering behaviour encountered during testing.

`StaffingEnquiry` separates Client, Contact and Staffing Requirement data, with version 1 and a public-website source identifier. Equipment choices remain an array. The pure serializer and formatter are ready for a future approved email/API/CRM mapping, but no submission transport or internal platform branding is exposed. Future integration must add server-side validation, privacy wording and delivery/error handling.

Approved email, phone, address and availability values are centralised as deliberate null placeholders in `src/data/business.ts`.

## Use Cases

The new `/use-cases/` page contains four factual, anonymised operational examples:

1. After-hours surveillance monitoring for a New Zealand business, with defined customer requirements, escalation and handovers.
2. Shopify/product administration, including product loading, catalogue information and content updates.
3. Historical telephone verification of door-to-door sales using customer-owned scripts and workflows.
4. Internal/group offshore Operations Manager, Digital Marketing Manager and Digital Platforms Manager roles.

Split layouts, structured lists and workflow treatments reuse the approved visual language. No customer names, testimonials, invented outcomes or statistics were added. Contextual links connect roles, relevant industries, business needs, Sri Lanka, process, pricing and Find Talent. Use Cases is surfaced through the homepage, Why iHire, relevant industry pages, Learn and footer; the top navigation remains unchanged.

## Trust changes

The homepage’s existing experience section now explicitly says that iHire uses offshore staffing itself, names the three internal role types and links to real use cases. Why iHire explains support beyond recruitment: screening, employment administration, payroll, equipment, connectivity, local support and ongoing changes. The responsibility comparison reinforces that the customer manages daily work, priorities, training, business processes, performance and integration.

How It Works now has 12 distinct stages, including customer review and the offer step, with an explicit quote-review gate before commitment. NZ and Australia remain the primary customer markets; Sri Lanka remains the established staffing operation and other countries remain role-dependent sourcing options.

## SEO changes

Updated Pricing title/description and added unique Use Cases metadata, canonical URL, social tags and breadcrumbs through the existing layout. The sitemap contains all 43 public content routes; the full build contains 44 pages including the custom 404. All previous routes remain. No rating, review, price or aggregate schema was added; existing Organization and breadcrumb schema are preserved.

## AGENTS.md changes

Added permanent rules for quote-led pricing, no invented public prices, the pricing CTA, customer/iHire responsibility boundaries, factual anonymised examples, approval before naming customers, preservation of Build 2, central contact configuration, the typed local draft and approval before future integrations. Retained no eyebrows, yellow branding, NZ/Australia targeting, Sri Lanka primacy, careful secondary-market positioning, portal separation and no deployment/commit/push without instruction.

## Validation

- **Type check:** `npm.cmd run check` passed; 41 files checked, **0 errors, 0 warnings, 0 hints**.
- **Production build:** `npm.cmd run build` passed; **44 pages**, including 43 public content routes and the 404 page.
- **Full test suite:** final `npm.cmd test` passed; **6 passed, 0 failed (27.5 seconds)**.
- **Targeted enquiry checks:** all three targeted tests passed: complete structured draft mapping; mobile menu plus field validation, selections and download; non-JavaScript disabled download with usable navigation. These are included in the six-test total, not an additional run.
- **Download assertions:** required/whitespace/email/headcount validation, all six talent preferences, multiple equipment choices, complete exported field values, truthful status text, no POST request and no local/session storage use.
- **Link/metadata audit:** all 43 public content routes returned 200, each had one H1, unique title/description, correct canonical and valid internal paths/fragments. No dead `#` links.
- **Sitemap:** all 43 public content routes present, including `/use-cases/`.
- **Responsive checks:** 14 representative routes at **1440, 768, 390 and 320 px**; no horizontal overflow. Includes home, Pricing, Hire Talent, Use Cases, Why iHire and How It Works.
- **Accessibility:** automated axe WCAG A/AA checks passed for the screenshot review set, desktop/tablet/mobile home, Pricing, enquiry and Use Cases, plus the completed enquiry journey. No console/runtime errors observed in the responsive journeys. This is not a full WCAG certification or Lighthouse audit.
- **Content audit:** no obsolete public fixed-price offers, salary figures, percentage savings claims, unapproved customer names or public internal-platform branding. Mentions of bands/packages are explicit statements that they are not offered. No eyebrow markup/props/styles were reintroduced.
- **Visual review:** reviewed Pricing desktop/mobile, expanded enquiry desktop/tablet/mobile, Use Cases, Why iHire, How It Works and homepage screenshots. Build 2 styling remains intact.
- **Git diff check:** `git diff --check` could not run as a repository check; **exit 129**, “Not a git repository.” This is an unavailable check, not a pass.

## Screenshots

- [Homepage desktop](artifacts/homepage-desktop-build3.png)
- [Homepage mobile](artifacts/homepage-mobile-build3.png)
- [Pricing desktop](artifacts/pricing-desktop-build3.png)
- [Pricing mobile](artifacts/pricing-mobile-build3.png)
- [Find Talent desktop](artifacts/find-talent-desktop-build3.png)
- [Use Cases desktop](artifacts/use-cases-desktop-build3.png)
- [Why iHire desktop](artifacts/why-ihire-desktop-build3.png)
- [How It Works desktop](artifacts/how-it-works-desktop-build3.png)

Additional tablet homepage, first-viewport and enquiry-only captures are in `artifacts/`, including `enquiry-1440-build3.png`, `enquiry-768-build3.png` and `enquiry-390-build3.png`.

## Outstanding information

- Final approved logo, favicon and social assets; current branded placeholder retained.
- Approved email, telephone, address and availability; no fabricated contact information.
- Actual live enquiry destination and approved privacy/delivery requirements.
- Live job vacancies and application links.
- Any approved future public pricing guidance, quote inclusions or reliable estimator ranges.
- Additional customer naming permissions or documented outcomes if future content needs them.

## Git status

`git status --short` returned **exit 128**, “not a git repository (or any of the parent directories): .git”, both at the initial audit and final check. Working-tree status therefore cannot be determined. No repository was initialised and no commit, push or deployment occurred.
