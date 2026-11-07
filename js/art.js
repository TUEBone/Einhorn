(function(E){
 const images=new Map(),tinted=new Map();
 const A=E.art={};
 A.image=function(src){let img=images.get(src);if(img){images.delete(src);images.set(src,img);}if(!img){img=new Image();E.assignAsset(img,src);images.set(src,img);if(images.size>72)images.delete(images.keys().next().value);}return img;};
 A.svg=function(body){return 'data:image/svg+xml;charset=utf-8,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><defs><linearGradient id="wood" x2=".7" y2="1"><stop stop-color="#c99163"/><stop offset="1" stop-color="#77503e"/></linearGradient><linearGradient id="purple" x2=".7" y2="1"><stop stop-color="#d4b5e8"/><stop offset="1" stop-color="#8b6fa9"/></linearGradient><linearGradient id="pink" x2=".7" y2="1"><stop stop-color="#f5c0cf"/><stop offset="1" stop-color="#d68ea9"/></linearGradient><linearGradient id="gold" x2=".8" y2="1"><stop stop-color="#fff0b4"/><stop offset="1" stop-color="#c29850"/></linearGradient><linearGradient id="green" x2=".8" y2="1"><stop stop-color="#b5db9e"/><stop offset="1" stop-color="#53846b"/></linearGradient></defs><g stroke="#80677f" stroke-width="2" stroke-linejoin="round">'+body+'</g></svg>');};
 const path=(d,fill,extra='')=>`<path d="${d}" fill="${fill}" ${extra}/>`;
 const rect=(x,y,w,h,fill,r=5,extra='')=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" ${extra}/>`;
 const circle=(x,y,r,fill,extra='')=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" ${extra}/>`;
 const star=(x,y,r,fill)=>path(`M${x} ${y-r}l${r*.3} ${r*.7} ${r*.7} ${r*.3}-${r*.7} ${r*.3}-${r*.3} ${r*.7}-${r*.3}-${r*.7}-${r*.7}-${r*.3} ${r*.7}-${r*.3}Z`,fill,'stroke="none"');
 A.star=function(ctx,x,y,r,fill='#f4ce80'){ctx.save();ctx.fillStyle=fill;ctx.beginPath();ctx.moveTo(x,y-r);ctx.quadraticCurveTo(x+r*.2,y-r*.2,x+r,y);ctx.quadraticCurveTo(x+r*.2,y+r*.2,x,y+r);ctx.quadraticCurveTo(x-r*.2,y+r*.2,x-r,y);ctx.quadraticCurveTo(x-r*.2,y-r*.2,x,y-r);ctx.fill();ctx.restore();};
 A.drawImage=function(ctx,img,x,y,w,h){if(img?.complete&&img.naturalWidth){ctx.drawImage(img,x,y,w,h);return true;}return false;};
 A.cover=function(ctx,img,w,h,dx=0,dy=0){if(!img?.complete||!img.naturalWidth)return;const scale=Math.max(w/img.naturalWidth,h/img.naturalHeight);ctx.drawImage(img,(w-img.naturalWidth*scale)/2+dx,(h-img.naturalHeight*scale)/2+dy,img.naturalWidth*scale,img.naturalHeight*scale);};
 function hsl(r,g,b){r/=255;g/=255;b/=255;const mx=Math.max(r,g,b),mn=Math.min(r,g,b),l=(mx+mn)/2,d=mx-mn;let h=0,s=0;if(d){s=d/(1-Math.abs(2*l-1));h=mx===r?((g-b)/d)%6:mx===g?(b-r)/d+2:(r-g)/d+4;h=(h*60+360)%360;}return[h,s,l];}
 function rgb(h,s,l){const c=(1-Math.abs(2*l-1))*s,x=c*(1-Math.abs((h/60)%2-1)),m=l-c/2;let a=h<60?[c,x,0]:h<120?[x,c,0]:h<180?[0,c,x]:h<240?[0,x,c]:h<300?[x,0,c]:[c,0,x];return a.map(n=>Math.round((n+m)*255));}
 function color(v){if(v==='rainbow')return[300,.65,.7];if(v==='aurora')return[170,.65,.68];if(v==='stardust')return[46,.7,.73];if(v==='moon')return[225,.3,.83];if(!/^#[0-9a-f]{6}$/i.test(v||''))return null;return hsl(parseInt(v.slice(1,3),16),parseInt(v.slice(3,5),16),parseInt(v.slice(5,7),16));}
 A.frame=function(id,anim,index,look){
  const img=A.image(`assets/ponies/${id}/${anim}.webp`);if(!img.complete||!img.naturalWidth)return null;
  const edited=look&&Object.keys(look).some(k=>['coat','mane','tail','style'].includes(k));
  if(!edited)return{img,sx:index*256,sy:0,sw:256,sh:256};
  const key=id+anim+index+JSON.stringify(look);if(tinted.has(key))return{img:tinted.get(key),sx:0,sy:0,sw:256,sh:256};
  const canvas=document.createElement('canvas');canvas.width=canvas.height=256;const c=canvas.getContext('2d',{willReadFrequently:true});c.drawImage(img,index*256,0,256,256,0,0,256,256);
  let ready=true;
  // Exported aligned masks allow local-file recoloring without canvas pixel reads.
  for(const region of ['coat','mane','tail'])if(look[region]){
   const mask=A.image(`assets/ponies/${id}/masks/${anim}-${region}.png`);if(!mask.complete||!mask.naturalWidth){ready=false;continue;}
   const layer=document.createElement('canvas');layer.width=layer.height=256;const lc=layer.getContext('2d');
   let fill=look[region];if(['rainbow','aurora','stardust','moon'].includes(fill)){
    const g=lc.createLinearGradient(0,0,100,256);const colors=fill==='rainbow'?['#ef8ca7','#f0c16b','#9ccc9b','#78c7df','#ad87d6']:fill==='aurora'?['#83d8c7','#9cbce3','#bd97d8']:fill==='stardust'?['#ffe2a0','#e9b96e','#f8dfad']:['#e6e8fc','#bacbe5','#c8b5e6'];colors.forEach((v,i)=>g.addColorStop(i/(colors.length-1),v));fill=g;
   }lc.fillStyle=fill;lc.fillRect(0,0,256,256);lc.globalCompositeOperation='destination-in';lc.drawImage(mask,index*256,0,256,256,0,0,256,256);c.globalCompositeOperation=region==='coat'?'multiply':'color';c.drawImage(layer,0,0);c.globalCompositeOperation='source-over';
  }
  // Re-arrange the original detailed lower-mane texture on its aligned layer.
  if(look.style&&look.style!=='waves'){
   const left=anim==='run_left',front=anim==='run_down'||anim==='run_up';
   const mask=A.image(`assets/ponies/${id}/masks/${left?'run_right':anim}-mane.png`);
   if(mask.complete&&mask.naturalWidth){
    const canonical=document.createElement('canvas');canonical.width=canonical.height=256;const cc=canonical.getContext('2d');
    if(left){cc.translate(256,0);cc.scale(-1,1);}cc.drawImage(canvas,0,0);cc.setTransform(1,0,0,1,0,0);
    const lower=document.createElement('canvas');lower.width=lower.height=256;const lc=lower.getContext('2d');lc.drawImage(canonical,0,0);lc.globalCompositeOperation='destination-in';lc.drawImage(mask,index*256,0,256,256,0,0,256,256);lc.clearRect(0,0,256,104);
    cc.globalCompositeOperation='destination-out';cc.drawImage(lower,0,0);cc.globalCompositeOperation='source-over';
    // Reconstruct only coat exposed by a shorter or gathered mane.
    const under=document.createElement('canvas');under.width=under.height=256;const uc=under.getContext('2d'),base=look.coat?.startsWith('#')?look.coat:E.byId(E.ponies,id).coat;
    const shade=uc.createLinearGradient(110,110,175,180);shade.addColorStop(0,base);shade.addColorStop(1,base);uc.fillStyle=shade;
    uc.beginPath();uc.ellipse(front?128:133,160,front?34:46,27,0,0,Math.PI*2);uc.fill();uc.beginPath();uc.moveTo(front?109:148,162);uc.quadraticCurveTo(front?105:147,119,front?112:164,100);uc.lineTo(front?145:184,119);uc.lineTo(front?148:174,163);uc.closePath();uc.fill();uc.globalCompositeOperation='destination-in';uc.drawImage(lower,0,0);cc.drawImage(under,0,0);
    const anchor=front?128:149;
    if(look.style==='short'){cc.save();cc.translate(anchor,104);cc.scale(1,.48);cc.translate(-anchor,-104);cc.drawImage(lower,0,0);cc.restore();}
    else if(look.style==='updo'){cc.drawImage(lower,front?84:108,104,front?88:90,116,front?105:116,47,front?54:65,59);}
    else for(let y=104;y<238;y+=2){const progress=Math.min(1,(y-104)/50),scale=look.style==='braid'?1-progress*.52:1.05,shift=look.style==='braid'?Math.sin(y*.32)*2.3:Math.sin(y*.28)*6;cc.drawImage(lower,0,y,256,2,anchor+(0-anchor)*scale+shift,y,256*scale,2);}
    c.clearRect(0,0,256,256);c.save();if(left){c.translate(256,0);c.scale(-1,1);}c.drawImage(canonical,0,0);c.restore();
   }else ready=false;
  }
  if(tinted.size>72)tinted.delete(tinted.keys().next().value);if(ready)tinted.set(key,canvas);return{img:canvas,sx:0,sy:0,sw:256,sh:256};
 };
 A.pony=function(ctx,{id=E.state.selected,anim='idle',frame,x,y,size,look,shadow=true,flip=false,alpha=1,time=E.now||0,scaleY=1}){
  if(!Number.isFinite(x+y+size))return;
  const fps=anim.startsWith('run')?10:anim==='idle'||anim==='sleep'?4:8;const i=frame??(E.reduced&&['idle','sleep'].includes(anim)?0:Math.floor(time*fps)%8);
  const f=A.frame(id,anim,i,look??(id===E.state.selected?E.look():{}));
  ctx.save();ctx.globalAlpha=alpha;if(shadow){ctx.fillStyle='#253b4130';ctx.beginPath();ctx.ellipse(x,y-size*.06,size*.31,size*.046,0,0,Math.PI*2);ctx.fill();}
  ctx.translate(x,y);if(flip)ctx.scale(-1,1);ctx.scale(1,scaleY);
  if(f)ctx.drawImage(f.img,f.sx,f.sy,f.sw,f.sh,-size/2,-size,size,size);
  else{const portrait=A.image(`assets/ponies/${id}/portrait.webp`);A.drawImage(ctx,portrait,-size/2,-size,size,size);}
  const accessory=(look??E.look()).accessory;if(accessory&&accessory!=='none')A.accessory(ctx,accessory,anim,size,id,i);
  ctx.restore();
 };
 const accessories={
 bow:path('M100 80Q59 47 62 79Q62 104 99 88Q139 116 141 85Q144 53 100 80Z','url(#pink)')+circle(101,84,9,'url(#gold)'),
 flower:Array.from({length:6},(_,j)=>`<ellipse cx="100" cy="78" rx="13" ry="23" fill="#fff4d8" transform="rotate(${j*60} 100 100)"/>`).join('')+circle(100,100,15,'url(#gold)'),
 crown:path('M49 124L39 61L76 83L100 39L125 83L161 61L151 124Z','url(#gold)')+circle(100,98,12,'#d49ad0')+path('M53 129H148','none','stroke="#f9e3a1" stroke-width="6"'),
 glasses:path('M35 74Q61 60 92 74L86 112Q54 132 39 101ZM108 74Q139 60 165 74L161 101Q145 132 114 112Z','#534268')+path('M91 81H109M43 73L26 65M158 73L174 65','none','stroke-width="6"')+path('M46 79L70 106M120 79L144 106','none','stroke="#b8e9f4" stroke-width="5"'),
 necklace:path('M40 52Q99 142 160 52','none','stroke="#d7af62" stroke-width="10"')+path('M98 114C77 93 59 120 83 137L100 150L119 135C139 117 118 96 98 114Z','#e6a1c8'),
 wings:path('M115 150Q37 136 34 45Q71 54 96 111Q79 36 97 24Q135 61 136 108Q154 60 171 67Q178 120 140 156Z','url(#purple)'),
 ribbon:path('M78 63Q51 44 54 70Q55 88 80 77Q104 96 108 75Q112 51 83 64Z','url(#pink)')+path('M77 75L65 135L86 124L101 141L95 77Z','url(#pink)'),
 starclip:star(100,100,54,'url(#gold)')+circle(100,100,9,'#ecb2d6'),
 anklets:path('M45 86Q100 123 153 86L153 119Q100 149 45 119Z','url(#gold)')+star(100,126,15,'#d3b7ed'),
 flowercrown:Array.from({length:7},(_,i)=>circle(35+i*22,98-Math.sin(i/6*Math.PI)*28,13,i%2?'#f8d6e8':'#fff1b8')+circle(35+i*22,98-Math.sin(i/6*Math.PI)*28,4,'#dbb964')).join('')
 };
 A.accessory=function(ctx,id,anim,size,ponyId,frame=0){const body=accessories[id];if(!body)return;const rear=anim==='run_up',front=anim==='run_down';if(rear&&['glasses','necklace'].includes(id))return;let ax=front||rear?128:182,ay=front||rear?66:70,s=37;
  if(id==='glasses'){ay=front?91:88;s=front?64:43;}if(id==='crown'||id==='flowercrown'){ay=front?48:43;s=58;}if(id==='necklace'){ax=front?128:173;ay=137;s=52;}if(id==='wings'){if(['astra','solara','nyx'].includes(ponyId))return;ax=128;ay=134;s=86;}if(id==='ribbon'){ax=rear?129:78;ay=rear?159:150;s=39;}if(id==='anklets'){ax=front?115:155;ay=215;s=28;}
  const rig=E.rigs?.[ponyId]?.[anim]?.[frame];if(rig){const e=rig.eye;if(['bow','flower','starclip'].includes(id)){ax=rig.bow[0];ay=rig.bow[1];}if(id==='glasses'){ax=e[0]+(front?0:8);ay=e[1];s=front?64:55;}if(id==='crown'||id==='flowercrown'){ax=front||rear?128:e[0]+2;ay=e[1]-44;}if(id==='necklace'){ax=rig.neck[0];ay=rig.neck[1];}if(id==='ribbon'){ax=rig.tail[0];ay=rig.tail[1];}if(id==='anklets'){ax=rig.foot[0];ay=rig.foot[1];}}
  const img=A.image(A.svg(body));if(img.complete&&img.naturalWidth){ctx.save();if(anim==='run_left')ctx.scale(-1,1);ctx.drawImage(img,(ax-s/2-128)*size/256,(ay-s/2-256)*size/256,s*size/256,s*size/256);ctx.restore();}
 };
 A.furniture=id=>'assets/furniture/'+id+'.webp';
 A.plant=function(plant,progress=1){const color=plant.color==='rainbow'?'#c69fda':plant.color;let s=path('M100 187V108M100 151Q68 152 62 124Q94 119 100 151M100 136Q127 111 144 121Q142 148 100 143','url(#green)');if(progress<.35)s=path('M100 187V155M100 170Q70 153 76 145Q99 141 100 162M100 165Q124 144 131 154Q133 175 100 172','url(#green)');else s+=Array.from({length:6},(_,j)=>`<ellipse cx="100" cy="72" rx="17" ry="29" fill="${plant.color==='rainbow'?['#ef9da9','#f3c66a','#eade99','#a8ce95','#90cfd8','#c49bd8'][j]:color}" transform="rotate(${j*60} 100 100)"/>`).join('')+circle(100,100,17,'#e5be70');return A.svg(s);};
 A.food=function(id){const f={apple:path('M101 66Q55 30 35 81Q27 142 79 166Q98 173 109 163Q158 172 170 111Q185 51 135 53L101 66Z','#df7e93')+path('M101 65L106 25Q139 13 149 29Q131 53 109 42','url(#green)'),carrot:path('M67 75L147 100L70 184Q46 202 47 173Z','#e7a05e')+path('M100 82L83 19M110 86L126 20M123 91L168 48','none','stroke="#7bad83" stroke-width="12"'),berry:path('M42 65Q100 34 160 67Q145 139 102 181Q56 145 42 65Z','#d87998')+path('M50 65L38 30L79 46L104 19L124 46L163 31L151 72L104 53Z','url(#green)'),pear:path('M103 29Q79 30 83 68Q78 97 51 120Q32 168 89 181Q151 193 158 145Q159 121 129 90Q112 70 119 38Z','#b0c97b'),sugar:path('M37 81L100 44L165 80V150L100 187L37 150Z','#fff4e0')+path('M37 81L100 117L165 80M100 117V187','none'),oats:rect(36,79,130,100,'url(#wood)',23)+path('M67 75L70 32M101 74L100 22M133 76L131 35','none','stroke="#ddb967" stroke-width="8"'),cupcake:path('M47 111H156L139 179H64Z','url(#purple)')+path('M38 113Q24 83 57 71Q52 39 85 41Q107 11 126 44Q157 45 151 70Q183 80 166 112Z','url(#pink)')+circle(102,30,12,'#dd8798'),magic:star(100,104,73,'url(#gold)')+star(100,105,43,'#f5dda4')};return A.svg(f[id]||f.apple);};
 A.pile=A.svg(path('M31 165Q11 142 43 123Q27 103 66 88Q53 71 92 61Q88 43 114 35Q104 68 140 79Q163 88 149 109Q185 119 173 143Q195 172 154 178H54Z','#a77955')+path('M43 123Q93 142 150 110M66 89Q113 110 140 79','none','stroke="#805c43" stroke-width="4"')+path('M52 153Q96 169 153 149','none','stroke="#c89c72" stroke-width="4"'));
})(EW);
