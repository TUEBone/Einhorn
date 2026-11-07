/* Lazy, local-file-compatible image packs. Original image bytes are unchanged. */
(function(E){
 const data=new Map(),states=new Map(),images=new Map(),backgrounds=new Map();
 const empty='data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
 function external(src){return /^(data:|blob:|https?:)/.test(src||'');}
 function message(){const busy=[...states.values()].some(s=>s==='loading');let el=document.querySelector('#asset-loading');if(!el){el=document.createElement('div');el.id='asset-loading';el.setAttribute('role','status');el.style.cssText='position:fixed;bottom:10px;right:14px;z-index:40;padding:8px 13px;border-radius:12px;background:#fff7e7e8;color:#7e628f;font:11px Trebuchet MS,sans-serif;pointer-events:none';document.body.append(el);}el.textContent='Deine Zauberwelt wird geladen …';el.hidden=!busy;}
 function request(path){const pack=E.assetManifest[path];if(!pack){console.error('Bild fehlt im Paket:',path);return;}if(states.has(pack))return;states.set(pack,'loading');const script=document.createElement('script');script.src='assets/packs/'+pack;script.async=true;script.onload=()=>{states.set(pack,'ready');message();};script.onerror=()=>{states.set(pack,'failed');message();E.toast?.('Ein Bildpaket konnte nicht geladen werden. Bitte die Seite neu laden.');};document.head.append(script);if(document.body)message();}
 E.assetURL=function(path){if(external(path))return path;if(data.has(path))return data.get(path);request(path);return empty;};
 E.assignAsset=function(img,path){if(external(path)){img.src=path;return;}if(data.has(path)){img.src=data.get(path);return;}let list=images.get(path);if(!list){list=new Set();images.set(path,list);}list.add(img);request(path);};
 E.assetImage=function(path,attributes=''){return `<img src="${E.assetURL(path)}" data-asset="${path}" ${attributes}>`;};
 E.assetBackground=function(el,path){el.dataset.assetBackground=path;if(data.has(path)){el.style.backgroundImage=`url("${data.get(path)}")`;return;}let list=backgrounds.get(path);if(!list){list=new Set();backgrounds.set(path,list);}list.add(el);request(path);};
 E.registerAssets=function(bundle){for(const [path,url]of Object.entries(bundle)){
   data.set(path,url);const waiting=images.get(path);if(waiting){for(const img of waiting)img.src=url;images.delete(path);}
   const bg=backgrounds.get(path);if(bg){for(const el of bg)if(el.dataset.assetBackground===path)el.style.backgroundImage=`url("${url}")`;backgrounds.delete(path);}
  }
  document.querySelectorAll('img[data-asset]').forEach(img=>{const value=data.get(img.dataset.asset);if(value&&img.getAttribute('src')!==value)img.src=value;});
 };
 E.assetPackState=()=>Object.fromEntries(states);
})(EW);
