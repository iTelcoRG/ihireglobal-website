import {test,expect} from '@playwright/test';
test('homepage browsing expands by keyboard on phones and remains visible on desktop',async({page})=>{
 await page.setViewportSize({width:390,height:844});await page.goto('/');
 const panels=page.locator('.mobile-disclosure');await expect(panels).toHaveCount(2);
 const collapsedHeight=await page.evaluate(()=>document.documentElement.scrollHeight);
 for(const panel of await panels.all()){
  await expect(panel).not.toHaveAttribute('open','');
  await panel.locator('summary').focus();await page.keyboard.press('Enter');
  await expect(panel).toHaveAttribute('open','');await expect(panel.locator('a').first()).toBeVisible();
 }
 const expandedHeight=await page.evaluate(()=>document.documentElement.scrollHeight);
 console.log({collapsedHeight,expandedHeight,saved:expandedHeight-collapsedHeight});
 expect(expandedHeight-collapsedHeight).toBeGreaterThan(1500);
 await page.setViewportSize({width:1440,height:1000});
 for(const panel of await panels.all()){await expect(panel).toHaveAttribute('open','');await expect(panel.locator('summary')).toBeHidden();await expect(panel.locator('a').first()).toBeVisible();}
 await page.goto('/contact/');await expect(page.locator('h1')).toHaveText('Talk to us.');
});
