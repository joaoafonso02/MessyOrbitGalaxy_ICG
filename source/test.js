import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';


let loadedModel, objModeled, objModeled2, objModeled3, objModeled4, objModeled5, objModeled6;
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

  let mesh1;
  // change the color of the model with the texture
  loadedModel.scene.traverse((child) => {
      if (child.isMesh) {
          child.material.map = texture; 
          mesh1 = child;
          mesh1.castShadow = true;
          // body of the model is texture but the red color is black
          child.material.color = new THREE.Color(0x2379a9);

          child.material.map = texture; 

      }
  });
  
  loadedModel.scene.rotation.x = Math.PI / 2; // rotate the model 90 degrees to make it horizontal
  loadedModel.scene.position.x = -220;
  loadedModel.scene.position.y = 0;
  loadedModel.scene.position.z = -100;
  loadedModel.scene.scale.set(80, 130, 55);
  
  scene.add(loadedModel.scene); // Add the loaded model to the scene

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

    gltfScene.scene.position.set(0, 32, ); // set the position of the model
    gltfScene.scene.scale.set(5, 5, 5); // set the scale of the model
    scene.add(gltfScene.scene);

    let mesh2;
    gltfScene.scene.traverse((child) => {
      if (child.isMesh) {
        mesh2 = child;
        mesh2.castShadow = true;
        mesh2.receiveShadow = true; 
      }
    });
    // let speed = 0.02;
    // let angle = 0;
    // let radius = 45;
    // let x = 0, y = 0, z = 0;
  
    function animate() {
      requestAnimationFrame(animate);
      // angle += speed;
      // x = radius * Math.cos(angle);
      // y = radius * Math.sin(angle);
    
      // gltfScene.scene.position.set(x, y, z);
  
    
      gltfScene.scene.lookAt(0, 30, 35);
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
  objModeled2.scene.traverse((child) => {
      if (child.isMesh) {
          child.material.map = texture;
          // body of the model is texture but the red color is black
          child.material.color = new THREE.Color(0x2379a9);
          
          child.material.map = texture;
      }
  });

  objModeled2.scene.rotation.x = Math.PI / 2; // rotate the model 90 degrees to make it horizontal
  objModeled2.scene.position.x = 40;
  objModeled2.scene.position.y = -70;
  objModeled2.scene.position.z = 100;
  objModeled2.scene.scale.set(10, 10, 10);

  scene.add(objModeled2.scene); // Add the loaded model to the scene

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
  objModeled3.scene.traverse((child) => {
      if (child.isMesh) {
          child.material.color = new THREE.Color(0x2379a9);
      }
  });

  objModeled3.scene.position.x = 0;
  objModeled3.scene.position.y = 0;
  objModeled3.scene.position.z = -105;
  objModeled3.scene.scale.set(1, 1, 1);

  let speed = 0.01;
  let angle = 0;
  let radius = 35;
  let x = 0, y = 0, z = -100;

  function animate() {
    requestAnimationFrame(animate);
    angle += speed;
    x = 5 + radius * Math.cos(angle);
    y = 30 + radius * Math.sin(angle);
  
    objModeled3.scene.position.set(x, y, z);
  
    // calculate the angle between the model and the nucleus
    let angleToNucleus = Math.atan2(y, x);
  
    // rotate the model horizontally based on the angle to the nucleus
    objModeled3.scene.rotation.y = angleToNucleus;
  
    
    if (y < 0) {
      objModeled3.scene.rotation.x = -Math.PI / 2;
    } else {
      objModeled3.scene.rotation.x = Math.PI / 2;
    }
  
    objModeled3.scene.lookAt(0, 0, -90);
    renderer.render(scene, camera);
  }
  
  animate();

  scene.add(objModeled3.scene); // Add the loaded model to the scene

  if (callback) {
    callback();
  }

  });
}

function objModel4(callback) {
  gltfLoader.load('../assets/lightsaber_blue/scene.gltf', (gltfScene) => {
  objModeled4 = gltfScene;
  console.log(objModeled);

  
  objModeled4.scene.position.x = 0;
  objModeled4.scene.position.y = -270;
  objModeled4.scene.position.z = 0;
  objModeled4.scene.scale.set(70, 480, 50);

  // let mesh3;
  // objModeled4.scene.traverse((child) => {
  //   if (child.isMesh) {
  //     mesh3 = child;
  //     mesh3.castShadow = true;
  //     mesh3.receiveShadow = false;
  //   }
  // });

  // add a blue light to the model
  const light = new THREE.PointLight(0x0000ff, 1, 100);
  light.position.set(0, 0, 0);
  objModeled4.scene.add(light);

  scene.add(objModeled4.scene); // Add the loaded model to the scene

  if (callback) {
    callback();
  }

  });
}

function objModel5(callback) {
  gltfLoader.load('../assets/mand/scene.gltf', (gltfScene) => {
  objModeled5 = gltfScene;
  console.log(objModeled);

  
  objModeled5.scene.position.x = -5.2;
  objModeled5.scene.position.y = -5;
  objModeled5.scene.position.z = -2.9;
  objModeled5.scene.scale.set(30, 30, 30);

  let mesh3;
  objModeled5.scene.traverse((child) => {
    if (child.isMesh) {
      mesh3 = child;
      mesh3.castShadow = true;
      mesh3.receiveShadow = true;
    }
  });


  scene.add(objModeled5.scene); // Add the loaded model to the scene

  if (callback) {
    callback();
  }

  });
}

function objModel6(callback) {
  gltfLoader.load('../assets/sun/scene.gltf', (gltfScene) => {
  objModeled6 = gltfScene;
  console.log(objModeled);

  
  objModeled6.scene.position.set(450, 280, 0);
  objModeled6.scene.scale.set(20, 20, 20);
  
  scene.add(objModeled6.scene); // Add the loaded model to the scene

  if (callback) {
    callback();
  }

  });
}




export { loadModel, loadedModel, objModel, objModeled, objModel2, 
  objModeled2, objModel3, objModeled3, objModel4, objModeled4, 
  objModel5, objModeled5, objModel6, objModeled6 };
