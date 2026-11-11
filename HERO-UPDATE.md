# Homepage hero update — 25 September 2026

Preview: http://127.0.0.1:4322/

Only the right-side homepage hero visual was revised. Existing left-side copy, headline, CTAs and all unrelated Build 4 work are preserved. Changes are uncommitted.

## Changed files in this update
- `src/components/TeamGraphic.astro`: light-to-dark yellow gradient, removed decorative rings/lines and floating spark, slightly tilted (3 degrees clockwise) split portrait/copy card, retained business and support cards; scoped responsive styles and accessible summary.
- `public/images/hero-team-member.webp`: local representative AI-generated portrait, 640 × 800, 31,484 bytes. This is illustrative imagery, not an actual employee photo or customer endorsement.
- `HERO-UPDATE.md`: implementation, asset provenance and validation record.

## Validation
- `npm.cmd run check`: 46 files, zero errors/warnings/hints.
- `npm.cmd run build`: 44 pages built successfully.
- `npm.cmd test`: all 11 existing tests passed, including accessibility, runtime errors, links, sitemap, forms and overflow checks at 1440, 768, 390 and 320 CSS pixels.
- Live Chrome visual review: desktop, tablet and mobile layouts; portrait loaded, gradient and tilt rendered, support cards readable, no horizontal overflow.
- `git diff --check`: passed.
- Existing development server at port 4322 remains available for review. Nothing committed, pushed or deployed.

## Image provenance
Generated using the built-in imagegen tool, with the prior conversation's supplied mockup as a visual reference. Optimised to WebP locally. The original generated image remains in the Codex generated_images folder.

Final prompt:

> Use case: photorealistic-natural. Asset type: portrait photo for iHire Global homepage team-member card. Input image is a reference website mockup only. Generate ONLY the photographic portrait seen in the mockup's middle card: friendly professional South Asian woman with shoulder length dark hair, dark knit top, seated at a laptop, softly lit neutral office with a green plant. Portrait framing upper body, natural smile, looking at camera; laptop visible along bottom. Match the reference photo's calm credible natural appearance. No webpage, no card, no UI, no typography, no lettering on walls, no logos, no watermark. Portrait 4:5 composition. Save the resulting image and return its local file path.

## Mockup detail correction
Restored the curved direction connector, yellow heading accent and Remote ready / Long-term support / Real impact icon labels. Saturated the gradient to #ffdf38 → #ffd02f → #f3b719. Retained the existing local representative portrait. Type check, build and all 11 tests passed after restoring the details; the final colour adjustment also passed type/build and responsive accessibility checks. Reviewed in Chrome at desktop, tablet and mobile sizes.
