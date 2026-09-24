import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import {readdirSync,readFileSync,mkdirSync} from 'node:fs';
import {join} from 'node:path';
import { createEnquiryDraft, formatEnquiryBrief } from '../src/lib/enquiry';
function pages(dir='dist',prefix=''):string[]{return readdirSync(dir,{withFileTypes:true}).flatMap(entry=>entry.isDirectory()?pages(join(dir,entry.name),prefix+'/'+entry.name):entry.name==='index.html'?[prefix+'/']:[]);}
const routes=pages();
test('expanded enquiry maps to a complete structured draft',()=>{
  const data=new FormData();
  const fields={contact_name:' Test Person ',company_name:' Example Company ',work_email:'person@example.com',phone:'+64 00 000 0000',country:'NZ',role_title:'Operations coordinator',headcount:'3',responsibilities:'Coordinate work and handovers',required_skills:'Clear communication and spreadsheets',required_experience:'Two years of coordination',working_hours:'Mon-Fri, 9am-5pm Auckland',start_timeframe:'one_to_three_months',preferred_location:'sri_lanka',notes:'Discuss backup connectivity'};
  Object.entries(fields).forEach(([key,value])=>data.set(key,value));
  data.append('equipment_requirements','standard_laptop');data.append('equipment_requirements','power_backup');
  const draft=createEnquiryDraft(data);
  expect(draft).toEqual({schemaVersion:1,source:'public-website',client:{companyName:'Example Company',country:'NZ'},contact:{name:'Test Person',workEmail:'person@example.com',phone:'+64 00 000 0000'},requirement:{roleTitle:'Operations coordinator',headcount:3,responsibilities:fields.responsibilities,requiredSkills:fields.required_skills,requiredExperience:fields.required_experience,workingHours:fields.working_hours,startTimeframe:fields.start_timeframe,preferredLocation:'sri_lanka',equipmentRequirements:['standard_laptop','power_backup'],notes:fields.notes}});
  const brief=formatEnquiryBrief(draft);
  expect(brief).toContain('Not submitted.');expect(brief).toContain('Preferred talent location: Sri Lanka');expect(brief).toContain('Standard laptop setup; UPS / power backup');expect(brief).toContain('Required experience: Two years of coordination');
});

test('mobile menu and quote brief validation, selection and download',async({page})=>{
  await page.setViewportSize({width:390,height:844});await page.goto('/');
  const menu=page.getByRole('button',{name:'Menu'});await menu.click();await expect(menu).toHaveAttribute('aria-expanded','true');
  await expect(page.getByRole('navigation',{name:'Main navigation'})).toBeVisible();await page.keyboard.press('Escape');await expect(menu).toHaveAttribute('aria-expanded','false');await expect(menu).toBeFocused();
  await menu.click();await page.getByRole('navigation',{name:'Main navigation'}).getByRole('link',{name:'Pricing',exact:true}).click();await expect(page).toHaveURL(/pricing/);
  await page.getByRole('link',{name:'Get an Indicative Quote',exact:true}).first().click();await expect(page).toHaveURL(/hire-talent\/#enquiry/);
  const posts:string[]=[];page.on('request',request=>{if(request.method()==='POST')posts.push(request.url());});
  const submit=page.getByRole('button',{name:'Download my staffing brief'});await submit.click();
  expect(await page.locator('#contact-name').evaluate((el:HTMLInputElement)=>el.validity.valueMissing)).toBe(true);
  await page.getByLabel('Name (required)',{exact:true}).fill('   ');expect(await page.locator('#contact-name').evaluate((el:HTMLInputElement)=>el.validationMessage)).toContain('not just spaces');
  await page.getByLabel('Name (required)',{exact:true}).fill('Test Person');await page.getByLabel('Company (required)',{exact:true}).fill('Example Company');
  await page.getByLabel('Work email (required)',{exact:true}).fill('invalid-address');expect(await page.locator('#work-email').evaluate((el:HTMLInputElement)=>el.validity.typeMismatch)).toBe(true);
  await page.getByLabel('Work email (required)',{exact:true}).fill('test@example.com');await page.getByLabel('Phone (optional)',{exact:true}).fill('+64 00 000 0000');
  await page.getByRole('combobox',{name:'Country (required)',exact:true}).selectOption('AU');await page.getByLabel('Role / job title (required)',{exact:true}).fill('Operations coordinator');
  await page.getByLabel('Number of people required (required)',{exact:true}).fill('0');expect(await page.locator('#headcount').evaluate((el:HTMLInputElement)=>el.validity.rangeUnderflow)).toBe(true);
  await page.locator('#headcount').fill('1.5');expect(await page.locator('#headcount').evaluate((el:HTMLInputElement)=>el.validity.stepMismatch)).toBe(true);await page.locator('#headcount').fill('2');
  await page.getByLabel('Main responsibilities (required)',{exact:true}).fill('Coordinate handovers');await page.getByLabel('Required skills (required)',{exact:true}).fill('Scheduling and spreadsheets');
  await page.getByLabel('Required experience (optional)',{exact:true}).fill('Operations experience');await page.locator('#working-hours').fill('Mon-Fri, 9am-5pm Sydney time');await page.locator('#start-timeframe').selectOption('one_to_three_months');
  const location=page.getByRole('combobox',{name:'Preferred talent location',exact:true});
  await expect(location.locator('option')).toHaveText(['No preference','Sri Lanka','Philippines','India','Fiji','Open to recommendation']);
  for(const value of ['no_preference','sri_lanka','philippines','india','fiji','recommendation']){await location.selectOption(value);await expect(location).toHaveValue(value);}await location.selectOption('sri_lanka');
  await page.getByLabel('Standard laptop setup',{exact:true}).check();await page.getByLabel('Additional monitor(s)',{exact:true}).check();await page.getByLabel('Unsure / recommend a setup',{exact:true}).check();await page.locator('#notes').fill('Please recommend backup connectivity.');
  const downloadPromise=page.waitForEvent('download');await submit.click();const download=await downloadPromise;expect(download.suggestedFilename()).toBe('ihire-staffing-brief.txt');
  const brief=readFileSync((await download.path())!,'utf8');
  for(const text of ['Work email: test@example.com','Number of people required: 2','Main responsibilities: Coordinate handovers','Required skills: Scheduling and spreadsheets','Required experience: Operations experience','Preferred working hours: Mon-Fri, 9am-5pm Sydney time','Preferred talent location: Sri Lanka','Standard laptop setup; Additional monitor(s); Unsure / recommend a setup','Please recommend backup connectivity.'])expect(brief).toContain(text);
  await expect(page.getByRole('status')).toContainText('has not been sent');await expect(page.getByRole('status')).toContainText('No quote has been requested');
  expect(posts).toEqual([]);expect(await page.evaluate(()=>({local:localStorage.length,session:sessionStorage.length}))).toEqual({local:0,session:0});
  const audit=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();expect(audit.violations).toEqual([]);
});

test('without JavaScript the brief cannot submit and navigation is available',async({browser})=>{
  const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});const page=await context.newPage();
  await page.goto('http://127.0.0.1:4321/hire-talent/#enquiry');await expect(page.getByRole('button',{name:'Download my staffing brief'})).toBeDisabled();
  await expect(page.getByText('Enable JavaScript to download your brief. Online submission is not available.')).toBeVisible();
  await expect(page.getByRole('navigation',{name:'Main navigation'}).getByRole('link',{name:'Pricing',exact:true})).toBeVisible();await context.close();
});
test('expanded architecture, sitemap and screenshot review set',async({page})=>{
  expect(routes).toHaveLength(43);
  const sitemap=readFileSync('dist/sitemap-0.xml','utf8');
  for(const route of routes) expect(sitemap).toContain(`https://www.ihireglobal.com${route}`);
  await page.setViewportSize({width:1440,height:1000});
  const captures=[['pricing','/pricing/'],['find-talent','/hire-talent/'],['use-cases','/use-cases/'],['why-ihire','/why-ihire/'],['how-it-works','/how-it-works/'],['roles','/roles/'],['industries','/industries/'],['business-needs','/business-needs/'],['sri-lanka','/talent-locations/sri-lanka/']];
  for(const [name,route] of captures){
    await page.goto(route);
    const results=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
    expect(results.violations,route).toEqual([]);
    await page.screenshot({path:`artifacts/${name}-desktop-build3.png`,fullPage:true});
  }
  for(const route of routes){
    await page.goto(route);
    expect(await page.locator('[class*="eyebrow"]').count()).toBe(0);
  }
});
test('all routes, metadata, local links and anchors are valid',async({page,request})=>{const titles=new Set<string>();const descriptions=new Set<string>();for(const route of routes){const response=await page.goto(route);expect(response?.status(),route).toBe(200);await expect(page.locator('h1')).toHaveCount(1);const title=await page.title();expect(titles.has(title),`duplicate title ${route}`).toBe(false);titles.add(title);const description=await page.locator('meta[name="description"]').getAttribute('content');expect(description).toBeTruthy();expect(descriptions.has(description!)).toBe(false);descriptions.add(description!);await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href',`https://www.ihireglobal.com${route}`);const links=await page.locator('a').evaluateAll(elements=>elements.map(a=>a.getAttribute('href')!).filter(Boolean));for(const link of new Set(links)){expect(link).not.toBe('#');if(link.startsWith('/')){const [path,hash]=link.split('#');expect(routes.includes(path),`${route} -> ${link}`).toBe(true);if(hash){const result=await request.get(path);expect(await result.text()).toContain(`id="${hash}"`);}}else if(link.startsWith('#'))expect(await page.locator(`[id="${link.slice(1)}"]`).count()).toBe(1);}}});
test('responsive pages, no runtime errors and accessibility',async({page})=>{const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',msg=>{if(msg.type()==='error')errors.push(msg.text());});for(const width of [1440,768,390,320]){await page.setViewportSize({width,height:960});for(const route of ['/','/hire-talent/','/pricing/','/roles/monitoring-after-hours/','/talent-locations/sri-lanka/','/jobs/','/industries/','/business-needs/','/industries/healthcare/','/business-needs/extend-operating-hours/','/resources/','/use-cases/','/why-ihire/','/how-it-works/']){await page.goto(route);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth),`${route} overflow at ${width}`).toBe(true);}if(width===1440||width===390||width===768){for(const route of ['/pricing/','/hire-talent/','/use-cases/']){await page.goto(route);const audit=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();expect(audit.violations,route+' at '+width).toEqual([]);if(route==='/hire-talent/')await page.locator('#enquiry').screenshot({path:`artifacts/enquiry-${width}-build3.png`});if(route==='/pricing/'&&width===390)await page.screenshot({path:'artifacts/pricing-mobile-build3.png',fullPage:true});}await page.goto('/');const results=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();expect(results.violations).toEqual([]);mkdirSync('artifacts',{recursive:true});await page.screenshot({path:`artifacts/homepage-${width===1440?'desktop':width===768?'tablet':'mobile'}-build3.png`,fullPage:true});await page.screenshot({path:`artifacts/homepage-${width===1440?'desktop':width===768?'tablet':'mobile'}-viewport-build3.png`});}}expect(errors).toEqual([]);});
