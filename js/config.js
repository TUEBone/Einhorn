window.EW={};
(function(E){
 E.ponies=[
 {id:'luna',name:'Luna',type:'Einhorn',seconds:0,coat:'#fff7ee',mane:'#b28ade',eyes:'#8e43ce',about:'Sanft, neugierig und voller Sternenzauber.'},
 {id:'astra',name:'Astra',type:'Alihorn',seconds:3600,coat:'#bc95e8',mane:'#873ac8',eyes:'#9a50cb',about:'Königlicher Flügelzauber und eine mutige Seele.'},
 {id:'solara',name:'Solara',type:'Pegasus',seconds:10800,coat:'#72c8f0',mane:'#ef637e',eyes:'#6452c5',about:'Sportlich, fröhlich und immer dem Regenbogen nach.'},
 {id:'flora',name:'Flora',type:'Einhorn',seconds:21600,coat:'#f1a8c9',mane:'#ec77ac',eyes:'#54a064',about:'Verspielte Locken und ein Herz für alles, was blüht.'},
 {id:'nyx',name:'Nyx',type:'Nacht-Pegasus',seconds:25200,coat:'#44316e',mane:'#553d9b',eyes:'#65d7e0',about:'Ein stiller Freund unter funkelnden Sternen.'},
 {id:'blaze',name:'Blaze',type:'Feuer-Einhorn',seconds:54000,coat:'#ef9b49',mane:'#eb542c',eyes:'#deaa47',about:'Feuriger Schwung und ein großes, warmes Herz.'}
 ];
 E.furniture=[
 ['rug','Blumenteppich',240,.50,.91,.38],['plant','Zauberpflanze',280,.08,.88,.14],['lamp','Sternenlampe',380,.69,.74,.12],['picture','Regenbogenbild',420,.52,.55,.20],
 ['table','Runder Holztisch',650,.54,.76,.24],['chair','Gemütlicher Stuhl',480,.67,.88,.12],['bed','Himmelbett',1700,.85,.86,.26],['fireplace','Kamin',2600,.39,.68,.22],
 ['bookshelf','Bücherregal',1400,.90,.70,.17],['sofa','Samtsofa',1300,.20,.86,.28],['curtains','Sternenvorhänge',850,.13,.64,.25],['clock','Mond-Uhr',700,.72,.42,.10],
 ['chandelier','Kristallleuchter',1900,.50,.36,.20],['toybox','Spielzeugtruhe',580,.72,.85,.17],['aquarium','Glitzer-Aquarium',1100,.12,.73,.19],['vase','Blumenvase',550,.53,.60,.10],
 ['cushion','Sternenkissen',360,.20,.79,.12],['shelf','Schatzregal',950,.73,.29,.18],['lights','Lichtergirlande',1250,.50,.08,.65],['canopy','Baldachin',2400,.85,.86,.29]
 ].map(([id,name,price,x,y,size])=>({id,name,price,x,y,size}));
 E.plants=[
 ['daisy','Gänseblümchen',0,180,8,'#fff5d4'],['rose','Zauberrose',0,240,12,'#ee8cae'],['lavender','Lavendel',5,300,16,'#a08aca'],
 ['sunflower','Sonnenblume',15,420,23,'#f5c54f'],['tulip','Tulpe',30,480,28,'#e784a6'],['mint','Sternenminze',50,540,32,'#88bc9c'],
 ['lily','Mondlilie',75,600,38,'#d9ddff'],['berry','Glitzerbeere',105,720,45,'#bb6b9c'],['crystal','Kristallblume',140,840,53,'#8ed8dd'],['rainbow','Regenbogenblüte',180,900,60,'rainbow']
 ].map(([id,name,harvests,seconds,reward,color])=>({id,name,harvests,seconds,reward,color}));
 E.food=[['apple','Apfel',0,18],['carrot','Möhre',0,15],['berry','Erdbeere',180,20],['oats','Hafer',320,24],['pear','Birne',450,22],['sugar','Zuckerwürfel',600,12],['cupcake','Zaubermuffin',950,28],['magic','Sternenfrucht',1500,35]].map(([id,name,price,amount])=>({id,name,price,amount}));
 E.styles=[['waves','Zauberwellen',0],['short','Wilder Schwung',0],['braid','Flechtzauber',600],['curls','Zauberlocken',1100],['updo','Festfrisur',1600]].map(([id,name,price])=>({id,name,price}));
 E.accessories=[['none','Ohne',0],['bow','Seidenschleife',0],['flower','Blüte',0],['crown','Sternenkrone',950],['glasses','Sonnenbrille',650],['necklace','Herzkette',750],['wings','Zauberflügel',1600],['ribbon','Schweifband',480],['starclip','Sternenclip',800],['anklets','Hufschmuck',1200],['flowercrown','Blumenkranz',1400]].map(([id,name,price])=>({id,name,price}));
 E.colors=[['#fff7ee','Perlmutt',0],['#f6c6dc','Rosenrosa',0],['#cbb9ee','Lavendel',0],['#a7dce2','Türkis',0],['#f5d38d','Sonnengold',0],['#a9d6b4','Salbei',0],['#b28ade','Flieder',0],['#e892b9','Kirschblüte',0],['#66b9cf','Himmelblau',0],['#e8b65c','Honig',0],['#87bf98','Minze',0],['#e26f69','Koralle',0],['#708cc5','Nachtblau',0],['rainbow','Regenbogen',1600],['aurora','Polarlicht',2200],['stardust','Sternenstaub',2800],['moon','Mondschimmer',3200]].map(([id,name,price])=>({id,name,price}));
 E.paintFieldCounts=[65,65,64,69,63,73,69,62,66,72];
 E.paintColors=['#fff4df','#f4cc56','#ee8a45','#d95a63','#ed9fbd','#ab7dc5','#716bb6','#649bd0','#7cc5d4','#65ab91','#8bc772','#b5ce86','#bc9172','#6b5259','#ffffff'];
 E.paintTitles=['Im Schlossgarten','Reise zum Regenbogen','Picknick am See','Sterne über dem Wald','Ein Tag am Meer','Die Geburtstagsfeier','Winterzauber','Auf der Blumenwiese','Ballonfahrt','Am Zauberwasserfall'];
 E.levelNames=['Sternenwiese','Pilzwald','Kristalltal','Schlossallee','Goldener Herbst','Schneegipfel','Mondscheinwald','Blütenpfad','Regenbogenschlucht','Sternentor'];
 E.flightNames=['Wolkenwiese','Schloss im Himmel','Abendgold','Kristallwolken','Polarlichter'];
 E.byId=(list,id)=>list.find(x=>x.id===id);
 E.esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 E.time=seconds=>{seconds=Math.max(0,Math.ceil(seconds));const h=Math.floor(seconds/3600),m=Math.floor(seconds/60)%60,s=seconds%60;return h?`${h} Std. ${m} Min.`:m?`${m} Min. ${s} Sek.`:`${s} Sek.`;};
 E.hash=str=>{let crc=0xffffffff;for(const c of new TextEncoder().encode(str)){crc^=c;for(let j=0;j<8;j++)crc=(crc>>>1)^((crc&1)?0xedb88320:0);}return((crc^0xffffffff)>>>0).toString(16).padStart(8,'0');};
})(EW);
