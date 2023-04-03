import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';


let loadedModel;
let objModeled;
let SpaceShipModel;
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
let rocketDirection = new THREE.Vector3(0, 0, -1);


function animate() {
  requestAnimationFrame( animate );
  renderer.render( scene, camera );

}
animate();

function loadModel(callback) {
  gltfLoader.load('scene.gltf', (gltfScene) => {
  loadedModel = gltfScene;
  console.log(loadedModel);

  const loader = new THREE.TextureLoader(); 
  const texture = loader.load('https://i.ibb.co/hcN2qXk/star-nc8wkw.jpg');
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set( 1, 1 );


  // change the color of the model with the texture
  gltfScene.scene.traverse((child) => {
      if (child.isMesh) {
          child.material.map = texture; 
          // body of the model is texture but the red color is black
          child.material.color = new THREE.Color(0x2379a9);

          child.material.map = texture; 

      }
  });
  
  gltfScene.scene.rotation.x = Math.PI / 2; // rotate the model 90 degrees to make it horizontal
  gltfScene.scene.position.x = -220;
  gltfScene.scene.position.y = 0;
  gltfScene.scene.position.z = -100;
  gltfScene.scene.scale.set(100, 150, 85);
  
  scene.add(gltfScene.scene); // Add the loaded model to the scene

  if (callback) {
    callback();
  }

  // let user control the rocket positions with keys around sphereBig from script.js
  document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
      gltfScene.scene.position.x += 10;
    } else if (event.key === 'ArrowLeft') {
      gltfScene.scene.position.x -= 10;
    } else if (event.key === 'ArrowUp') {
      gltfScene.scene.position.y += 10;
    } else if (event.key === 'ArrowDown') {
      gltfScene.scene.position.y -= 10;
    } else if (event.key === 'z') {
      gltfScene.scene.position.z += 10;
    } else if (event.key === 'x') {
      gltfScene.scene.position.z -= 10;
    } else if (event.key === 'a') {
      gltfScene.scene.rotation.y += 0.1;
    } else if (event.key === 's') {
      gltfScene.scene.rotation.x += 0.1;
    } else if (event.key === 'd') {
      gltfScene.scene.rotation.y -= 0.1;
    } else if (event.key === 'w') {
      gltfScene.scene.rotation.x -= 0.1;
    } 

  });
});
}


// add another model to the scene
function objModel(callback) {
  gltfLoader.load('../assets/sa/scene.gltf', (gltfScene) => {
  objModeled = gltfScene;
  console.log(objModeled);

  const loader = new THREE.TextureLoader();
  const texture = loader.load('https://i.ibb.co/hcN2qXk/star-nc8wkw.jpg');
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set( 1, 1 );

  // change the color of the model with the texture
  gltfScene.scene.traverse((child) => {
      if (child.isMesh) {
          child.material.map = texture;
          // body of the model is texture but the red color is black
          child.material.color = new THREE.Color(0x2379a9);
          
          child.material.map = texture;
      }
  });

  gltfScene.scene.rotation.x = Math.PI / 2; // rotate the model 90 degrees to make it horizontal
  gltfScene.scene.position.x = 230;
  gltfScene.scene.position.y = 80;
  gltfScene.scene.position.z = 50;
  gltfScene.scene.scale.set(25, 45, 35);

  scene.add(gltfScene.scene); // Add the loaded model to the scene



  
  if (callback) {
    callback();
  }

  });
}

function SpaceShip(callback) {
  gltfLoader.load('../assets/satellite/scene.gltf', (gltfScene) => {
  SpaceShipModel = gltfScene;
  console.log(objModeled);

  const loader = new THREE.TextureLoader();
  const texture = loader.load('https://i.ibb.co/hcN2qXk/star-nc8wkw.jpg');
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set( 1, 1 );
  
  // change the color of the model with the texture
  gltfScene.scene.traverse((child) => {
    if (child.isMesh) {
        child.material.map = texture;
        // body of the model is texture but the red color is black
        child.material.color = new THREE.Color(0x2379a9);

        child.material.map = texture;
    }
  });

  gltfScene.scene.rotation.x = Math.PI / 2; // rotate the model 90 degrees to make it horizontal
  gltfScene.scene.position.x = 130;
  gltfScene.scene.position.y = 80;
  gltfScene.scene.position.z = 50;
  gltfScene.scene.scale.set(25, 45, 35);

  scene.add(gltfScene.scene); // Add the loaded model to the scene

  if (callback) {
    callback();
  }

  });
}



export { loadModel, loadedModel, objModel, objModeled, SpaceShip, SpaceShipModel };
