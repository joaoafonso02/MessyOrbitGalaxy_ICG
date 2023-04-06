import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';


let loadedModel, objModeled, objModeled2, objModeled3, objModeled4, 
objModeled5, objModeled6, objModeled7, objModeled8, objModeled9, objModeled10;
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
  let mesh;
  objModeled3.scene.traverse((child) => {
      if (child.isMesh) {
          child.material.color = new THREE.Color(0x2379a9);
          mesh = child;
          mesh.castShadow = true;
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
  gltfLoader.load('../assets/lightsaber_blue/Lightsaber.glb', (gltfScene) => {
  objModeled4 = gltfScene;
  console.log(objModeled);

  
  objModeled4.scene.position.x = 0;
  objModeled4.scene.position.y = -259;
  objModeled4.scene.position.z = 0;
  objModeled4.scene.scale.set(4, 22.5, 5);


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
  
  objModeled6.scene.position.set(550, 180, 0);
  objModeled6.scene.scale.set(15, 15, 15);
  
  scene.add(objModeled6.scene); // Add the loaded model to the scene

  if (callback) {
    callback();
  }

  });
}

function objModel7(callback) {
  gltfLoader.load('../assets/mandalorianShip/scene.gltf', (gltfScene) => {
  objModeled7 = gltfScene;
  console.log(objModeled);

  let mesh
  objModeled7.scene.traverse((child) => {
    if (child.isMesh) {
      mesh = child;
      mesh.castShadow = true;
    }
  });

  objModeled7.scene.position.set(290, 0, 0);
  objModeled7.scene.scale.set(15, 15, 15);
  
  scene.add(objModeled7.scene); // Add the loaded model to the scene

  if (callback) {
    callback();
  }

  });
}

function objModel8(callback) {
  gltfLoader.load('../assets/corridor/scene.gltf', (gltfScene) => {
  objModeled8 = gltfScene;
  console.log(objModeled8);

  let mesh
  objModeled8.scene.traverse((child) => {
    if (child.isMesh) {
      mesh = child;
      mesh.receiveShadow = true;
    }
  });

  objModeled8.scene.position.set(300, 0, 0);
  objModeled8.scene.scale.set(3, 3.5, 3.5);

  scene.add(objModeled8.scene); // Add the loaded model to the scene

  if (callback) {
    callback();
  }

  });
}

function objModel9(callback) {
  gltfLoader.load('../assets/fire/scene.gltf', (gltfScene) => {
  objModeled9 = gltfScene;
  console.log(objModeled9);

  objModeled9.scene.position.set(329, -2, -22);
  objModeled9.scene.scale.set(0.008, 0.008, 0.008);

  scene.add(objModeled9.scene); // Add the loaded model to the scene

  if (callback) {
    callback();
  }
  });
}

function objModel10(callback) {
  gltfLoader.load('../assets/bb8/scene.gltf', (gltfScene) => {
  objModeled10 = gltfScene;
  console.log(objModeled10);

  let mesh
  objModeled10.scene.traverse((child) => {
    if (child.isMesh) {
      mesh = child;
      mesh.castShadow = true;
      mesh.receiveShadow = true;
    }
  });

  objModeled10.scene.position.set(296, 14, 0);
  objModeled10.scene.scale.set(0.04, 0.04, 0.04);

  scene.add(objModeled10.scene); // Add the loaded model to the scene

  if (callback) {
    callback();
  }
  });
}



function newText() {
  const loader = new FontLoader();
  const font = loader.load( 'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function ( font ) {
      
      const textGeometry = new TextGeometry( 'Hello three.js!', {
        font: font,
        size: 80,
        height: 5,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 10,
        bevelSize: 8,
        bevelOffset: 0,
        bevelSegments: 5
      } );
      const textMaterial = new MeshPhongMaterial( { color: 0xff0000 } );
      const mesh = new Mesh( textGeometry, textMaterial ) ;
      mesh.position.set(0, 0, 0);
      mesh.rotation.set(0, 0, 0);
      mesh.scale.set(1, 1, 1);
      scene.add( mesh );
  
  } );
}






export { loadModel, loadedModel, objModel, objModeled, objModel2, 
  objModeled2, objModel3, objModeled3, objModel4, objModeled4, 
  objModel5, objModeled5, objModel6, objModeled6, objModel7, 
  objModeled7, objModel8, objModeled8, objModel9, objModeled9
  , objModel10, objModeled10, newText};
