# iHire Global — Build 3

A static marketing website for managed offshore staffing, serving New Zealand and Australian businesses. Sri Lanka is the established staffing operation; the Philippines, India and Fiji are role-dependent sourcing networks.

## Stack and development

Astro, TypeScript, semantic HTML and responsive CSS. No UI framework, backend, database or third-party runtime scripts. Use Node 22.12+ (built locally with Node 24) and npm.

```sh
npm install
npm run dev
npm run check
npm run build
npm run preview
npm test
```

On Windows PowerShell with script execution restricted, use `npm.cmd` instead of `npm`. The development and preview servers default to `http://127.0.0.1:4321`. Production output is in `dist/`. Nothing is deployed by these commands. Astro configuration follows the [official setup documentation](https://docs.astro.build/en/install-and-setup/).

Browser checks use locally installed Google Chrome through Playwright. Tests cover built routes, metadata, internal links, fragments, responsive overflow, menu keyboard behaviour, form validation/download, runtime errors and automated WCAG checks. Build before running tests. Build 3 screenshots are saved to `artifacts/` with a `-build3` suffix at desktop, tablet and mobile widths, plus the requested key pages and form close-ups. Earlier build screenshots are preserved. Automated checks do not establish full WCAG conformance.

## Local browser preview

1. Install dependencies: `npm install`.
2. Start the development server: `npm run dev`.
3. Open the URL reported by Astro. This project explicitly binds to `http://127.0.0.1:4321/` (the loopback equivalent of `http://localhost:4321/`). If the port is busy, use the actual URL Astro reports.

On this Windows machine, use `npm.cmd install` and `npm.cmd run dev` if PowerShell blocks npm's script wrapper. Keep the terminal/server running while reviewing; stop it with Ctrl+C when finished. All site routes can be navigated normally, and edits update live. Browser review is preferred; screenshots are secondary documentation.

For the production build locally, run `npm run build`, then `npm run preview`. `dev` supports live development and review; `preview` serves the generated `dist/` build and requires rebuilding after changes. Stop the dev server before previewing on the same port. Neither command deploys the site.

Useful review routes: `/`, `/pricing/`, `/hire-talent/#enquiry`, `/use-cases/`, `/why-ihire/` and `/how-it-works/`.

The repository remote is `https://github.com/iTelcoRG/ihireglobal-website`, with `main` as the baseline branch. Build reports and source/configuration are versioned. Generated output, caches, environment files, test results and `artifacts/` screenshots are excluded; existing local screenshots remain on disk. No hosting, DNS or preview deployment is configured by this workflow.

## Project structure

- `src/pages/`: home, core pages via `[page].astro`, role/location/industry/business-need landing pages and static routes, distinct NZ/AU pages, custom 404.
- `src/components/`: shared navigation, footer, page hero, CTA, role and location cards, discovery lists, team graphic, Learn hub, contextual role connections, responsibility comparison, FAQ and enquiry form.
- `src/layouts/`: document metadata/schema and future article layout.
- `src/data/`: editorial role, location, process and FAQ data, plus industry/business-need entries in `discovery.ts`.
- `src/styles/global.css`: shared baseline styles; `src/styles/brand.css`: approved yellow brand design; `src/styles/conversion.css`: scoped quote, form and use-case additions.
- `src/data/business.ts`: approved contact configuration, CTA labels and enquiry option values. Contact values intentionally remain null pending approval.
- `src/lib/enquiry.ts`: typed Client/Contact/Staffing Requirement draft and local text-file formatter. No transport or integration layer exists.
- `src/content/resources/`: article authoring notes.
- `public/`: robots.txt and placeholder favicon.
- `tests/`: browser acceptance checks; `artifacts/`: review screenshots.

## Content changes

**New role:** add a unique entry to `src/data/roles.ts` with slug, title, short introduction, full introduction, responsibilities (`tasks`), use case, skills and screening. A new route and directory card are generated automatically. Select featured homepage roles in `src/pages/index.astro`.

**New location:** add an entry to `locations` in `src/data/site.ts`. Include operational status, introduction, headline, body, practical points and explicit availability/support limitations. The route and listing card are generated automatically. Do not imply unverified operational coverage.

**New industry or business need:** add an entry to `industries` or `needs` in `src/data/discovery.ts`. Supply distinct metadata, introduction, use cases, planning and scope limitations. Link role slugs and relevant entries from the other discovery path using `roles` and `related`. Routes and sitemap entries generate automatically. Distinguish proven operational experience from potential applications.

**New article:** create `src/pages/resources/your-slug.md` with frontmatter `layout: ../../layouts/ArticleLayout.astro`, `title`, `description`, and an ISO date string in `published`. Add the reviewed body and link to it from the appropriate topic in `src/components/LearnHub.astro`. The sitemap picks up static routes. No placeholder article URLs are published.

**Branding:** update CSS variables at the start of `src/styles/brand.css`. The palette is golden yellow (`#ffc62f`), charcoal (`#20282b`), pale yellow and warm white. Shared baseline variables remain in `global.css`. The previous live iHire site was reviewed as a colour reference, not a layout reference. The wordmark is a text placeholder, not a new logo. Inline schematic artwork uses no external images or fonts. Replace the favicon and add approved social imagery before launch.

## SEO

Every page supplies its own title and description. The shared layout emits canonical URLs, Open Graph/Twitter text metadata, Organization schema and breadcrumbs where appropriate. `astro.config.mjs` defines the intended public origin and sitemap integration. Review the origin before launch. Production robots allow crawling; protect any private preview at the hosting level rather than publishing it as an indexable duplicate. The 404 is noindex.

## Pricing and enquiry contract

Pricing is quote-led. Scope the role, recruit and validate the candidate market, establish employment/infrastructure requirements, and provide an indicative quote before the customer commits. Do not publish salary bands or fixed packages. Use **Get an Indicative Quote** for pricing CTAs and **Find Talent** for general employer CTAs.

The employer form downloads `ihire-staffing-brief.txt` locally. It captures name, company, work email, phone, country, job title, headcount, responsibilities, skills, experience, working hours, start timeframe, talent-location preference, equipment selections and notes. Required fields use native browser validation; required text also rejects whitespace-only values. Other answers can remain open for discussion. JavaScript must load before the download button is enabled; no-JavaScript users retain navigation and see an explanation.

Stable field names map into `StaffingEnquiry` in `src/lib/enquiry.ts`:

| Future entity | Draft data |
| --- | --- |
| Client | `client.companyName`, `client.country` (NZ/AU/OTHER) |
| Contact | `contact.name`, `contact.workEmail`, `contact.phone` |
| Staffing requirement / role | `requirement.roleTitle`, `headcount`, `responsibilities` |
| Skills and experience | `requiredSkills`, `requiredExperience` |
| Work arrangement | `workingHours`, `startTimeframe`, `preferredLocation` |
| Infrastructure and notes | `equipmentRequirements` array, `notes` |

The draft has `schemaVersion: 1` and `source: public-website`. Option values are stable identifiers; the downloaded text renders readable labels. A future approved email/API/CRM integration must add server-side validation, delivery/error handling and approved privacy wording. Do not treat browser validation as a security boundary. The current form makes no submission requests, stores no data in browser storage and never claims that a quote has been requested.

`/use-cases/` contains four factual, anonymised operating examples. Do not turn these into testimonials, add customer names, or invent outcomes.

## Build boundaries / launch work

- Enquiry form is deliberately frontend-only. Browser validation runs before a plain-text brief downloads. No personal data is submitted, persisted to browser storage or sent to analytics. With JavaScript disabled, download is disabled and the limitation is explained.
- Verify email, telephone, business/legal details and contact availability. None have been invented.
- Add an approved enquiry endpoint, consent/privacy wording and delivery/error handling before accepting enquiries. Privacy/legal copy requires business review.
- Pricing is role-specific/TBC. Confirm inclusions and setup charges. The estimator is only a labelled future placeholder.
- Detailed Learn guides and job listings are clearly marked as pending; there are no fabricated vacancies, testimonials, metrics or salaries.
- Confirm final branding and replace schematic visuals with genuine photography only if desired.
- Hosting, DNS and deployment remain unconfigured. The approved Build 3 baseline is tracked on `main` in the GitHub repository above.

## Future portal

Keep the public site static and independent of a future `portal.ihireglobal.com` application. A login URL can later be added to Header’s secondary actions. No inactive login link is shown and no portal is built. Keep the portal branded as iHire Global; internal platform branding must not appear on the public website.
