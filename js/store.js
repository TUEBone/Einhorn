(function(E){
 const KEY='einhorn-world-v2';
 const clone=x=>JSON.parse(JSON.stringify(x));
 const integer=(x,min=0,max=1e9)=>Number.isSafeInteger(x)&&x>=min&&x<=max;
 const known=(xs,list)=>Array.isArray(xs)?[...new Set(xs.filter(x=>typeof x==='string'&&list.includes(x)))]:[];
 E.fresh=()=>({version:2,stars:0,activeSeconds:0,selected:'luna',names:{luna:'Luna'},looks:{},owned:['none','bow','flower','waves','short','apple','carrot'],home:[],hiddenFurniture:[],needs:{hunger:70,clean:80,love:80,rest:90},garden:[null,null,null],progress:{run:0,flight:0,memory:0,harvests:0,cleanup:0,fetch:0},care:{},paint:{},paintPaid:[],paintOwned:[],rewardTimes:{fetch:0},announced:['luna'],sound:false,started:false});
 E.sanitize=function(raw){
  if(!raw||raw.version!==2||!integer(raw.stars,0,1e8)||typeof raw.sound!=='boolean')throw Error('Der Spielstand ist ungültig.');
  const s=E.fresh();s.stars=raw.stars;s.sound=raw.sound;s.started=!!raw.started;
  s.activeSeconds=typeof raw.activeSeconds==='number'&&isFinite(raw.activeSeconds)?Math.max(0,Math.min(1e9,raw.activeSeconds)):0;
  s.selected=E.ponies.some(p=>p.id===raw.selected&&p.seconds<=s.activeSeconds)?raw.selected:'luna';
  for(const p of E.ponies){if(typeof raw.names?.[p.id]==='string')s.names[p.id]=raw.names[p.id].trim().slice(0,24)||p.name;const l=raw.looks?.[p.id];if(l&&typeof l==='object'){s.looks[p.id]={};for(const k of ['coat','mane','tail'])if(E.colors.some(c=>c.id===l[k]))s.looks[p.id][k]=l[k];if(E.styles.some(x=>x.id===l.style))s.looks[p.id].style=l.style;if(E.accessories.some(x=>x.id===l.accessory))s.looks[p.id].accessory=l.accessory;if(['none','spots','sparkles'].includes(l.pattern))s.looks[p.id].pattern=l.pattern;}}
  const valid=[...E.accessories,...E.styles,...E.food,...E.colors].map(x=>x.id).concat(['spots','sparkles','none-pattern']);
  s.owned=[...new Set([...s.owned,...known(raw.owned,valid)])];
  // Imported outfits cannot equip unpurchased special colors or accessories.
  for(const look of Object.values(s.looks))for(const [k,id] of Object.entries(look)){if(k==='pattern')continue;const list=k==='style'?E.styles:k==='accessory'?E.accessories:E.colors;const item=E.byId(list,id);if(item?.price&&!s.owned.includes(id))delete look[k];}
  s.home=known(raw.home,E.furniture.map(x=>x.id));s.hiddenFurniture=known(raw.hiddenFurniture,s.home);
  for(const k of Object.keys(s.needs))if(integer(raw.needs?.[k],0,100))s.needs[k]=raw.needs[k];
  for(const k of Object.keys(s.progress))if(integer(raw.progress?.[k]))s.progress[k]=raw.progress[k];
  s.progress.run=Math.min(10,s.progress.run);s.progress.flight=Math.min(5,s.progress.flight);
  if(Array.isArray(raw.garden)&&raw.garden.length===3)s.garden=raw.garden.map(p=>p&&E.byId(E.plants,p.kind)&&integer(p.readyAt,0,Number.MAX_SAFE_INTEGER)?{kind:p.kind,readyAt:p.readyAt,plantedAt:integer(p.plantedAt,0,Number.MAX_SAFE_INTEGER)?p.plantedAt:0}:null);
  for(const p of E.ponies)for(const type of ['brush','wash']){const id=p.id+':'+type,v=raw.care?.[id];if(v&&typeof v==='object')s.care[id]={seconds:Math.max(0,Math.min(10,Number(v.seconds)||0)),cells:known(v.cells,Array.from({length:64},(_,i)=>String(i))),done:!!v.done,rewarded:!!v.rewarded};}
  if(raw.paint&&typeof raw.paint==='object')for(let n=0;n<10;n++){const page=raw.paint[n];if(page&&typeof page==='object'){s.paint[n]={};for(const [key,val] of Object.entries(page))if(/^f\d{1,3}$/.test(key)&&Number(key.slice(1))<E.paintFieldCounts[n]&&(E.paintColors.includes(val)||/^glitter[0-3]$/.test(val)))s.paint[n][key]=val;}}
  s.paintPaid=known(raw.paintPaid,Array.from({length:10},(_,i)=>String(i)));s.paintOwned=known(raw.paintOwned,['glitter0','glitter1','glitter2','glitter3']);if(integer(raw.rewardTimes?.fetch,0,Number.MAX_SAFE_INTEGER))s.rewardTimes.fetch=raw.rewardTimes.fetch;s.announced=known(raw.announced,E.ponies.map(p=>p.id));return s;
 };
 E.migrate=function(v){
  if(!v||v.version!==1||!integer(v.stars,0,1e8))throw Error('Dieser alte Spielstand ist ungültig.');
  const s=E.fresh();s.stars=v.stars;s.names.luna=typeof v.name==='string'?v.name.slice(0,24):'Luna';s.started=!!v.started;s.sound=!!v.sound;
  s.looks.luna={...v.look};s.owned=[...s.owned,...(Array.isArray(v.owned)?v.owned:[])];if(s.looks.luna.mane==='rainbow'||s.looks.luna.tail==='rainbow')s.owned.push('rainbow');s.home=v.home||[];s.needs=v.needs||s.needs;s.progress={...s.progress,...v.progress};s.garden=(v.garden||s.garden).map(p=>p?{kind:p.kind,readyAt:p.readyAt,plantedAt:Math.max(0,p.readyAt-(E.byId(E.plants,p.kind)?.seconds||180)*1000)}:null);return E.sanitize(s);
 };
 E.load=function(){try{const saved=localStorage.getItem(KEY);if(saved)return E.sanitize(JSON.parse(saved));const old=localStorage.getItem('einhorn-zauberwelt-v1');if(old)return E.migrate(JSON.parse(old));}catch(e){E.loadError=e.message;}return E.fresh();};
 E.save=function(){try{localStorage.setItem(KEY,JSON.stringify(E.state));return true;}catch{E.toast?.('Der Browser konnte nicht speichern. Sichere deinen Spielstand über das Menü.');return false;}};
 E.encode=function(s=E.state){const json=JSON.stringify(E.sanitize(s)),bytes=new TextEncoder().encode(json);let binary='';for(const b of bytes)binary+=String.fromCharCode(b);return 'EZ2.'+btoa(binary).replaceAll('+','-').replaceAll('/','_').replace(/=+$/,'')+'.'+E.hash(json);};
 E.decode=function(code){const parts=String(code).trim().split('.');if(parts.length!==3||!['EZ1','EZ2'].includes(parts[0])||!/^[-\w]+$/.test(parts[1])||!/^[0-9a-f]{8}$/.test(parts[2])||parts[1].length>200000)throw Error('Bitte den vollständigen Speichercode einfügen.');try{const bytes=Uint8Array.from(atob(parts[1].replaceAll('-','+').replaceAll('_','/')),c=>c.charCodeAt(0));const json=new TextDecoder('utf-8',{fatal:true}).decode(bytes);if(E.hash(json)!==parts[2])throw Error();let data=JSON.parse(json);if(parts[0]==='EZ1'){if(!Array.isArray(data)||data.length!==10)throw Error();data={version:1,name:data[0],stars:data[1],look:Object.fromEntries(['coat','mane','tail','style','pattern','accessory'].map((k,i)=>[k,data[2][i]])),owned:data[3],needs:Object.fromEntries(['hunger','clean','love','rest'].map((k,i)=>[k,data[4][i]])),home:data[5],garden:data[6].map(p=>p?{kind:p[0],stage:p[1],readyAt:p[2]}:null),progress:Object.fromEntries(['run','flight','memory','harvests'].map((k,i)=>[k,data[7][i]])),sound:!!data[8],started:!!data[9]};return E.migrate(data);}return E.sanitize(data);}catch{throw Error('Der Speichercode ist beschädigt oder unvollständig.');}};
 E.look=()=>E.state.looks[E.state.selected]||{};
 E.isUnlocked=id=>(E.byId(E.ponies,id)?.seconds??Infinity)<=E.state.activeSeconds;
 E.owns=item=>!item.price||E.state.owned.includes(item.id);
 E.buy=function(item,after){if(E.owns(item)){after?.();return;}if(E.state.stars<item.price){E.toast(`Dir fehlen noch ${item.price-E.state.stars} Sterne.`);return;}E.state.stars-=item.price;E.state.owned.push(item.id);after?.();E.save();E.updateHUD?.();E.sound?.('buy');};
 E.reward=function(n){n=Math.max(0,Math.min(1000,Math.floor(n)));E.state.stars+=n;E.save();E.updateHUD?.();E.toast?.(`✦ ${n} Sterne gesammelt`);};
 E.state=E.load();E.KEY=KEY;E.clone=clone;
})(EW);
