import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';

import { OrbitControls } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';


let loadedModel;
const scene = new THREE.Scene(); // Create a new scene
const gltfLoader = new GLTFLoader();

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, 1, 1).normalize();
scene.add(light);

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set( 10, 0, 50 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

function animate() {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
}
animate();

gltfLoader.load('/assets/redbull_formula_1_2022_car/scene.gltf', (gltfScene) => {
    loadedModel = gltfScene;
    console.log(loadedModel);

    gltfScene.scene.rotation.y = Math.PI / 8;
    gltfScene.scene.position.y = 3;
    gltfScene.scene.scale.set(10, 10, 10);
    scene.add(gltfScene.scene); // Add the loaded model to the scene
});
