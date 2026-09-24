# iHire Global public website

## Purpose and positioning
- Pricing is quote-led, not fixed-package pricing. Scope the requirement, recruit and validate the candidate market, establish employment/infrastructure requirements, then provide an indicative quote for review before commitment. Never invent salary bands or public prices.
- The primary pricing CTA is "Get an Indicative Quote". Use "Find Talent" for general employer conversion and "How It Works" for supporting process guidance.
- iHire manages recruitment and employment infrastructure; customers manage daily tasks, priorities, training, business processes, performance and team integration.
- Real operating examples may be used factually. Never name customers without approval or fabricate performance results. Use Cases are operational examples, not testimonials or success claims.
- Build a credible, accessible, SEO-focused marketing website for managed offshore staffing.
- Primary customers are businesses in New Zealand and Australia.
- Customers choose their dedicated employee and manage daily work, priorities, training and performance. iHire handles recruitment, employment, payroll, equipment, connectivity and local support.
- Sri Lanka is the established primary staffing operation. Philippines, India and Fiji are role-dependent sourcing networks; never imply equivalent existing operational infrastructure.
- Do not invent prices, salaries, savings, customer names, testimonials, contact details, legal guarantees or performance statistics.

## Technology and design
- Preserve the approved Build 2 yellow/charcoal visual direction. Build 3 adds conversion content and form functionality, not a redesign.
- Astro + TypeScript; static-first, semantic HTML, reusable components, responsive CSS and minimal browser JavaScript.
- No unnecessary dependencies, UI frameworks, databases or backend services.
- Yellow is the primary iHire brand accent, paired with charcoal and warm neutrals. Use yellow for primary CTAs, selected sections, active states and process graphics with dark text for contrast.
- No eyebrow labels above headings, including cards and heroes. Do not reintroduce an eyebrow prop, data field or CSS class.
- Use strong editorial typography, generous whitespace and varied compositions: structured lists, open columns, process graphics and selected cards.
- Brand tokens and composition refinements are in `src/styles/brand.css`; shared baseline styles are in `src/styles/global.css`. Keep the text wordmark as a placeholder until approved assets exist.
- Preserve keyboard navigation, labelled forms, visible focus, progressive navigation and reduced-motion support.
- Keep employer and candidate journeys distinct.

## SEO and boundaries
- Preserve unique titles/descriptions, canonical URLs, meaningful headings, social metadata, internal links, sitemap and appropriate schema.
- Role pages need distinct responsibilities, use cases, skills and screening copy.
- Consider three customer discovery paths: Roles, Industries and Business Needs. Their hubs and detail pages should reinforce one another with selective, relevant internal links.
- Industry and business-need content lives in `src/data/discovery.ts`. Do not imply iHire has served every listed sector. Distinguish real operational experience from possible use cases; healthcare examples must remain non-clinical.
- Present `/resources/` as Learn: an expanding knowledge hub with useful grouped guidance, not a large collection of thin article pages.
- Future portal at `portal.ihireglobal.com` is separate. Do not build it unless requested or expose internal platform branding.
- Form currently downloads a local brief only. Never claim submission unless a real, verified endpoint is implemented.
- Keep approved contact details central in `src/data/business.ts`. Nulls are deliberate placeholders; do not invent email, telephone, office or availability information.
- Enquiry fields map to the typed browser-only draft in `src/lib/enquiry.ts`. Keep Client, Contact and Staffing Requirement data distinct. No endpoint, email service, analytics or browser persistence is currently authorised.
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
