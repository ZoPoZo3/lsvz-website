const {chromium}=require('@playwright/test');
const fs=require('node:fs');
const path=require('node:path');
const phase=process.argv[2]||'after';
const out=path.join('.local',phase);
fs.mkdirSync(out,{recursive:true});
(async()=>{
  const browser=await chromium.launch({channel:'chrome',headless:true});
  const results=[];
  for(const width of [390,1440]){
    const context=await browser.newContext({viewport:{width,height:width===390?844:1000},deviceScaleFactor:1,isMobile:width===390,hasTouch:width===390});
    const page=await context.newPage();
    for(const route of ['index.html','events-upcoming.html','events-past.html','events-past/white-party.html','history.html','staff.html','join.html']){
      const errors=[];const failed=[];
      const onError=e=>errors.push(e.message);
      const onResponse=r=>{if(r.status()>=400)failed.push({url:r.url(),status:r.status()});};
      page.on('pageerror',onError);page.on('response',onResponse);
      await page.goto('http://127.0.0.1:5173/'+route,{waitUntil:'networkidle'});
      await page.waitForTimeout(3800);
      await page.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=600){window.scrollTo({top:y,behavior:'instant'});await new Promise(r=>setTimeout(r,65));}window.scrollTo({top:0,behavior:'instant'});});
      await page.waitForTimeout(650);
      await page.addScriptTag({path:require.resolve('axe-core/axe.min.js')});
      const axe=await page.evaluate(()=>axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}}));
      const layout=await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,overflow:[...document.querySelectorAll('main h1,main h2,.nav__links a,.hero__brand-row')].filter(e=>{const r=e.getBoundingClientRect();return r.width&&getComputedStyle(e).visibility!=='hidden'&&(r.right>innerWidth+1||r.left< -1);}).map(e=>({tag:e.tagName,cls:e.className,text:e.textContent.slice(0,90)}))}));
      await page.screenshot({path:path.join(out,route.replaceAll('/','-')+'-'+width+'.png'),fullPage:true});
      await page.screenshot({path:path.join(out,route.replaceAll('/','-')+'-'+width+'-viewport.png')});
      results.push({route,width,errors,failed,layout,violations:axe.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary})).slice(0,6)}))});
      console.log(JSON.stringify(results.at(-1)));
      page.off('pageerror',onError);page.off('response',onResponse);
    }
    await context.close();
  }
  await browser.close();fs.writeFileSync(path.join(out,'audit.json'),JSON.stringify(results,null,2));
})().catch(e=>{console.error(e);process.exitCode=1;});
