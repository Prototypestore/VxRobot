const canvas = document.getElementById("robotCanvas");
const ctx = canvas.getContext("2d");

/* ---------- Helpers ---------- */
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

/* ---------- GLOBAL SHADOW (3D LIFT) ---------- */
ctx.shadowColor = "rgba(0,0,0,0.25)";
ctx.shadowBlur = 20;
ctx.shadowOffsetY = 8;

/* ---------- BODY (GRADIENT) ---------- */
const bodyGrad = ctx.createLinearGradient(0, 225, 0, 315);
bodyGrad.addColorStop(0, "#fff2f8");
bodyGrad.addColorStop(1, "#f2bfd9");

ctx.shadowBlur = 18;
roundRect(145, 225, 110, 90, 50, bodyGrad);

/* ---------- NECK ---------- */
roundRect(185, 210, 30, 35, 10, bodyGrad);


/* ---------- HEAD (3D GRADIENT) ---------- */
const headGrad = ctx.createRadialGradient(170, 110, 20, 200, 135, 100);
headGrad.addColorStop(0, "#fff5fb");
headGrad.addColorStop(1, "#f5cde0");
circle(200, 135, 90, headGrad);

/* ---------- VISOR ---------- */
ctx.shadowBlur = 12;
roundRect(125, 110, 150, 70, 35, "#241332");

/* ---------- VISOR GRID ---------- */
ctx.shadowColor = "transparent";
ctx.strokeStyle = "rgba(255,255,255,0.1)";
ctx.lineWidth = 1;
for (let y = 110; y <= 180; y += 8) {
  ctx.beginPath();
  ctx.moveTo(125, y);
  ctx.lineTo(275, y);
  ctx.stroke();
}

/* ---------- VISOR SHINE ---------- */
ctx.globalAlpha = 0.15;
roundRect(140, 130, 120, 35, 20, "#ffffff");
ctx.globalAlpha = 1;

/* ---------- EYES ---------- */
ctx.strokeStyle = "#ffffff";
ctx.lineWidth = 9;
ctx.lineCap = "round";
ctx.beginPath();
ctx.moveTo(162, 150);
ctx.quadraticCurveTo(175, 138, 188, 150);
ctx.moveTo(212, 150);
ctx.quadraticCurveTo(225, 138, 238, 150);
ctx.stroke();

/* ---------- HEADBAND ---------- */
ctx.strokeStyle = "#ff66b2";
ctx.lineWidth = 17;
ctx.beginPath();
ctx.arc(200, 140, 90, Math.PI, 0);
ctx.stroke();

/* ---------- HEADPHONES ---------- */
ctx.shadowColor = "rgba(0,0,0,0.3)";
ctx.shadowBlur = 12;
ctx.fillStyle = "#ff66b2";

ctx.beginPath();
ctx.arc(119, 140, 35, Math.PI * 0.5, Math.PI * 1.5);
ctx.fill();

ctx.beginPath();
ctx.arc(281, 140, 35, Math.PI * 1.5, Math.PI * 0.5);
ctx.fill();

/* ---------- ARMS ---------- */
roundRect(115, 245, 60, 40, 25, bodyGrad);
roundRect(225, 245, 60, 40, 25, bodyGrad);

/* ---------- CHEST PANEL ---------- */
ctx.shadowBlur = 8;
ctx.fillStyle = "#ff66b2";
ctx.beginPath();
ctx.moveTo(173, 225);
ctx.lineTo(227, 225);
ctx.quadraticCurveTo(247, 225, 247, 245);
ctx.lineTo(153, 245);
ctx.quadraticCurveTo(153, 225, 173, 225);
ctx.fill();

/* ---------- ROUNDED TRIANGLE ---------- */
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

drawRoundedTriangle(ctx, 199, 235, 94, 30, 10, "#ff66b2");

/* ---------- CLEANUP ---------- */
ctx.shadowColor = "transparent";

/* ---------- ANIMEMATION ---------- */
let startTime = performance.now();

function animate(time) {
  const t = (time - startTime) / 1000;

  // ----- SEQUENCE TIMING -----
  const sequenceLength = 30;
  const seqTime = t % sequenceLength;

  // ----- BOBBING (always) -----
  const bob = Math.sin(t * 2) * 6;

  // ----- HEAD TILT (0-10s) -----
  let tilt = 0;
  if (seqTime < 10) {
    const maxTilt = 5 * Math.PI / 180;
    tilt = Math.sin((seqTime / 10) * Math.PI) ** 2 * maxTilt;
  }

  // ----- SHRUG (12-15s) -----
  let shrugAmount = 0;
  let shrugEye = false; // new flag for shrug eyes
  if (seqTime >= 12 && seqTime <= 15) {
    const progress = (seqTime - 12) / 3;
    shrugAmount = Math.sin(progress * Math.PI) * 10;
    shrugEye = true; // trigger "º º" eyes
  }

  // ----- RIGHT HAND STRETCH (15-17s) -----
  let rightHandStretch = 0;

  // ----- EYE OFFSETS -----
  let eyeOffsetX = 0;
  let eyeOffsetY = 0;

  if (seqTime >= 15 && seqTime < 17) {
    const progress = (seqTime - 15) / 2;
    rightHandStretch = Math.sin(progress * Math.PI) * 20;

    // Eye tracks the right hand
    const handX = 225 + rightHandStretch - 200;
    const handY = 245 - 135;
    eyeOffsetX = handX * 0.1;
    eyeOffsetY = handY * 0.05;
  }

  // ----- TOSS (19-21s) -----
  let tossAmount = 0;
  if (seqTime >= 19 && seqTime < 21) {
    const progress = (seqTime - 19) / 2;
    tossAmount = Math.sin(progress * Math.PI) * 15;
  }

  // ----- ANGRY SEQUENCE (21-23s) -----
  let bodyTilt = 0;
  let angryLeftArmX = 0, angryLeftArmY = 0;
  let angryRightArmX = 0, angryRightArmY = 0;
  let angryEye = false;
  let visorRedAlpha = 0;
  if (seqTime >= 21 && seqTime < 23) {
    const progress = (seqTime - 21) / 2;
    bodyTilt = Math.sin(progress * Math.PI * 2) * 5;
    const diag = Math.sin(progress * Math.PI) * 20; // diagonal thrust
    angryLeftArmX = -diag;
    angryLeftArmY = diag;
    angryRightArmX = diag;
    angryRightArmY = diag;
    visorRedAlpha = Math.sin(progress * Math.PI);
    angryEye = true; // trigger angry eyes
  }

  // ----- CROSS ARMS (25-27s) -----
  let crossArmAngle = 0;
  if (seqTime >= 25 && seqTime < 27) {
    const progress = (seqTime - 25) / 2;
    crossArmAngle = Math.sin(progress * Math.PI) * Math.PI / 4;
  }

  // ----- FINAL HAND STRETCH + HEAD TILT (27-29s) -----
  let finalHandStretch = 0;
  let finalTilt = 0;
  if (seqTime >= 27 && seqTime < 29) {
    const progress = (seqTime - 27) / 2;
    finalHandStretch = Math.sin(progress * Math.PI) * 15;
    finalTilt = Math.sin(progress * Math.PI) * (5 * Math.PI / 180);
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // ----- BOB TRANSLATE -----
  ctx.save();
  ctx.translate(0, bob);

  /* ---------- BODY ---------- */
  ctx.save();
  ctx.translate(0, bodyTilt);
  ctx.shadowColor = "rgba(0,0,0,0.25)";
  ctx.shadowBlur = 18;
  ctx.shadowOffsetY = 8;
  roundRect(145, 225, 110, 90, 50, bodyGrad);
  roundRect(185, 210, 30, 35, 10, bodyGrad);
  ctx.restore();

  /* ---------- HEAD ---------- */
  ctx.save();
  ctx.translate(200, 135);
  ctx.rotate(tilt + finalTilt);

  // head gradient
  circle(0, 0, 90, headGrad);

  // visor
  ctx.shadowBlur = 12;
  ctx.shadowColor = "rgba(0,0,0,0.25)";
  roundRect(-75, -25, 150, 70, 35, "#241332");

  // visor red flash
  if (visorRedAlpha > 0) {
    ctx.globalAlpha = visorRedAlpha * 0.7;
    roundRect(-75, -25, 150, 70, 35, "red");
    ctx.globalAlpha = 1;
  }

  // visor grid
  ctx.shadowColor = "transparent";
  ctx.strokeStyle = "rgba(255,255,255,0.1)";
  ctx.lineWidth = 1;
  for (let y = -25; y <= 45; y += 8) {
    ctx.beginPath();
    ctx.moveTo(-75, y);
    ctx.lineTo(75, y);
    ctx.stroke();
  }

  // visor shine
  ctx.globalAlpha = 0.15;
  roundRect(-60, -5, 120, 35, 20, "#ffffff");
  ctx.globalAlpha = 1;

// ----- EYES -----
ctx.strokeStyle = "#ffffff";
ctx.lineWidth = 9;
ctx.lineCap = "round";

if (angryEye) {
  // Angry eyes: \ /
  ctx.beginPath();
  ctx.moveTo(-38, 3);
  ctx.lineTo(-12, 15); // left eye
  ctx.moveTo(12, 15);
  ctx.lineTo(38, 3); // right eye
  ctx.stroke();
}else if (shrugEye) {
  // Shrug eyes: filled circles ● ●
  const eyeRadius = 6; // same size as neutral eyes
  // Left eye
  ctx.beginPath();
  ctx.arc(-25, 12, eyeRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#ffffff";
  ctx.fill();
  // Right eye
  ctx.beginPath();
  ctx.arc(25, 12, eyeRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#ffffff";
  ctx.fill();
}
 else {
  // Neutral eyes (curved lines)
  ctx.beginPath();
  ctx.moveTo(-38 + eyeOffsetX, 15 + eyeOffsetY);
  ctx.quadraticCurveTo(-25 + eyeOffsetX, 3 + eyeOffsetY, -12 + eyeOffsetX, 15 + eyeOffsetY);
  ctx.moveTo(12 + eyeOffsetX, 15 + eyeOffsetY);
  ctx.quadraticCurveTo(25 + eyeOffsetX, 3 + eyeOffsetY, 38 + eyeOffsetX, 15 + eyeOffsetY);
  ctx.stroke();
}

  // headband
  ctx.strokeStyle = "#ff66b2";
  ctx.lineWidth = 17;
  ctx.beginPath();
  ctx.arc(0, 5, 90, Math.PI, 0);
  ctx.stroke();

  // headphones
  ctx.shadowColor = "rgba(0,0,0,0.3)";
  ctx.shadowBlur = 12;
  ctx.fillStyle = "#ff66b2";
  ctx.beginPath();
  ctx.arc(-81, 5, 35, Math.PI * 0.5, Math.PI * 1.5);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(81, 5, 35, Math.PI * 1.5, Math.PI * 0.5);
  ctx.fill();

  ctx.restore(); // head

 /* ---------- ARMS ---------- */
ctx.shadowColor = "rgba(0,0,0,0.25)";
ctx.shadowBlur = 12;

// Left arm
let leftX = 115;
let leftY = 245;

// Right arm
let rightX = 225;
let rightY = 245;

// ----- ANGRY ARMS (\ /) -----
if (seqTime >= 21 && seqTime < 23) {
  const progress = (seqTime - 21) / 2;
  const diag = Math.sin(progress * Math.PI) * 20; // diagonal thrust
  leftX += -diag;
  leftY -= diag;
  rightX += diag;
  rightY -= diag;

// ----- CROSS ARMS ((X)) -----
} else if (seqTime >= 25 && seqTime < 27) {
  const progress = (seqTime - 25) / 2;
  // Smoothly interpolate left arm across chest
  leftX = 115 + 45 * Math.sin(progress * Math.PI);  // move right
  leftY = 245 - 10 * Math.sin(progress * Math.PI);  // move up slightly
  // Smoothly interpolate right arm across chest over left
  rightX = 225 - 25 * Math.sin(progress * Math.PI); // move left
  rightY = 245 - 5 * Math.sin(progress * Math.PI);  // move up slightly
// ----- FINAL HAND STRETCH -----
} else if (seqTime >= 27 && seqTime < 29) {
  const progress = (seqTime - 27) / 2;
  rightX += Math.sin(progress * Math.PI) * 15;
}
// ----- DRAW ARMS -----
roundRect(leftX, leftY - shrugAmount - tossAmount, 60, 40, 25, bodyGrad);
roundRect(rightX, rightY - shrugAmount - tossAmount, 60, 40, 25, bodyGrad);

  /* ---------- CHEST PANEL ---------- */
  ctx.shadowBlur = 8;
  ctx.fillStyle = "#ff66b2";
  ctx.beginPath();
  ctx.moveTo(173, 225);
  ctx.lineTo(227, 225);
  ctx.quadraticCurveTo(247, 225, 247, 245);
  ctx.lineTo(153, 245);
  ctx.quadraticCurveTo(153, 225, 173, 225);
  ctx.fill();

  drawRoundedTriangle(ctx, 199, 235, 94, 30, 10, "#ff66b2");

  ctx.shadowColor = "transparent";
  ctx.restore(); // end bob

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
