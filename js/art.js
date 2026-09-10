import {ROOMS} from './content.js';
import {visible} from './engine.js';
const P={ink:'#122634',deep:'#101c2a',wall:'#24404b',line:'#43616a',paper:'#ffe9bd',yellow:'#ffc55d',orange:'#ee9056',teal:'#68c6b2',white:'#f0e9d6',skin:'#e0ad86',red:'#ec7279'};
function painter(canvas){const c=canvas.getContext('2d');c.imageSmoothingEnabled=false;
 return {c,r:(x,y,w,h,col)=>{c.fillStyle=col;c.fillRect(Math.round(x),Math.round(y),Math.round(w),Math.round(h));},
 t:(str,x,y,size=7,col=P.paper)=>{c.fillStyle=col;c.font=`bold ${size}px monospace`;c.textBaseline='top';c.fillText(str,Math.round(x),Math.round(y));},
 line:(pts,col,w=2)=>{c.strokeStyle=col;c.lineWidth=w;c.beginPath();pts.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.stroke();},
 poly:(pts,col)=>{c.fillStyle=col;c.beginPath();pts.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.closePath();c.fill();}};
}
function person(p,x,y,kind='caschy',scale=1){
 const {r}=p;const q=(a,b,w,h,col)=>r(x+a*scale,y+b*scale,w*scale,h*scale,col);
 const shirts={caschy:'#e5b349',andre:'#9683ba',olli:'#739fc5',felix:'#71aa8c',benny:'#568c9e'};
 q(2,44,23,3,'#10232b');q(6,32,6,13,'#172c3a');q(16,32,6,13,'#172c3a');q(4,43,9,3,P.ink);q(16,43,9,3,P.ink);
 q(4,19,21,16,shirts[kind]);q(1,21,5,14,shirts[kind]);q(24,21,5,14,shirts[kind]);q(1,33,5,5,P.skin);q(24,33,5,5,P.skin);
 q(9,14,11,8,P.skin);q(6,3,17,14,P.skin);q(9,0,11,4,P.skin);q(4,7,2,7,P.skin);q(23,7,2,7,P.skin);
 if(kind==='caschy'){
  q(5,8,8,5,P.ink);q(16,8,8,5,P.ink);q(7,9,4,2,'#a6d0d3');q(18,9,4,2,'#a6d0d3');q(13,9,3,2,P.ink);
  q(6,14,18,5,P.white);q(9,18,12,5,P.white);q(12,23,6,2,P.white);q(12,16,7,2,'#866753');q(8,27,14,3,P.ink);q(10,26,3,5,P.yellow);
 }else{
  q(7,2,16,4,kind==='benny'?'#e9ba62':'#594338');
  if(kind==='benny'){q(6,0,18,7,'#d2aa63');q(4,6,22,3,'#f0ce83');q(5,20,20,3,P.yellow);}
  if(kind==='andre'){q(7,14,16,5,'#6a5147');q(24,20,8,17,'#adbbc0');q(25,21,4,7,P.teal);}
  if(kind==='olli'||kind==='felix'){q(5,8,9,4,P.ink);q(16,8,9,4,P.ink);q(13,9,3,1,P.ink);q(7,9,4,1,P.white);q(18,9,4,1,P.white);}
  else{q(9,9,3,2,P.ink);q(19,9,3,2,P.ink);}
  q(12,15,7,2,'#a26758');
  if(kind==='olli'){q(0,30,7,4,P.ink);q(2,31,3,2,P.teal);q(12,24,7,6,P.white);}
  if(kind==='felix'){q(19,29,10,10,P.paper);q(21,31,6,1,P.ink);q(21,34,6,1,P.ink);}
 }
}
function object(p,o,s){
 const {r,t,line,poly}=p;const x=o.x*4.8,y=o.y*2.4,w=o.w*4.8,h=o.h*2.4;
 const rim=P.line,accent=ROOMS[s.room].color;const kind=o.kind;
 if(['caschy','andre','olli','felix','benny'].includes(kind)){person(p,x+(w-48)/2,y,kind,Math.min(h/47,w/31));return;}
 if(['monitor','computer','bridge'].includes(kind)){
  r(x,y,w,h*.69,P.ink);r(x+3,y+3,w-6,h*.69-6,rim);r(x+5,y+5,w-10,h*.69-10,'#112e38');r(x+w*.43,y+h*.7,w*.14,h*.16,P.ink);r(x+w*.25,y+h*.83,w*.5,3,P.ink);
  const text={desk:'404',forum:'The Bat!',migration:'b2 -> WP',license:s.flags.voice?'RIGHTS OK':'700 EUR',lock:s.flags.team?'TEAM OK':'__ __ __ __',c64:'READY.',bridge:s.flags.bridge?'LOCAL OK':'NO ROUTE'}[o.id]||'ONLINE';
  t(text,x+8,y+9,o.id==='desk'?16:7,o.id==='desk'?P.red:accent);
  r(x+8,y+h*.49,w*.45,2,accent);r(x+8,y+h*.56,w*.65,1,P.line);
  if(kind==='computer'){r(x-2,y+h*.78,w+4,h*.22,'#bcac8d');for(let i=0;i<10;i++)r(x+3+i*w/11,y+h*.82,3,3,P.ink);}
  if(kind==='bridge'){for(let i=0;i<3;i++){r(x+8+i*24,y+23,12,8,accent);line([[x+14+i*24,y+31],[x+14+i*24,y+40]],P.teal,1);}}
  return;
 }
 if(kind==='shelf'||kind==='cabinet'){
  r(x,y,w,h,'#172c37');r(x+2,y+2,w-4,h-4,'#745b4f');
  for(let j=0;j<(kind==='cabinet'?5:2);j++){
   const yy=y+4+j*(h-5)/(kind==='cabinet'?5:2);r(x+3,yy,w-6,kind==='cabinet'?h/5-3:h/2-3,'#344b53');
   if(kind==='cabinet'){t(['STAHL','BUND','IT','PC','SATURN'][j],x+5,yy+2,6,P.paper);r(x+w-10,yy+3,5,2,accent);}
   else{for(let k=0;k<5;k++)r(x+5+k*(w-8)/5,yy+3,(w-16)/5,h/2-10,[P.teal,P.paper,P.orange,'#7f9fb4',P.yellow][k]);}
  }
  if(o.id==='firefox'&&!s.flags.took_firefox){r(x+7,y+h*.45,w-14,15,P.orange);t(s.flags.forum?'PORTABLE FF':'LOCKED',x+10,y+h*.45+4,7,P.ink);}
  return;
 }
 if(kind==='ghost'){
  const cx=x+w/2;poly([[cx-8,y],[cx+8,y],[cx+16,y+8],[cx+16,y+h-5],[cx+8,y+h-10],[cx,y+h],[cx-8,y+h-10],[cx-16,y+h-5],[cx-16,y+8]],o.id==='ghost'?'#b9b3d7':'#849aa1');
  r(cx-9,y+12,5,6,P.ink);r(cx+4,y+12,5,6,P.ink);t('404',cx-11,y+26,9,P.ink);return;
 }
 if(kind==='door'){
  r(x-3,y-3,w+6,h+6,P.ink);r(x,y,w,h,accent);r(x+4,y+4,w-8,h-8,'#203844');
  for(let i=0;i<3;i++)r(x+8,y+12+i*7,w-16,2,rim);r(x+w-11,y+h*.7,5,3,P.yellow);
  t(o.id==='eu'?(s.flags.clarity?'LOCAL':'EU ×'):'404',x+8,y+h*.45,10,o.id==='eu'?P.teal:P.red);return;
 }
 if(kind==='desk'){
  r(x,y+h*.25,w,h*.4,'#9b7960');r(x-4,y+h*.25,w+8,5,P.paper);r(x+4,y+h*.63,6,h*.37,P.ink);r(x+w-10,y+h*.63,6,h*.37,P.ink);
  if(o.id==='slots'){for(let i=0;i<4;i++){r(x+9+i*(w-18)/4,y+2,(w-25)/4,13,P.ink);if(s.slots.length>i)r(x+12+i*(w-18)/4,y+5,(w-40)/4,7,P.teal);}t('4 STIMMEN',x+15,y+h*.42,7,P.paper);}
  else{r(x+w*.15,y,w*.7,h*.3,P.ink);t('KLARTEXT_',x+w*.22,y+5,8,P.teal);r(x+9,y+h*.45,w*.6,4,P.line);}return;
 }
 if(kind==='algorithm'){
  for(let i=0;i<5;i++){const xx=x+8+i*19;line([[xx,y+h],[xx,y+h-12-i*3],[x+w*.5,y+h*.45]],'#bd686c',2);}
  r(x+9,y+8,w-18,h*.7,'#6b3b55');r(x+3,y+15,w-6,h*.45,'#b6536b');r(x+11,y+21,w-22,h*.34,P.ink);
  r(x+21,y+29,19,9,P.red);r(x+w-40,y+29,19,9,P.red);r(x+26,y+48,w-52,6,P.yellow);
  t('ENGAGEMENT',x+14,y+71,7,P.paper);r(x+w*.4,y,w*.2,8,P.red);return;
 }
 if(kind==='poster'||kind==='paper'||kind==='book'||kind==='calendar'){
  r(x+2,y+2,w,h,'#152d37');r(x,y,w,h,kind==='book'?'#bc7460':P.paper);r(x+3,y+3,w-6,4,accent);
  const texts={hair:['FRISUR','DES MONATS','(leer)'],paper:['SCHUELER','ZEITUNG','C16 > AG','> TEXT'],calendar:['MAERZ','4 / 5','2005'],novel:['DER CACHE','ROMAN','SEITE 1'],firmwarewall:['v1','v2','v3','LOCAL!'],route:['2008 >','POWER >','NBB >','SELBST'],manual:['15 16','17 18','TEAM'],mirror:['MEINUNG','MIT','HALTUNG']}[o.id]||['NOTIZEN'];
  texts.forEach((txt,i)=>t(txt,x+4,y+11+i*9,Math.min(7,(w-7)/txt.length*1.55),P.ink));return;
 }
 if(kind==='box'||kind==='console'||kind==='machine'||kind==='rack'){
  r(x,y,w,h,kind==='rack'?'#152b35':'#ad8964');r(x+3,y+3,w-6,h-6,kind==='rack'?P.line:'#795e4d');
  for(let j=0;j<(kind==='rack'?4:2);j++){r(x+6,y+6+j*9,w-12,5,P.ink);r(x+8,y+7+j*9,3,2,P.teal);}
  if(kind==='machine')t('WEG?',x+8,y+h-12,7,P.paper);
  return;
 }
 if(kind==='pipe'){
  r(x+w*.3,y,w*.5,h,'#657781');r(x,y,w,h*.3,'#81929a');r(x+3,y+2,w-6,h*.18,P.ink);r(x+w*.33,y+h-4,w*.5,4,P.line);return;
 }
 if(kind==='clock'){r(x,y,w,h,P.paper);r(x+3,y+3,w-6,h-6,P.ink);t('17:55',x+4,y+h*.37,Math.min(8,w/4),P.yellow);return;}
 if(kind==='scarf'){r(x,y,w,h*.45,P.yellow);for(let i=0;i<6;i++)r(x+i*w/6,y,w/12,h*.45,P.ink);r(x+w-12,y+2,12,h-2,P.yellow);r(x+w-12,y+h*.6,12,5,P.ink);return;}
 if(kind==='plant'){r(x+w*.3,y+h*.7,w*.5,h*.3,'#ad6e52');r(x+w*.52,y+7,3,h*.65,P.teal);r(x+w*.15,y+10,w*.4,9,'#61a77e');r(x+w*.55,y+18,w*.4,8,'#85c48e');return;}
 if(kind==='boat'){poly([[x,y+h*.4],[x+w,y+h*.4],[x+w*.75,y+h],[x+w*.2,y+h]],'#425761');r(x+w*.3,y,w*.45,h*.4,P.paper);r(x+w*.37,y+3,w*.24,h*.15,'#5d9aab');r(x+w*.6,y-6,2,6,P.ink);return;}
 if(kind==='bird'){poly([[x,y+h*.3],[x+w*.35,y+h*.45],[x+w*.5,y+h*.2],[x+w*.7,y+h*.4],[x+w,y+h*.2],[x+w*.65,y+h*.7],[x+w*.35,y+h*.7]],P.paper);r(x+w*.55,y+h*.4,2,2,P.ink);return;}
 if(kind==='buoy'){r(x+w*.35,y,3,h,P.ink);r(x+2,y+h*.4,w-4,h*.4,P.orange);r(x+2,y+h*.55,w-4,4,P.paper);return;}
 if(kind==='bench'){r(x,y,w,6,'#ad8465');r(x,y+9,w,7,'#ad8465');r(x+4,y+15,4,h-15,P.ink);r(x+w-8,y+15,4,h-15,P.ink);return;}
 if(kind==='cake'){r(x,y+h*.65,w,h*.35,P.paper);r(x+4,y+7,w-8,h*.65,'#c28773');r(x+4,y+7,w-8,5,P.paper);for(let i=0;i<5;i++){r(x+8+i*8,y,2,9,P.teal);r(x+8+i*8,y-3,2,3,P.yellow);}return;}
 if(kind==='beer'||kind==='mug'){r(x+3,y+3,w*.65,h*.8,kind==='beer'?P.yellow:P.paper);r(x+w*.66,y+6,w*.25,h*.45,P.paper);r(x+w*.69,y+9,w*.14,h*.25,P.ink);r(x+3,y,w*.65,5,P.white);return;}
 if(kind==='rss'){r(x,y,w,h,P.orange);t('RSS',x+4,y+h*.45,10,P.ink);r(x+5,y+5,6,6,P.paper);return;}
 if(kind==='pencil'&&!s.flags.ghost){r(x-2,y-3,w+4,h+6,P.ink);r(x,y-1,w,h+2,P.line);r(x+w*.4,y+4,6,7,P.yellow);t('X',x+w*.4,y+3,7,P.ink);return;}
 if(kind==='pencil'){poly([[x,y+h-3],[x+w-5,y],[x+w,y+4],[x+4,y+h]],P.yellow);return;}
 if(kind==='usb'){r(x+2,y+3,w*.65,h*.6,P.teal);r(x+w*.65,y+5,w*.3,h*.4,P.white);r(x+5,y+6,6,2,P.ink);return;}
 if(kind==='sensor'||kind==='tracker'||kind==='meter'){r(x+2,y,w-4,h,P.paper);r(x+5,y+3,w-10,h-8,P.ink);t(kind==='sensor'?'+':kind==='tracker'?'?':'0.4',x+7,y+6,8,accent);if(kind==='sensor'&&!s.flags.bridge){for(let i=0;i<3;i++)r(x+9+i*11,y+2,2,h-4,P.line);r(x+w-14,y+h-12,8,8,P.yellow);}return;}
 r(x,y,w,h,accent);
}
function base(p,room){
 const {r,line,poly,t}=p;
 const colors={newsroom:['#243e49','#574a43'],archive:['#254f52','#3d514b'],workshop:['#37374d','#514759'],lab:['#284b59','#385360'],quay:['#6c6975','#665345'],server:['#213b43','#2e4141'],core:['#442f46','#4b3c51']};
 const [wall,floor]=colors[room];r(0,0,480,240,wall);r(0,165,480,75,floor);r(0,160,480,5,P.ink);
 for(let i=0;i<8;i++)line([[240,165],[i*90-80,240]],'#ffffff0e',1);
 for(let yy=185;yy<240;yy+=21)r(0,yy,480,1,'#ffffff0a');
 if(room==='quay'){
  r(0,0,480,111,'#e1a078');r(0,82,480,76,'#598590');r(0,111,480,4,'#bdc4b4');
  r(332,30,55,4,'#f0cf9e');r(350,23,24,8,'#f0cf9e');r(165,22,30,3,'#f0cf9e');
  r(392,42,5,64,P.ink);line([[352,72],[395,42],[446,72]],P.ink,3);line([[427,62],[427,88]],P.ink,2);
  for(let i=0;i<18;i++)r((i*37)%480,119+(i%4)*9,17,2,'#9db7b1');
  r(0,158,480,7,'#ae8969');for(let xx=0;xx<480;xx+=35)r(xx,164,2,76,'#3d4648');
 }else if(room==='newsroom'){
  r(123,12,128,54,P.ink);r(127,16,120,46,'#649097');r(180,16,3,46,P.ink);r(128,43,119,3,P.ink);
  for(let i=0;i<8;i++)r(130+i*14,43-(i%3)*5,10,18+(i%3)*5,'#436771');
  r(127,11,120,4,P.yellow);r(128,137,170,6,'#b08760');r(135,143,7,36,P.ink);r(282,143,7,36,P.ink);
 }else if(room==='archive'){
  for(let i=0;i<4;i++){r(6+i*122,4,112,5,'#416b68');r(6+i*122,4,2,150,'#416b68');}
  r(81,139,277,7,'#98775a');r(88,146,6,35,P.ink);r(346,146,6,35,P.ink);
 }else if(room==='workshop'){
  for(let i=0;i<13;i++)for(let j=0;j<5;j++)r(124+i*12,20+j*11,2,2,'#646075');
  line([[0,9],[290,9],[290,40]],'#776589',3);r(133,148,213,7,'#947263');
 }else if(room==='lab'){
  for(let i=0;i<8;i++)r(i*65,0,1,160,'#42616c');for(let j=0;j<4;j++)r(0,j*40,480,1,'#42616c');
  line([[155,33],[155,115],[320,115],[320,149]],'#63a99e',2);r(160,147,178,7,P.paper);
 }else if(room==='server'){
  line([[0,10],[115,10],[115,154],[300,154]],'#61a78a',3);line([[470,4],[330,4],[330,151]],'#ab915d',3);
  for(let i=0;i<15;i++)r(i*35,170,20,3,'#152c33');
 }else{
  for(let i=0;i<40;i++){r((i*73)%480,(i*31)%158,2,2,i%3===0?'#bf7b8b':'#6b4a66');}
  for(let i=0;i<7;i++)line([[240,160],[i*90-30,240]],'#805266',1);
  r(0,158,480,4,'#bf717e');t('REICHWEITE ≠ RELEVANZ',122,4,7,'#c995a8');
 }
 r(0,235,480,5,P.ink);
}
export function drawScene(canvas,s){
 canvas.width=480;canvas.height=240;const p=painter(canvas);base(p,s.room);
 if(s.room==='archive'&&s.flags.took_firefox)object(p,ROOMS.archive.objects.find(o=>o.id==='firefox'),s);
 ROOMS[s.room].objects.filter(o=>visible(s,o)).sort((a,b)=>(a.y+a.h)-(b.y+b.h)).forEach(o=>object(p,o,s));
 if(s.room!=='newsroom')person(p,225,177,'caschy',1.2);
 if(s.room==='workshop'&&s.flags.ghost){p.t('CACHE BEREINIGT',214,85,6,P.teal);}
 if(s.room==='lab'&&s.flags.bridge){p.r(170,153,155,2,P.teal);}
}
export function drawTitle(canvas){
 canvas.width=720;canvas.height=360;const p=painter(canvas),{r,line,t}=p;
 r(0,0,720,360,'#142d3b');r(0,240,720,120,'#344448');
 for(let i=0;i<20;i++){r(i*39,36+(i%4)*14,28,200,'#1f3c46');r(i*39+3,50+(i%4)*14,4,3,'#426c72');}
 r(410,37,233,173,'#101f2c');r(416,43,221,158,'#638990');r(422,49,209,146,'#203f4c');
 t('404',445,65,76,P.red);t('PUBLISH NOT FOUND',444,157,15,P.paper);
 r(510,210,27,22,P.ink);r(477,232,94,9,P.ink);r(384,243,292,12,'#c09369');r(396,255,12,75,P.ink);r(650,255,12,75,P.ink);
 for(let i=0;i<6;i++)line([[380,246],[i*160-40,360]],'#566063',1);
 person(p,337,191,'andre',2.5);person(p,587,207,'benny',2.6);person(p,463,232,'caschy',2.6);
 r(681,35,14,57,P.yellow);r(681,49,14,9,P.ink);r(681,70,14,9,P.ink);
 r(0,341,720,19,P.ink);t('EIN UNABHÄNGIGES PIXEL-ADVENTURE',392,347,8,P.teal);
}
export function drawEnding(canvas,bad=false){
 canvas.width=720;canvas.height=300;const p=painter(canvas),{r,t,line}=p;
 r(0,0,720,300,bad?'#653d55':'#c39278');r(0,126,720,80,'#547e87');r(0,196,720,104,'#66574b');
 for(let i=0;i<24;i++)r(i*37%720,132+(i%5)*12,20,2,'#9db7af');
 r(40,45,7,95,P.ink);line([[6,83],[44,45],[97,83]],P.ink,4);r(615,28,55,5,P.paper);r(626,23,31,5,P.paper);
 ['andre','benny','caschy','olli','felix'].forEach((kind,i)=>person(p,185+i*65,129,kind,1.9));
 r(152,206,403,13,P.paper);r(163,219,13,56,P.ink);r(532,219,13,56,P.ink);r(311,188,67,18,'#c57f69');r(308,184,73,7,P.paper);
 for(let i=0;i<5;i++){r(323+i*10,172,2,12,P.teal);r(323+i*10,168,2,4,P.yellow);r(185+i*80,195,12,11,P.yellow);r(185+i*80,193,12,4,P.white);}
 t(bad?'47 KAUFBUTTONS. 0 HALTUNG.':'200 OK. WIR LESEN UNS.',198,41,20,bad?P.yellow:P.ink);
 t(bad?'DAS BIER HAT JETZT EIN ABO.':'KEIN CLICKBAIT. KEIN BULLSHIT. KUCHEN.',190,72,12,bad?P.paper:P.ink);
 if(bad)for(let i=0;i<18;i++)r(i*43%720,90+(i%7)*16,5,7,i%2?P.yellow:P.red);
}
