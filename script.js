const canvas = document.getElementById("robotCanvas");
const ctx = canvas.getContext("2d");

let audioCtx, analyser, dataArray, micStream;
let micActive = false;

// ---------- EMOTION STATE ----------
let emotion = "neutral";  // "positive" | "negative" | "neutral"
let emotionStrength = 0;
let eyeVariant = "neutral";

// ---------- WORD LISTS ----------
const POSITIVE_WORDS = [
  "happy","excited","love","hope","confident","proud","joy",
  "encouraging","optimistic","enthusiastic","appreciate"
];

const NEGATIVE_WORDS = [
  "boring","hate","angry","failing","bad","forget","disappointed",
  "critical","sad","depressing","insult","hollow"
];

const NEUTRAL_WORDS = [
  "normal","serious","objective","fact","honest","question",
  "why","what","how","explain","think"
];

// ---------- SPEECH RECOGNITION ----------
let recognition;
if ("webkitSpeechRecognition" in window) {
  recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;

  recognition.onresult = (event) => {
    const transcript = event.results[event.results.length - 1][0]
      .transcript.toLowerCase();

    let newEmotion = "neutral";

    if (POSITIVE_WORDS.some(w => transcript.includes(w))) {
      newEmotion = "positive";
    } else if (NEGATIVE_WORDS.some(w => transcript.includes(w))) {
      newEmotion = "negative";
    } else if (NEUTRAL_WORDS.some(w => transcript.includes(w))) {
      newEmotion = "neutral";
    }

    if (newEmotion !== emotion) {
      emotion = newEmotion;
      emotionStrength = 1;
      eyeVariant = pickEyeVariant(emotion);
    }
  };
}

// ---------- BUTTONS ----------
document.getElementById("startBtn").onclick = async () => {
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  micStream = await navigator.mediaDevices.getUserMedia({ audio: true });

  const source = audioCtx.createMediaStreamSource(micStream);
  analyser = audioCtx.createAnalyser();
  analyser.fftSize = 256;
  source.connect(analyser);
  dataArray = new Uint8Array(analyser.frequencyBinCount);

  micActive = true;
  recognition && recognition.start();

  document.getElementById("startBtn").disabled = true;
  document.getElementById("stopBtn").disabled = false;
};

document.getElementById("stopBtn").onclick = () => {
  micStream.getTracks().forEach(t => t.stop());
  recognition && recognition.stop();
  micActive = false;

  emotion = "neutral";
  emotionStrength = 0;
  eyeVariant = "neutral";

  document.getElementById("startBtn").disabled = false;
  document.getElementById("stopBtn").disabled = true;
};

// ---------- HELPER FUNCTIONS ----------
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

function pickEyeVariant(emotion) {
  if (emotion === "positive") {
    return ["neutral", "happy", "brow"][Math.floor(Math.random() * 3)];
  }
  if (emotion === "negative") {
    return ["xx", "annoyed", "shock"][Math.floor(Math.random() * 3)];
  }
  return "neutral";
}

// ---------- ANIMATION ----------
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // ---------- MIC ENERGY ----------
  let energy = 0;
  if (micActive) {
    analyser.getByteFrequencyData(dataArray);
    energy = dataArray.reduce((a, b) => a + b, 0) / dataArray.length / 60;
  }

  if (energy > 0.7) {
    emotion = "negative";
    emotionStrength = Math.max(emotionStrength, 0.8);
    eyeVariant = pickEyeVariant(emotion);
  }

  // ---------- EMOTION DECAY ----------
  emotionStrength *= 0.97;
  if (emotionStrength < 0.05) {
    emotion = "neutral";
    eyeVariant = "neutral";
  }

  // ---------- DRAW ROBOT HEAD ----------
  ctx.save();
  ctx.translate(200, 200);

  // head
  ctx.beginPath();
  ctx.arc(0, 0, 90, 0, Math.PI * 2);
  ctx.fillStyle = "#f5cde0";
  ctx.fill();

  // visor
  roundRect(-75, -25, 150, 70, 35, "#241332");

  // red flash for anger
  if (emotion === "negative") {
    ctx.globalAlpha = emotionStrength * 0.6;
    roundRect(-75, -25, 150, 70, 35, "red");
    ctx.globalAlpha = 1;
  }

  // ---------- DRAW EYES ----------
  ctx.strokeStyle = "#fff";
  ctx.lineWidth = 8;
  ctx.lineCap = "round";

  switch (eyeVariant) {
    // NEUTRAL
    case "neutral":
      ctx.beginPath();
      ctx.moveTo(-38, 15);
      ctx.quadraticCurveTo(-25, 3, -12, 15);
      ctx.moveTo(12, 15);
      ctx.quadraticCurveTo(25, 3, 38, 15);
      ctx.stroke();
      break;

    // POSITIVE
    case "happy": // ^^
      ctx.beginPath();
      ctx.moveTo(-38, 10);
      ctx.lineTo(-12, 2);
      ctx.moveTo(12, 2);
      ctx.lineTo(38, 10);
      ctx.stroke();
      break;

    case "brow": // raised eyebrow
      ctx.beginPath();
      ctx.moveTo(-38, 12);
      ctx.quadraticCurveTo(-25, 2, -12, 12);
      ctx.moveTo(12, 10);
      ctx.quadraticCurveTo(25, -2, 38, 10);
      ctx.stroke();
      break;

    // NEGATIVE
    case "xx":
      ctx.beginPath();
      ctx.moveTo(-35, 5);
      ctx.lineTo(-15, 25);
      ctx.moveTo(-35, 25);
      ctx.lineTo(-15, 5);

      ctx.moveTo(15, 5);
      ctx.lineTo(35, 25);
      ctx.moveTo(15, 25);
      ctx.lineTo(35, 5);
      ctx.stroke();
      break;

    case "annoyed": // ~~
      ctx.beginPath();
      ctx.moveTo(-38, 12);
      ctx.quadraticCurveTo(-25, 18, -12, 12);
      ctx.moveTo(12, 12);
      ctx.quadraticCurveTo(25, 18, 38, 12);
      ctx.stroke();
      break;

    case "shock": // DD
      ctx.beginPath();
      ctx.arc(-25, 12, 7, 0, Math.PI * 2);
      ctx.arc(25, 12, 7, 0, Math.PI * 2);
      ctx.stroke();
      break;
  }

  ctx.restore();

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
