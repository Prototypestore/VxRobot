import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.158.0/build/three.module.js';
  import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.158.0/examples/jsm/loaders/GLTFLoader.js';
  import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.158.0/examples/jsm/controls/OrbitControls.js';

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf0f0f0);

  const camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 0.1, 1000);
  camera.position.set(0, 1.5, 5);

  const renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  document.body.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  // Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(5, 10, 5);
  directionalLight.castShadow = true;
  scene.add(directionalLight);

  // Load robot model
  const loader = new GLTFLoader();
  loader.load('robot.glb', (gltf) => {
      const robot = gltf.scene;
      robot.traverse((child) => {
          if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;

              // Example: make body white and glossy
              if (child.name.includes('Body')) {
                  child.material.color.set(0xffffff);
                  child.material.roughness = 0.3;
                  child.material.metalness = 0.1;
              }
              // Example: make ears pink
              if (child.name.includes('Ear')) {
                  child.material.color.set(0xFFB6C1);
              }
              // Example: make eyes glow
              if (child.name.includes('Eye')) {
                  child.material.emissive.set(0xffffff);
                  child.material.emissiveIntensity = 0.9;
              }
          }
      });
      scene.add(robot);
  });

  function animate() {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
  });
