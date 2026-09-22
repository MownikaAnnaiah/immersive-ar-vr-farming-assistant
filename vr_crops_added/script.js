/* =========================================================
   VR PADDY FARMING - PROCEDURAL A-FRAME SCENE
   ========================================================= */

const scene = document.querySelector("a-scene");

function entity(tag, attrs = {}) {
  const el = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs)) {
    el.setAttribute(key, value);
  }
  return el;
}

/* ---------- Mountains ---------- */

const mountains = document.querySelector("#mountains");

[
  [-28, 8, -34, 15, 18, "#4c7b4b"],
  [-15, 11, -37, 17, 24, "#3f7045"],
  [2, 14, -39, 19, 30, "#4b7e4d"],
  [20, 10, -35, 16, 23, "#416f45"],
  [34, 7, -32, 13, 17, "#507d4d"]
].forEach(([x, y, z, radius, height, color]) => {
  mountains.appendChild(entity("a-cone", {
    position: `${x} ${y} ${z}`,
    "radius-bottom": radius,
    "radius-top": 0,
    height,
    material: `color:${color};roughness:1`
  }));
});

/* ---------- Paddy rows ---------- */

const paddyRows = document.querySelector("#paddyRows");

for (const z of [-10, -8, -6, 6, 8, 10]) {
  for (let x = -20; x <= 20; x += 1.2) {
    const plant = entity("a-entity", {
      position: `${x} 0 ${z}`,
      rotation: `0 ${Math.random() * 20 - 10} 0`
    });

    const stem = entity("a-cone", {
      position: "0 0.45 0",
      "radius-bottom": "0.07",
      "radius-top": "0.015",
      height: "0.9",
      material: "color:#3c9836;roughness:1"
    });

    const head = entity("a-sphere", {
      position: "0 0.88 0",
      radius: "0.08",
      material: "color:#d2ad3d;roughness:1"
    });

    plant.appendChild(stem);
    plant.appendChild(head);
    paddyRows.appendChild(plant);
  }
}

/* ---------- Coconut trees ---------- */

const trees = document.querySelector("#trees");

function makePalm(x, z, scale = 1) {
  const tree = entity("a-entity", {
    position: `${x} 0 ${z}`,
    scale: `${scale} ${scale} ${scale}`
  });

  const trunk = entity("a-cylinder", {
    position: "0 4 0",
    radius: "0.42",
    height: "8",
    rotation: "0 0 -4",
    material: "color:#795548;roughness:1"
  });

  tree.appendChild(trunk);

  const crown = entity("a-entity", {
    position: "0 8.1 0",
    animation__sway: "property:rotation;from:0 -8 0;to:0 8 0;dir:alternate;dur:3500;loop:true;easing:easeInOutSine"
  });

  for (let i = 0; i < 8; i++) {
    const leaf = entity("a-box", {
      position: "0 0 0",
      width: "0.18",
      height: "0.08",
      depth: "4.2",
      rotation: `0 ${i * 45} 25`,
      material: "color:#218b38;roughness:1"
    });
    crown.appendChild(leaf);
  }

  crown.appendChild(entity("a-sphere", {
    radius: "0.55",
    material: "color:#4d8f2f;roughness:1"
  }));

  tree.appendChild(crown);
  trees.appendChild(tree);
}

[
  [-23, -4, 1.15],
  [23, -5, 1.1],
  [-26, 11, 0.9],
  [26, 11, 0.95],
  [-18, 16, 0.75],
  [14, 17, 0.8]
].forEach(p => makePalm(...p));

/* ---------- Cows ---------- */

const cows = document.querySelector("#cows");

function makeCow(x, z, color, moving = true) {
  const cow = entity("a-entity", {
    position: `${x} 0 ${z}`
  });

  if (moving) {
    cow.setAttribute(
      "animation__walk",
      "property:position;from:" + `${x} 0 ${z}` +
      ";to:" + `${x + 7} 0 ${z}` +
      ";dir:alternate;dur:14000;loop:true;easing:easeInOutSine"
    );
  }

  cow.appendChild(entity("a-box", {
    position: "0 1 0",
    width: "2.3",
    height: "1.1",
    depth: "1",
    material: `color:${color};roughness:1`
  }));

  cow.appendChild(entity("a-sphere", {
    position: "1.25 1.25 0",
    radius: "0.48",
    material: `color:${color};roughness:1`
  }));

  for (const sx of [-0.65, 0.65]) {
    for (const sz of [-0.35, 0.35]) {
      cow.appendChild(entity("a-cylinder", {
        position: `${sx} 0.3 ${sz}`,
        radius: "0.11",
        height: "0.8",
        material: "color:#5a3b28;roughness:1"
      }));
    }
  }

  cows.appendChild(cow);
}

makeCow(-14, 14, "#eee7d1", true);
makeCow(10, 14, "#b9b1a1", true);
makeCow(17, -8, "#f0ead8", false);

/* ---------- Birds ---------- */

const birds = document.querySelector("#birds");

function makeBird(x, y, z, duration) {
  const bird = entity("a-entity", {
    position: `${x} ${y} ${z}`,
    animation: `property:position;from:${x} ${y} ${z};to:${x + 45} ${y + 1} ${z + 3};dur:${duration};loop:true;easing:linear`
  });

  bird.appendChild(entity("a-sphere", {
    radius: "0.18",
    material: "color:#252525;roughness:1"
  }));

  bird.appendChild(entity("a-box", {
    position: "-0.35 0 0",
    width: "0.7",
    height: "0.04",
    depth: "0.18",
    rotation: "0 0 18",
    material: "color:#252525"
  }));

  bird.appendChild(entity("a-box", {
    position: "0.35 0 0",
    width: "0.7",
    height: "0.04",
    depth: "0.18",
    rotation: "0 0 -18",
    material: "color:#252525"
  }));

  birds.appendChild(bird);
}

makeBird(-24, 12, -5, 18000);
makeBird(-10, 14, -10, 22000);
makeBird(2, 11, -2, 20000);
makeBird(-5, 16, 4, 25000);

/* ---------- Plough animation ---------- */

const team = document.querySelector("#ploughTeam .ploughAnim");

team.setAttribute(
  "animation__plough",
  "property:position;from:-2 0 0;to:28 0 0;dur:26000;loop:true;easing:linear"
);

/* Small body bob makes the work feel alive. */
team.setAttribute(
  "animation__bob",
  "property:rotation;from:0 -1 0;to:0 1 0;dir:alternate;dur:700;loop:true;easing:easeInOutSine"
);

/* ---------- Water shimmer ---------- */

document.querySelectorAll(".water").forEach((water, i) => {
  water.setAttribute(
    "animation",
    `property:material.color;from:#55b8e8;to:#7ed8f0;dir:alternate;dur:${2200 + i * 500};loop:true`
  );
});

/* ---------- Hide HUD in VR ---------- */

scene.addEventListener("enter-vr", () => {
  document.querySelector("#hud").style.opacity = "0";
});

scene.addEventListener("exit-vr", () => {
  document.querySelector("#hud").style.opacity = "1";
});

/* ---------- Helpful fallback ---------- */

scene.addEventListener("loaded", () => {
  console.log("VR Paddy Farming scene loaded.");
});


/* =========================================================
   ENHANCED INDIAN RURAL VILLAGE LAYER
   All additions are procedural and keep the original scene intact.
   ========================================================= */

const grassLayer = document.querySelector("#grassLayer");
const extraTrees = document.querySelector("#extraTrees");
const villageHouses = document.querySelector("#villageHouses");
const extraFarmers = document.querySelector("#extraFarmers");
const extraAnimals = document.querySelector("#extraAnimals");
const farmEquipment = document.querySelector("#farmEquipment");
const villagePaths = document.querySelector("#villagePaths");
const bridges = document.querySelector("#bridges");
const clouds = document.querySelector("#clouds");

function mat(color, extra = "") {
  return `color:${color};roughness:0.95;${extra}`;
}

function addGrassPatch(cx, cz, width, depth, count) {
  for (let i = 0; i < count; i++) {
    const x = cx + (Math.random() - 0.5) * width;
    const z = cz + (Math.random() - 0.5) * depth;
    // Keep the central ploughing strip and water channels visually readable.
    if (Math.abs(z) < 4.7 || Math.abs(z) > 13.2 || Math.abs(x - 22) < 2.0) continue;
    const h = 0.18 + Math.random() * 0.28;
    const blade = entity("a-cone", {
      position: `${x.toFixed(2)} ${h / 2} ${z.toFixed(2)}`,
      "radius-bottom": (0.035 + Math.random() * 0.025).toFixed(3),
      "radius-top": "0.004",
      height: h.toFixed(2),
      rotation: `0 ${Math.random() * 360} ${Math.random() * 28 - 14}`,
      material: mat(Math.random() > 0.5 ? "#4f9d3e" : "#68aa45")
    });
    grassLayer.appendChild(blade);
  }
}

// Dense grass carpet around the fields and village.
[
  [0, -18, 48, 8, 150],
  [-30, 0, 12, 40, 90],
  [30, 0, 12, 40, 90],
  [0, 18, 48, 8, 150]
].forEach(v => addGrassPatch(...v));

function makeMangoTree(x, z, scale = 1) {
  const tree = entity("a-entity", { position: `${x} 0 ${z}`, scale: `${scale} ${scale} ${scale}` });
  tree.appendChild(entity("a-cylinder", { position: "0 2.7 0", radius: "0.48", height: "5.4", material: mat("#68442b") }));
  const crown = entity("a-entity", {
    position: "0 5.7 0",
    animation__sway: "property:rotation;from:0 -2 0;to:0 2 0;dir:alternate;dur:4200;loop:true;easing:easeInOutSine"
  });
  [[0,0,0,2.5],[1.35,0.15,0.1,1.65],[-1.25,0.2,0.2,1.7],[0,0.35,1.25,1.65]].forEach(([px,py,pz,r]) => {
    crown.appendChild(entity("a-sphere", { position:`${px} ${py} ${pz}`, radius:String(r), material:mat("#2f8138") }));
  });
  // A few mangoes add visual interest without heavy geometry.
  for(let i=0;i<5;i++) crown.appendChild(entity("a-sphere", {
    position:`${(Math.random()-0.5)*2.6} ${-0.25+Math.random()*0.7} ${(Math.random()-0.5)*2.3}`,
    radius:"0.10", material:mat("#d9a72d")
  }));
  tree.appendChild(crown); extraTrees.appendChild(tree);
}

function makeNeemTree(x, z, scale = 1) {
  const tree = entity("a-entity", { position:`${x} 0 ${z}`, scale:`${scale} ${scale} ${scale}` });
  tree.appendChild(entity("a-cylinder", { position:"0 3 0", radius:"0.34", height:"6", material:mat("#725036") }));
  const branches = entity("a-entity", { position:"0 5.7 0" });
  for(let i=0;i<7;i++) {
    const a=i*51;
    branches.appendChild(entity("a-cylinder", {
      position:"0 0 0", radius:"0.09", height:"2.2", rotation:`18 ${a} 48`, material:mat("#65452d")
    }));
    branches.appendChild(entity("a-sphere", {
      position:`${Math.cos(a*Math.PI/180)*1.15} ${0.2+Math.random()*0.4} ${Math.sin(a*Math.PI/180)*1.15}`,
      radius:String(0.75+Math.random()*0.35), material:mat("#3c8c3c")
    }));
  }
  tree.appendChild(branches); extraTrees.appendChild(tree);
}

function makeBanyan(x, z, scale = 1) {
  const tree = entity("a-entity", { position:`${x} 0 ${z}`, scale:`${scale} ${scale} ${scale}` });
  tree.appendChild(entity("a-cylinder", { position:"0 4 0", radius:"0.85", height:"8", material:mat("#69472f") }));
  for(let i=0;i<7;i++) {
    const a=i*51.4;
    const root=entity("a-cylinder", {
      position:`${Math.cos(a*Math.PI/180)*2.0} 2.2 ${Math.sin(a*Math.PI/180)*2.0}`,
      radius:"0.10", height:"4.5", rotation:`0 ${a} 16`, material:mat("#765136")
    });
    tree.appendChild(root);
  }
  const canopy=entity("a-entity", {position:"0 8 0", animation__sway:"property:rotation;from:0 -1 0;to:0 1 0;dir:alternate;dur:5000;loop:true"});
  [[0,0,0,3.2],[2,0.2,0,2.1],[-2,0.3,0,2.1],[0,0.2,2,2.1],[0,0.4,-2,2.1]].forEach(([px,py,pz,r])=>canopy.appendChild(entity("a-sphere",{position:`${px} ${py} ${pz}`,radius:String(r),material:mat("#2d7734")})));
  tree.appendChild(canopy); extraTrees.appendChild(tree);
}

// New tree variety, deliberately irregular and away from the main walking area.
[
  [-31,-17,1.1],[31,-16,0.9],[-32,17,1.0],[32,18,0.85],[-28,-25,0.9],[28,-25,1.0]
].forEach(v=>makeMangoTree(...v));
[
  [-34,-7,0.9],[34,-6,0.85],[-33,8,0.8],[34,9,0.95]
].forEach(v=>makeNeemTree(...v));
makeBanyan(-25, 21, 1.05);
makeBanyan(25, 22, 0.9);

function makeHouse(x,z,scale=1,wall="#d8c39b",roof="#a74e2e") {
  const h=entity("a-entity",{position:`${x} 0 ${z}`,scale:`${scale} ${scale} ${scale}`});
  h.appendChild(entity("a-box",{position:"0 1.65 0",width:"5",height:"3.3",depth:"3.8",material:mat(wall)}));
  h.appendChild(entity("a-cone",{position:"0 4.05 0",radiusBottom:"3.5",radiusTop:"0.2",height:"2.0",material:mat(roof)}));
  h.appendChild(entity("a-box",{position:"0 1.25 1.95",width:"0.95",height:"1.9",depth:"0.12",material:mat("#5b3926")}));
  [-1.45,1.45].forEach(px=>h.appendChild(entity("a-box",{position:`${px} 2.0 1.95`,width:"0.85",height:"0.7",depth:"0.10",material:mat("#8fd2df")})));
  // Veranda roof and pillars.
  h.appendChild(entity("a-box",{position:"0 2.75 2.45",width:"5.8",height:"0.18",depth:"1.0",material:mat(roof)}));
  [-2.25,2.25].forEach(px=>h.appendChild(entity("a-cylinder",{position:`${px} 1.35 2.65`,radius:"0.09",height:"2.7",material:mat("#795548")})));
  villageHouses.appendChild(h);
}

makeHouse(22,-19,1.0,"#e2cf9c","#a44d2d");
makeHouse(-21,20,0.9,"#efe5c8","#b35c31");
makeHouse(20,20,0.82,"#d9bb86","#8e4328");
makeHouse(-24,-19,0.78,"#eee8d5","#9f4e32");
makeHouse(29,5,0.72,"#d8c59c","#b25b34");
makeHouse(-29,6,0.68,"#e6d3a5","#8e4a2c");

function makeFarmer(x,z,shirt="#e7d9b7",dhoti="#8a6a4c",hat="#c89b45",action="work") {
  const f=entity("a-entity",{position:`${x} 0 ${z}`});
  f.appendChild(entity("a-cylinder",{position:"0 1.35 0",radius:"0.3",height:"1.2",material:mat(shirt)}));
  f.appendChild(entity("a-sphere",{position:"0 2.2 0",radius:"0.34",material:mat("#a9653e")}));
  f.appendChild(entity("a-cylinder",{position:"0 2.48 0",radius:"0.46",height:"0.10",material:mat(hat)}));
  f.appendChild(entity("a-cylinder",{position:"-0.13 0.43 0",radius:"0.11",height:"0.85",material:mat(dhoti)}));
  f.appendChild(entity("a-cylinder",{position:"0.13 0.43 0",radius:"0.11",height:"0.85",material:mat(dhoti)}));
  const armL=entity("a-cylinder",{position:"-0.43 1.42 0",radius:"0.07",height:"0.82",rotation:"0 0 -45",material:mat("#a9653e")});
  const armR=entity("a-cylinder",{position:"0.43 1.42 0",radius:"0.07",height:"0.82",rotation:"0 0 45",material:mat("#a9653e")});
  f.appendChild(armL); f.appendChild(armR);
  if(action==="walk") f.setAttribute("animation__walk",`property:position;from:${x} 0 ${z};to:${x+4} 0 ${z+1};dir:alternate;dur:10000;loop:true;easing:easeInOutSine`);
  if(action==="work") f.setAttribute("animation__work","property:rotation;from:0 -5 0;to:0 5 0;dir:alternate;dur:1500;loop:true;easing:easeInOutSine");
  extraFarmers.appendChild(f);
}

makeFarmer(-12,-2,"#d9e7df","#765a43","#d19d38","work");
makeFarmer(12,-3,"#f0c9a8","#6e5849","#d2a345","work");
makeFarmer(-27,12,"#e9efe8","#70533d","#c58f34","walk");
makeFarmer(26,-10,"#d7e6d0","#72563f","#d6aa48","walk");
makeFarmer(-18,18,"#eee0cf","#6d5748","#b98532","work");
makeFarmer(15,18,"#e6d7b6","#76533d","#c8943c","work");

function makeGoat(x,z,color="#d8d1c4") {
  const g=entity("a-entity",{position:`${x} 0 ${z}`});
  g.appendChild(entity("a-box",{position:"0 0.75 0",width:"1.25",height:"0.65",depth:"0.45",material:mat(color)}));
  g.appendChild(entity("a-sphere",{position:"0.7 0.95 0",radius:"0.25",material:mat(color)}));
  [-0.35,0.35].forEach(px=>[-0.14,0.14].forEach(pz=>g.appendChild(entity("a-cylinder",{position:`${px} 0.32 ${pz}`,radius:"0.045",height:"0.45",material:mat("#5a3c2b")}))));
  g.setAttribute("animation__idle","property:rotation;from:0 -3 0;to:0 3 0;dir:alternate;dur:1800;loop:true");
  extraAnimals.appendChild(g);
}
makeGoat(-20,14); makeGoat(-18,13.2,"#b7b0a2"); makeGoat(19,14,"#e3d9c6");

function makeChicken(x,z) {
  const c=entity("a-entity",{position:`${x} 0 ${z}`});
  c.appendChild(entity("a-sphere",{position:"0 0.4 0",radius:"0.28",material:mat("#f0e2c6")}));
  c.appendChild(entity("a-sphere",{position:"0.24 0.62 0",radius:"0.16",material:mat("#fff3dc")}));
  c.appendChild(entity("a-cone",{position:"0.39 0.65 0",radiusBottom:"0.07",radiusTop:"0",height:"0.16",rotation:"0 0 -90",material:mat("#d98b31")}));
  c.setAttribute("animation__hop",`property:position;from:${x} 0 ${z};to:${x+0.8} 0 ${z+0.5};dir:alternate;dur:2600;loop:true;easing:easeInOutSine`);
  extraAnimals.appendChild(c);
}
makeChicken(24,8); makeChicken(26,8.8); makeChicken(-26,9);

function makeHayStack(x,z,s=1) {
  const h=entity("a-entity",{position:`${x} 0 ${z}`,scale:`${s} ${s} ${s}`});
  h.appendChild(entity("a-cylinder",{position:"0 0.65 0",radius:"0.9",height:"1.3",material:mat("#c6a14a")}));
  h.appendChild(entity("a-cone",{position:"0 1.55 0",radiusBottom:"1.0",radiusTop:"0.05",height:"0.8",material:mat("#d3ad54")}));
  farmEquipment.appendChild(h);
}
makeHayStack(27,-16,1.1); makeHayStack(-27,-14,0.9); makeHayStack(18,12,0.8);

function makeBullockCart(x,z) {
  const cart=entity("a-entity",{position:`${x} 0 ${z}`});
  cart.appendChild(entity("a-box",{position:"0 1.05 0",width:"3.0",height:"0.28",depth:"1.8",material:mat("#80502f")}));
  cart.appendChild(entity("a-box",{position:"0 1.75 -0.55",width:"2.8",height:"0.12",depth:"0.12",material:mat("#5e3b26")}));
  [-1.2,1.2].forEach(px=>cart.appendChild(entity("a-cylinder",{position:`${px} 0.55 0.95`,radius:"0.55",height:"0.18",rotation:"90 0 0",material:mat("#5d3d27")})));
  farmEquipment.appendChild(cart);
}
makeBullockCart(-18,-11); makeBullockCart(17,-11);

// Dirt paths and stepping stones.
villagePaths.appendChild(entity("a-plane",{position:"0 0.035 17",rotation:"-90 0 0",width:"42",height:"2.8",material:mat("#b58a5a")}));
villagePaths.appendChild(entity("a-plane",{position:"-20 0.04 4",rotation:"0 90 0",width:"2.6",height:"28",material:mat("#b58a5a")}));
villagePaths.appendChild(entity("a-plane",{position:"21 0.045 4",rotation:"0 90 0",width:"2.8",height:"26",material:mat("#b58a5a")}));
for(let i=0;i<20;i++) villagePaths.appendChild(entity("a-sphere",{position:`${-20+i*2.1} 0.08 ${17+(Math.random()-0.5)*1.2}`,radius:"0.10",material:mat("#806b51")}));

function makeBridge(x,z,vertical=false) {
  const b=entity("a-entity",{position:`${x} 0.45 ${z}`,rotation:vertical?"0 90 0":"0 0 0"});
  b.appendChild(entity("a-box",{position:"0 0 0",width:"4.0",height:"0.18",depth:"2.2",material:mat("#8b5a34")}));
  for(let i=-1.3;i<=1.3;i+=0.65) b.appendChild(entity("a-box",{position:`${i} 0.14 0`,width:"0.5",height:"0.08",depth:"2.3",material:mat("#b77b46")}));
  bridges.appendChild(b);
}
makeBridge(-9,-12.7); makeBridge(10,12.7); makeBridge(22,2,true);

// Small irrigation-side crop/vegetable beds.
for(let row=0;row<4;row++) for(let col=0;col<9;col++) {
  const x= -8 + col*1.7;
  const z= 14.4 + row*0.7;
  const plant=entity("a-entity",{position:`${x} 0 ${z}`});
  plant.appendChild(entity("a-cylinder",{position:"0 0.32 0",radius:"0.035",height:"0.65",material:mat("#3c7f31")}));
  plant.appendChild(entity("a-sphere",{position:"0 0.68 0",radius:"0.18",scale:"1 0.6 1",material:mat(row%2?"#4e963b":"#6eaa40")}));
  grassLayer.appendChild(plant);
}

// Soft low-poly clouds.
function makeCloud(x,y,z,s=1) {
  const c=entity("a-entity",{position:`${x} ${y} ${z}`,scale:`${s} ${s} ${s}`,animation:`property:position;from:${x} ${y} ${z};to:${x+8} ${y+0.4} ${z};dir:alternate;dur:30000;loop:true;easing:linear`});
  [[0,0,0,1.8],[1.6,0.2,0,1.4],[-1.5,0.15,0,1.3],[0.3,0.5,0,1.2]].forEach(([px,py,pz,r])=>c.appendChild(entity("a-sphere",{position:`${px} ${py} ${pz}`,radius:String(r),material:"color:#ffffff;opacity:0.78;roughness:1;transparent:true"})));
  clouds.appendChild(c);
}
makeCloud(-22,19,-18,1.1); makeCloud(5,22,-25,0.9); makeCloud(24,18,-17,1.0);

// Improve the base grass around the existing green fields with subtle variation.
const ground = document.querySelector('a-plane[width="90"]');
if (ground) ground.setAttribute("material", "color:#4d8b3c;roughness:1");

// Keep the A-Frame VR button enabled and make the VR experience resilient.
// WebXR immersive sessions normally require HTTPS or localhost.
scene.setAttribute("vr-mode-ui", "enabled: true; enterVRButton: true");

scene.addEventListener("enter-vr", () => {
  const help=document.querySelector(".help");
  if(help) help.textContent="🥽 VR MODE ACTIVE • Look Around • Move with your VR controls";
});

scene.addEventListener("exit-vr", () => {
  const help=document.querySelector(".help");
  if(help) help.textContent="🖱️ Look Around  |  WASD Move  |  🥽 Enter VR";
});

scene.addEventListener("loaded", () => {
  const vrButton = document.querySelector(".a-enter-vr-button");
  if (vrButton) {
    vrButton.setAttribute("aria-label", "Enter VR");
    vrButton.title = "Enter VR";
  }
});

/* =========================================================
   ADDITIVE CROPS & VILLAGE CHICKENS
   Keeps the existing scene and VR system unchanged.
   ========================================================= */

const addedCrops = document.createElement("a-entity");
addedCrops.setAttribute("id", "addedCropZones");
scene.appendChild(addedCrops);

const addedChickens = document.createElement("a-entity");
addedChickens.setAttribute("id", "addedChickens");
scene.appendChild(addedChickens);

/* ---------- Sugarcane field ---------- */
function makeSugarcanePlant(x, z, scale = 1) {
  const p = entity("a-entity", {
    position: `${x.toFixed(2)} 0 ${z.toFixed(2)}`,
    scale: `${scale} ${scale} ${scale}`
  });

  const stalkColors = ["#4b8f32", "#5aa33b", "#3f7f2d"];
  const stalkCount = 3;
  for (let i = 0; i < stalkCount; i++) {
    const ox = (i - 1) * 0.11;
    const h = 2.0 + Math.random() * 0.8;
    p.appendChild(entity("a-cylinder", {
      position: `${ox.toFixed(2)} ${(h / 2).toFixed(2)} ${(Math.random() - 0.5) * 0.12}`,
      radius: "0.045",
      height: h.toFixed(2),
      material: mat(stalkColors[i])
    }));

    for (let leaf = 0; leaf < 4; leaf++) {
      const y = 0.65 + leaf * 0.38;
      const side = leaf % 2 === 0 ? -1 : 1;
      p.appendChild(entity("a-box", {
        position: `${ox + side * 0.16} ${y.toFixed(2)} 0`,
        width: "0.05",
        height: "0.72",
        depth: "0.035",
        rotation: `0 ${side * 28} ${side * 48}`,
        material: mat("#4d9635")
      }));
    }
  }
  addedCrops.appendChild(p);
}

// A separate sugarcane zone on the far side of the existing village/fields.
const sugarcaneBed = entity("a-entity", { id: "sugarcaneField" });
sugarcaneBed.appendChild(entity("a-plane", {
  position: "-3 0.025 -19",
  rotation: "-90 0 0",
  width: "27",
  height: "6.5",
  material: mat("#6e7e3d")
}));

for (let row = 0; row < 4; row++) {
  for (let col = 0; col < 17; col++) {
    const x = -15.5 + col * 1.55 + (Math.random() - 0.5) * 0.25;
    const z = -21.1 + row * 1.55 + (Math.random() - 0.5) * 0.18;
    makeSugarcanePlant(x, z, 0.92 + Math.random() * 0.22);
  }
}
addedCrops.appendChild(sugarcaneBed);

/* ---------- Dedicated mango orchard ---------- */
function makeOrchardMangoTree(x, z, scale = 1) {
  const tree = entity("a-entity", {
    position: `${x} 0 ${z}`,
    scale: `${scale} ${scale} ${scale}`
  });

  tree.appendChild(entity("a-cylinder", {
    position: "0 2.7 0",
    radius: "0.42",
    height: "5.4",
    material: mat("#68442b")
  }));

  const canopy = entity("a-entity", {
    position: "0 5.5 0",
    animation__sway: "property:rotation;from:0 -1.5 0;to:0 1.5 0;dir:alternate;dur:5200;loop:true;easing:easeInOutSine"
  });

  const lumps = [
    [0, 0, 0, 2.2], [1.35, 0.15, 0, 1.45], [-1.35, 0.15, 0.1, 1.45],
    [0, 0.15, 1.3, 1.4], [0, 0.2, -1.3, 1.4]
  ];
  lumps.forEach(([px, py, pz, r]) => {
    canopy.appendChild(entity("a-sphere", {
      position: `${px} ${py} ${pz}`,
      radius: String(r),
      material: mat("#2f8138")
    }));
  });

  for (let i = 0; i < 6; i++) {
    canopy.appendChild(entity("a-sphere", {
      position: `${(Math.random() - 0.5) * 2.8} ${-0.25 + Math.random() * 0.9} ${(Math.random() - 0.5) * 2.6}`,
      radius: "0.11",
      material: mat(i % 2 ? "#dcae35" : "#82a936")
    }));
  }

  tree.appendChild(canopy);
  addedCrops.appendChild(tree);
}

const orchard = entity("a-entity", { id: "mangoOrchard" });
orchard.appendChild(entity("a-plane", {
  position: "30 0.018 -9",
  rotation: "-90 0 0",
  width: "13",
  height: "22",
  material: mat("#4d8e3b")
}));

[
  [26, -17, 0.78], [30, -16, 0.9], [34, -16.5, 0.82],
  [26.5, -10.5, 0.86], [30.5, -10, 1.0], [34, -10.5, 0.88],
  [26, -4, 0.82], [30, -4.5, 0.92], [34, -4, 0.8]
].forEach(v => makeOrchardMangoTree(...v));
addedCrops.appendChild(orchard);

/* ---------- Small vegetable/kitchen garden ---------- */
const vegetableGarden = entity("a-entity", { id: "vegetableGarden" });
vegetableGarden.appendChild(entity("a-plane", {
  position: "-31 0.028 -14",
  rotation: "-90 0 0",
  width: "9",
  height: "10",
  material: mat("#765536")
}));

const vegetableColors = ["#62a83e", "#3f8e37", "#7da93d", "#4b9c40"];
for (let row = 0; row < 5; row++) {
  for (let col = 0; col < 6; col++) {
    const x = -34.2 + col * 1.15 + (Math.random() - 0.5) * 0.15;
    const z = -17.8 + row * 1.55 + (Math.random() - 0.5) * 0.15;
    const plant = entity("a-entity", { position: `${x} 0 ${z}` });
    plant.appendChild(entity("a-cylinder", {
      position: "0 0.32 0", radius: "0.035", height: "0.64",
      material: mat("#3c7f31")
    }));
    for (let leaf = 0; leaf < 4; leaf++) {
      plant.appendChild(entity("a-sphere", {
        position: `${(leaf - 1.5) * 0.07} 0.62 ${(leaf % 2 ? 0.08 : -0.08)}`,
        radius: "0.12",
        scale: "1 0.55 1",
        material: mat(vegetableColors[leaf])
      }));
    }
    vegetableGarden.appendChild(plant);
  }
}
addedCrops.appendChild(vegetableGarden);

/* ---------- Additional hens, chicks and rooster ---------- */
function makeVillageChicken(x, z, color = "#f0e2c6", scale = 1, action = "peck") {
  const c = entity("a-entity", {
    position: `${x} 0 ${z}`,
    scale: `${scale} ${scale} ${scale}`
  });

  c.appendChild(entity("a-sphere", {
    position: "0 0.42 0",
    radius: "0.29",
    material: mat(color)
  }));
  c.appendChild(entity("a-sphere", {
    position: "0.25 0.63 0",
    radius: "0.16",
    material: mat(color)
  }));
  c.appendChild(entity("a-cone", {
    position: "0.39 0.64 0",
    radiusBottom: "0.065",
    radiusTop: "0",
    height: "0.15",
    rotation: "0 0 -90",
    material: mat("#d8892d")
  }));
  c.appendChild(entity("a-sphere", {
    position: "0.20 0.79 0",
    radius: "0.065",
    scale: "0.75 1.2 0.6",
    material: mat("#c83d35")
  }));
  c.appendChild(entity("a-cone", {
    position: "-0.22 0.60 0",
    radiusBottom: "0.12",
    radiusTop: "0",
    height: "0.28",
    rotation: "0 0 90",
    material: mat("#a93732")
  }));

  if (action === "walk") {
    c.setAttribute("animation__walk", `property:position;from:${x} 0 ${z};to:${x + 2.2} 0 ${z + 1.1};dir:alternate;dur:${4500 + Math.random() * 2500};loop:true;easing:easeInOutSine`);
  } else if (action === "peck") {
    c.setAttribute("animation__peck", "property:rotation;from:0 -3 0;to:0 5 0;dir:alternate;dur:1200;loop:true;easing:easeInOutSine");
  } else {
    c.setAttribute("animation__idle", "property:rotation;from:0 -2 0;to:0 2 0;dir:alternate;dur:1800;loop:true;easing:easeInOutSine");
  }
  addedChickens.appendChild(c);
}

function makeChick(x, z, color = "#f5dca4") {
  const chick = entity("a-entity", { position: `${x} 0 ${z}` });
  chick.appendChild(entity("a-sphere", { position: "0 0.28 0", radius: "0.17", material: mat(color) }));
  chick.appendChild(entity("a-sphere", { position: "0.14 0.42 0", radius: "0.09", material: mat(color) }));
  chick.appendChild(entity("a-cone", { position: "0.22 0.43 0", radiusBottom: "0.035", radiusTop: "0", height: "0.08", rotation: "0 0 -90", material: mat("#d8892d") }));
  chick.setAttribute("animation__hop", `property:position;from:${x} 0 ${z};to:${x + 0.7} 0 ${z + 0.35};dir:alternate;dur:2100;loop:true;easing:easeInOutSine`);
  addedChickens.appendChild(chick);
}

[
  [21, 7.5, "#f4f0df", 1.0, "walk"],
  [23, 9.0, "#a96f3e", 0.95, "peck"],
  [25, 7.8, "#f0e0bd", 1.05, "idle"],
  [-22, 8.5, "#6e5a43", 0.98, "walk"],
  [-24, 9.2, "#efe7d4", 1.0, "peck"],
  [18, -17, "#8d6a45", 0.9, "walk"],
  [21, -16, "#f2e5ca", 1.0, "peck"],
  [27, 13.5, "#9a5e36", 1.0, "idle"],
  [-18, 18.5, "#f4f1e4", 0.95, "walk"]
].forEach(v => makeVillageChicken(...v));

makeChick(22.3, 8.3);
makeChick(22.9, 8.8);
makeChick(-23.0, 8.8);

/* Small signboards help identify the new crop zones without changing the original UI. */
function makeCropSign(x, z, label, color) {
  const sign = entity("a-entity", { position: `${x} 0 ${z}` });
  sign.appendChild(entity("a-box", { position: "0 1.0 0", width: "1.8", height: "0.9", depth: "0.08", material: mat(color) }));
  sign.appendChild(entity("a-cylinder", { position: "0 0.35 0", radius: "0.06", height: "0.7", material: mat("#69472f") }));
  // Text is intentionally simple and lightweight for VR.
  sign.appendChild(entity("a-text", {
    value: label,
    align: "center",
    color: "#fffdf2",
    width: "3.4",
    position: "0 1.0 0.06",
    rotation: "0 0 0"
  }));
  addedCrops.appendChild(sign);
}
makeCropSign(-3, -22.8, "SUGARCANE", "#477c32");
makeCropSign(34.2, 1.8, "MANGO ORCHARD", "#477c32");
makeCropSign(-31, -19.4, "VEGETABLES", "#6d5133");
