import {chromium} from '/Users/olli/.openclaw/workspace/projects/lantern-depths/node_modules/playwright/index.mjs';
import {mkdir,writeFile,readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import assert from 'node:assert/strict';
import {createServer} from '../server.mjs';
import {route} from './route.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
await mkdir(path.join(root,'test-results'),{recursive:true});await mkdir(path.join(root,'.tmp'),{recursive:true});
const server=createServer();await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));const url=`http://127.0.0.1:${server.address().port}`;
const context=await chromium.launchPersistentContext(path.join(root,'.browser-profile'),{headless:true,viewport:{width:1440,height:1080},deviceScaleFactor:1,env:{...process.env,TMPDIR:path.join(root,'.tmp')},args:['--disable-background-networking']});
const buildFiles=['index.html','style.css','js/content.js','js/engine.js','js/art.js','js/app.js','server.mjs'];
async function buildDigest(){const hash=createHash('sha256');for(const file of buildFiles){hash.update(file);hash.update(await readFile(path.join(root,file)));}return hash.digest('hex');}
const buildSha256=await buildDigest();
const errors=[],external=[],screenshots=[];let checks=0;
context.on('page',p=>p.on('pageerror',e=>errors.push(e.message)));
context.on('request',r=>{if(!r.url().startsWith(url)&&!r.url().startsWith('data:'))external.push(r.url());});
const page=context.pages()[0]||await context.newPage();page.on('pageerror',e=>errors.push(e.message));
const screenshot=async(name,p=page)=>{await p.screenshot({path:path.join(root,'test-results',name+'.png'),fullPage:true});screenshots.push(name+'.png');};
async function command(p,step,mobile=false){const [type,a,b]=step;const click=async loc=>mobile?loc.tap():loc.click();
 if(type==='start'){await click(p.locator('#start'));return;}
 if(type==='move'){await click(p.locator(`[data-room="${a}"]`));return;}
 if(type==='act'){await click(p.locator(`[data-verb="${a}"]`));await click(p.locator(`[data-${mobile?'object':'hotspot'}="${b}"]`));return;}
 if(type==='use'){await click(p.locator('[data-verb="use"]'));await click(p.locator(`[data-item="${a}"]`));await click(p.locator(`[data-${mobile?'object':'hotspot'}="${b}"]`));return;}
 if(type==='combine'){await click(p.locator('[data-verb="use"]'));await click(p.locator(`[data-item="${a}"]`));await click(p.locator(`[data-item="${b}"]`));return;}
 if(type==='choose'){await click(p.locator(`[data-choice="${a}"]`));return;}
 if(type==='code'){await p.locator('#team-code').fill(a);await p.locator('#dialogue form button').click();return;}
}
try{
 await page.goto(url);await page.evaluate(()=>localStorage.clear());await page.reload();await screenshot('01-title');
 const canvasProof=await page.locator('#title-canvas').evaluate(c=>{const d=c.getContext('2d').getImageData(0,0,c.width,c.height).data;const colors=new Set();for(let i=0;i<d.length;i+=4)colors.add(`${d[i]},${d[i+1]},${d[i+2]}`);return colors.size;});assert(canvasProof>20);checks++;
 let reloaded=false;
 for(let i=0;i<route.length;i++){
  const step=route[i];await command(page,step);
  if(step[0]==='start')await screenshot('02-newsroom');
  if(step[0]==='act'&&step[1]==='take'&&step[2]==='firefox')await screenshot('16-archive-shelf-after-pickup');
  if(step[0]==='choose'&&step[1]==='offline')await screenshot('17-sensor-unlocked');
  if(step[0]==='choose'&&step[1]==='b2'){assert.equal(await page.evaluate(()=>document.activeElement?.dataset.focus),'choice-wp');checks++;}
  if(step[0]==='move'&&['archive','workshop','lab','quay','server'].includes(step[1]))await screenshot('room-'+step[1]);
  if(step[0]==='act'&&step[2]==='andre')await screenshot('03-andre-dialogue');
  if(step[0]==='combine'&&step[1]==='coil'){await page.locator('[data-item="pack"]').click();await page.locator('[data-hotspot="ghost"]').hover();await screenshot('04-inventory-hover');await page.locator('#cancel-item').click();}
  if(step[0]==='use'&&step[1]==='pack'){assert.equal(await page.locator('[data-hotspot="ghost"]').count(),0);checks++;await screenshot('05-workshop-cleared');}
  if(step[0]==='use'&&step[1]==='diagnostic'){
   const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('caschy-adventure-404-v1')).state);await page.reload();await page.locator('#resume').click();const after=await page.evaluate(()=>JSON.parse(localStorage.getItem('caschy-adventure-404-v1')).state);assert.deepEqual(after,saved);assert.equal(await page.locator('[data-item="battery"]').count(),1);reloaded=true;checks++;await screenshot('06-lab-repaired');
  }
  if(step[0]==='code'){await screenshot('07-team-unlocked');}
  if(step[0]==='use'&&step[1]==='publish')await screenshot('08-core');
  if(step[0]==='act'&&step[2]==='headline'){
   await screenshot('09-finale-choice');
   // Exercise the comic alternative in the real UI, then recover before the route's winning choice.
   await page.locator('[data-choice="bait"]').click();assert.equal(await page.locator('#ending-title').innerText(),'Der Preis der Klicks');await screenshot('10-affiliate-ending');await page.locator('#return-headline').click();await command(page,['act','use','headline']);checks++;
  }
 }
 assert(reloaded);assert.equal(await page.locator('#ending-title').innerText(),'Das Blog ist wieder da.');await screenshot('11-good-ending');checks++;
 const won=await page.evaluate(()=>JSON.parse(localStorage.getItem('caschy-adventure-404-v1')).state);assert(won.flags.won);assert.equal(won.slots.length,4);checks++;
 await page.locator('#explore').click();assert.equal(await page.locator('#room-name').innerText(),'Redaktion');await page.locator('#restart').click();await page.locator('#restart-cancel').click();assert(await page.locator('[data-room="core"]').isEnabled());checks++;
 // Every surviving hotspot gets a normal mouse click for visible coverage, with optional use/talk actions safe after victory.
 for(const room of ['newsroom','archive','workshop','lab','quay','server','core']){
  await command(page,['move',room]);await page.locator('[data-verb="look"]').click();
  const ids=await page.locator('[data-hotspot]').evaluateAll(nodes=>nodes.map(n=>n.dataset.hotspot));
  for(const id of ids){await page.locator(`[data-hotspot="${id}"]`).click();assert((await page.locator('#message').innerText()).length>20);checks++;}
 }
 assert.equal(await page.locator('#discoveries').innerText(),'55 / 55 Entdeckungen');checks++;
 await page.locator('#sound').click();assert.equal(await page.locator('#sound').getAttribute('aria-pressed'),'true');await page.locator('#sound').click();checks++;
 // Keyboard interaction, wrong answer, hint tiers, and reset use the real UI.
 await page.locator('#restart').click();await page.locator('#restart-confirm').click();assert.equal(await page.locator('[data-item]').count(),0);checks++;
 await page.keyboard.press('2');assert.equal(await page.locator('[data-verb="take"]').getAttribute('aria-pressed'),'true');await page.locator('[data-object="usb"]').focus();await page.keyboard.press('Enter');assert.equal(await page.locator('[data-item="usb"]').count(),1);checks++;
 await page.locator('[data-room="archive"]').focus();await page.keyboard.press('Enter');await page.keyboard.press('3');await page.locator('[data-object="forum"]').focus();await page.keyboard.press('Enter');await page.locator('[data-choice="cache"]').focus();await page.keyboard.press('Enter');assert.equal(await page.locator('[data-choice="kaschi"]').count(),1);await page.locator('[data-choice="kaschi"]').focus();await page.keyboard.press('Enter');assert.equal(await page.evaluate(()=>document.activeElement?.dataset.focus),'object-forum');checks++;
 await page.locator('#hint').click();assert.match(await page.locator('#message').innerText(),/Hinweis 1\/3/);await page.locator('#hint').click();await page.locator('#hint').click();assert.match(await page.locator('#message').innerText(),/Hinweis 3\/3/);checks++;
 // Touch route is independent, starts from a clean browser context and ends in a genuine win.
 const mobileContext=await context.browser().newContext({viewport:{width:390,height:844},deviceScaleFactor:1,isMobile:true,hasTouch:true,reducedMotion:'reduce'});
 const mobile=await mobileContext.newPage();mobile.on('pageerror',e=>errors.push(e.message));mobile.on('request',r=>{if(!r.url().startsWith(url)&&!r.url().startsWith('data:'))external.push(r.url());});await mobile.goto(url);await screenshot('12-mobile-title',mobile);
 for(const step of route){await command(mobile,step,true);
  if(step[0]==='start'){await screenshot('13-mobile-newsroom',mobile);assert(await mobile.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth));checks++;}
  if(step[0]==='act'&&step[2]==='felix'){await screenshot('14-mobile-dialogue',mobile);assert(await mobile.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth));checks++;}
 }
 assert.equal(await mobile.locator('#ending-title').innerText(),'Das Blog ist wieder da.');await screenshot('15-mobile-ending',mobile);assert(await mobile.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth));checks++;
 await mobileContext.close();assert.deepEqual(errors,[]);assert.deepEqual(external,[]);checks+=2;
 assert.equal(await buildDigest(),buildSha256);checks++;
 const report={passed:true,checks,buildSha256,buildFiles,immutableBuildVerified:true,desktopFullRoute:true,mobileTouchFullRoute:true,midRouteReload:true,alternateEndingRecovery:true,keyboardInteraction:true,allSurvivingHotspotsClicked:true,externalRequests:external,pageErrors:errors,canvasUniqueColors:canvasProof,screenshots,browser:context.browser().version(),viewportDesktop:'1440x1080',viewportMobile:'390x844',reducedMotionMobile:true};
 await writeFile(path.join(root,'test-results','browser-report.json'),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report,null,2));
}catch(e){await screenshot('failure');throw e;}finally{await context.close();await new Promise(resolve=>server.close(resolve));}
