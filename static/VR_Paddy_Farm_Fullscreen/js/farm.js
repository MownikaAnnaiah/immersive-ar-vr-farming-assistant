/* ============================================================
   REFERENCE-MATCHED LOW-POLY VR FARM
   Compact miniature farm: fields front, buildings rear,
   windmill center, machinery right.
   ============================================================ */
const world=document.querySelector('#world');
const statusText=document.querySelector('#status');

function E(tag,attrs={},parent=world){
  const e=document.createElement(tag);
  Object.entries(attrs).forEach(([k,v])=>e.setAttribute(k,v));
  parent.appendChild(e); return e;
}
function box(x,y,z,w,h,d,c,rot='0 0 0',parent=world){
  return E('a-box',{position:`${x} ${y} ${z}`,width:w,height:h,depth:d,
    rotation:rot,material:`color:${c};roughness:1`},parent);
}
function cyl(x,y,z,r,h,c,parent=world){
  return E('a-cylinder',{position:`${x} ${y} ${z}`,radius:r,height:h,
    material:`color:${c};roughness:1`},parent);
}
function clickable(e,label){
  e.classList.add('clickable');
  e.addEventListener('click',()=>statusText.setAttribute('value',label));
  return e;
}

/* LAND */
box(0,-.25,0,36,.5,30,'#76502f');
box(0,.02,0,35.4,.08,29.4,'#80542e');

/* paths — deliberately straight like the reference */
box(0,.075,8,34,.12,2.0,'#b68148');
box(-1,.078,1,2.0,.12,14,'#b68148');
box(8,.078,-1,2.0,.12,17,'#b68148');
box(0,.08,-7,31,.12,1.8,'#b68148');
box(-8,.078,-2,1.6,.12,14,'#a97742');

/* crop plot soil bases */
function plot(x,z,w,d,color='#6f4b2a'){
  box(x,.11,z,w,.09,d,color);
}
plot(-11,5,10.5,8);
plot(-3.6,5.1,4.5,7.8);
plot(2.5,4.7,6.0,6.8);
plot(-10,-4,8.0,5.2);
plot(1,-4,5.5,4.6);

/* dense crop rows */
function crops(x,z,cols,rows,spacing,color,h){
  for(let r=0;r<rows;r++){
    for(let c=0;c<cols;c++){
      const xx=x+c*spacing, zz=z+r*spacing;
      E('a-cylinder',{
        position:`${xx} ${h/2+.15} ${zz}`,
        radius:.055,height:h,
        material:`color:${color};roughness:1`
      });
      if((r+c)%2===0){
        E('a-box',{
          position:`${xx+.04} ${h*.68} ${zz}`,
          width:.06,height:.26,depth:.025,
          rotation:'0 0 -24',
          material:`color:${color};roughness:1`
        });
      }
    }
  }
}
crops(-14.7,2.0,23,12,.42,'#d7b42d',.85); // main golden field
crops(-3.7,2.0,9,13,.42,'#62a73b',.72);    // green field
crops(1.0,-7.0,11,6,.44,'#4e9639',.65);    // dark green
crops(-13.5,-5.0,8,5,.45,'#bca52e',.60);    // yellow side plot

/* BARN */
function barn(x,z,scale=1){
  const g=E('a-entity',{position:`${x} 0 ${z}`,scale:`${scale} ${scale} ${scale}`});
  box(0,1.7,0,5.8,3.2,4.4,'#ad3d30','0 0 0',g);
  box(0,3.45,0,6.2,.35,4.7,'#85502d','0 0 0',g);
  box(0,2.1,-2.24,1.65,1.65,.12,'#f2e6cd','0 0 0',g);
  box(-.43,2.1,-2.32,.65,1.35,'#f4e8d3','0 0 0',g);
  box(.43,2.1,-2.32,.65,1.35,'#f4e8d3','0 0 0',g);
  box(0,2.95,-2.35,1.7,.10,.10,'#f4e8d3','0 0 0',g);
  clickable(g,'Large red barn');
}
barn(-11,-8.0,1.0);
barn(-15,-7.8,.72);

/* CENTER FARMHOUSE */
const house=E('a-entity',{position:'-1.5 0 -8.1'});
box(0,1.55,0,5.3,2.9,4.0,'#dfe7e2','0 0 0',house);
box(0,3.28,0,5.8,.38,4.45,'#47718e','0 0 0',house);
box(0,1.05,-2.15,5.1,.18,.65,'#7f522b','0 0 0',house);
for(let i=-2;i<=2;i++) box(i*.85,.62,-2.15,.10,.8,.10,'#69421f','0 0 0',house);
box(0,1.12,-2.25,1.0,1.5,'#6b93a8','0 0 0',house);
box(-1.65,1.75,-2.08,.72,.8,'#6d94a8','0 0 0',house);
box(1.65,1.75,-2.08,.72,.8,'#6d94a8','0 0 0',house);
clickable(house,'Blue-and-white main farmhouse');

/* RIGHT RED HOUSE */
const redHouse=E('a-entity',{position:'8.0 0 -8.0'});
box(0,1.65,0,5.0,3.1,4.0,'#b84335','0 0 0',redHouse);
box(0,3.45,0,5.45,.4,4.4,'#27779f','0 0 0',redHouse);
box(0,1.1,-2.08,4.5,.18,.6,'#7f522b','0 0 0',redHouse);
for(let i=-2;i<=2;i++) box(i*.8,.65,-2.08,.09,.75,.09,'#69421f','0 0 0',redHouse);
for(let x of [-1.55,1.55]) box(x,1.8,-2.1,.65,.8,'#e6d9bc','0 0 0',redHouse);
clickable(redHouse,'Red farmhouse with blue roof');

/* WATER TOWER */
const wt=E('a-entity',{position:'-5.8 0 -10.2'});
for(const p of [[-1,-1],[1,-1],[-1,1],[1,1]]) box(p[0]*.7,2.0,p[1]*.7,.18,4,.18,'#9b6a34','0 0 0',wt);
cyl(0,4.1,0,1.35,1.45,'#a77a3d',wt);
cyl(0,4.86,0,1.1,.22,'#c09a51',wt);
clickable(wt,'Elevated farm water tank');

/* WINDMILL */
const wind=E('a-entity',{position:'2.0 0 -10.2'});
box(0,2.5,0,.28,5,.28,'#9b6b35','0 0 0',wind);
box(-.85,2.5,0,.22,5,.22,'#9b6b35','0 0 0',wind);
box(.85,2.5,0,.22,5,.22,'#9b6b35','0 0 0',wind);
const hub=E('a-entity',{position:'0 6.0 0'},wind);
cyl(0,0,0,.36,.45,'#c79b42',hub).setAttribute('rotation','90 0 0');
for(let i=0;i<8;i++){
  const a=i*45;
  const r=a*Math.PI/180;
  const blade=box(Math.sin(r)*1.75,Math.cos(r)*1.75,0,.20,3.0,.12,'#e9e2cf',`0 0 ${-a}`,hub);
}
clickable(wind,'Tall windmill');

/* MACHINERY SHED */
const shed=E('a-entity',{position:'11 0 -4'});
box(0,1.9,0,7.4,3.7,5.1,'#b6b7b3','0 0 0',shed);
box(0,3.9,0,7.7,.4,5.4,'#6b7074','0 0 0',shed);
box(0,1.55,-2.58,6.7,2.9,.14,'#34383b','0 0 0',shed);
clickable(shed,'Long machinery shed');

/* TRACTORS */
function tractor(x,z,color,rot=0){
  const t=E('a-entity',{position:`${x} .05 ${z}`,rotation:`0 ${rot} 0`});
  box(0,.72,0,1.75,.68,1.15,color,'0 0 0',t);
  box(-.12,1.20,.05,.85,.78,.86,color,'0 0 0',t);
  box(-.12,1.68,.05,.08,.95,.08,'#303030','0 0 0',t);
  box(-.12,2.13,.05,1.05,.08,.08,'#303030','0 0 0',t);
  for(const xx of [-.62,.62]){
    cyl(xx,.42,-.53,.38,.24,'#202020',t).setAttribute('rotation','90 0 0');
    cyl(xx,.42,.53,.29,.24,'#202020',t).setAttribute('rotation','90 0 0');
  }
  clickable(t,'Agricultural tractor');
}
tractor(-7,1.0,'#4b8f36',20);
tractor(-2,0.8,'#2c78a6',-15);
tractor(4.2,2.0,'#2c78a6',30);
tractor(8.2,2.5,'#d34a32',-15);
tractor(11.8,1.4,'#d8a52c',25);
tractor(6.0,-1.8,'#3d8d42',10);

/* trailers */
function trailer(x,z,c){
  const t=E('a-entity',{position:`${x} .2 ${z}`});
  box(0,.6,0,2.3,.65,1.35,c);
  for(const xx of [-.75,.75]) cyl(xx,.25,0,.30,.2,'#222',t).setAttribute('rotation','90 0 0');
  clickable(t,'Farm trailer');
}
trailer(3.0,6.5,'#c68a2d');
trailer(10,5.8,'#b64a2f');

/* hay bales / crates */
for(let i=0;i<18;i++){
  const x=9+(i%6)*.65, z=4.8+Math.floor(i/6)*.65;
  box(x,.34,z,.5,.68,.5,'#d7ae3a');
}
for(let i=0;i<10;i++){
  box(4+(i%5)*.55,.28,-4.8+Math.floor(i/5)*.55,.42,.5,.42,'#a87535');
}

/* POND + VEGETABLE GARDEN */
const pond=box(5,.13,-6.3,2.8,.08,1.8,'#3d9bc2');
clickable(pond,'Irrigation pond');
box(8,.16,-6.2,4.2,.08,2.7,'#5f8338');
for(let r=0;r<4;r++) for(let c=0;c<8;c++)
  box(6.35+c*.45,.38,-7.0+r*.45,.08,.40,.08,'#55a33c');
clickable(pond,'Irrigation pond and water source');

/* fences */
function fence(x1,z1,x2,z2){
  const len=Math.hypot(x2-x1,z2-z1);
  const ang=Math.atan2(x2-x1,z2-z1)*180/Math.PI;
  box((x1+x2)/2,.48,(z1+z2)/2,.12,.9,len,'#71451f',`0 ${ang} 0`);
  const n=Math.max(2,Math.floor(len/1.5));
  for(let i=0;i<=n;i++){
    const p=i/n;
    box(x1+(x2-x1)*p,.52,z1+(z2-z1)*p,.18,1,.18,'#69401e');
  }
}
fence(-17,-13,17,-13);
fence(-17,-13,-17,13);
fence(17,-13,17,13);

/* trees behind farm */
function tree(x,z){
  const g=E('a-entity',{position:`${x} 0 ${z}`});
  cyl(0,1.0,0,.18,2,'#76502d',g);
  E('a-icosahedron',{position:'0 2.25 0',radius:'1.25',
    material:'color:#4e913b;roughness:1'},g);
}
[[-16,8],[-15,-2],[15,-8],[15,8],[-3,11],[7,11]].forEach(p=>tree(...p));

/* distant low hills */
for(let i=0;i<10;i++){
  E('a-cone',{position:`${-20+i*4.4} 2 -20`,radiusBottom:'4.5',
    radiusTop:'.2',height:'5',material:'color:#5a8754;roughness:1'});
}

/* windmill rotation */
const rotor=wind.querySelector('a-entity');
if(rotor) rotor.setAttribute('animation','property:rotation;to:0 0 360;dur:18000;easing:linear;loop:true');

/* mode switching */
const overview=document.querySelector('#overviewCamera');
const walk=document.querySelector('#walkCamera');
const walkRig=document.querySelector('#walkRig');
function modeWalk(on){
  overview.setAttribute('camera','active',String(!on));
  walk.setAttribute('camera','active',String(on));
  statusText.setAttribute('value',on?'Walk mode — WASD / VR controllers':'Reference-style overview — O/P');
}
window.addEventListener('keydown',e=>{
  if(e.key.toLowerCase()==='o') modeWalk(false);
  if(e.key.toLowerCase()==='p') modeWalk(true);
});
window.addEventListener('load',()=>{
  modeWalk(true);
});
