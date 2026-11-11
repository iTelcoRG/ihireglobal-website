import { test, expect } from '@playwright/test';

test('talent submenu and testimonial scrolling work at desktop, tablet and mobile sizes', async ({page}) => {
  await page.emulateMedia({reducedMotion:'reduce'});
  for (const width of [1440,768,390]) {
    await page.setViewportSize({width,height:1000});
    await page.goto('/');
    if(width < 1400) await page.getByRole('button',{name:'Menu'}).click();
    const summary=page.locator('.talent-menu > summary');
    await summary.focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('.talent-submenu')).toBeVisible();
    await expect(page.locator('.talent-submenu a')).toHaveCount(5);
    await page.keyboard.press('Escape');
    await expect(page.locator('.talent-submenu')).not.toBeVisible();
    await expect(summary).toBeFocused();
    await summary.click();
    await page.locator('.talent-submenu').getByRole('link',{name:'Roles',exact:true}).click();
    await expect(page).toHaveURL(/\/roles\/$/);
    await page.goto('/#testimonial-heading');
    const track=page.locator('#testimonial-track');
    await expect(track.locator('figure')).toHaveCount(4);
    await expect(track).toContainText('Wolfguard');
    await expect(track).toContainText('Excel Sales');
    await expect(track).toContainText('Rako Controls');
    await expect(track).toContainText('Online Wholesale');
    await expect(track).not.toContainText('Placeholder');
    const previous=page.getByRole('button',{name:'Previous testimonials'});
    const next=page.getByRole('button',{name:'Next testimonials'});
    await expect(previous).toBeDisabled();
    const layout=await track.evaluate(el=>({width:el.clientWidth,card:el.children[0].getBoundingClientRect().width,gap:parseFloat(getComputedStyle(el).columnGap)}));
    const columns=width>1000?3:width>600?2:1;
    expect(Math.abs(layout.card*columns+layout.gap*(columns-1)-layout.width)).toBeLessThan(2);
    for(let i=0;i<4-columns;i++) await next.click();
    await expect(next).toBeDisabled();
    await expect(previous).toBeEnabled();
    const end=await track.evaluate(el=>el.scrollLeft);
    await previous.click();
    await expect.poll(()=>track.evaluate(el=>el.scrollLeft)).toBeLessThan(end);
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  }
});

test('desktop hover menu stays open across the gap and closes when dismissed', async ({page}) => {
  await page.setViewportSize({width:1440,height:1000});
  await page.goto('/');
  const summary=page.locator('.talent-menu > summary');
  const submenu=page.locator('.talent-submenu');
  await summary.hover();
  await expect(submenu).toBeVisible();
  await submenu.getByRole('link',{name:'Roles',exact:true}).hover();
  await expect(submenu).toBeVisible();
  await page.locator('h1').hover();
  await expect(submenu).not.toBeVisible();
  await summary.hover();
  await page.keyboard.press('Escape');
  await expect(submenu).not.toBeVisible();
  await expect(summary).toBeFocused();
  await expect(summary).toHaveText('Hire Talent');
});
