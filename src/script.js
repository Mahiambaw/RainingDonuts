import "./style.css";
import * as THREE from "three";

const canvas = document.querySelector(".webgl");
const scene = new THREE.Scene();
const ADD = 0.1;
const donutsArray = [];
const randomRange = function (from, to) {
  let x = Math.random() * (to - from);
  return x + from;
};

let createDonat = function () {
  const geometry = new THREE.TorusBufferGeometry(1, 0.5, 5, 30);
  const material = new THREE.MeshBasicMaterial({
    color: Math.random() * 0xffffff,
  });
  const torus = new THREE.Mesh(geometry, material);

  torus.position.x = randomRange(-20, 15);

  torus.position.z = randomRange(-20, 15);
  torus.position.y = 15;

  scene.add(torus);
  donutsArray.push(torus);
};

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  1,
  1000
);
camera.position.z = 20;
camera.position.y = -10;

scene.add(camera);

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);

const clock = new THREE.Clock();

const init = function () {
  let x = Math.random();
  if (x < 0.1) createDonat();
  donutsArray.forEach((el) => (el.position.y -= ADD));

  renderer.render(scene, camera);
  window.requestAnimationFrame(init);
};
init();
