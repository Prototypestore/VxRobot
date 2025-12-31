import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.158.0/build/three.module.js';

// Scene and camera
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf0f0f0);

const camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.set(0, 1.5, 5);

// Renderer
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(5, 10, 5);
scene.add(directionalLight);

// Materials
const bodyMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.3,
    metalness: 0.1
});
const accentMaterial = new THREE.MeshStandardMaterial({
    color: 0xFFB6C1,
    roughness: 0.2,
    metalness: 0.1
});
const eyeMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    emissive: 0xffffff,
    emissiveIntensity: 0.9
});

// Robot parts
// Head
const headGeo = new THREE.SphereGeometry(0.7, 64, 64);
const head = new THREE.Mesh(headGeo, bodyMaterial);
head.position.y = 1.8;
scene.add(head);

// Body
const bodyGeo = new THREE.SphereGeometry(0.6, 64, 64);
bodyGeo.scale(1, 1.3, 0.8);
const body = new THREE.Mesh(bodyGeo, bodyMaterial);
body.position.y = 0.8;
scene.add(body);

// Ears / side protrusions
const earGeo = new THREE.SphereGeometry(0.15, 32, 32);
earGeo.scale(1, 2, 1);
const leftEar = new THREE.Mesh(earGeo, accentMaterial);
leftEar.position.set(-0.8, 1.8, 0);
scene.add(leftEar);
const rightEar = new THREE.Mesh(earGeo, accentMaterial);
rightEar.position.set(0.8, 1.8, 0);
scene.add(rightEar);

// Eyes
const eyeGeo = new THREE.SphereGeometry(0.1, 32, 32);
const leftEye = new THREE.Mesh(eyeGeo, eyeMaterial);
leftEye.position.set(-0.2, 1.9, 0.65);
scene.add(leftEye);
const rightEye = new THREE.Mesh(eyeGeo, eyeMaterial);
rightEye.position.set(0.2, 1.9, 0.65);
scene.add(rightEye);

// Arms
const armGeo = new THREE.CylinderGeometry(0.1, 0.1, 1.0, 32);
const leftArm = new THREE.Mesh(armGeo, bodyMaterial);
leftArm.position.set(-0.8, 0.9, 0);
leftArm.rotation.z = Math.PI/8;
scene.add(leftArm);

const rightArm = new THREE.Mesh(armGeo, bodyMaterial);
rightArm.position.set(0.8, 0.9, 0);
rightArm.rotation.z = -Math.PI/8;
scene.add(rightArm);

// Legs
const legGeo = new THREE.CylinderGeometry(0.12, 0.12, 1.0, 32);
const leftLeg = new THREE.Mesh(legGeo, bodyMaterial);
leftLeg.position.set(-0.25, -0.5, 0);
scene.add(leftLeg);
const rightLeg = new THREE.Mesh(legGeo, bodyMaterial);
rightLeg.position.set(0.25, -0.5, 0);
scene.add(rightLeg);

// Optional: Soft ground shadow
const planeGeo = new THREE.PlaneGeometry(10, 10);
const planeMat = new THREE.ShadowMaterial({opacity: 0.2});
const plane = new THREE.Mesh(planeGeo, planeMat);
plane.rotation.x = -Math.PI/2;
plane.position.y = -1;
plane.receiveShadow = true;
scene.add(plane);

// Enable shadows
renderer.shadowMap.enabled = true;
directionalLight.castShadow = true;
head.castShadow = true;
body.castShadow = true;
leftArm.castShadow = true;
rightArm.castShadow = true;
leftLeg.castShadow = true;
rightLeg.castShadow = true;

// Animate
function animate() {
    requestAnimationFrame(animate);
    head.rotation.y += 0.005; // slight head rotation for life
    renderer.render(scene, camera);
}
animate();

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
