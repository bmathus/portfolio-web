import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

//Cancas
const canvas = document.querySelector("#app");

//Scene
const scene = new THREE.Scene();

//Particles + material
const particleGeometry = new THREE.BufferGeometry();

const posArray = new Float32Array(1000 * 3).map((_) => {
  return (Math.random() - 0.5) * (Math.random() * 5);
});

particleGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(posArray, 3)
);

const loader = new THREE.TextureLoader();
const sphere = loader.load("./assets/star.png");

const material = new THREE.PointsMaterial({
  size: 0.005,
  map: sphere,
  transparent: true,
});

const particles = new THREE.Points(particleGeometry, material);
scene.add(particles);

//Light
const pointLight = new THREE.PointLight(0xffffff, 0.1);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;

//Add light and particles to scene
scene.add(pointLight);

//window sizing
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 2;
scene.add(camera);

//Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(new THREE.Color("#15191d"), 1);

let t = 0;
let rotateLeft = true;
function rotateOnScroll() {
  const new_t = document.body.getBoundingClientRect().top;
  if (t > new_t) {
    rotateLeft = true;
  } else {
    rotateLeft = false;
  }
  t = new_t;
}

document.body.onscroll = rotateOnScroll;

//Mouse movement
// document.addEventListener("mousemove", moveParticles);
// let mouseY = 0;
// let mouseX = 0;

// function moveParticles(event) {
//   mouseY = event.clientY;
//   mouseX = event.clientX;
// }

//Animate with time
const clock = new THREE.Clock();

const animate = () => {
  const time = clock.getElapsedTime();

  // if (t !== 0) {
  //   particles.rotation.y = t * -0.0002;

  // } else {

  // }
  if (rotateLeft) {
    particles.rotation.y = -time * 0.02 + t * 0.0001;
  } else {
    particles.rotation.y = time * 0.02 + t * 0.0001;
  }

  // if (rotateLeft) {
  //   particles.rotation.y = time * 0.02 + t * 0.002;

  //   //particles.rotation.y = time * 0.02 * (-t * 0.002 + 1.5);
  // } else {
  //   //particles.rotation.y = time * 0.02 * (-t * 0.002 + 1.5);
  // }

  //animating particles
  // if (mouseX > 0) {
  //   particles.rotation.y = mouseY * (time * 0.00008);
  // }

  //rendering every tick
  renderer.render(scene, camera);
  window.requestAnimationFrame(animate);
};

animate();
