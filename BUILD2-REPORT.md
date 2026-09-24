# Build 2 — Brand, Visual Direction and Content Architecture

## Delivered

The existing Astro project has been extended, not replaced. No dependencies were added. The public site now has 42 content routes plus the custom 404 page. No hosting, DNS, deployment, commit or push actions were performed.

## Brand and visual direction

Reviewed the [existing iHire homepage](https://www.ihireglobal.com/) in a browser solely as a colour reference. Its strong golden-yellow direction informs the new `#ffc62f` accent, paired with charcoal `#20282b`, warm white and pale yellow. This is a considered web palette, not a claim of an approved corporate colour specification.

- Yellow primary actions with dark text, visible focus and distinct hover treatment.
- New asymmetric homepage hero with large typography and an original lightweight team illustration on a yellow field.
- Connected yellow process markers, an open dark responsibility comparison, simpler role items, a pale-yellow business-needs list, open industry links, stronger Sri Lanka graphic and full yellow final CTA.
- No stock photography, external fonts, fabricated metrics or customer logos.
- No heading eyebrows remain: the PageHero prop, page data fields, rendered labels and related CSS selectors were removed. Former diagram labels, responsibility pills, card numbering and location pre-heading labels were also removed. Necessary location status and future-tool availability are conveyed in ordinary copy.

## Navigation and discovery

Main navigation: Hire Talent, Roles, Industries, How It Works, Talent Locations, Why iHire, Pricing, Learn. Secondary actions retain Find a Job, Contact and Find Talent. Business Needs is discoverable through the homepage, footer, role pages, industries and Learn links without adding another top-level navigation item.

`/resources/` remains the canonical knowledge-hub route, visibly presented as Learn. Topics cover staffing fundamentals, staffing versus outsourcing, locations, costs, equipment, onboarding, managing teams and FAQs. Useful existing pages are linked now; deeper guides remain explicitly planned instead of becoming thin placeholder routes.

## New routes

| Industry routes | Business-need routes |
| --- | --- |
| `/industries/` | `/business-needs/` |
| `/industries/healthcare/` | `/business-needs/add-capacity/` |
| `/industries/ecommerce/` | `/business-needs/reduce-hiring-pressure/` |
| `/industries/telecommunications/` | `/business-needs/extend-operating-hours/` |
| `/industries/professional-services/` | `/business-needs/access-specialist-skills/` |
| `/industries/technology/` | `/business-needs/build-an-offshore-team/` |
| `/industries/security-monitoring/` | `/business-needs/improve-cost-efficiency/` |

Each detail page has distinct problem/use-case content, practical planning, explicit scope limitations and relevant role/industry/need links. Healthcare remains non-clinical. Real experience in Shopify administration, digital platforms, telephone sales verification and after-hours surveillance monitoring is distinguished from potential broader applications. Sri Lanka remains the established operation; other sourcing locations are not overstated.

## Files changed

- Added `src/data/discovery.ts`, industry and business-need index/dynamic route files, and `src/layouts/DiscoveryLayout.astro`.
- Added `TeamGraphic.astro`, `DiscoveryList.astro`, `RoleConnections.astro`, `LearnHub.astro` and `src/styles/brand.css`.
- Updated `src/pages/index.astro`, `[page].astro`, role/location route templates, NZ/AU pages and the 404 hero calls.
- Updated shared Layout, ArticleLayout, PageHero, CTASection, ComparisonSection, FAQ, ContactForm, Footer, RoleCard and LocationCard; Header consumes the revised navigation data.
- Updated `src/data/site.ts`, shared global CSS and the placeholder favicon.
- Updated `tests/site.spec.ts`, README, resource authoring notes and AGENTS.md. Future agent guidance now covers three discovery paths, yellow branding, no eyebrows, factual claims, SEO and portal separation.

## SEO and functionality

New pages inherit unique titles/descriptions, canonical URLs, social metadata, Organization and breadcrumb schema. Sitemap generation includes every new route. Contextual links connect the three discovery paths with location, process and pricing guidance. Existing routes remain intact; no redirect migration is required. Robots, frontend brief download and accessible mobile navigation are preserved.

## Validation

- Astro/type validation: zero errors, warnings or hints.
- Production build: 43 pages generated successfully.
- Four browser acceptance tests cover 42 public routes, unique metadata/canonicals, internal links and anchors, sitemap coverage, absence of rendered eyebrow classes, keyboard menu operation and form validation/download.
- Representative existing/new pages checked for overflow at 1440, 768, 390 and 320 pixels.
- Automated axe WCAG A/AA checks on desktop/tablet/mobile homepage, the enquiry journey and requested desktop page captures report no violations.
- No console/runtime errors observed in responsive journeys.
- Desktop, tablet and mobile homepage screenshots and requested page screenshots visually reviewed. These checks do not constitute full accessibility certification or a Lighthouse audit.

## Screenshots

- `artifacts/homepage-desktop-build2.png`
- `artifacts/homepage-mobile-build2.png`
- `artifacts/how-it-works-desktop-build2.png`
- `artifacts/roles-desktop-build2.png`
- `artifacts/industries-desktop-build2.png`
- `artifacts/business-needs-desktop-build2.png`
- `artifacts/sri-lanka-desktop-build2.png`
- Additional tablet homepage and desktop/tablet/mobile first-viewport captures have the same `-build2` suffix.

## Remaining approved information

Final logo/brand assets and social-sharing image; verified email, phone and business details; pricing/inclusions; live vacancies/application links; reviewed deeper Learn guides; enquiry delivery integration and approved privacy wording. The enquiry form still only downloads a local brief. The estimator and future portal are not built.
