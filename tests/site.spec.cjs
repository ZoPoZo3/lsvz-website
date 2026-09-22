const {test,expect}=require('@playwright/test');
const fs=require('node:fs');
for(const width of [320,390,768,1024,1440]) test('Navigation and languages at '+width+'px',async({page})=>{
 await page.setViewportSize({width,height:900});await page.goto('/events-upcoming.html');
 if(width<=1100){await expect(page.locator('.site-header__bar > .lang-switch')).toBeVisible();await expect(page.locator('#primary-nav > .lang-switch')).toHaveCount(0);await page.locator('.lang-switch__trigger').click();await page.locator('.lang-switch__option[data-lang="en"]').click();await expect(page.locator('html')).toHaveAttribute('lang','en');}
 else {await expect(page.locator('#primary-nav > .lang-switch')).toBeVisible();}
 for(const lang of ['es','en','de']){
  await page.evaluate(lang=>window.LSVZ_I18N.setLang(lang),lang);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  if(width<=1100){await expect(page.locator('#primary-nav')).toHaveJSProperty('inert',true);await page.locator('.nav-toggle').click();await expect(page.locator('main')).toHaveJSProperty('inert',true);}
  await expect(page.locator('.nav__links a').last()).toBeVisible();
  await page.locator('.lang-switch__trigger').click();await page.locator('[data-lang="'+(lang==='es'?'en':'es')+'"]').click();await expect(page.locator('.lang-switch__trigger')).toBeFocused();
  if(width<=1100){await page.keyboard.press('Escape');await expect(page.locator('.nav-toggle')).toBeFocused();await expect(page.locator('main')).toHaveJSProperty('inert',false);}
 }
});
test('Gallery keyboard, focus return, language and reopening',async({page})=>{
 await page.goto('/events-past/white-party.html');const total=await page.locator('.masonry a').count();const first=page.locator('.masonry a').first();await first.click();await expect(page.getByRole('dialog')).toBeVisible();await expect(page.locator('main')).toHaveJSProperty('inert',true);
 await page.keyboard.press('ArrowRight');await expect(page.locator('.lightbox__counter')).toHaveText('2 / '+total);
 await page.evaluate(()=>window.LSVZ_I18N.setLang('de'));await expect(page.getByRole('dialog')).toHaveAttribute('aria-label','Fotoansicht');
 await page.keyboard.press('Escape');await expect(first).toBeFocused();await expect(page.locator('main')).toHaveJSProperty('inert',false);await first.click();await expect(page.locator('.lightbox__counter')).toHaveText('1 / '+total);
});
test('All pages and local image references load',async({page})=>{
 test.setTimeout(180000);
 const files=fs.readdirSync('.').filter(f=>f.endsWith('.html')).concat(fs.readdirSync('events-past').filter(f=>f.endsWith('.html')).map(f=>'events-past/'+f));let errors=[];page.on('pageerror',e=>errors.push(e.message));
 for(const file of files){const response=await page.goto('/'+file);expect(response.status()).toBe(200);await expect(page.locator('h1')).toHaveCount(1);const paths=await page.locator('img').evaluateAll(images=>images.flatMap(i=>[i.getAttribute('src'),...i.srcset.split(',').map(s=>s.trim().split(' ')[0])]).filter(Boolean));for(const p of paths){if(!p.startsWith('http')&&!p.startsWith('data:'))expect(fs.existsSync(require('node:path').resolve(require('node:path').dirname(file),p)),file+': '+p).toBe(true);}}
 expect(errors).toEqual([]);
});
test('No JavaScript keeps content and navigation usable',async({browser})=>{
 const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});const page=await context.newPage();await page.goto('http://127.0.0.1:5173/events-upcoming.html');await expect(page.locator('h1')).toBeVisible();await expect(page.locator('.nav__links a').first()).toBeVisible();await context.close();
});
test('Language works when storage is unavailable',async({page})=>{await page.addInitScript(()=>{Object.defineProperty(window,'localStorage',{get(){throw new Error('Blocked');}});});await page.goto('/index.html');await page.evaluate(()=>window.LSVZ_I18N.setLang('en'));await expect(page.locator('html')).toHaveAttribute('lang','en');});
test('Touch strip uses six reachable cards and native scrolling',async({browser})=>{const context=await browser.newContext({hasTouch:true,isMobile:true,viewport:{width:390,height:844},reducedMotion:'reduce'});const page=await context.newPage();await page.goto('http://127.0.0.1:5173/index.html');await expect(page.locator('.event-teaser__viewport')).toHaveClass(/is-static/);await expect(page.locator('.event-teaser__item:visible')).toHaveCount(6);expect(await page.locator('.event-teaser__viewport').evaluate(e=>getComputedStyle(e).overflowX)).toBe('auto');await context.close();});
test('Rapid gallery close cancels an unfinished transition',async({page})=>{await page.emulateMedia({reducedMotion:'no-preference'});await page.goto('/events-past/white-party.html');const first=page.locator('.masonry a').first();await first.click();await page.keyboard.press('ArrowRight');await page.keyboard.press('Escape');await first.click();await page.waitForTimeout(600);await expect(page.locator('.lightbox__counter')).toHaveText(/^1 \/ /);await expect(page.locator('.lightbox')).not.toHaveAttribute('aria-busy','true');});

test('Photo dimensions preserve aspect ratio',async({page})=>{await page.goto('/events-past/white-party.html');const img=page.locator('.masonry img').first();await img.scrollIntoViewIfNeeded();await expect.poll(()=>img.evaluate(i=>i.complete&&i.naturalWidth>0)).toBe(true);const ratio=await img.evaluate(i=>Math.abs(i.clientWidth/i.clientHeight-i.naturalWidth/i.naturalHeight));expect(ratio).toBeLessThan(.02);});

test('Membership and staff show only confirmed details',async({page})=>{
 await page.goto('/join.html');await expect(page.locator('.join-benefits')).toHaveCount(0);await expect(page.getByRole('link',{name:/formulario/i})).toBeVisible();
 await page.goto('/staff.html');await expect(page.locator('.staff-card__network[role="img"]')).toHaveCount(0);await expect(page.locator('.staff-card a[href="#"]')).toHaveCount(0);await expect(page.getByRole('link',{name:'LinkedIn de Aram Vartanian'})).toHaveAttribute('href','https://www.linkedin.com/in/aramvartanian1');await expect(page.getByRole('link',{name:'LinkedIn de Aram Vartanian'})).toBeVisible();expect(await page.getByRole('link',{name:'LinkedIn de Aram Vartanian'}).evaluate(link=>getComputedStyle(link).opacity)).toBe('1');await expect(page.locator('.staff-card').filter({hasText:'Saúl Aguilar'}).locator('.staff-card__network')).toHaveCount(0);
});
