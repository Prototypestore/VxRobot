const canvas = document.getElementById("robotCanvas");
const ctx = canvas.getContext("2d");

let analyser, dataArray;
let micActive = false;

/* ---------- START BUTTON ---------- */
document.getElementById("startBtn").addEventListener("click", async () => {
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const source = audioCtx.createMediaStreamSource(stream);

  analyser = audioCtx.createAnalyser();
  analyser.fftSize = 256;

  source.connect(analyser);
  dataArray = new Uint8Array(analyser.frequencyBinCount);

  micActive = true;
});

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

/* ---------- EMOTION ---------- */
let emotion = "neutral";
let emotionStrength = 0;

/* ---------- ANIMATION ---------- */
function animate(time) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let energy = 0;

  if (micActive) {
    analyser.getByteFrequencyData(dataArray);
    energy =
      dataArray.reduce((a, b) => a + b, 0) / dataArray.length / 60;
  }

  if (energy > 0.75) {
    emotion = "angry";
    emotionStrength = 1;
  } else if (energy > 0.5) {
    emotion = "dismissive";
    emotionStrength = 0.8;
  } else if (energy > 0.2) {
    emotion = "talking";
    emotionStrength = 0.5;
  } else {
    emotionStrength *= 0.95;
    if (emotionStrength < 0.05) emotion = "neutral";
  }

  // --- DEMO BODY (minimal for clarity) ---
  ctx.save();
  ctx.translate(200, 200);

  // head
  circle(0, 0, 90, "#f5cde0");

  // visor
  roundRect(-75, -25, 150, 70, 35, "#241332");

  // angry flash
  if (emotion === "angry") {
    ctx.globalAlpha = emotionStrength * 0.6;
    roundRect(-75, -25, 150, 70, 35, "red");
    ctx.globalAlpha = 1;
  }

  // eyes
  ctx.strokeStyle = "#fff";
  ctx.lineWidth = 8;
  ctx.lineCap = "round";

  if (emotion === "dismissive") {
    ctx.beginPath();
    ctx.arc(-25, 10, 6, 0, Math.PI * 2);
    ctx.arc(25, 10, 6, 0, Math.PI * 2);
    ctx.fillStyle = "#fff";
    ctx.fill();
  } else if (emotion === "angry") {
    ctx.beginPath();
    ctx.moveTo(-35, 0);
    ctx.lineTo(-10, 15);
    ctx.moveTo(10, 15);
    ctx.lineTo(35, 0);
    ctx.stroke();
  } else {
    ctx.beginPath();
    ctx.moveTo(-35, 15);
    ctx.quadraticCurveTo(-20, 0, -5, 15);
    ctx.moveTo(5, 15);
    ctx.quadraticCurveTo(20, 0, 35, 15);
    ctx.stroke();
  }

  ctx.restore();

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
