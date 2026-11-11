import {test,expect} from '@playwright/test';
const links=[
 ['Explore the staffing process →','/how-it-works/','Four steps.'],
 ['Understand the iHire model →','/why-ihire/','Support beyond the introduction.'],
 ['How offshore staffing works','/how-it-works/','You choose the person.'],
 ['Real offshore staffing use cases','/use-cases/','Telephone sales verification.'],
 ['Building an offshore team','/business-needs/build-an-offshore-team/','Set reporting lines and escalation responsibilities'],
 ['Frequently asked questions','/hire-talent/#faqs','Who manages the employee’s daily work?'],
 ['Hiring in Sri Lanka','/talent-locations/sri-lanka/','Our primary offshore operations are based in Sri Lanka.'],
 ['Exploring recruitment in the Philippines','/talent-locations/philippines/','Our recruitment network extends our reach into the Philippines.'],
 ['Explore offshore roles','/roles/','Explore roles for your team.'],
 ['Support for your industry','/industries/','Explore your industry.'],
 ['Costs & pricing','/pricing/','From NZ$800'],
 ['Equipment & infrastructure','/how-it-works/#equip','We arrange required laptops'],
 ['Onboarding your employee','/how-it-works/#integrate','You provide systems access, training'],
 ['Management and reporting lines','/business-needs/build-an-offshore-team/','Set reporting lines and escalation responsibilities'],
 ['Working hours and handovers','/business-needs/extend-operating-hours/','Plan incoming and outgoing handovers'],
 ['Bringing your employee into the team','/how-it-works/#integrate','You provide systems access, training'],
 ['Find Talent','/hire-talent/#enquiry','Get an indicative quote.']
];
test('every Learn link opens the matching content and visible anchor',async({page})=>{
 for(const width of [1440,390]) {
 await page.setViewportSize({width,height:960});
 for(const [label,path,text] of links){
  await page.goto('/resources/');
  await page.locator('main').getByRole('link',{name:label,exact:true}).click();
  await expect(page).toHaveURL(new RegExp(path.replace(/[.*+?^$\{\}()|[\]\\]/g,'\\$&')+'$'));
  await expect(page.locator('main')).toContainText(text);
  const hash=path.split('#')[1];
  if(hash) await expect(page.locator('#'+hash)).toBeVisible();
 }
 }
});
test('homepage Learn cards and navigation open the intended material',async({page})=>{
 const cards=[
  ['What is offshore staffing?','/resources/#staffing-guide','A dedicated employee works from another country'],
  ['Offshore staffing vs outsourcing','/resources/#staffing-vs-outsourcing','supplier typically takes responsibility'],
  ['How to build an offshore team','/business-needs/build-an-offshore-team/','Create shared onboarding and documentation routines']
 ];
 for(const [label,path,text] of cards){
  await page.goto('/');
  await page.locator('.learn-home a').filter({has:page.getByRole('heading',{name:label,exact:true})}).click();
  expect(new URL(page.url()).pathname+new URL(page.url()).hash).toBe(path);
  await expect(page.locator('main')).toContainText(text);
 }
 await page.goto('/');
 await page.locator('.learn-home').getByRole('link',{name:'Explore Learn'}).click();
 await expect(page.locator('.learn-topic-grid')).toBeVisible();
 for(const selector of ['header','footer']){
  if(selector==='header' && await page.locator('.menu-toggle').isVisible()) await page.locator('.menu-toggle').click();
  await page.locator(selector).getByRole('link',{name:'Learn',exact:true}).click();
  expect(new URL(page.url()).pathname).toBe('/resources/');
 }
});
