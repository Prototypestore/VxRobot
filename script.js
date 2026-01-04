const canvas = document.getElementById("chibi");
const ctx = canvas.getContext("2d");

/* ---------- Utilities ---------- */
function circle(x, y, r, color) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
}

/* ---------- Hair (Back Afro) ---------- */
function drawHair() {
  const curls = [
    [200, 150, 105],
    [130, 150, 70],
    [270, 150, 70],
    [110, 235, 65],
    [290, 235, 65],
    [200, 285, 95]
  ];
  curls.forEach(c => circle(c[0], c[1], c[2], "#3b2a24"));
}

/* ---------- Head (BIGGER) ---------- */
function drawHead() {
  circle(200, 215, 75, "#c28f63");
}

/* ---------- Headband + Bow (ON band) ---------- */
function drawHeadband() {
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 8;
  ctx.lineCap = "round";
  // ---- Headband arc ----
  ctx.beginPath();
  ctx.arc(200, 217, 78, Math.PI * 1.1, Math.PI * 1.9);
  ctx.stroke();
  // ---- Bow anchor ON the band ----
  // Top-center of the arc
  const angle = Math.PI * 1.5;
  const radius = 68;
  const bx = 200 + Math.cos(angle) * radius;
  const by = 207 + Math.sin(angle) * radius;
  ctx.fillStyle = "#ffffff";
  // ---- Left bow loop ----
  ctx.beginPath();
  ctx.moveTo(bx, by);
  ctx.quadraticCurveTo(bx - 40, by - 16, bx - 30, by + 10);
  ctx.quadraticCurveTo(bx - 18, by + 26, bx - 8, by + 8);
  ctx.closePath();
  ctx.fill();
  // ---- Right bow loop ----
  ctx.beginPath();
  ctx.moveTo(bx, by);
  ctx.quadraticCurveTo(bx + 40, by - 16, bx + 30, by + 10);
  ctx.quadraticCurveTo(bx + 18, by + 26, bx + 8, by + 8);
  ctx.closePath();
  ctx.fill();
  // ---- Bow knot (on band) ----
  ctx.beginPath();
  ctx.arc(bx, by, 6, 0, Math.PI * 2);
  ctx.fill();
}


/* ---------- FULL Afro Fringe ---------- */
function drawFringe() {
  ctx.beginPath();
  ctx.arc(200, 200, 72, Math.PI * 1.05, Math.PI * 1.95);
  ctx.fillStyle = "#3b2a24";
  ctx.fill();
}
function drawSideFringeRight() {
  ctx.save();
  // Pivot point of the fringe
  const fx = 173;
  const fy = 245;
  // Move origin to fringe center
  ctx.translate(fx, fy);
  // Rotate 90° clockwise (vertical)
  ctx.rotate(Math.PI / 2);
  // Draw the same arc, but centered at (0, 0)
  ctx.beginPath();
  ctx.arc(-32, -90, 40, Math.PI * 1.05, Math.PI * 1.95);
  ctx.fillStyle = "#3b2a24";
  ctx.fill();
  ctx.restore();
}
function drawSideFringeLeft() {
  ctx.save();
  // Pivot point (left side of head)
  const fx = 227;
  const fy = 245;
  ctx.translate(fx, fy);
  // Rotate 90° counter-clockwise (mirror of right fringe)
  ctx.rotate(-Math.PI / 2);
  // Draw arc (same shape, mirrored)
  ctx.beginPath();
  ctx.arc(32, -90, 40, Math.PI * 1.05, Math.PI * 1.95);
  ctx.fillStyle = "#3b2a24";
  ctx.fill();
  ctx.restore();
}

/* ---------- AGGRESSIVELY CHIBI EYES ---------- */
function drawEyes() {

  function drawEye(cx, cy, irisColor) {
    ctx.save();
    /* ---- Eye white (wide chibi droop shape) ---- */
    ctx.beginPath();
    ctx.moveTo(cx - 22, cy - 8);                         // left top
    ctx.quadraticCurveTo(cx, cy - 22, cx + 22, cy - 8);  // heavy top lid
    ctx.quadraticCurveTo(cx + 26, cy + 14, cx, cy + 20); // big rounded bottom
    ctx.quadraticCurveTo(cx - 26, cy + 14, cx - 22, cy - 10);
    ctx.closePath();
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    ctx.clip();
    /* ---- Chibi Eyelashes (top lid only) ---- */
ctx.beginPath();
// main thick lash lid
ctx.moveTo(cx - 18, cy - 10);
ctx.quadraticCurveTo(cx, cy - 24, cx + 18, cy - 10);
ctx.lineWidth = 9;
ctx.lineCap = "round";
ctx.strokeStyle = "#000000";
ctx.stroke();
/* ---- Chibi bottom lid (soft, partial) ---- */
/* ---- Chibi bottom lid (soft, partial) ---- */
ctx.beginPath();
// short, shallow curve — NOT full eye
ctx.moveTo(cx - 10, cy + 16);
ctx.quadraticCurveTo(cx, cy + 20, cx + 10, cy + 16);
ctx.lineWidth = 4;              // thinner than top lid
ctx.lineCap = "round";
ctx.strokeStyle = "rgba(0,0,0,0.6)"; // softer = cuter
ctx.stroke();

/* ---- Small lash spikes (VERY chibi) ---- */
ctx.lineWidth = 6;
// left lash
ctx.beginPath();
ctx.moveTo(cx - 10, cy - 14);
ctx.lineTo(cx - 14, cy - 20);
ctx.stroke();
// center lash
ctx.beginPath();
ctx.moveTo(cx, cy - 16);
ctx.lineTo(cx, cy - 24);
ctx.stroke();
// right lash
ctx.beginPath();
ctx.moveTo(cx + 10, cy - 14);
ctx.lineTo(cx + 14, cy - 20);
ctx.stroke();
    /* ---- LOW + CENTERED IRIS (baby/chibi cue) ---- */
    const irisY = cy + 4;
    ctx.beginPath();
    ctx.arc(cx, irisY, 14, 0, Math.PI * 2);
    ctx.fillStyle = irisColor;
    ctx.fill();
    /* ---- Pupil (tiny, soft) ---- */
    ctx.beginPath();
    ctx.arc(cx, irisY + 0, 6, 0, Math.PI * 2);
    ctx.fillStyle = "#1b1b1b";
    ctx.fill();
    /* ---- Highlights (toy-like, not realistic) ---- */
    ctx.fillStyle = "#ffffff";
    // Big sparkle
    ctx.beginPath();
    ctx.arc(cx - 6, irisY - 6, 4, 0, Math.PI * 2);
    ctx.fill();
    // Small sparkle
    ctx.beginPath();
    ctx.arc(cx + 5, irisY + 7, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
  /* ---- Eyes closer + higher = more chibi ---- */
  drawEye(175, 200, "#9f735a"); // left
  drawEye(225, 200, "#5dbc13"); // right
}


/* ---------- Chibi Nose + Mouth ---------- */
function drawFaceDetails() {
  const cx = 200;
  const cy = 225;

  /* ---- Button Nose ---- */
  ctx.fillStyle = "#935d3f";
  ctx.beginPath();
  ctx.arc(cx, cy, 3, 0, Math.PI * 2);
  ctx.fill();

  /* ---- Tiny Chibi Mouth ---- */
  ctx.strokeStyle = "#86295d";
  ctx.lineWidth = 2;
  ctx.lineCap = "round";

  ctx.beginPath();
  ctx.moveTo(cx - 4, cy + 10);
  ctx.quadraticCurveTo(cx, cy + 12, cx + 4, cy + 10);
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

  ctx.beginPath();
  ctx.moveTo(199, 200);
  ctx.lineTo(201, 200);
  ctx.stroke();
}

/* ---------- AGGRESSIVE CHIBI BODY ---------- */
function drawBody() {
  ctx.beginPath();
  ctx.moveTo(170, 285);
  ctx.quadraticCurveTo(200, 275, 230, 285);
  ctx.quadraticCurveTo(245, 315, 230, 335);
  ctx.quadraticCurveTo(200, 345, 170, 335);
  ctx.quadraticCurveTo(155, 315, 170, 285);
  ctx.closePath();
  ctx.fillStyle = "#fff7da";
  ctx.fill();
  // Tiny arms
  ctx.fillStyle = "#c28f63";
  ctx.beginPath();
  ctx.ellipse(150, 305, 10, 14, 0.4, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(250, 305, 10, 14, -0.4, 0, Math.PI * 2);
  ctx.fill();
}
/* ---------- Tiny Legs ---------- */
function drawLegs() {
  ctx.fillStyle = "#c28f63";
  ctx.beginPath();
  ctx.ellipse(190, 350, 10, 14, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.ellipse(210, 350, 10, 14, 0, 0, Math.PI * 2);
  ctx.fill();
}

/* ---------- Tiny Feet ---------- */
function drawShoes() {
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.ellipse(185, 365, 14, 6, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.ellipse(215, 365, 14, 6, 0, 0, Math.PI * 2);
  ctx.fill();
}

/* ---------- Render ---------- */
function drawCharacter() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawHair();
  drawHead();
  drawFringe();
  drawHeadband();
  drawSideFringeRight();
  drawSideFringeLeft();
  drawEyes();
  drawFaceDetails();
  drawGlasses();
  drawLegs();
  drawBody();
  drawShoes();
}

drawCharacter();
