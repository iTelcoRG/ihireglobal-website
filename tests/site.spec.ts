import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import {readdirSync,readFileSync} from 'node:fs';
import {join} from 'node:path';
import { createEnquiryDraft, formatEnquiryBrief } from '../src/lib/enquiry';
function pages(dir='dist',prefix=''):string[]{return readdirSync(dir,{withFileTypes:true}).flatMap(entry=>entry.isDirectory()?pages(join(dir,entry.name),prefix+'/'+entry.name):entry.name==='index.html'?[prefix+'/']:[]);}
const routes=pages();
// Browser tests never contact the live mail server.
test.beforeEach(async ({page}) => {
  await page.route('**/api/enquiry.php', async route => {
    await route.fulfill({status:200,contentType:'application/json',body:JSON.stringify(route.request().method()==='GET' ? {token:'test-token'} : {ok:true,reference:'IH-TEST'})});
  });
});
test('expanded enquiry maps to a complete structured draft',()=>{
  const data=new FormData();
  const fields={contact_name:' Test Person ',company_name:' Example Company ',work_email:'person@example.com',phone:'+64 00 000 0000',country:'NZ',role_title:'Operations coordinator',headcount:'3',responsibilities:'Coordinate work and handovers',required_skills:'Clear communication and spreadsheets',required_experience:'Two years of coordination',working_hours:'Mon-Fri, 9am-5pm Auckland',start_timeframe:'one_to_three_months',preferred_location:'sri_lanka',notes:'Discuss backup connectivity'};
  Object.entries(fields).forEach(([key,value])=>data.set(key,value));
  data.append('equipment_requirements','standard_laptop');data.append('equipment_requirements','power_backup');
  const draft=createEnquiryDraft(data);
  expect(draft).toEqual({schemaVersion:1,source:'public-website',client:{companyName:'Example Company',country:'NZ'},contact:{name:'Test Person',workEmail:'person@example.com',phone:'+64 00 000 0000'},requirement:{roleTitle:'Operations coordinator',headcount:3,responsibilities:fields.responsibilities,requiredSkills:fields.required_skills,requiredExperience:fields.required_experience,workingHours:fields.working_hours,startTimeframe:fields.start_timeframe,preferredLocation:'sri_lanka',connectivityRequirements:'',equipmentRequirements:['standard_laptop','power_backup'],notes:fields.notes}});
  const brief=formatEnquiryBrief(draft);
  expect(brief).toContain('Not submitted.');expect(brief).toContain('Preferred talent location: Sri Lanka');expect(brief).toContain('Standard laptop setup; UPS / power backup');expect(brief).toContain('Required experience: Two years of coordination');
});

test('mobile menu and enquiry validation, email success, failure and retry',async({page})=>{
  await page.setViewportSize({width:390,height:844});await page.goto('/');
  const menu=page.getByRole('button',{name:'Menu'});await menu.click();await expect(menu).toHaveAttribute('aria-expanded','true');
  await expect(page.getByRole('navigation',{name:'Main navigation'})).toBeVisible();await page.keyboard.press('Escape');await expect(menu).toHaveAttribute('aria-expanded','false');await expect(menu).toBeFocused();
  await menu.click();await page.getByRole('navigation',{name:'Main navigation'}).getByRole('link',{name:'Pricing',exact:true}).click();await expect(page).toHaveURL(/pricing/);
  await page.getByRole('link',{name:'Get an Indicative Quote',exact:true}).first().click();await expect(page).toHaveURL(/hire-talent\/#enquiry/);
  const posts:string[]=[];page.on('request',request=>{if(request.method()==='POST')posts.push(request.url());});
  const submit=page.getByRole('button',{name:'Send Enquiry'});await page.getByRole('button',{name:'Next',exact:false}).click();
  expect(await page.locator('#contact-name').evaluate((el:HTMLInputElement)=>el.validity.valueMissing)).toBe(true);
  await page.locator('#talent-form').getByLabel('Name (required)',{exact:true}).fill('   ');expect(await page.locator('#contact-name').evaluate((el:HTMLInputElement)=>el.validationMessage)).toContain('not just spaces');
  await page.locator('#talent-form').getByLabel('Name (required)',{exact:true}).fill('Test Person');await page.locator('#talent-form').getByLabel('Company (required)',{exact:true}).fill('Example Company');
  await page.locator('#talent-form').getByLabel('Work email (required)',{exact:true}).fill('invalid-address');expect(await page.locator('#work-email').evaluate((el:HTMLInputElement)=>el.validity.typeMismatch)).toBe(true);
  await page.locator('#talent-form').getByLabel('Work email (required)',{exact:true}).fill('test@example.com');await page.locator('#talent-form').getByLabel('Phone (optional)',{exact:true}).fill('+64 00 000 0000');
  await page.getByRole('combobox',{name:'Country (required)',exact:true}).selectOption('AU');await page.getByRole('button',{name:'Next',exact:false}).click();await expect(page.locator('#step-2-title')).toBeFocused();await page.locator('#talent-form').getByLabel('Role / job title (required)',{exact:true}).fill('Operations coordinator');
  await page.locator('#talent-form').getByLabel('Number of people required (required)',{exact:true}).fill('0');expect(await page.locator('#headcount').evaluate((el:HTMLInputElement)=>el.validity.rangeUnderflow)).toBe(true);
  await page.locator('#headcount').fill('1.5');expect(await page.locator('#headcount').evaluate((el:HTMLInputElement)=>el.validity.stepMismatch)).toBe(true);await page.locator('#headcount').fill('2');
  await page.locator('#talent-form').getByLabel('Main responsibilities (required)',{exact:true}).fill('Coordinate handovers');
  await page.locator('#start-timeframe').selectOption('one_to_three_months');
  const location=page.getByRole('combobox',{name:'Preferred talent location',exact:true});
  await expect(location.locator('option')).toHaveText(['No preference','Sri Lanka','Philippines','India','Fiji','Open to recommendation']);
  for(const value of ['no_preference','sri_lanka','philippines','india','fiji','recommendation']){await location.selectOption(value);await expect(location).toHaveValue(value);}await location.selectOption('sri_lanka');
  await page.getByRole('button',{name:'Next',exact:false}).click();await expect(page.locator('#step-3-title')).toBeFocused();await page.locator('#talent-form').getByLabel('Required skills (required)',{exact:true}).fill('Scheduling and spreadsheets');await page.locator('#talent-form').getByLabel('Required experience (optional)',{exact:true}).fill('Operations experience');await page.locator('#working-hours').fill('Mon-Fri, 9am-5pm Sydney time');
  await page.locator('#talent-form').getByLabel('Standard laptop setup',{exact:true}).check();await page.locator('#talent-form').getByLabel('Additional monitor(s)',{exact:true}).check();await page.locator('#talent-form').getByLabel('Unsure / recommend a setup',{exact:true}).check();await page.locator('#notes').fill('Please recommend backup connectivity.');
  await page.locator('#connectivity-details').fill('Backup connection needed');await page.getByRole('button',{name:'Next',exact:false}).click();await expect(page.locator('#step-4-title')).toBeFocused();await expect(page.locator('#brief-review')).toContainText('Backup connection needed');await expect(page.locator('#brief-review')).toContainText('Operations coordinator');
  let attempts=0;
  const payloads: Record<string,unknown>[]=[];
  await page.route('**/api/enquiry.php', async route => {
    if(route.request().method()==='GET') {await route.fulfill({json:{token:'test-token'}});return;}
    payloads.push(route.request().postDataJSON()); attempts++;
    await route.fulfill(attempts===1 ? {status:503,json:{ok:false,message:'Temporary delivery failure.'}} : {status:200,json:{ok:true,reference:'IH-TEST'}});
  });
  await submit.click();
  await expect(page.locator('#form-status')).toContainText('Temporary delivery failure');
  await expect(submit).toBeEnabled();
  await expect(page.locator('#brief-review')).toContainText('Operations coordinator');
  await submit.click();
  await expect(page.locator('#form-status')).toContainText('Reference: IH-TEST');
  await expect(page.getByRole('button',{name:'Enquiry sent'})).toBeDisabled();
  expect(posts).toHaveLength(2);
  expect(payloads[1]).toMatchObject({work_email:'test@example.com',headcount:'2',role_title:'Operations coordinator',required_skills:'Scheduling and spreadsheets',connectivity_requirements:'Backup connection needed',equipment_requirements:['standard_laptop','additional_monitors','recommend_setup'],token:'test-token'});
  expect(payloads[0].token).toBe(payloads[1].token);
  expect(await page.evaluate(()=>({local:localStorage.length,session:sessionStorage.length}))).toEqual({local:0,session:0});
  const audit=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();expect(audit.violations).toEqual([]);
});

test('without JavaScript the brief cannot submit and navigation is available',async({browser})=>{
  const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});const page=await context.newPage();
  await page.goto('http://127.0.0.1:4321/hire-talent/#enquiry');await expect(page.getByRole('button',{name:'Send Enquiry'})).toBeDisabled();
  await expect(page.locator('#brief-script-note')).toBeVisible();
  await expect(page.getByRole('navigation',{name:'Main navigation'}).getByRole('link',{name:'Pricing',exact:true})).toBeVisible();await context.close();
});
test('expanded architecture, sitemap and accessible key routes',async({page})=>{
  expect(routes).toHaveLength(44);
  const sitemap=readFileSync('dist/sitemap-0.xml','utf8');
  for(const route of routes) expect(sitemap).toContain(`https://www.ihireglobal.com${route}`);
  await page.setViewportSize({width:1440,height:1000});
  const captures=[['privacy','/privacy/'],['pricing','/pricing/'],['find-talent','/hire-talent/'],['use-cases','/use-cases/'],['why-ihire','/why-ihire/'],['how-it-works','/how-it-works/'],['roles','/roles/'],['industries','/industries/'],['business-needs','/business-needs/'],['sri-lanka','/talent-locations/sri-lanka/']];
  for(const [,route] of captures){
    await page.goto(route);
    const results=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
    expect(results.violations,route).toEqual([]);
  }
  for(const route of routes){
    await page.goto(route);
    expect(await page.locator('[class*="eyebrow"]').count()).toBe(0);
  }
});
test('all routes, metadata, local links and anchors are valid',async({page,request})=>{const titles=new Set<string>();const descriptions=new Set<string>();for(const route of routes){const response=await page.goto(route);expect(response?.status(),route).toBe(200);await expect(page.locator('h1')).toHaveCount(1);const title=await page.title();expect(titles.has(title),`duplicate title ${route}`).toBe(false);titles.add(title);const description=await page.locator('meta[name="description"]').getAttribute('content');expect(description).toBeTruthy();expect(descriptions.has(description!)).toBe(false);descriptions.add(description!);await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href',`https://www.ihireglobal.com${route}`);const links=await page.locator('a').evaluateAll(elements=>elements.map(a=>a.getAttribute('href')!).filter(Boolean));for(const link of new Set(links)){expect(link).not.toBe('#');if(link.startsWith('/')){const [path,hash]=link.split('#');expect(routes.includes(path),`${route} -> ${link}`).toBe(true);if(hash){const result=await request.get(path);expect(await result.text()).toContain(`id="${hash}"`);}}else if(link.startsWith('#'))expect(await page.locator(`[id="${link.slice(1)}"]`).count()).toBe(1);}}});
test('responsive pages, no runtime errors and accessibility',async({page})=>{const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',msg=>{if(msg.type()==='error')errors.push(msg.text());});for(const width of [1440,768,390,320]){await page.setViewportSize({width,height:960});for(const route of ['/','/hire-talent/','/pricing/','/roles/monitoring-after-hours/','/talent-locations/sri-lanka/','/jobs/','/industries/','/business-needs/','/industries/healthcare/','/business-needs/extend-operating-hours/','/resources/','/privacy/','/use-cases/','/why-ihire/','/how-it-works/']){await page.goto(route);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth),`${route} overflow at ${width}`).toBe(true);}if(width===1440||width===390||width===768){for(const route of ['/pricing/','/hire-talent/','/use-cases/']){await page.goto(route);const audit=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();expect(audit.violations,route+' at '+width).toEqual([]);}await page.goto('/');const results=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();expect(results.violations).toEqual([]);}}expect(errors).toEqual([]);});

for (const width of [1440,768,390,320]) {
  test('guided brief retains edits, validates steps and reviews safely at '+width, async ({page}) => {
    await page.setViewportSize({width,height:960});
    await page.goto('/hire-talent/#enquiry');
    const next=page.locator('#brief-next');
    await expect(page.locator('.form-step:visible')).toHaveCount(1);
    await expect(page.locator('#brief-back')).toBeHidden();
    await page.locator('#contact-name').fill('Review Person');
    await page.locator('#company-name').fill('Example Company');
    await page.locator('#work-email').fill('review@example.com');
    await page.locator('#country').selectOption('NZ');
    await page.locator('#work-email').press('Enter');
    await expect(page.locator('#step-2-title')).toBeFocused();
    await next.click();
    await expect(page.locator('#role-title')).toBeFocused();
    await expect(page.locator('#role-title')).toHaveAttribute('aria-invalid','true');
    await page.locator('#role-title').fill('Support coordinator');
    await page.locator('#responsibilities').fill('Handle enquiries');
    await page.locator('#brief-back').click();
    await expect(page.locator('#contact-name')).toHaveValue('Review Person');
    await next.click();
    await expect(page.locator('#role-title')).toHaveValue('Support coordinator');
    await next.click();
    await next.click();
    await expect(page.locator('#required-skills')).toBeFocused();
    await page.locator('#required-skills').fill('Communication');
    await page.locator('#equipment-headset').check();
    await page.locator('#connectivity-details').fill('Discuss internet and power backup');
    await page.locator('#notes').fill('<img src=x onerror=alert(1)>');
    await next.click();
    await expect(page.locator('#step-4-title')).toBeFocused();
    await expect(page.locator('.form-progress [aria-current="step"]')).toContainText('Review');
    await expect(page.locator('#brief-review')).toContainText('<img src=x onerror=alert(1)>');
    await expect(page.locator('#brief-review img')).toHaveCount(0);
    await expect(page.locator('#brief-review')).toContainText('Headset');
    await expect(page.locator('#brief-review')).toContainText('Not specified');
    await page.locator('#brief-back').click();
    await expect(page.locator('#equipment-headset')).toBeChecked();
    await page.locator('#required-skills').fill('Updated skills');
    await next.click();
    await expect(page.locator('#brief-review')).toContainText('Updated skills');
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
    const audit=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
    expect(audit.violations).toEqual([]);
    await page.reload();
    await expect(page.locator('#contact-name')).toHaveValue('');
  });
}

test('four-step journey, expandable detail and approved starting prices',async({page})=>{
  for(const route of ['/','/how-it-works/']) {
    await page.goto(route);await expect(page.locator('.four-step > li')).toHaveCount(4);
  }
  await expect(page.locator('.process-timeline > li')).toHaveCount(4);
  await expect(page.locator('.stage-responsibilities dt')).toHaveText(Array(4).fill(['iHire','Your business']).flat());
  const summary=page.getByText('See the full process',{exact:true});await summary.focus();await page.keyboard.press('Enter');
  await expect(page.locator('.full-process')).toHaveAttribute('open','');
  await expect(page.locator('#recruit')).toBeVisible();
  await expect(page.locator('.full-process-steps > li')).toHaveCount(12);
  await page.keyboard.press('Space');await expect(page.locator('.full-process')).not.toHaveAttribute('open','');
  await page.goto('/pricing/');await expect(page.locator('.pricing-example')).toHaveCount(3);
  await expect(page.locator('.price-guidance strong')).toHaveText(['From NZ$800','From NZ$1,500','From NZ$2,500']);
  await expect(page.locator('.price-guidance span:not(.price-inclusions)')).toHaveText(Array(3).fill('per month + GST'));
  await expect(page.locator('.pricing-qualifier')).toContainText('Working hours, equipment, connectivity');

  await expect(page.locator('.customer-proof')).toHaveCount(0);
  await page.goto('/use-cases/');await expect(page.locator('.case-visual')).toHaveCount(4);
  await expect(page.locator('.customer-proof')).toHaveCount(0);
});

test('pricing images load and comparison rows align',async({page})=>{
 for(const width of [1440,1024,768,390,320]){
  await page.setViewportSize({width,height:1000});
  await page.goto('/pricing/');
  const cards=page.locator('.pricing-example');
  await expect(cards).toHaveCount(3);
  for(const img of await cards.locator('img').all()){
   await img.scrollIntoViewIfNeeded();
   await expect.poll(()=>img.evaluate((el:HTMLImageElement)=>el.complete&&el.naturalWidth>0)).toBe(true);
  }
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  if(width>900){
   for(const selector of ['h3','.pricing-description','.price-guidance','.scenario-factors','.button']){
    const tops=await cards.locator(selector).evaluateAll(elements=>elements.map(el=>el.getBoundingClientRect().top));
    expect(Math.max(...tops)-Math.min(...tops),selector+' at '+width).toBeLessThanOrEqual(1);
   }
  }
 }
});
