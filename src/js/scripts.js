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

function animate() {
  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
