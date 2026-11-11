# iHire Global — Build 4 review

A static marketing website for managed offshore staffing, serving New Zealand and Australian businesses. Sri Lanka is the established staffing operation; the Philippines, India and Fiji are role-dependent sourcing networks.

## Stack and development

Astro, TypeScript, semantic HTML and responsive CSS. No UI framework or database; the enquiry form uses a small PHP email endpoint. No third-party browser runtime scripts. Use Node 22.12+ (built locally with Node 24) and npm.

```sh
npm install
npm run dev
npm run check
npm run build
npm run preview
npm test
```

On Windows PowerShell with script execution restricted, use `npm.cmd` instead of `npm`. The development and preview servers default to `http://127.0.0.1:4321`. Production output is in `dist/`. Nothing is deployed by these commands. Astro configuration follows the [official setup documentation](https://docs.astro.build/en/install-and-setup/).

Browser checks use locally installed Google Chrome through Playwright. Tests cover built routes, metadata, internal links, fragments, responsive overflow, menu keyboard behaviour, guided form navigation, validation/review/email feedback, runtime errors and automated WCAG checks. Build before running tests. Browser review is primary; tests no longer generate a large screenshot set on every run. Earlier screenshots remain in `artifacts/`. Automated checks do not establish full WCAG conformance.

## Local browser preview

1. Install dependencies: `npm install`.
2. Start the development server: `npm run dev`.
3. Open the URL reported by Astro. This project explicitly binds to `http://127.0.0.1:4321/` (the loopback equivalent of `http://localhost:4321/`). If the port is busy, use the actual URL Astro reports.

On this Windows machine, use `npm.cmd install` and `npm.cmd run dev` if PowerShell blocks npm's script wrapper. Keep the terminal/server running while reviewing; stop it with Ctrl+C when finished. All site routes can be navigated normally, and edits update live. Browser review is preferred; screenshots are secondary documentation.

For the production build locally, run `npm run build`, then `npm run preview`. `dev` supports live development and review; `preview` serves the generated `dist/` build and requires rebuilding after changes. Stop the dev server before previewing on the same port. Neither command deploys the site.

Useful review routes: `/`, `/pricing/`, `/hire-talent/#enquiry`, `/use-cases/`, `/why-ihire/` and `/how-it-works/`.

The repository remote is `https://github.com/iTelcoRG/ihireglobal-website`, with `main` as the baseline branch. Build reports and source/configuration are versioned. Generated output, caches, environment files, test results and `artifacts/` screenshots are excluded; existing local screenshots remain on disk. No hosting, DNS or preview deployment is configured by this workflow. Publishing is a separate manual upload to the cPanel document root; see Launch status.

## Project structure

- `src/pages/`: home, core pages via `[page].astro`, role/location/industry/business-need landing pages and static routes, distinct NZ/AU pages, custom 404.
- `src/components/`: shared navigation, footer, page hero, CTA, role and location cards, discovery lists, team graphic, Learn hub, contextual role connections, responsibility comparison, FAQ and enquiry form.
- `src/layouts/`: document metadata/schema and future article layout.
- `src/data/`: editorial role, location, process and FAQ data, plus industry/business-need entries in `discovery.ts`.
- `src/styles/global.css`: shared baseline styles; `src/styles/brand.css`: approved yellow brand design; `src/styles/conversion.css`: scoped quote, form and use-case additions.
- `src/data/business.ts`: approved contact configuration, CTA labels and enquiry option values. The enquiry email is approved; optional telephone, address and availability remain unset.
- `src/lib/enquiry.ts`: typed Client/Contact/Staffing Requirement draft and local text-file formatter. Email transport is implemented by public/api/enquiry.php on cPanel.
- `src/content/resources/`: article authoring notes.
- `public/`: robots.txt, approved favicons, local imagery and the PHP endpoint.
- `tests/`: browser acceptance checks; `artifacts/`: review screenshots.

## Content changes

Role cards use local AI-generated workplace images in `public/images/roles/`, mapped by slug in `src/data/roleImages.ts`. Generation prompts are in `ROLE-IMAGE-PROMPTS.md`. These illustrate roles with fictional people rather than portraying actual iHire staff. Keep their descriptive alt text, lazy loading and role-specific crop positions when changing assets.

Build 4 commercial content lives in `src/data/conversion.ts`: three example staffing scenarios with deliberately null pricing, the shared four-step process, factual operational proof and empty approved customer proof collections. Unpriced examples display “Quoted for your requirements”. Add monthly guidance only after approval, including currency, hours, inclusions and assumptions. `CustomerProof.astro` can render approved logos, attributed quotes and outcomes; no empty section renders publicly.

`CaseVisual.astro` contains four lightweight CSS/HTML representative workflows. Replace these slots with approved contextual photography or artwork when available; never present them as customer photos or real application screenshots. `src/styles/polish.css` contains the Build 4 refinements.

The employer brief uses four steps: About you; What do you need?; Skills and setup; Review. Entries stay in the current form while navigating; reloading does not restore them. Each step validates before continuing, and the review shows the complete staffing requirement. The final action is **Send Enquiry**, which emails enquiries@ihireglobal.com through the cPanel PHP handler. Connectivity details map to `requirement.connectivityRequirements` in the typed draft.

**New role:** add a unique entry to `src/data/roles.ts` with slug, title, short introduction, full introduction, responsibilities (`tasks`), use case, skills and screening. A new route and directory card are generated automatically. Select featured homepage roles in `src/pages/index.astro`.

**New location:** add an entry to `locations` in `src/data/site.ts`. Include operational status, introduction, headline, body, practical points and explicit availability/support limitations. The route and listing card are generated automatically. Do not imply unverified operational coverage.

**New industry or business need:** add an entry to `industries` or `needs` in `src/data/discovery.ts`. Supply distinct metadata, introduction, use cases, planning and scope limitations. Link role slugs and relevant entries from the other discovery path using `roles` and `related`. Routes and sitemap entries generate automatically. Distinguish proven operational experience from potential applications.

**New article:** create `src/pages/resources/your-slug.md` with frontmatter `layout: ../../layouts/ArticleLayout.astro`, `title`, `description`, and an ISO date string in `published`. Add the reviewed body and link to it from the appropriate topic in `src/components/LearnHub.astro`. The sitemap picks up static routes. No placeholder article URLs are published.

**Branding:** update CSS variables at the start of `src/styles/brand.css`. The palette is golden yellow (`#ffc62f`), charcoal (`#20282b`), pale yellow and warm white. Shared baseline variables remain in `global.css`. The previous live iHire site was reviewed as a colour reference, not a layout reference. The header uses the approved SVG at `public/brand/ihire-logo.svg`; the footer uses `public/brand/ihire-logo-white.svg` directly on charcoal. Both supplied assets are unchanged. Inline schematic artwork uses no external images or fonts. Approved favicons and a branded 1200 × 630 social-sharing image are included.

## SEO

Every page supplies its own title and description. The shared layout emits canonical URLs, Open Graph/Twitter text metadata, Organization schema and breadcrumbs where appropriate. `astro.config.mjs` sets the public origin to `https://www.ihireglobal.com` and the sitemap integration. Production robots allow crawling. `https://mail.ihireglobal.com/` still responds with `X-Robots-Tag: noindex, nofollow`. The 404 is noindex.

## Pricing and enquiry contract

Pricing is quote-led. Scope the role, recruit and validate the candidate market, establish employment/infrastructure requirements, and provide an indicative quote before the customer commits. Do not publish salary bands or fixed packages. Use **Get an Indicative Quote** for pricing CTAs and **Find Talent** for general employer CTAs.

The employer form emails the staffing requirement to enquiries@ihireglobal.com. It captures name, company, work email, phone, country, job title, headcount, responsibilities, skills, experience, working hours, start timeframe, talent-location preference, equipment selections and notes. Required fields use native browser validation; required text also rejects whitespace-only values. Other answers can remain open for discussion. JavaScript must load before submission is enabled; no-JavaScript users retain navigation and can use the published email address.

Stable field names map into `StaffingEnquiry` in `src/lib/enquiry.ts`:

| Future entity | Draft data |
| --- | --- |
| Client | `client.companyName`, `client.country` (NZ/AU/OTHER) |
| Contact | `contact.name`, `contact.workEmail`, `contact.phone` |
| Staffing requirement / role | `requirement.roleTitle`, `headcount`, `responsibilities` |
| Skills and experience | `requiredSkills`, `requiredExperience` |
| Work arrangement | `workingHours`, `startTimeframe`, `preferredLocation` |
| Infrastructure and notes | `equipmentRequirements` array, `notes` |

The draft has schemaVersion 1 and source public-website. Option values are stable identifiers. The form sends to the PHP endpoint, which validates fields before delivery; answers are not saved in browser storage. Success and failure are reported honestly, with duplicate-send protection for retries.

`/use-cases/` contains four factual, anonymised operating examples. Do not turn these into testimonials, add customer names, or invent outcomes.

## Build boundaries / launch work

- Enquiry form submits to the fixed cPanel email handler. Browser and server validation run before delivery. Details are emailed, not persisted in browser storage or sent to analytics. No automatic customer confirmation email is enabled.
- The approved enquiry email is enquiries@ihireglobal.com. Telephone, business address and contact availability remain unset. None have been invented.
- Enquiry endpoint and privacy links are implemented and live. Remaining privacy business review is recorded in LAUNCH.md.
- Pricing is quote-led; no fixed prices or unfinished estimator are published.
- Learn links to existing material. Jobs is informational; the owner deferred its backend and no applications are collected.
- Confirm final branding and replace schematic visuals with genuine photography only if desired.
- The full site is published on the Itronics cPanel host. LAUNCH.md covers the 7 November 2026 cutover, HTTPS, redirects and rollback notes. `npm` scripts do not deploy.

## Future portal

Keep the public site static and independent of a future `portal.ihireglobal.com` application. A login URL can later be added to Header’s secondary actions. No inactive login link is shown and no portal is built. Keep the portal branded as iHire Global; internal platform branding must not appear on the public website.

Brand assets updated 26 September 2026: supplied black logo with blue dot on light surfaces, white logo on the footer (exported background rectangles removed for transparency). `favicon-black.png` is the default/light-browser icon and `favicon-white.png` is selected for dark browser themes.


## Enquiry delivery — verified 7 November 2026

- Recipient: enquiries@ihireglobal.com, with two cPanel forwarders to ashna@ihireglobal.com and rakesh@ihireglobal.com. Rakesh also retains his existing forwarding to rakesh@itelco.nz.
- PHP endpoint: public/api/enquiry.php, installed at /home/ihireglo/public_html/api/enquiry.php alongside api/.htaccess. No new mailbox, passwords or third-party mail service are required.
- The handler uses cPanel's local mail transport with a fixed From/envelope sender and recipient. Only the validated enquirer's address is placed in Reply-To. It sends all staffing fields in plain text with a reference number.
- Protections: signed two-hour form token, same-origin checks (no CORS), bounded payload, server-side field and option validation, honeypot, five attempts/IP/hour and 50 total/hour, duplicate-send protection. Only HMAC-hashed IPs, timestamps, references and token hashes are kept in private /home/ihireglo/.ihire-enquiry/state.json. No enquiry body is stored there. Mail copies and normal hosting mail logs remain on the mail system.
- A successful API response means the mail server accepted the message, not that the recipient read it. Failure preserves the form answers; retrying the same token avoids duplicate mail after a lost response.
- Real browser test reference IH-20261107-E40C5224 / mail ID 1xPYJC-00000007zs5-2usu: cPanel recorded successful delivery to both iHire mailboxes and acceptance by the itelco.nz mail server. Rakesh confirmed both people received it.
- Local connected preview (PowerShell): set $env:IHIRE_ENQUIRY_PREVIEW='1', then npm.cmd run dev -- --port 4323. This proxies only /api/enquiry.php over verified HTTPS to mail.ihireglobal.com. Without the flag, a static preview cannot execute PHP; automated browser tests mock the endpoint and never send real emails.
- Public website, checked 11 November 2026: `https://www.ihireglobal.com/` returns HTTP 200 from Apache. The title is “Offshore staffing for NZ & Australian businesses | iHire Global”. Last-Modified is 7 November 2026, 10:15:02 GMT. `https://ihireglobal.com/` returns HTTP 308 to that www URL, and plain HTTP does the same. The certificate is Let’s Encrypt, covers ihireglobal.com, www.ihireglobal.com and mail.ihireglobal.com, and expires 5 February 2027, 07:23:40 GMT. Google (8.8.8.8) and Cloudflare (1.1.1.1) resolve the apex to 210.48.76.58 and www to a CNAME of ihireglobal.com. Nameservers remain ns0.wixdns.net and ns1.wixdns.net. MX is priority 0 mail.ihireglobal.com. The HTML is the Astro site, with its header, footer and that title. The Wix Premium plan was cancelled on 7 November 2026. Publishing was a manual upload to the cPanel document root, recorded in LAUNCH.md. This repository has no deploy script or workflow. A later source commit is not assumed to be what the server is serving.
- Checks: npm.cmd run check; npm.cmd run build; npm.cmd test; node tests/enquiry-server.mjs. The PHP integration test uses a local fake SMTP server on Windows and sends no external mail.
- Still open: privacy business review, recorded in LAUNCH.md, and Search Console submission of /sitemap-index.xml, which is not recorded as done. The sitemap URL itself returned HTTP 200 on 11 November 2026. Customer autoresponder is optional. No promised response time has been invented.


## Privacy policy draft — 7 November 2026

- Added /privacy/ and footer/form links. The form link opens a new tab to preserve unsent answers; no consent or marketing checkbox was introduced.
- Scope: this rebuilt website and employer enquiries. It does not replace a candidate, employee or service-delivery privacy notice.
- Confirmed by owner: iTelco Limited in New Zealand enters into customer contracts under iHire Global branding and owns the Sri Lankan iHire Global company, which employs/pays the Sri Lankan team. The customer website policy therefore names iTelco Limited and explains relevant information sharing with Sri Lanka. Confirm the Sri Lankan company’s exact registered name when preparing a separate candidate/employee notice.
- The published policy names iTelco Limited operating under the iHire Global brand and describes known email handling. No retention period or blanket legal-compliance guarantee has been invented. Provider processing locations and the practical deletion process remain open.
- Reference guidance: https://www.privacy.org.nz/responsibilities/collecting/ and https://www.oaic.gov.au/privacy/australian-privacy-principles/read-the-australian-privacy-principles
- The privacy page is published with the site. Rechecked at https://www.ihireglobal.com/privacy/ on 11 November 2026 (HTTP 200, Last-Modified 7 November 2026, 10:15:02 GMT).


## Launch status — rechecked 11 November 2026

See LAUNCH.md for the checklist, legacy URL map, unresolved business facts and rollback notes. Public checks the same day: an unknown path returns HTTP 404; `/find-talent` returns 301 to `/hire-talent/`; `/api/enquiry.php` returns HTTP 200 for GET, and HEAD returns 405 with `Allow: GET, POST`. `public/.htaccess` and the PHP endpoint are written to produce those responses. The server copies were not re-downloaded for a byte comparison. `npm run dev`, `build` and `preview` do not deploy. Run `node scripts/verify-release.mjs` after building. A local release ZIP and checksum are generated in `artifacts/releases`; these contain deployment files only. Social-sharing metadata uses `public/images/social-share.jpg`.

Pricing update, 7 November 2026: owner confirmed the existing website’s starting prices remain current and are NZD: Entry Level from NZ$800/month + GST, Mid Level from NZ$1,500/month + GST, Senior Level from NZ$2,500/month + GST. These replace the unpriced scenarios; hours and inclusions remain quote-specific.
