import * as THREE from 'three';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.168.0/examples/jsm/controls/OrbitControls.js';


// Set up the scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

// Set renderer size
renderer.setSize(window.innerWidth - 250, window.innerHeight);

document.body.appendChild(renderer.domElement);

const earthgroup = new THREE.Group();
scene.add(earthgroup);
const axialTilt = -23.5 * (Math.PI / 180); // Convert degrees to radians
earthgroup.rotation.z = axialTilt;

// Create Earth
const earthTexture = new THREE.TextureLoader().load('./e.jpg');
const earthMa = new THREE.MeshStandardMaterial({ map: earthTexture });
const earthMe = new THREE.IcosahedronGeometry(1, 12);
const earth = new THREE.Mesh(earthMe, earthMa);
earth.position.set(0,0,0);
earthgroup.add(earth);


// night map
const nightmaptexture = new THREE.TextureLoader().load('./enight.jpg');
const nightgeo = new THREE.IcosahedronGeometry(1, 12);
const nightmat = new THREE.MeshBasicMaterial({map: nightmaptexture, blending: THREE.AdditiveBlending});
const nightmap = new THREE.Mesh(nightgeo, nightmat);
nightmap.position.set(0,0,0);
earthgroup.add(nightmap);

// Add sunlight
const sunlight = new THREE.DirectionalLight(0xffffff, 2);
sunlight.position.set(-40 , 0, -4);
scene.add(sunlight);

// Set up controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = true;

// Set up camera position
camera.position.z = 3;

// dom js
const btn = document.querySelector('i');
const div = document.querySelector('.infodiv');

btn.addEventListener("click", (e) => {
    div.style.opacity = "0";
    renderer.setSize(window.innerWidth, window.innerHeight);
});

function animate() {
    requestAnimationFrame(animate);

    earth.rotation.y += 0.01;
    nightmap.rotation.y += 0.01;

    if(window.innerWidth <= 700){
        div.style.opacity = 0;
        camera.position.z = 5;
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    controls.update();
    renderer.render(scene, camera);
}

// Start animation
animate();

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth - 250, window.innerHeight);
});
