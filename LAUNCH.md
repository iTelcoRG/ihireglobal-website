# iHire Global launch checklist

## Current status — 11 November 2026

The public site is live on the Itronics cPanel host (Apache). Checked from this environment on 11 November 2026:

- `https://www.ihireglobal.com/` returned HTTP 200. Server: Apache. Title: “Offshore staffing for NZ & Australian businesses | iHire Global”. Last-Modified: 7 November 2026, 10:15:02 GMT. The HTML is this Astro site.
- `https://ihireglobal.com/` returned HTTP 308 to `https://www.ihireglobal.com/`. `http://ihireglobal.com/` and `http://www.ihireglobal.com/` did the same. Certificate validation succeeded. The certificate is Let’s Encrypt, subject `CN=ihireglobal.com`, with SAN DNS names ihireglobal.com, www.ihireglobal.com and mail.ihireglobal.com. notBefore 7 November 2026, 07:23:41 GMT. notAfter 5 February 2027, 07:23:40 GMT.
- Google (8.8.8.8) and Cloudflare (1.1.1.1) resolve ihireglobal.com to 210.48.76.58. www is a CNAME to ihireglobal.com and then the same address. Nameservers remain ns0.wixdns.net and ns1.wixdns.net. MX is priority 0 mail.ihireglobal.com, and that name resolves to 210.48.76.58. SPF, DKIM and DMARC were not re-queried.
- `/privacy/` and `/sitemap-index.xml` returned HTTP 200. An unknown path returned HTTP 404. `/find-talent` returned 301 to `https://www.ihireglobal.com/hire-talent/`. `/api/enquiry.php` returned HTTP 200 for GET; HEAD returned 405 with `Allow: GET, POST`. No enquiry was submitted during this recheck.
- `https://mail.ihireglobal.com/` returned HTTP 200 with `X-Robots-Tag: noindex, nofollow`.
- The Wix Premium plan was cancelled on 7 November 2026. The public hostname serves the cPanel site.
- This repository has no deploy script and no GitHub Actions workflow. The 7 November log below records a manual upload into `/home/ihireglo/public_html`. Homepage Last-Modified is 7 November 2026, so later source commits are not assumed to be on the server.
- Still open: the privacy business review in the next sections (address/identification, provider processing locations, practical deletion), and Search Console submission of `/sitemap-index.xml`. Customer autoresponder remains optional and is not enabled.

Sections dated 7 November 2026 are the working log from that day. Where an early entry described the site as still on Wix, unpublished, or waiting on DNS, that was the position at that point in the day. The checklist and rollback notes below are updated to this 11 November position.

## Prepared locally
- Static site, email enquiry endpoint, privacy notice, owner-approved starting prices, SmartRecruiters-linked Jobs page and Learn hub.
- Customer enquiry email delivered to Ashna and Rakesh and receipt confirmed on 7 November.
- Main canonical URL: https://www.ihireglobal.com/.
- public/.htaccess contains legacy redirects, HTTPS/www normalisation, no directory listing and the branded 404.
- Social sharing image and metadata included.
- Four owner-supplied customer testimonials replace all draft reviews. No placeholder mode remains.
- Contact page has chat and staffing-quote options. Mobile homepage role and industry grids are expandable.
- Owner-confirmed starting monthly prices (7 November): Entry NZ$800, Mid NZ$1,500, Senior NZ$2,500, plus GST. Cards state “All-inclusive: salary and management”. Hours and equipment/infrastructure inclusions are agreed in the quote.
- No Jobs backend, CV collection, analytics or automatic customer email acknowledgement.

## Business review
- Owner requested no business address in the privacy notice. Address remains omitted. The privacy page is live; the identification/address point is still open in the final privacy review. Relevant guidance: https://www.privacy.org.nz/privacy-principles/3/.
- Owner confirmed enquiries are retained in business email; the policy reflects that. No fixed retention period has been invented. Provider processing locations and the practical deletion process remain part of final privacy review.
- Candidate registration uses the owner-confirmed SmartRecruiters expression-of-interest link on /jobs/, checked active on 7 November 2026. XpressJobs has no current vacancies; future listings will use external links. The Jobs backend remains deferred. Legacy /find-job and /registerwithus redirect to /jobs/.
- /airpropty is an existing named customer's recruitment-request form; redirect to the general staffing enquiry form without publishing that customer's name in new content.
- No phone/hours/address are displayed because none were approved.

## Publishing checklist
Done on 7 November 2026, and still matching the 11 November public recheck where noted:

1. Done. The Wix website backup and DNS zone were saved before cutover; details are in the preflight section. The Wix Premium plan was cancelled on 7 November 2026.
2. Done. The full cPanel backup is recorded in the preflight section. It stays outside the web root and is not for publication.
3. Done. The Let’s Encrypt certificate covers ihireglobal.com, www.ihireglobal.com and mail.ihireglobal.com, and expires 5 February 2027, 07:23:40 GMT. Rechecked from the public internet on 11 November 2026 with certificate validation left on.
4. Done for launch. The 7 November record set PHP 8.3 and confirmed mail delivery to Ashna and Rakesh. On 11 November, `/api/enquiry.php` executed: GET returned 200 and HEAD returned 405 with `Allow: GET, POST`. This recheck did not send mail or re-read `/home/ihireglo/.ihire-enquiry`.
5. Done before cutover, per the log below. On 11 November the public host returned 308 from the apex to www, 404 for an unknown path, and 301 from `/find-talent` to `/hire-talent/`. No redirect loop was observed on those requests.
6. Done. The log records the release upload into `/home/ihireglo/public_html`, then a same-day mobile-fix upload. Homepage Last-Modified is 7 November 2026, 10:15:02 GMT. Upload only the contents of a validated release ZIP. Never upload the repository, node_modules, tests, .git, source files, logs, or private enquiry state. Preserve `/home/ihireglo/.ihire-enquiry`.
7. Done for the website address records. On 11 November, Google and Cloudflare still show nameservers ns0.wixdns.net and ns1.wixdns.net, apex A 210.48.76.58, and www CNAME ihireglobal.com. MX was observed as priority 0 mail.ihireglobal.com. SPF, DKIM and DMARC were not re-queried. Leave mail records and nameservers unchanged during a routine website update.
8. Public HTTPS on the apex and www was rechecked on 11 November 2026, along with the sitemap, privacy page, 404 and the `/find-talent` redirect. Both labelled form deliveries were confirmed by Ashna and Rakesh on 7 November. This docs update did not submit another enquiry, walk every page, or retest the mobile menu. Reply-to behaviour was part of the 7 November delivery check.
9. Still open. Submitting `/sitemap-index.xml` in Search Console is not recorded as done. The sitemap URL returned HTTP 200 on 11 November 2026.
10. The 7 November release checksums and upload notes are saved in this file. No server-side checksum was re-read on 11 November. Commit and push only when separately authorised.

## Rollback
- The public website is the cPanel/Apache site. The Wix Premium plan was cancelled on 7 November 2026, so Wix is not a confirmed way to put the old site back.
- Website DNS still uses the Wix nameservers. The pre-cutover A and CNAME values are in the saved zone export. Restoring those values would send the hostnames to the former Wix addresses. With the Premium plan cancelled, that does not restore a verified website.
- If the public site fails, restore the saved cPanel web root and `.htaccess`. Leave mail records unchanged. DNS changes take time to propagate. Preserve private enquiry state and mailbox data. Keep enquiries@ihireglobal.com available.
- Keep the cPanel backup and the saved DNS export.

## Legacy URL map
Source: https://www.ihireglobal.com/pages-sitemap.xml plus live page titles/headings checked 7 November 2026.
| Old path | New destination |
| --- | --- |
| /find-talent | /hire-talent/ |
| /about-1 | /about/ |
| /services-4 | /pricing/ |
| /general-4 | /hire-talent/#faqs |
| /services-4-1 | /how-it-works/ |
| /find-job, /registerwithus | /jobs/ (SmartRecruiters registration link) |
| /blog | /resources/ |
| /airpropty | /hire-talent/ |
| /contact-8 | /contact/ |
| /sitemap.xml, /pages-sitemap.xml | /sitemap-index.xml |
| /pricing | /pricing/ (Apache directory slash) |
| / | / |
| /blank, /s-projects-side-by-side | 404 (empty/demo content; no invented testimonial replacement) |

## Validation and packaging
Run npm.cmd run check, npm.cmd run build, npm.cmd test and node tests/enquiry-server.mjs.
Then run node scripts/verify-release.mjs.
Run powershell -ExecutionPolicy Bypass -File scripts/package-release.ps1 to create the release ZIP from dist, including hidden .htaccess files, with a SHA256 sidecar. This only writes local artifacts and does not deploy.
Local connected review: http://127.0.0.1:4323/.

Final local checks (7 November 2026): type/template check passed with zero errors or warnings; 45-page production build passed; all 19 browser tests passed, including links/anchors, metadata, desktop/tablet/mobile accessibility and layout, both enquiry journeys, testimonial scrolling, mobile browsing disclosures and pricing imagery. PHP integration passed using fake SMTP only (validation, origin/token checks, honeypot, fixed recipient, HTML/text email, duplicate prevention, transport failure and rate limit). Release verification passed across 86 files, including a check against draft testimonials. No live emails were sent during this final run. Apache/cPanel hosting checks, backups, certificates and live-domain delivery were still ahead of this local run. They were completed later the same day, as recorded below.

Prepared release: artifacts/releases/ihire-website-20261107-075344-utc.zip (1,738,359 bytes).
SHA256: 594586B76BCC0A7A8EFAD33CC05574A75891DE0A05522F9F40EAA7D746613713.
Status when this package was created (7 November 2026, 07:53 UTC): local release only. The site was uploaded, and the website DNS was switched, later the same day.

## cPanel and DNS preflight — 7 November 2026
- Full cPanel backup generated in /home/ihireglo/backup-11.7.2026_20-56-07_ihireglo.tar.gz and downloaded. Local copy: artifacts/backups/2026-11-07/backup-11.7.2026_20-56-07_ihireglo.tar.gz (57,076,678 bytes). SHA256: 410813C5F79B59CC10DD620CCCB37F012EB78F8C804F8204482609A074B19245.
- Archive listing verified: public_html, root and API .htaccess, enquiry.php, private .ihire-enquiry state and local DNS zone included. Do not publish this backup; it contains private account data. Full account restores require hosting support/WHM, not the cPanel partial-restore interface.
- Authoritative nameservers were ns0.wixdns.net and ns1.wixdns.net, despite third-party domain registration. They were still the nameservers on 11 November 2026. Wix BIND export saved at artifacts/backups/2026-11-07/ihireglobal.com.zone. SHA256: E685F4602E5DFDCE380DB3DE468960A065B054F3AE4CE213C6C467DD76DC9095. The website address records at this preflight still pointed at Wix.
- Pre-cutover root A records: 185.230.63.107, 185.230.63.186, 185.230.63.171; www CNAME cdn3.wixdns.net; TTL 3600. MX priority 0 mail.ihireglobal.com; mail A 210.48.76.58. The Wix export contained no TXT/SRV records. cPanel's local zone differed and was not authoritative; do not replace the DNS host's zone with it.
- Destination cPanel IP 210.48.76.58; document root /home/ihireglo/public_html. cPanel reports system PHP 8.3, but ihireglobal.com explicitly PHP 7.4. No PHP override exists in the backed-up root .htaccess (blank); API .htaccess only contains Options -Indexes. Main domain PHP setting needs correction/verification before release.
- Existing https://mail.ihireglobal.com/api/enquiry.php GET returns 200; HEAD correctly returns 405 with Allow GET, POST. No test mail sent.
- Preflight finding, resolved later the same day: cPanel SSL Status then reported ihireglobal.com and www.ihireglobal.com were not covered by the installed certificate. Only mail.ihireglobal.com was covered, expiring 2 January 2027. Direct curl --resolve checks against 210.48.76.58 failed hostname validation for both website hostnames. No certificate validation bypass was used.
- DNS was not switched during this preflight. The switch waited until PHP, the website certificate and the Apache release checks were in place, and is recorded further down.
- Wix design backup created and verified: iHire BU 071126. That Wix copy was a backup. Wix duplication excludes some business data (contacts, orders, invoices and third-party app settings). At this point the original Wix site was still the public site and was left in place. The Wix Premium plan was cancelled on 7 November 2026.

## cPanel preparation update — 7 November 2026
- Applied PHP 8.3 (ea-php83) in cPanel MultiPHP Manager; success and domain row verified.
- Existing secure mail-host enquiry endpoint returned HTTP 200 after the upgrade.
- Preserved generated PHP handler in artifacts/backups/2026-11-07/htaccess-php83.txt.
- Prepared artifacts/releases/ihire-cpanel-test-20261107.zip from the verified release, merging the PHP handler and adding noindex/nofollow headers for the mail-host preview only.
- Test ZIP upload has NOT completed: Chrome file chooser supplied no file. Asked owner to enable extension access to file URLs.
- SSL wizard domain validation failed because ihireglobal.com still resolves to Wix; DNS validation also failed. No new certificate was installed. Existing mail certificate retained.
- Requested permission to contact Itronics for DNS-validated root/www SSL before cutover, retaining mail coverage. No support message sent yet.
- At this point, public DNS still served the Wix site. The cPanel page upload and the website certificate were still ahead; both are recorded in the following sections.

## SSL resolved and cPanel release tested — 7 November 2026
- Owner approved Let’s Encrypt Subscriber Agreement v1.8 and certificate request using enquiries@ihireglobal.com. Issued via Posh-ACME 4.35.0 manual DNS validation; installed through cPanel SSL UI with matching key and CA chain.
- Certificate covers ihireglobal.com, www.ihireglobal.com and mail.ihireglobal.com; expires 5 February 2027, 20:23:40 NZDT. Private material remains in ignored artifacts/ssl-private, outside release packages. Do not publish or commit it.
- HTTPS checks against 210.48.76.58 passed certificate validation for all three hosts. Enquiry endpoint GET returned 200 for each. cPanel reported AutoSSL Domain Validated for all three. At that moment the explicit automatic-renewal message appeared for mail only. Root and www were still excluded until the wizard step further down, which then reported that all three names renew via AutoSSL.
- Three temporary _acme-challenge TXT records were added at Wix, verified publicly, used successfully and removed. Original A/CNAME/MX/NS records were unchanged at this point. No support ticket sent, per owner preference.
- Browser filechooser integration failed and crashed one tab. Native Windows file dialog worked. Uploaded ihire-cpanel-test-20261107.zip to /home/ihireglo (outside public root), extracted into /home/ihireglo/public_html. Existing PHP 8.3 handler merged; mail preview sends X-Robots-Tag: noindex, nofollow.
- Secure review URL: https://mail.ihireglobal.com/ (opened for owner). Enquiry POST origin protections intentionally continue to allow only the production website hosts; preview-host submissions are not enabled.
- 18 production browser tests passed against cPanel preview (all route/link metadata checks, accessibility, mobile/tablet/desktop, menus, Learn, testimonials, forms with mocked email responses). Separate production-host DNS-override checks passed at 1440/768/390 with certificate validation enabled, plus no-JavaScript form safety. No real email sent during these checks.
- Actual Apache checks: HTTP/root-to-www 308, legacy /find-talent 301 to /hire-talent/, unknown page 404. Main-domain enquiry endpoint still responds after upload.
- Screenshots reviewed: artifacts/cpanel-review/home-1440.png, home-768.png, home-390.png.
- At this point the remaining launch action was an owner-authorised DNS cutover of the website records, then labelled form tests and a check that root and www would renew. The public site was still the Wix site. The switch is the next section.

## Website DNS switched and real forms confirmed — 7 November 2026
- Explicit owner approval received to go live and send both form delivery tests.
- Wix authoritative DNS then had root A 210.48.76.58 and www CNAME ihireglobal.com, TTL 3600. Removed old root A 185.230.63.107/.186/.171; old www CNAME was cdn3.wixdns.net. Those previous values stay in the saved DNS export. They are not the current rollback path; see Rollback. The Wix site and its backup were still retained at this point. The Wix Premium plan was cancelled on 7 November 2026.
- Authoritative ns0/ns1 plus Google 8.8.8.8 and Cloudflare 1.1.1.1 confirmed new root IP. www CNAME confirmed ihireglobal.com. Mail A remains 210.48.76.58; MX remains priority 0 mail.ihireglobal.com; nameservers unchanged.
- Immediately after the switch, this computer and Chrome still cached Wix. A public curl with no DNS override returned Wix content with valid TLS. That was propagation or cache on that connection. The 11 November recheck at the end of this file reached Apache.
- Submitted both real forms using Chrome against the production www hostname pinned to cPanel IP (normal TLS verification; no mocks) to avoid local DNS cache. Both returned HTTP 200 success and on-page references. Each submitted once.
- Chat reference IH-20261107-91D27898 at 2026-11-07T08:40:44Z; staffing IH-20261107-A2A156B8 at 08:40:48Z. Clearly labelled TEST ONLY, authorised launch checks; no customer follow-up needed.
- Owner explicitly confirmed BOTH Ashna and Rakesh received BOTH emails. End-to-end delivery verified by recipients.
- Evidence: artifacts/cpanel-review/live-form-delivery-20261107.json, live-chat-success.png and live-staffing-success.png. No extra mail sent or mail routing changed.
- Certificate valid to 5 February 2027. At this moment cPanel Status reported AutoSSL Domain Validated for root, www and mail, and only mail explicitly said it would renew via AutoSSL. The account UI had no Run AutoSSL control. Root and www renewal was confirmed later the same day in the wizard section below.
- Public website https://www.ihireglobal.com/ opened for owner. https://mail.ihireglobal.com/ stayed available as a direct preview. On 11 November 2026 it still returned HTTP 200 with `X-Robots-Tag: noindex, nofollow`. No source commits or pushes were made at this point.

### Post-launch DNS and AutoSSL check - 7 November 2026
- Google (8.8.8.8) and Cloudflare (1.1.1.1) resolved www to ihireglobal.com and 210.48.76.58. This machine's ordinary HTTPS request still reached cached Wix (162.159.143.12) at that moment. The 11 November recheck at the end of this file reached Apache on the public hostname.
- Direct HTTPS check against new server: HTTP 200, full TLS verification successful.
- cPanel Status filters at this check showed ihireglobal.com and www.ihireglobal.com under Excluded, and absent under Included. Mail was Included and explicitly renewed via AutoSSL. The website certificate expired 5 February 2027.
- This cPanel UI exposed no Include/Exclude or Run AutoSSL actions; Settings only controlled key type. The next subsection records the wizard clearing those exclusions. No Itronics request was required.

### AutoSSL exclusions resolved through cPanel wizard - 7 November 2026
- Used the free Let's Encrypt wizard with root and mail selected; cPanel automatically included www. User explicitly approved the wizard's linked terms.
- After the request, root and www disappeared from the Excluded filter. Status now explicitly states "The certificate will renew via AutoSSL" for ihireglobal.com, www.ihireglobal.com and mail.ihireglobal.com. Expiry remains 5 February 2027.
- HTTPS checks to the hosting IP passed certificate validation for all three names (root 308, www 200, mail 200). No Itronics request needed for this issue.

### Mobile refinements published - 7 November 2026
- Owner explicitly approved publishing the tested fixes. Uploaded ihire-mobile-fixes-20261107.zip to /home/ihireglo and extracted into /home/ihireglo/public_html.
- Archive contains 48 HTML/front-end files only, 189228 bytes; SHA256 2E65A0EEF6F5DB3A1B1E29EF4911F982467CDFB68BA8B1F35E4867546499B703. No API, .htaccess, PHP, DNS or SSL changes. Prior release archive and full backup retained outside public_html.
- Published: mobile benefits list alignment, larger 14px hero support copy, consistent page-introduction spacing without decorative yellow rules, mobile Hire Talent plus/minus disclosure and Hire Talent heading Talk to us.
- Local check/build and seven relevant Playwright tests passed. Live normal-public-DNS Chrome checks passed on home, Hire Talent, Contact and Learn at 390/768/1440px; headings, accents, support font and menu states verified. No overflow or page errors. Public enquiry endpoint GET 200 with valid TLS; no real email sent.
- Evidence: artifacts/cpanel-review/published-mobile-fixes.png and published-mobile-menu.png. Source was uncommitted at the end of this publish. It was later committed on 11 November 2026 (`6bcc3f6`). That commit is not assumed to match the files on the server.

## Public recheck — 11 November 2026

Same checks as Current status, repeated here so this log ends on the public result:

- `https://www.ihireglobal.com/` HTTP 200, Server Apache, Last-Modified 7 November 2026 10:15:02 GMT, title “Offshore staffing for NZ & Australian businesses | iHire Global”.
- `https://ihireglobal.com/`, `http://ihireglobal.com/` and `http://www.ihireglobal.com/` HTTP 308 to `https://www.ihireglobal.com/`.
- Certificate validation succeeded for the apex and www. Let’s Encrypt SAN: ihireglobal.com, www.ihireglobal.com, mail.ihireglobal.com. notAfter 5 February 2027, 07:23:40 GMT.
- Google 8.8.8.8 and Cloudflare 1.1.1.1: apex A 210.48.76.58, www CNAME ihireglobal.com, nameservers ns0.wixdns.net and ns1.wixdns.net, MX priority 0 mail.ihireglobal.com.
- `/privacy/` and `/sitemap-index.xml` HTTP 200. Unknown path HTTP 404. `/find-talent` HTTP 301 to `/hire-talent/`. `/api/enquiry.php` GET HTTP 200; HEAD HTTP 405 with `Allow: GET, POST`. No mail sent.
- `https://mail.ihireglobal.com/` HTTP 200 with `X-Robots-Tag: noindex, nofollow`.
- Still open after this recheck: privacy business review (address/identification, provider processing locations, practical deletion) and Search Console submission. Customer autoresponder remains optional.
