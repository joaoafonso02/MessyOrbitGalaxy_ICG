import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';


let loadedModel, objModeled, objModeled2, objModeled3, objModeled4, objModeled5;
let nucleus;
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
  gltfLoader.load('../assets/rocket/scene.gltf', (gltfScene) => {
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
  gltfScene.scene.scale.set(80, 130, 55);
  
  scene.add(gltfScene.scene); // Add the loaded model to the scene

  if (callback) {
    callback();
  }

  // let user control the rocket positions with keys around sphereBig from script.js
  document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
      gltfScene.scene.position.x += 100;
    } else if (event.key === 'ArrowLeft') {
      gltfScene.scene.position.x -= 100;
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
  gltfLoader.load('../assets/spyro/scene.gltf', (gltfScene) => {
    objModeled = gltfScene;
    console.log(objModeled);

    gltfScene.scene.position.set(0, 159, 0); // set the position of the model
    gltfScene.scene.scale.set(5, 5, 5); // set the scale of the model
    scene.add(gltfScene.scene);

    const loader = new THREE.TextureLoader(); 
    const texturenucleus = loader.load('https://i.ibb.co/hcN2qXk/star-nc8wkw.jpg');
    texturenucleus.anisotropy = 16;
    let icosahedronGeometry = new THREE.IcosahedronGeometry(30, 10);
    let lambertMaterial = new THREE.MeshPhongMaterial({ map: texturenucleus });
    nucleus = new THREE.Mesh(icosahedronGeometry, lambertMaterial);
    scene.add(nucleus);

    let speed = 0.02;
    let angle = 0;
    let radius = 45;
    let x = 0, y = 0, z = 0;
  
    function animate() {
      requestAnimationFrame(animate);
      angle += speed;
      x = radius * Math.cos(angle);
      y = radius * Math.sin(angle);
    
      gltfScene.scene.position.set(x, y, z);
  
    
      gltfScene.scene.lookAt(20, 30, 10);
      renderer.render(scene, camera);
    }
    
    animate();
  

    if (callback) {
      callback();
    }
  });
}

function objModel2(callback) {
  gltfLoader.load('../assets/unkwObject/scene.gltf', (gltfScene) => {
  objModeled2 = gltfScene;
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
  gltfScene.scene.position.x = 0;
  gltfScene.scene.position.y = 0;
  gltfScene.scene.position.z = 100;
  gltfScene.scene.scale.set(20, 30, 25);

  scene.add(gltfScene.scene); // Add the loaded model to the scene

  if (callback) {
    callback();
  }

  });
}

function objModel3(callback) {
  gltfLoader.load('../assets/blueDragon/scene.gltf', (gltfScene) => {
  objModeled3 = gltfScene;
  console.log(objModeled);

  // model is too dark, so change the color of the model
  gltfScene.scene.traverse((child) => {
      if (child.isMesh) {
          child.material.color = new THREE.Color(0x2379a9);
      }
  });

  gltfScene.scene.position.x = 0;
  gltfScene.scene.position.y = 0;
  gltfScene.scene.position.z = -105;
  gltfScene.scene.scale.set(1, 1, 1);

  let speed = 0.01;
  let angle = 0;
  let radius = 35;
  let x = 0, y = 0, z = -100;

  function animate() {
    requestAnimationFrame(animate);
    angle += speed;
    x = 5 + radius * Math.cos(angle);
    y = 30 + radius * Math.sin(angle);
  
    gltfScene.scene.position.set(x, y, z);
  
    // calculate the angle between the model and the nucleus
    let angleToNucleus = Math.atan2(y, x);
  
    // rotate the model horizontally based on the angle to the nucleus
    gltfScene.scene.rotation.y = angleToNucleus;
  
    
    if (y < 0) {
      gltfScene.scene.rotation.x = -Math.PI / 2;
    } else {
      gltfScene.scene.rotation.x = Math.PI / 2;
    }
  
    gltfScene.scene.lookAt(0, 0, -90);
    renderer.render(scene, camera);
  }
  
  animate();

  scene.add(gltfScene.scene); // Add the loaded model to the scene

  if (callback) {
    callback();
  }

  });
}

function objModel4(callback) {
  gltfLoader.load('../assets/lightsaber_blue/scene.gltf', (gltfScene) => {
  objModeled4 = gltfScene;
  console.log(objModeled);

  
  gltfScene.scene.position.x = 0;
  gltfScene.scene.position.y = -270;
  gltfScene.scene.position.z = 0;
  gltfScene.scene.scale.set(70, 480, 50);

  scene.add(gltfScene.scene); // Add the loaded model to the scene

  if (callback) {
    callback();
  }

  });
}

function objModel5(callback) {
  gltfLoader.load('../assets/mand/scene.gltf', (gltfScene) => {
  objModeled5 = gltfScene;
  console.log(objModeled);

  
  gltfScene.scene.position.x = -5.2;
  gltfScene.scene.position.y = -5;
  gltfScene.scene.position.z = -2.9;
  gltfScene.scene.scale.set(30, 30, 30);

  scene.add(gltfScene.scene); // Add the loaded model to the scene

  if (callback) {
    callback();
  }

  });
}



export { loadModel, loadedModel, objModel, objModeled, objModel2, objModeled2, objModel3, objModeled3, objModel4, objModeled4, objModel5, objModeled5 };
