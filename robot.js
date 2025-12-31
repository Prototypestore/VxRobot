const canvas = document.getElementById('robotCanvas');
const ctx = canvas.getContext('2d');

// Helper function for gradients
function radialGradientCircle(x, y, radius, innerColor, outerColor) {
    const grad = ctx.createRadialGradient(x, y, radius * 0.1, x, y, radius);
    grad.addColorStop(0, innerColor);
    grad.addColorStop(1, outerColor);
    return grad;
}

// Robot Colors
const bodyColor = '#FFFFFF';
const accentColor = '#FFB6C1';
const shadowColor = '#E0E0E0';
const eyeColor = '#FFFFFF';
const eyeGlowColor = 'rgba(255,255,255,0.6)';

// Draw body with shading
ctx.fillStyle = radialGradientCircle(200, 350, 60, bodyColor, shadowColor);
ctx.beginPath();
ctx.ellipse(200, 350, 60, 90, 0, 0, Math.PI * 2);
ctx.fill();

// Draw head with gradient
ctx.fillStyle = radialGradientCircle(200, 200, 70, bodyColor, shadowColor);
ctx.beginPath();
ctx.ellipse(200, 200, 70, 70, 0, 0, Math.PI * 2);
ctx.fill();

// Draw pink ear-like protrusions with shading
ctx.fillStyle = radialGradientCircle(140, 200, 15, accentColor, '#FF99B4');
ctx.beginPath();
ctx.ellipse(140, 200, 15, 30, 0, 0, Math.PI * 2);
ctx.fill();

ctx.fillStyle = radialGradientCircle(260, 200, 15, accentColor, '#FF99B4');
ctx.beginPath();
ctx.ellipse(260, 200, 15, 30, 0, 0, Math.PI * 2);
ctx.fill();

// Draw glowing eyes
ctx.fillStyle = eyeColor;
ctx.beginPath();
ctx.arc(180, 190, 10, 0, Math.PI * 2);
ctx.fill();
ctx.beginPath();
ctx.arc(220, 190, 10, 0, Math.PI * 2);
ctx.fill();

// Add glow effect
ctx.fillStyle = eyeGlowColor;
ctx.beginPath();
ctx.arc(180, 190, 16, 0, Math.PI * 2);
ctx.fill();
ctx.beginPath();
ctx.arc(220, 190, 16, 0, Math.PI * 2);
ctx.fill();

// Draw arms with soft gradients
ctx.fillStyle = radialGradientCircle(130, 350, 15, bodyColor, shadowColor);
ctx.beginPath();
ctx.ellipse(130, 350, 15, 60, Math.PI / 8, 0, Math.PI * 2);
ctx.fill();

ctx.fillStyle = radialGradientCircle(270, 350, 15, bodyColor, shadowColor);
ctx.beginPath();
ctx.ellipse(270, 350, 15, 60, -Math.PI / 8, 0, Math.PI * 2);
ctx.fill();

// Draw legs with shading
ctx.fillStyle = radialGradientCircle(180, 480, 15, bodyColor, shadowColor);
ctx.beginPath();
ctx.ellipse(180, 480, 15, 50, 0, 0, Math.PI * 2);
ctx.fill();

ctx.fillStyle = radialGradientCircle(220, 480, 15, bodyColor, shadowColor);
ctx.beginPath();
ctx.ellipse(220, 480, 15, 50, 0, 0, Math.PI * 2);
ctx.fill();

// Add highlight details on body
ctx.fillStyle = 'rgba(255,255,255,0.3)';
ctx.beginPath();
ctx.ellipse(200, 320, 40, 20, -Math.PI/8, 0, Math.PI * 2);
ctx.fill();
ctx.beginPath();
ctx.ellipse(200, 240, 40, 20, 0, 0, Math.PI * 2);
ctx.fill();

