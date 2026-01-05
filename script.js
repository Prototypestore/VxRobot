// ======================
// CANVAS SETUP
// ======================
const canvas = document.getElementById("chibi");
const ctx = canvas.getContext("2d");

/* ---------- Utilities ---------- */
function circle(x, y, r, color) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
}

/* ---------- Time ---------- */
let time = 0;
let last = performance.now();

/* ---------- Blink System ---------- */
let blink = 0;
let blinkTimer = 0;
let nextBlink = 2 + Math.random() * 3;

/* ---------- Hair ---------- */
function drawHair() {
  const curls = [
    [200,150,105],[130,150,70],[270,150,70],
    [110,235,65],[290,235,65],[200,285,95]
  ];
  curls.forEach(c => circle(c[0], c[1], c[2], "#3b2a24"));
}

/* ---------- Head ---------- */
function drawHead() {
  circle(200,215,75,"#c28f63");
}

/* ---------- Headband + Bow ---------- */
function drawHeadband() {
  ctx.strokeStyle="#ffffff";
  ctx.lineWidth=8;
  ctx.lineCap="round";

  ctx.beginPath();
  ctx.arc(200,217,78,Math.PI*1.1,Math.PI*1.9);
  ctx.stroke();

  const angle=Math.PI*1.5;
  const r=68;
  const bx=200+Math.cos(angle)*r;
  const by=207+Math.sin(angle)*r;

  ctx.fillStyle="#ffffff";

  ctx.beginPath();
  ctx.moveTo(bx,by);
  ctx.quadraticCurveTo(bx-40,by-16,bx-30,by+10);
  ctx.quadraticCurveTo(bx-18,by+26,bx-8,by+8);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(bx,by);
  ctx.quadraticCurveTo(bx+40,by-16,bx+30,by+10);
  ctx.quadraticCurveTo(bx+18,by+26,bx+8,by+8);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.arc(bx,by,6,0,Math.PI*2);
  ctx.fill();
}

/* ---------- Fringe ---------- */
function drawFringe() {
  ctx.beginPath();
  ctx.arc(200,200,72,Math.PI*1.05,Math.PI*1.95);
  ctx.fillStyle="#3b2a24";
  ctx.fill();
}

function drawSideFringeRight() {
  ctx.save();
  ctx.translate(173,245);
  ctx.rotate(Math.PI/2);
  ctx.beginPath();
  ctx.arc(-32,-90,40,Math.PI*1.05,Math.PI*1.95);
  ctx.fillStyle="#3b2a24";
  ctx.fill();
  ctx.restore();
}

function drawSideFringeLeft() {
  ctx.save();
  ctx.translate(227,245);
  ctx.rotate(-Math.PI/2);
  ctx.beginPath();
  ctx.arc(32,-90,40,Math.PI*1.05,Math.PI*1.95);
  ctx.fillStyle="#3b2a24";
  ctx.fill();
  ctx.restore();
}

/* ---------- Eyes + Lashes + Blink ---------- */
function drawEyes(blinkAmount) {
  function drawEye(cx, cy, irisColor) {
    ctx.save();

    const open = 1 - blinkAmount;
    const eyeHeight = 20 * open + 2;

    // WHITE OF EYE (BLINKS)
    ctx.beginPath();
    ctx.moveTo(cx - 22, cy);
    ctx.quadraticCurveTo(cx, cy - eyeHeight, cx + 22, cy);
    ctx.quadraticCurveTo(cx + 26, cy + eyeHeight * 0.6, cx, cy + eyeHeight);
    ctx.quadraticCurveTo(cx - 26, cy + eyeHeight * 0.6, cx - 22, cy);
    ctx.closePath();
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    ctx.clip();

    // TOP LASH LINE
    ctx.beginPath();
    ctx.moveTo(cx - 18, cy - 10);
    ctx.quadraticCurveTo(cx, cy - 24, cx + 18, cy - 10);
    ctx.lineWidth = 9;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#000";
    ctx.stroke();

    // LASH SPIKES
    ctx.lineWidth = 6;
    ctx.beginPath(); ctx.moveTo(cx - 10, cy - 14); ctx.lineTo(cx - 14, cy - 20); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx, cy - 16); ctx.lineTo(cx, cy - 24); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx + 10, cy - 14); ctx.lineTo(cx + 14, cy - 20); ctx.stroke();

    // IRIS + PUPIL (SHRINKS ON BLINK)
    if (open > 0.15) {
      const iy = cy + 4;
      circle(cx, iy, 14 * open, irisColor);
      circle(cx, iy, 6 * open, "#1b1b1b");
      circle(cx - 6, iy - 6, 4 * open, "#ffffff");
      circle(cx + 5, iy + 7, 2 * open, "#ffffff");
    }

    ctx.restore();
  }

  drawEye(175, 200, "#9f735a");
  drawEye(225, 200, "#5dbc13");
}

/* ---------- Nose + Mouth ---------- */
function drawFaceDetails() {
  // nose
  circle(200, 225, 3, "#935d3f");

  // mouth
  ctx.strokeStyle = "#86295d";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(196, 235);
  ctx.quadraticCurveTo(200, 238, 204, 235);
  ctx.stroke();
}

/* ---------- Glasses ---------- */
function drawGlasses() {
  ctx.strokeStyle = "#d4b07a";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(175, 200, 24, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(225, 200, 24, 0, Math.PI * 2);
  ctx.stroke();
  // bridge
  ctx.beginPath();
  ctx.moveTo(199, 200);
  ctx.lineTo(201, 200);
  ctx.stroke();
}

/* ---------- Body ---------- */
function drawBody(counterTilt) {
  ctx.save();
  ctx.translate(200,310);
  ctx.rotate(counterTilt);
  ctx.translate(-200,-310);

  ctx.beginPath();
  ctx.moveTo(170,285);
  ctx.quadraticCurveTo(200,275,230,285);
  ctx.quadraticCurveTo(245,315,230,335);
  ctx.quadraticCurveTo(200,345,170,335);
  ctx.quadraticCurveTo(155,315,170,285);
  ctx.closePath();
  ctx.fillStyle="#fff7da";
  ctx.fill();

  ctx.restore();
}

function drawArms(sway) {
  ctx.fillStyle="#c28f63";
  ctx.beginPath(); ctx.ellipse(150+sway,305,10,14,0.4,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(250+sway,305,10,14,-0.4,0,Math.PI*2); ctx.fill();
}

function drawLegs(step) {
  ctx.fillStyle="#c28f63";
  ctx.beginPath(); ctx.ellipse(190,350+step,10,14,0,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(210,350-step,10,14,0,0,Math.PI*2); ctx.fill();
}

function drawShoes(step) {
  ctx.fillStyle="#fff";
  ctx.beginPath(); ctx.ellipse(190,365+step,9,5,0,0,Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(210,365-step,9,5,0,0,Math.PI*2); ctx.fill();
}

/* ---------- Render ---------- */
function drawCharacter(dt) {
  ctx.clearRect(0,0,canvas.width,canvas.height);

  const sway = Math.sin(time*1.5);
  const headTilt = sway * (2*Math.PI/180);
  const bodyCounterTilt = -sway * (3*Math.PI/180);
  const headBob = Math.sin(time*1.1) * 4;
  const legStep = Math.sin(time*2) * 6;
  const armSway = Math.sin(time*1.8) * -18;

  // blink update
  blinkTimer += dt;
  if (blinkTimer > nextBlink) {
    blink = Math.min(1, blink + dt * 8);
    if (blink >= 1) {
      nextBlink = 2 + Math.random() * 3;
      blinkTimer = -0.12;
    }
  } else {
    blink = Math.max(0, blink - dt * 6);
  }

  drawHair();
  drawLegs(legStep);
  drawArms(armSway);
  drawBody(bodyCounterTilt);
  drawShoes(legStep);

  ctx.save();
  ctx.translate(200,215-headBob);
  ctx.rotate(headTilt);
  ctx.translate(-200,-215);

  drawHead();
drawFringe();
drawSideFringeRight();
drawSideFringeLeft();
drawHeadband();
drawEyes(blink);
drawFaceDetails();
drawGlasses();

  ctx.restore();
}

/* ---------- Loop ---------- */
function animate(now){
  const dt = (now-last)/1000;
  last = now;
  time += dt;
  drawCharacter(dt);
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
