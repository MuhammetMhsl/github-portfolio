const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Işık
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(2, 2, 5);
scene.add(light);

// GLTF Loader
const loader = new THREE.GLTFLoader();
let joystick;

loader.load(
  'joystick.glb',
  function (gltf) {
    joystick = gltf.scene;
    joystick.scale.set(1.5, 1.5, 1.5);
    joystick.rotation.y = Math.PI;
    scene.add(joystick);
  },
  undefined,
  function (error) {
    console.error('Model yüklenemedi:', error);
  }
);

// Animasyon
function animate() {
  requestAnimationFrame(animate);
  if (joystick) {
    joystick.rotation.y += 0.01;
  }
  renderer.render(scene, camera);
}

animate();