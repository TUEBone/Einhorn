(function(E){
 E.makeColoring=function(index,saved={},prefix='page'){
  let n=0;const uid=prefix+'-'+index,items=[];
  const fill=v=>v?.startsWith('glitter')?`url(#${uid}-${v})`:v||'#fffefa';
  function shape(tag,attrs){const id='f'+n++;items.push(`<${tag} ${attrs} data-field="${id}" fill="${fill(saved[id])}"/>`);return id;}
  const p=d=>shape('path',`d="${d}"`),c=(x,y,r)=>shape('circle',`cx="${x}" cy="${y}" r="${r}"`),r=(x,y,w,h,rx=8)=>shape('rect',`x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}"`),el=(x,y,rx,ry,a=0)=>shape('ellipse',`cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" transform="rotate(${a} ${x} ${y})"`);
  // Large, closed storybook areas; every numbered region remains visible.
  r(6,6,888,588,15);p('M6 423Q161 373 305 415Q473 372 628 414Q785 374 894 413V594H6Z');
  p('M6 521Q176 477 323 524Q485 486 650 525Q795 494 894 524V594H6Z');
  for(let j=0;j<3;j++){const x=72+j*320,y=65+(j%2)*35;p(`M${x} ${y+26}q-22-15 0-27q5-25 28-16q24-21 43 2q25-3 30 18q23 19 0 28Z`);}
  // Theme elements occupy the upper and side regions, away from the pony.
  if(index===0||index===9){r(348,100,180,155);r(324,134,45,127);r(509,134,45,127);p('M314 135L347 83L379 135Z');p('M499 135L531 83L564 135Z');p('M337 102L437 36L538 102Z');r(414,191,47,64,22);for(let i=0;i<4;i++)r(375+i*34,120,18,34,9);}
  else if(index===1){for(let j=0;j<6;j++)p(`M${230+j*14} 224A${190-j*14} ${190-j*14} 0 0 1 ${610-j*14} 224L${596-j*14} 224A${176-j*14} ${176-j*14} 0 0 0 ${244+j*14} 224Z`);for(let j=0;j<5;j++)r(150+j*114,268,100,22);}
  else if(index===2){r(80,300,180,105);for(let j=0;j<4;j++)r(90+j*42,310,32,34);c(120,377,15);c(174,377,15);c(226,377,15);p('M723 410V288Q754 263 781 288V410Z');el(754,283,48,31);}
  else if(index===3){c(447,103,52);for(let j=0;j<10;j++){const x=75+j*78,y=70+(j%3)*65;p(`M${x} ${y-12}l4 8 9 2-7 6 2 9-8-5-8 5 2-9-7-6 9-2Z`);}for(let j=0;j<2;j++){const x=130+j*620;r(x-10,221,22,200);p(`M${x-63} 300L${x} 147L${x+65} 300Z`);}}
  else if(index===4){c(450,92,47);for(let j=0;j<5;j++)p(`M${30+j*173} 262q45-24 85 0t85 0v32q-40 22-85 0t-85 0Z`);p('M680 279L780 279L752 316H706Z');p('M731 164V275L680 256Z');p('M741 173L786 250H741Z');}
  else if(index===5){r(335,192,220,45);r(358,145,173,47);r(390,106,110,39);for(let j=0;j<5;j++){r(374+j*32,123,10,22);el(379+j*32,115,5,10);}for(let j=0;j<3;j++){r(70+j*120,308,75,90);r(100+j*120,308,16,90);}}
  else if(index===6){c(169,349,67);c(169,244,48);c(169,163,34);p('M143 162L191 162L175 184Z');r(138,114,61,22);r(148,83,40,31);for(let j=0;j<7;j++)c(310+j*78,98+(j%3)*58,8);for(let j=0;j<2;j++){const x=700+j*92;p(`M${x-48} 377L${x} 170L${x+48} 377Z`);}}
  else if(index===7){for(let j=0;j<3;j++){const x=146+j*290;p(`M${x} 307V167Q${x-53} 174 ${x-39} 139Q${x-68} 109 ${x-21} 98Q${x} 54 ${x+24} 98Q${x+71} 109 ${x+41} 141Q${x+58} 175 ${x+9} 167V307Z`);}for(let j=0;j<5;j++)el(70+j*177,333,25,13,j%2?30:-30);}
  else if(index===8){for(let j=0;j<4;j++){const x=135+j*195,y=137+(j%2)*40;el(x,y,58,78);p(`M${x-25} ${y+102}H${x+25}L${x+19} ${y+137}H${x-19}Z`);items.push(`<path d="M${x-30} ${y+68}l10 34m50-34-10 34" fill="none"/>`);p(`M${x-16} ${y-74}Q${x-34} ${y} ${x-13} ${y+74}H${x+13}Q${x+34} ${y} ${x+16} ${y-74}Z`);}}
  if(index===9){for(let j=0;j<4;j++)p(`M${690+j*23} 180q-17 140 3 244h21q-24-116 0-244Z`);for(let j=0;j<3;j++)el(756+j*18,439+j*12,65,12);}
  // Pony: separate legs, hooves, body, face, eyes, hair sections and horn.
  p('M381 422L368 531H398L420 425Z');r(366,519,34,20,5);p('M422 427L427 532H456L454 423Z');r(425,520,34,20,5);p('M517 423L518 532H549L546 421Z');r(516,519,35,21,5);p('M559 417L571 532H601L590 414Z');r(568,519,36,21,5);
  p('M367 372Q395 344 454 359L519 353Q528 317 539 292L580 305L599 373Q606 423 562 443Q489 474 405 438Q362 426 367 372Z');
  p('M370 382Q316 342 288 375Q270 408 301 428Q269 467 298 491Q331 513 355 479Q318 485 327 458Q358 437 338 413Q329 393 371 405Z');
  p('M335 388Q303 377 306 399Q327 427 311 447Q292 473 315 481L300 491Q269 467 301 428Q270 408 288 375Q311 352 335 371Z');
  p('M546 308Q530 290 539 263L535 227Q544 215 564 247Q601 237 627 265Q647 283 634 303L652 322Q658 342 633 351Q607 368 579 348Q547 335 546 308Z');
  p('M539 264Q530 234 537 226Q547 226 564 254Z');p('M546 251L542 234L554 253Z');
  p('M597 251L619 208L626 259Z');p('M608 230L623 239L626 259L600 254Z');
  el(605,294,13,20);el(609,296,7,12);items.push('<ellipse cx="611" cy="299" rx="3" ry="7" fill="#4b4057"/><circle cx="607" cy="290" r="3" fill="white" stroke="none"/>');
  el(637,329,16,10);items.push('<path d="M622 344q10 7 19-1M593 278l-8-6M597 275l-2-7" fill="none" stroke-width="4"/>');
  p('M547 258Q517 233 496 254Q475 281 495 305Q473 328 489 351Q470 374 488 395Q508 417 530 397Q505 396 515 375Q537 357 519 336Q536 315 518 296Q541 295 550 276Z');
  p('M505 253Q486 280 509 302Q528 318 507 339Q486 364 509 379L503 402Q478 391 488 367Q471 348 489 326Q477 303 490 286Q478 267 494 254Z');
  p('M545 260Q546 236 576 237Q606 229 621 253Q639 278 610 285Q588 289 590 271Q607 278 609 263Q592 254 576 258L554 274Z');
  el(440,398,15,12);p('M440 378l5 12 14 4-14 6-5 13-5-13-13-6 13-4Z');
  // Four flowers, six paintable regions each, placed in the margins.
  for(const [x,y]of[[75,490],[226,540],[727,530],[838,469]]){for(let j=0;j<5;j++)el(x,y-16,9,17,j*72);c(x,y,10);items.push(`<path d="M${x} ${y+10}v35" stroke="#5a4d66" fill="none"/>`);}
  const defs=Array.from({length:4},(_,i)=>`<pattern id="${uid}-glitter${i}" width="18" height="18" patternUnits="userSpaceOnUse"><rect width="18" height="18" fill="${['#f0cf7b','#d5b6e7','#a9dbda','#edbbd6'][i]}"/><path d="M5 1l1 3 3 1-3 1-1 3-1-3-3-1 3-1ZM14 10l1 2 2 1-2 1-1 2-1-2-2-1 2-1Z" fill="#fffbe9"/></pattern>`).join('');
  return{count:n,svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600" role="img" aria-label="${E.paintTitles[index]}"><defs>${defs}</defs><g stroke="#65566b" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round">${items.join('')}</g></svg>`};
 };
 E.paintGallery=function(){E.modal('Zehn kleine Pony-Geschichten','<p class="muted">Angefangene Bilder bleiben gespeichert. Für jedes fertig ausgemalte Bild bekommst du einmalig 40 Sterne.</p><div class="paint-gallery">'+E.paintTitles.map((t,i)=>`<button class="paint-thumb" data-picture="${i}">${E.makeColoring(i,E.state.paint[i]||{},'thumb').svg}<span>${t}</span></button>`).join('')+'</div>',el=>el.querySelectorAll('[data-picture]').forEach(b=>b.onclick=()=>{E.close();E.view.open(+b.dataset.picture);}));};
 E.scenes.paint=function(){E.setBackground('home');const view={kind:'game',page:0,selected:E.paintColors[0],undo:[],fields:0};
  function status(){const filled=Object.keys(E.state.paint[view.page]||{}).length;E.ui.querySelector('#paint-progress').textContent=filled+' / '+view.fields+' Felder';if(filled>=view.fields&&!E.state.paintPaid.includes(String(view.page))){E.state.paintPaid.push(String(view.page));E.reward(40);E.toast('Deine Geschichte leuchtet in deinen Farben!');}}
  function render(){const saved=E.state.paint[view.page]||{},art=E.makeColoring(view.page,saved);view.fields=art.count;E.ui.innerHTML='<div class="game-hud"><span class="pill" id="paint-progress"></span><button id="paint-gallery">Bilder</button><button id="paint-save">Bild sichern</button></div><div class="coloring-wrap">'+art.svg+'</div><div class="paint-palette">'+E.paintColors.map(col=>`<button class="swatch" data-paint-color="${col}" style="background:${col}" aria-label="Farbe ${col}" aria-pressed="${view.selected===col}"></button>`).join('')+[0,1,2,3].map((i)=>`<button class="swatch" data-glitter="glitter${i}" aria-label="Glitzerfarbe ${i+1}${E.state.paintOwned.includes('glitter'+i)?'':' freischalten'}" aria-pressed="${view.selected==='glitter'+i}" style="background:${['#f0cf7b','#d5b6e7','#a9dbda','#edbbd6'][i]}">✦</button>`).join('')+'<button class="tool" id="paint-undo">↶ Zurück</button><button class="tool" id="paint-erase">Radierer</button></div>';
   E.ui.querySelectorAll('[data-paint-color]').forEach(b=>b.onclick=()=>{view.selected=b.dataset.paintColor;markPalette();});
   E.ui.querySelectorAll('[data-glitter]').forEach(b=>b.onclick=()=>{const id=b.dataset.glitter;if(E.state.paintOwned.includes(id)){view.selected=id;markPalette();return;}const price=[350,650,1100,1800][+id.at(-1)];E.modal('Ein bisschen Glitzer',`<p class="muted">Diese Glitzerfarbe kostet einmalig ${price} Sterne und bleibt für alle zehn Bilder verfügbar.</p><button class="button" id="buy-glitter">✦ ${price} · Freischalten</button>`,el=>el.querySelector('#buy-glitter').onclick=()=>{if(E.state.stars<price){E.toast('Dafür fehlen dir noch '+(price-E.state.stars)+' Sterne.');return;}E.state.stars-=price;E.state.paintOwned.push(id);view.selected=id;E.save();E.updateHUD();E.close();markPalette();});});
   E.ui.querySelector('.coloring-wrap').onclick=e=>{const field=e.target.closest('[data-field]');if(!field)return;const id=field.dataset.field,page=E.state.paint[view.page]??={};view.undo.push({id,old:page[id]});if(view.undo.length>100)view.undo.shift();if(view.selected===null)delete page[id];else page[id]=view.selected;field.setAttribute('fill',view.selected?.startsWith('glitter')?`url(#page-${view.page}-${view.selected})`:view.selected||'#fffefa');E.save();status();};
   E.ui.querySelector('#paint-undo').onclick=()=>{const change=view.undo.pop();if(!change)return;const page=E.state.paint[view.page]??={};if(change.old===undefined)delete page[change.id];else page[change.id]=change.old;E.save();render();};
   E.ui.querySelector('#paint-erase').onclick=()=>{view.selected=null;markPalette();};E.ui.querySelector('#paint-gallery').onclick=E.paintGallery;
   E.ui.querySelector('#paint-save').onclick=()=>{const svg=E.makeColoring(view.page,E.state.paint[view.page]||{}).svg;const url=URL.createObjectURL(new Blob([svg],{type:'image/svg+xml'}));const a=document.createElement('a');a.href=url;a.download='Pony-Geschichte-'+(view.page+1)+'.svg';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);};status();
  }
  function markPalette(){E.ui.querySelectorAll('[data-paint-color],[data-glitter]').forEach(b=>b.setAttribute('aria-pressed',String((b.dataset.paintColor||b.dataset.glitter)===view.selected)));E.ui.querySelector('#paint-erase').classList.toggle('active',view.selected===null);}
  view.open=index=>{view.page=index;view.undo=[];render();};view.draw=()=>{};view.open(0);E.paintGallery();return view;
 };
})(EW);
