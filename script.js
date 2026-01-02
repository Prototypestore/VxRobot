const canvas = document.getElementById("robotCanvas");
const ctx = canvas.getContext("2d");

// ---------- Helpers ----------
function circle(x, y, r, color) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
}

function roundRect(x, y, w, h, r, color) {
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
  ctx.fillStyle = color;
  ctx.fill();
}

// ---------- Head ----------
circle(200, 135, 90, "#ffe6f2");

// ---------- Visor (real visor shape) ----------
roundRect(125, 110, 150, 70, 35, "#241332");

// ---------- Horizontal grid lines inside visor ----------
ctx.strokeStyle = "rgba(255,255,255,0.1)"; // thin, subtle white
ctx.lineWidth = 1;
const visorX = 125;
const visorY = 110;
const visorWidth = 150;
const visorHeight = 70;
const spacing = 8; // space between lines
for (let y = visorY; y <= visorY + visorHeight; y += spacing) {
  ctx.beginPath();
  ctx.moveTo(visorX, y);
  ctx.lineTo(visorX + visorWidth, y);
  ctx.stroke();
}

// visor shine
ctx.globalAlpha = 0.15;
roundRect(140, 130, 120, 35, 20, "#ffffff");
ctx.globalAlpha = 1;

// ---------- Smiling arched eyes (CHIBI ONLY, NO DOTS) ----------
ctx.strokeStyle = "#ffffff";
ctx.lineWidth = 9;
ctx.lineCap = "round";

ctx.beginPath();

// Left eye (soft arch)
ctx.moveTo(162, 150);
ctx.quadraticCurveTo(175, 138, 188, 150);

// Right eye (soft arch)
ctx.moveTo(212, 150);
ctx.quadraticCurveTo(225, 138, 238, 150);

ctx.stroke();

// ---------- Headphones (semi-circles facing outward) ----------
ctx.fillStyle = "#ff66b2";

// Left headphone (flat side facing head, curve outward)
ctx.beginPath();
ctx.arc(119, 140, 35, Math.PI * 0.5, Math.PI * 1.5, false);
ctx.fill();

// Right headphone (flat side facing head, curve outward)
ctx.beginPath();
ctx.arc(281, 140, 35, Math.PI * 1.5, Math.PI * 0.5, false);
ctx.fill();

// ---------- Headband (straighter, thinner) ----------
ctx.strokeStyle = "#ff66b2";
ctx.lineWidth = 17;
ctx.beginPath();
ctx.arc(200, 140, 90, Math.PI, 0); // center x, center y, radius, start, end
ctx.stroke();

// ---------- Neck ----------
roundRect(185, 210, 30, 35, 10, "#ffe6f2");

// ---------- Arms (SHORT, THICK, CONNECTED) ----------
roundRect(115, 245, 60, 40, 25, "#ffe6f2"); // left arm
roundRect(225, 245, 60, 40, 25, "#ffe6f2"); // right arm

// ---------- Body (SMALL, ROUND, CHIBI) ----------
roundRect(145, 225, 110, 90, 50, "#ffe6f2");

// ---------- Chest panel (semi-circle) ----------
ctx.fillStyle = "#ff66b2";
const x = 153;
const y = 225;
const width = 94;
const height = 22;
const radius = 20; // roundness of top corners
ctx.beginPath();
// Top-left corner
ctx.moveTo(x + radius, y);
// Top edge
ctx.lineTo(x + width - radius, y);
// Top-right corner
ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
// Right edge
ctx.lineTo(x + width, y + height);
// Bottom edge
ctx.lineTo(x, y + height);
// Left edge
ctx.lineTo(x, y + radius);
// Top-left corner curve
ctx.quadraticCurveTo(x, y, x + radius, y);
ctx.closePath();
ctx.fill();

// ---------- Rounded downward triangle like the arrow icon ----------
function drawRoundedTriangle(ctx, centerX, topY, width, height, radius, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  const halfWidth = width / 2;
  // Points of the triangle
  const topLeftX = centerX - halfWidth;
  const topLeftY = topY;
  const topRightX = centerX + halfWidth;
  const topRightY = topY;
  const tipX = centerX;
  const tipY = topY + height;
  // Start at top-left, down a bit for rounding
  ctx.moveTo(topLeftX, topLeftY + radius);
  // Top-left corner
  ctx.quadraticCurveTo(topLeftX, topLeftY, topLeftX + radius, topLeftY);
  // Top edge to top-right corner
  ctx.lineTo(topRightX - radius, topRightY);
  ctx.quadraticCurveTo(topRightX, topRightY, topRightX, topRightY + radius);
  // Right edge down to tip
  ctx.lineTo(tipX + radius, tipY - radius);
  ctx.quadraticCurveTo(tipX, tipY, tipX - radius, tipY - radius);
  // Left edge back to start
  ctx.lineTo(topLeftX + radius, topLeftY + radius);
  ctx.closePath();
  ctx.fill();
}
// ---------- Example: draw it below chest ----------
drawRoundedTriangle(ctx, 199, 235, 94, 30, 10, "#ff66b2");
