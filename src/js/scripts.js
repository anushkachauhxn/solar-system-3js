import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import starsTexture from "../images/stars.jpg";
import sunTexture from "../images/sun.jpg";
import mercuryTexture from "../images/mercury.jpg";
import venusTexture from "../images/venus.jpg";
import earthTexture from "../images/earth.jpg";
import marsTexture from "../images/mars.jpg";
import jupiterTexture from "../images/jupiter.jpg";
import saturnTexture from "../images/saturn.jpg";
import saturnRingTexture from "../images/saturn-ring.png";
import uranusTexture from "../images/uranus.jpg";
import uranusRingTexture from "../images/uranus-ring.png";
import neptuneTexture from "../images/neptune.jpg";
import plutoTexture from "../images/pluto.jpg";

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const orbit = new OrbitControls(camera, renderer.domElement);

camera.position.set(-90, 140, 140);
orbit.update();

const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
  starsTexture,
  starsTexture,
  starsTexture,
  starsTexture,
  starsTexture,
  starsTexture,
]);

const textureLoader = new THREE.TextureLoader();

// SUN
const sunGeo = new THREE.SphereGeometry(16, 30, 30);
const sunMat = new THREE.MeshBasicMaterial({
  map: textureLoader.load(sunTexture),
});
const sun = new THREE.Mesh(sunGeo, sunMat);
scene.add(sun);

// Light Source: at the center of the sun
const pointLight = new THREE.PointLight(0xffffff, 2, 300);
scene.add(pointLight);

// MERCURY
const mercuryGeo = new THREE.SphereGeometry(3.2, 30, 30);
const mercuryMat = new THREE.MeshStandardMaterial({
  map: textureLoader.load(mercuryTexture),
});
const mercury = new THREE.Mesh(mercuryGeo, mercuryMat);

// parent-child relationship => position of mercury is relative to the position of the sun
// for different rotation speeds, planets will be relative to individual objects coinciding with the sun
const mercuryObj = new THREE.Object3D();
scene.add(mercuryObj);
mercuryObj.add(mercury);
mercury.position.x = 28;

// Animations
function animate() {
  sun.rotateY(0.004);
  mercuryObj.rotateY(0.04);
  mercury.rotateY(0.004);

  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

// Responsive Window
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
