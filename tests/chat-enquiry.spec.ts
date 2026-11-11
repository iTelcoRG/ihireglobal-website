import {test,expect} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
test('chat option preserves both drafts, validates and retries safely',async({page})=>{
 const posts:Record<string,unknown>[]=[];
 await page.route('**/api/enquiry.php',async route=>{
  if(route.request().method()==='GET')return route.fulfill({json:{token:'chat-test-token'}});
  posts.push(route.request().postDataJSON());
  return route.fulfill(posts.length===1?{status:503,json:{ok:false,message:'Please retry.'}}:{json:{ok:true,reference:'IH-CHAT-TEST'}});
 });
 await page.setViewportSize({width:390,height:844});
 await page.goto('/contact/#enquiry');
 await expect(page.locator('#chat-panel')).toBeVisible();
 await page.locator('#chat-send').click();
 expect(posts).toHaveLength(0);
 await page.locator('#chat-name').fill('Chat Customer');
 await page.locator('#chat-email').fill('chat@example.com');
 await page.locator('#chat-message').fill('Can we discuss our options?');
 await page.getByRole('button',{name:/Get a staffing quote/}).click();
 await page.locator('#contact-name').fill('Quote Customer');
 await page.getByRole('button',{name:/Let’s have a chat/}).click();
 await expect(page.locator('#chat-name')).toHaveValue('Chat Customer');
 await page.locator('#chat-send').click();
 await expect(page.locator('#chat-status')).toContainText('Please retry.');
 await expect(page.locator('#chat-message')).toHaveValue('Can we discuss our options?');
 await page.locator('#chat-send').click();
 await expect(page.locator('#chat-status')).toContainText('IH-CHAT-TEST');
 await expect(page.locator('#chat-send')).toBeDisabled();
 expect(posts).toHaveLength(2);
 expect(posts[0]).toEqual(posts[1]);
 expect(posts[1]).toMatchObject({enquiry_type:'chat',contact_name:'Chat Customer',work_email:'chat@example.com',message:'Can we discuss our options?'});
 expect(posts[1]).not.toHaveProperty('headcount');
 await page.getByRole('button',{name:/Get a staffing quote/}).click();
 await expect(page.locator('#contact-name')).toHaveValue('Quote Customer');
 await page.goto('/hire-talent/');
 await expect(page.locator('#quote-panel')).toBeVisible();
});
test('both contact options are accessible and fit desktop tablet and mobile',async({page})=>{
 await page.route('**/api/enquiry.php',route=>route.fulfill({json:{token:'test'}}));
 for(const width of [1440,768,390,320]){
  await page.setViewportSize({width,height:960});await page.goto('/contact/#enquiry');
  for(const mode of ['chat','quote']){
   await page.locator('[data-enquiry-choice="'+mode+'"]').click();
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
   const audit=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
   expect(audit.violations).toEqual([]);
  }
 }
});
