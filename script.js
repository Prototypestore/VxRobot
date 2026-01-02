const canvas = document.getElementById("robotCanvas");
const ctx = canvas.getContext("2d");

/* ---------- HELPERS ---------- */
function circle(x, y, r, fill) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle = fill;
  ctx.fill();
}

function roundRect(x, y, w, h, r, fill) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
  ctx.fillStyle = fill;
  ctx.fill();
}

function drawRoundedTriangle(ctx, cx, y, w, h, r, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(cx - w / 2 + r, y);
  ctx.lineTo(cx + w / 2 - r, y);
  ctx.quadraticCurveTo(cx + w / 2, y, cx + w / 2, y + r);
  ctx.lineTo(cx + r, y + h - r);
  ctx.quadraticCurveTo(cx, y + h, cx - r, y + h - r);
  ctx.lineTo(cx - w / 2, y + r);
  ctx.quadraticCurveTo(cx - w / 2, y, cx - w / 2 + r, y);
  ctx.fill();
}

/* ---------- GRADIENTS ---------- */
const bodyGrad = ctx.createLinearGradient(0, 225, 0, 315);
bodyGrad.addColorStop(0, "#fff2f8");
bodyGrad.addColorStop(1, "#f2bfd9");

const headGrad = ctx.createRadialGradient(170, 110, 20, 200, 135, 100);
headGrad.addColorStop(0, "#fff5fb");
headGrad.addColorStop(1, "#f5cde0");

/* ---------- EMOTION STATE ---------- */
let emotion = "neutral";
let emotionStrength = 0;

/* ---------- FAKE SPEECH ENERGY (REALISTIC) ---------- */
function getSpeechEnergy(t) {
  // base talking rhythm
  let energy = 0.3 + Math.sin(t * 2) * 0.15;

  // emphasis spikes
  if (Math.random() < 0.02) energy += 0.6;

  // pauses
  if (Math.random() < 0.01) energy *= 0.2;

  return Math.min(Math.max(energy, 0), 1);
}

/* ---------- ANIMATION ---------- */
function animate(time) {
  const t = time / 1000;
  const energy = getSpeechEnergy(t);

  if (energy > 0.75) {
    emotion = "angry";
    emotionStrength = 1;
  } else if (energy > 0.55) {
    emotion = "dismissive";
    emotionStrength = 0.8;
  } else if (energy > 0.35) {
    emotion = "talking";
    emotionStrength = 0.6;
  } else if (energy > 0.15) {
    emotion = "boring";
    emotionStrength = 0.4;
  } else {
    emotionStrength *= 0.95;
    if (emotionStrength < 0.05) emotion = "neutral";
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const bob = Math.sin(t * 2) * 6;
  ctx.save();
  ctx.translate(0, bob);

  /* ---------- BODY ---------- */
  roundRect(145, 225, 110, 90, 50, bodyGrad);
  roundRect(185, 210, 30, 35, 10, bodyGrad);

  /* ---------- ARMS ---------- */
  let leftX = 115;
  let rightX = 225;
  let leftY = 245;
  let rightY = 245;

  if (emotion === "dismissive") {
    const throwAmt = Math.sin(t * 10) * 20 * emotionStrength;
    rightX += throwAmt;
    rightY -= Math.abs(throwAmt) * 0.4;
  }

  roundRect(leftX, leftY, 60, 40, 25, bodyGrad);
  roundRect(rightX, rightY, 60, 40, 25, bodyGrad);

  /* ---------- CHEST ---------- */
  ctx.fillStyle = "#ff66b2";
  ctx.beginPath();
  ctx.moveTo(173, 225);
  ctx.lineTo(227, 225);
  ctx.quadraticCurveTo(247, 225, 247, 245);
  ctx.lineTo(153, 245);
  ctx.quadraticCurveTo(153, 225, 173, 225);
  ctx.fill();

  drawRoundedTriangle(ctx, 199, 235, 94, 30, 10, "#ff66b2");

  /* ---------- HEAD ---------- */
  ctx.save();
  ctx.translate(200, 135);

  let headTilt = 0;
  if (emotion === "boring") headTilt = -5 * Math.PI / 180;
  if (emotion === "dismissive") headTilt = 5 * Math.PI / 180;
  if (emotion === "angry")
    headTilt = Math.sin(t * 8) * 4 * Math.PI / 180;

  ctx.rotate(headTilt);

  circle(0, 0, 90, headGrad);
  roundRect(-75, -25, 150, 70, 35, "#241332");

  if (emotion === "angry") {
    ctx.globalAlpha = emotionStrength * 0.6;
    roundRect(-75, -25, 150, 70, 35, "red");
    ctx.globalAlpha = 1;
  }

  /* ---------- EYES ---------- */
  ctx.strokeStyle = "#fff";
  ctx.lineWidth = 9;
  ctx.lineCap = "round";

  if (emotion === "boring") {
    ctx.beginPath();
    ctx.moveTo(-35, 12);
    ctx.lineTo(-15, 12);
    ctx.moveTo(15, 12);
    ctx.lineTo(35, 12);
    ctx.stroke();
  } else if (emotion === "dismissive") {
    ctx.beginPath();
    ctx.arc(-25, 12, 6, 0, Math.PI * 2);
    ctx.arc(25, 12, 6, 0, Math.PI * 2);
    ctx.fill();
  } else if (emotion === "angry") {
    ctx.beginPath();
    ctx.moveTo(-38, 3);
    ctx.lineTo(-12, 15);
    ctx.moveTo(12, 15);
    ctx.lineTo(38, 3);
    ctx.stroke();
  } else {
    ctx.beginPath();
    ctx.moveTo(-38, 15);
    ctx.quadraticCurveTo(-25, 3, -12, 15);
    ctx.moveTo(12, 15);
    ctx.quadraticCurveTo(25, 3, 38, 15);
    ctx.stroke();
  }

  ctx.restore(); // head
  ctx.restore(); // bob

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
