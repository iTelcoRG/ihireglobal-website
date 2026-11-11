# Build 4 — browser review

## Scope completed

Refined the approved Build 3 baseline (`72915a5`) without changing the yellow/charcoal brand, public route architecture, taxonomies or market positioning. The site remains static Astro with 43 public content routes and a custom 404. No production deployment, DNS change, backend, external delivery, commit or push was performed.

## Visual depth changes

- Softer button corners, more generous padding, restrained hover elevation and visible keyboard focus.
- More depth in the existing homepage team composition through layered panels and selective shadows; the core proposition and illustration remain intact.
- Charcoal trust strip, stronger yellow Business Needs section, varied role/industry treatments and a more prominent factual experience section.
- Inset yellow CTA panels, selective rounded containers and a raised iHire responsibility panel. Open editorial sections remain open rather than becoming cards.
- Tablet pricing uses wider horizontal examples; mobile visuals are compact and the form stacks naturally.

## Pricing

Page order: hero; three indicative scenarios; short qualifier; price influences; possible quote inclusions; three-part quote process with factual operational proof; pricing FAQ; quote CTA.

Scenarios cover administration/support, customer service/e-commerce, and specialist/technical/operations work. `src/data/conversion.ts` contains nullable `monthlyGuidance` values, all currently null. The public message is “Indicative pricing to be confirmed”. No dummy prices, fixed packages or fabricated savings appear. Approved values must state currency, hours, inclusions and assumptions before publication.

## Enquiry form

The form now appears immediately after the Hire Talent hero, with supporting content below it. It is also shared by Contact.

1. **About you:** name, company, work email, phone, country.
2. **What do you need?:** role, headcount, responsibilities, start timeframe, sourcing preference.
3. **Skills and setup:** required skills, experience, working hours, equipment/infrastructure checkboxes, explicit connectivity details, additional information.
4. **Review:** labelled summary of every field with human-readable option names and “Not specified” for unanswered optional fields.

Back/Next retain entries in the current form. Each forward step validates its fields, including whitespace-only text, email and integer headcount constraints. The heading receives focus on a step change; a polite status announces progress and `aria-current="step"` identifies the current step. Keyboard Enter advances through the flow. The review renders values as text, not HTML, and uses the same rows as the downloaded brief.

The final action is **Prepare My Staffing Brief**. It downloads `ihire-staffing-brief.txt`; nothing is sent to iHire, no quote is generated and no commitment is made. Entries are not persisted. Without JavaScript, fields and explanatory guidance remain visible and download is disabled. The typed Client / Contact / Requirement contract is retained, with additive `requirement.connectivityRequirements` for future approved integration.

## Use Cases

Four representative CSS/HTML compositions illustrate monitoring, product administration, telephone verification and an internal offshore team. Dark monitoring panels, a product workspace, a yellow call workflow and a team diagram provide different focal points. Alternating desktop layouts retain logical content order on mobile. Captions identify these as illustrative workflows, not customer photographs or actual software screenshots.

Existing factual context, customer ownership of the process, workflow detail and relevant role/industry/business-need links remain. No results, customers or guarantees were invented.

## How It Works

Homepage and How It Works share `ProcessJourney.astro`: describe requirements; find and screen candidates; interview and choose; employ, set up and support. The detailed 12-stage process remains in native, keyboard-accessible disclosures, with the existing fragment IDs preserved. Quote review before commitment remains explicit.

## Social Proof

Factual proof now receives stronger visual emphasis: iHire uses offshore operations, digital marketing and digital platforms staff; its established primary operation is Sri Lanka; operational experience includes monitoring, Shopify/product administration and telephone sales verification. Why iHire opens with the responsibility comparison and operational proof.

`OperationalProof.astro` reuses approved facts selectively. `CustomerProof.astro` is ready for approved logo assets, attributed quotes and outcomes, backed by empty collections in central data. It renders no public section until approved content exists.

## Accessibility

Visible labels, fieldsets, focus outlines, current-step state, polite announcements, native constraint validation and native details/summary interactions are retained. Reduced-motion preferences suppress button movement. Text contrast on the yellow Business Needs section was corrected during QA. Automated axe checks cover WCAG A/AA rules but do not establish complete WCAG conformance or substitute for assistive-technology user testing.

## Performance

No dependencies, image generation, remote fonts, stock photography or animation libraries added. Visuals use HTML/CSS and the existing SVG illustration. Production form JavaScript is 4,729 bytes and shared CSS is 39,801 bytes before compression. The app remains static-first; existing navigation JavaScript remains lightweight.

## Tests

- `npm.cmd run check`: 46 files, zero errors, warnings or hints.
- `npm.cmd run build`: 44 pages, sitemap generated; final build completed in 575 ms.
- `npm.cmd test`: **11 passed (1.1m)** on the final production build.
- Checks cover all 43 public routes, unique titles/descriptions, canonicals, internal links/fragments, sitemap and absence of eyebrow classes.
- Form tests cover step validation, focus, keyboard advancement, Back/Next persistence, review/edit, option labels, downloaded content, no POST or browser persistence, no-JavaScript behavior, and safe rendering of HTML-like input.
- Responsive/overflow checks use 1440, 768, 390 and 320 px widths. Axe checks include the key employer pages and the completed review step at all four widths.
- Native process disclosures, four-step counts, empty customer proof and honest price placeholders are tested.
- Git whitespace validation passes. An early accessibility run identified yellow-section contrast; it was corrected before final validation.

The suite no longer creates a large screenshot set on each run. Historical Build 2/3 screenshots remain untouched on disk. Interactive Chrome review was used for the homepage, Pricing, Hire Talent, Use Cases, How It Works and Why iHire, including desktop, tablet and mobile layouts.

## Browser review

Development command: `npm.cmd run dev -- --port 4322` (server left running).

- http://127.0.0.1:4322/
- http://127.0.0.1:4322/pricing/
- http://127.0.0.1:4322/hire-talent/#enquiry
- http://127.0.0.1:4322/use-cases/
- http://127.0.0.1:4322/how-it-works/
- http://127.0.0.1:4322/why-ihire/

Port 4321 remains used by the production preview/test workflow. The development server was restarted once to clear a stale import after a new stylesheet was added.

## Outstanding assets

- Approved contextual photography or final artwork to replace representative visual slots, if desired.
- Approved client logos with publication permission.
- Approved testimonials/quotes and substantiated outcomes.
- Approved indicative monthly price ranges, currency and scope assumptions.
- Live enquiry destination, delivery/error handling and approved privacy wording.
- Approved contact details and final brand/logo assets.
- Live vacancies and verified candidate application destinations.

## Git status and changed files

Changes remain uncommitted on `main` for browser review. Build 3 remains the GitHub baseline. No source changes are staged.

`git diff --stat`: 10 tracked files changed, 214 insertions and 86 deletions, plus seven new untracked files listed below. `git diff --check` passes. All 43 public routes also returned HTTP 200 from the running development server.

Modified: `AGENTS.md`, `README.md`, `src/components/ContactForm.astro`, `src/components/PricingContent.astro`, `src/layouts/Layout.astro`, `src/lib/enquiry.ts`, `src/pages/[page].astro`, `src/pages/index.astro`, `src/pages/use-cases.astro`, `tests/site.spec.ts`.

Added: this report; `src/components/CaseVisual.astro`, `CustomerProof.astro`, `OperationalProof.astro`, `ProcessJourney.astro`; `src/data/conversion.ts`; `src/styles/polish.css`.

The diff replaces the single-page enquiry interaction, reorders Pricing, shares the short process, surfaces factual proof, adds representative visuals and layers scoped polish over the approved brand. README and AGENTS now document these patterns and how to add approved pricing/proof later.
