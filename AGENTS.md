# iHire Global public website

## Purpose and positioning
- Pricing is quote-led, not fixed-package pricing. Owner-approved starting prices are Entry Level NZ$800/month + GST, Mid Level NZ$1,500/month + GST and Senior Level NZ$2,500/month + GST (confirmed 7 November 2026). Display these as “From” amounts, with hours and inclusions agreed in the quote. Scope the requirement, recruit and validate the candidate market, establish employment/infrastructure requirements, then provide an indicative quote for review before commitment. Never invent salary bands or public prices.
- The primary pricing CTA is "Get an Indicative Quote". Use "Find Talent" for general employer conversion and "How It Works" for supporting process guidance.
- iHire manages recruitment and employment infrastructure; customers manage daily tasks, priorities, training, business processes, performance and team integration.
- Real operating examples may be used factually. Never name customers without approval or fabricate performance results. Use Cases are operational examples, not testimonials or success claims.
- Build a credible, accessible, SEO-focused marketing website for managed offshore staffing.
- Primary customers are businesses in New Zealand and Australia.
- Customers choose their dedicated employee and manage daily work, priorities, training and performance. iHire handles recruitment, employment, payroll, equipment, connectivity and local support.
- Sri Lanka is the established primary staffing operation. Philippines, India and Fiji are role-dependent sourcing networks; never imply equivalent existing operational infrastructure.
- Do not invent prices, salaries, savings, customer names, testimonials, contact details, legal guarantees or performance statistics.

## Technology and design
- Build 4 refines the approved brand with selective curved corners and elevation; do not apply them to every section or turn every layout into cards.
- Prefer concise, scannable pages over long explanatory introductions. Preserve useful SEO detail with structured sections and progressive disclosure.
- Pricing leads with indicative commercial guidance before explanation. Approved figures belong in `src/data/conversion.ts`; nulls render quote-based wording without unfinished placeholders. Never invent ranges.
- Employer forms with many fields use progressive disclosure. Preserve labelled fields, per-step validation, Back/Next, focus management, a review step and honest email success/error feedback.
- The homepage and How It Works share the four-step primary journey in `ProcessJourney.astro`. Keep detailed recruitment/employment stages available below it.
- Use factual operational proof, never invented testimonials, customer logos or metrics. `CustomerProof.astro` remains unrendered until approved content is supplied.
- Imagery must support credibility and context. Current CSS/HTML workflow visuals are representative illustrations, not customer photos or actual software screenshots.
- Role cards use user-requested AI-generated representative workplace images, mapped in `src/data/roleImages.ts` with prompts in `ROLE-IMAGE-PROMPTS.md`. These depict fictional people, not iHire employees or customer endorsements. Preserve role-specific crops, lazy loading and local image hosting.
- Preserve the approved Build 2 yellow/charcoal visual direction. Build 3 adds conversion content and form functionality, not a redesign.
- Astro + TypeScript; static-first, semantic HTML, reusable components, responsive CSS and minimal browser JavaScript.
- No unnecessary dependencies, UI frameworks, databases or backend services.
- Yellow is the primary iHire brand accent, paired with charcoal and warm neutrals. Use yellow for primary CTAs, selected sections, active states and process graphics with dark text for contrast.
- No eyebrow labels above headings, including cards and heroes. Do not reintroduce an eyebrow prop, data field or CSS class.
- Use strong editorial typography, generous whitespace and varied compositions: structured lists, open columns, process graphics and selected cards.
- Brand tokens and composition refinements are in `src/styles/brand.css`; shared baseline styles are in `src/styles/global.css`. Use the approved supplied logos: `public/brand/ihire-logo.svg` in the header and `public/brand/ihire-logo-white.svg` directly on the charcoal footer. Preserve their proportions and colours.
- Preserve keyboard navigation, labelled forms, visible focus, progressive navigation and reduced-motion support.
- Keep employer and candidate journeys distinct.

## SEO and boundaries
- Preserve unique titles/descriptions, canonical URLs, meaningful headings, social metadata, internal links, sitemap and appropriate schema.
- Role pages need distinct responsibilities, use cases, skills and screening copy.
- Consider three customer discovery paths: Roles, Industries and Business Needs. Their hubs and detail pages should reinforce one another with selective, relevant internal links.
- Industry and business-need content lives in `src/data/discovery.ts`. Do not imply iHire has served every listed sector. Distinguish real operational experience from possible use cases; healthcare examples must remain non-clinical.
- Present `/resources/` as Learn: an expanding knowledge hub with useful grouped guidance, not a large collection of thin article pages.
- Future portal at `portal.ihireglobal.com` is separate. Do not build it unless requested or expose internal platform branding.
- The form sends to /api/enquiry.php on cPanel. Its fixed recipient is enquiries@ihireglobal.com, forwarding to Ashna and Rakesh. Preserve server-side validation, origin/token checks, rate limits and idempotency. Automated tests must never send real mail.
- Keep approved contact details central in `src/data/business.ts`. Nulls are deliberate placeholders; do not invent email, telephone, office or availability information.
- Enquiry fields map to the typed draft in `src/lib/enquiry.ts`. Keep Client, Contact and Staffing Requirement data distinct. The cPanel email endpoint and labelled delivery tests were authorised on 7 November 2026. Analytics and browser persistence remain out of scope.
- The future portal may be powered internally by iCentral but must be externally branded entirely as iHire Global. Do not expose the internal platform name in public UI or build integration without instruction.
- Resource and vacancy placeholders must remain clearly labelled and must not link to nonexistent content.

## Validation and delivery
- After changes run `npm.cmd run check`, `npm.cmd run build` and relevant `npm.cmd test` checks. Browser tests use installed Chrome and the production preview.
- Browser review is preferred over screenshots. After substantial visual changes, run the local site and inspect affected pages in a browser.
- Validate common desktop, tablet and mobile widths using browser tooling. Keep all internal links valid.
- Screenshots are secondary documentation/comparison artifacts; do not create excessive screenshots unless requested. Generated `artifacts/` output is ignored by Git and should not be deleted as routine cleanup.
- Completion reports should include the exact local browser URL and relevant route paths to review. Use `npm.cmd run dev` on this Windows machine; keep the server available for review when requested.
- Never deploy, configure DNS, commit or push unless explicitly instructed.
- Only modify files within this project directory.
