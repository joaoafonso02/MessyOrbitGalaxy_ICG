import { loadModel, loadedModel, objModel, objModeled, objModel3 , objModeled3, objModel4, objModeled4, 
    objModel5, objModeled5, objModel6, objModeled6, objModel7, 
    objModeled7, objModel8, objModeled8, objModel9, objModeled9,
    objModel10, objModeled10
} from './test.js';

let renderer,
scene,
camera,
sphereBg,
nucleus,
stars,
controls,
controlsSun,
container = document.getElementById("canvas_container"),
timeout_Debounce,
noise = new SimplexNoise(),
cameraSpeed = 0,
blobScale = 3;

let clock = new THREE.Clock();


let colors = ["#ffffff", "#ff9800", "#ffeb3b", "#4caf50", "#03a9f4", "#9c27b0", "#f44336"];


init();
animate();

function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.01, 1000)
    camera.position.set(0,0,530);

    renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);


    let directionalLight = new THREE.DirectionalLight("#fff", 3, 1000); 
    // directionalLight.position.set(450, 180, 0);
    directionalLight.position.set(450, 180, 0);
    // do not point the light to the center of the scene

    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Set up shadow properties for the light
    directionalLight.shadow.mapSize.width = 512; 
    directionalLight.shadow.mapSize.height = 512;
    directionalLight.shadow.camera.near = 0.5; 
    directionalLight.shadow.camera.far = 500; 

    // make light cast shadows to a bigger object
    directionalLight.shadow.camera.left = -30;
    directionalLight.shadow.camera.right = 30;
    directionalLight.shadow.camera.top = 30;
    directionalLight.shadow.camera.bottom = -30;

    let loader1 = new THREE.TextureLoader(); 
    let texturePlane = loader1.load('https://i.ibb.co/hcN2qXk/star-nc8wkw.jpg');

    let planeGeometry = new THREE.PlaneGeometry( 30, 30, 32, 32 );
    let planeMaterial = new THREE.MeshPhongMaterial( { map: texturePlane } )
    let plane = new THREE.Mesh( planeGeometry, planeMaterial );
    plane.rotation.y = Math.PI / 2;
    plane.receiveShadow = true;
    plane.material.side = THREE.DoubleSide;
    plane.position.set(-10, -5, 0);
    scene.add( plane );

    // show directional light helper
   

    //OrbitControl
    controls = new THREE.OrbitControls(camera, renderer.domElement);

    // Set the target of the controls to the center of the scene
    controls.target.set(0, 0, 0);

    // Update the controls in the animation loop
    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }
    animate();

    controls.autoRotate = false;
    controls.autoRotateSpeed = 0.5;
    controls.maxDistance = 350;
    controls.minDistance = 150;
    controls.enablePan = false;
    
    // add axis
    // let axesHelper = new THREE.AxesHelper( 190 );
    // scene.add( axesHelper );
    
    let loader = new THREE.TextureLoader(); 
    let textureSphereBg = loader.load('https://i.ibb.co/4gHcRZD/bg3-je3ddz.jpg');
    let textureSun = loader.load('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/4ad4afd9-1b7c-4043-8820-8322dc919c18/d6r3ze7-ede358d7-7d74-4d99-a023-c41de93b093b.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzRhZDRhZmQ5LTFiN2MtNDA0My04ODIwLTgzMjJkYzkxOWMxOFwvZDZyM3plNy1lZGUzNThkNy03ZDc0LTRkOTktYTAyMy1jNDFkZTkzYjA5M2IucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.wx1PpjChng962qEruw1OQ9FNbOWpxUFz1yFPZQ-t84M');
    let texturenucleus = loader.load('https://i.ibb.co/hcN2qXk/star-nc8wkw.jpg');
    let textureStar = loader.load("https://i.ibb.co/ZKsdYSz/p1-g3zb2a.png");
    let texture1 = loader.load("https://i.ibb.co/F8by6wW/p2-b3gnym.png");  
    let texture2 = loader.load("https://i.ibb.co/yYS2yx5/p3-ttfn70.png");
    let texture4 = loader.load("https://i.ibb.co/yWfKkHh/p4-avirap.png");
    
    // NEW PLANET
    let textureSphere = loader.load('https://i.ibb.co/4gHcRZD/bg3-je3ddz.jpg');

    textureSphere.anisotropy = 16;
    let sphereGeometry = new THREE.SphereBufferGeometry(28, 32, 32);
    let sphereMaterial = new THREE.MeshPhongMaterial({ map: textureSphere });
    let sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

    sphere.position.set(100, 0, 0);
 
    // PLANET RING
    let ringGeometry = new THREE.TorusBufferGeometry(35, 5, 16, 100);
    let ringMaterial = new THREE.MeshPhongMaterial({ map: texturenucleus, side: THREE.DoubleSide, color: 0xffffff });
    
    let ring = new THREE.Mesh(ringGeometry, ringMaterial);

    ring.position.set(sphere.position.x, sphere.position.y, sphere.position.z);
    ring.rotation.x = Math.PI / 3;

    // group sphere and ring
    let SaturnPlanet = new THREE.Group();
    SaturnPlanet.add(sphere);
    SaturnPlanet.add(ring);
    ring.castShadow = true;
    sphere.castShadow = true;
    scene.add(SaturnPlanet);

    // add shadows to the objects
    SaturnPlanet.castShadow = true;

    function render() {
        requestAnimationFrame(render);
        sphere.rotation.x -= 0.01;
        sphere.rotation.y += 0.01;
        sphere.rotation.z += 0.01;
        ring.rotation.y += 0.01;
        renderer.render(scene, camera);
    }

    render();

    let spaceGarage = new THREE.Group();

    // show guide GUI
    let gui = new dat.GUI();

    // set position of the guide GUI with pace on top and right
    gui.domElement.style.position = 'absolute';
    gui.domElement.style.top = '2px';
    gui.domElement.style.right = '10px';

    let cameraFolder = gui.addFolder('camera');
    cameraFolder.add(camera.position, 'x', -100, 100);
    cameraFolder.add(camera.position, 'y', -100, 100);
    cameraFolder.add(camera.position, 'z', -100, 100);

    let lightFolder = gui.addFolder('Sunlight');
    lightFolder.add(directionalLight, "intensity", 0, 6, 0.1).name("Sun Light Intensity");
   
    // load models

    // rocket
    loadModel(() => {
        loadedModel.scene.rotation.y = Math.PI / 2;
        scene.add(loadedModel.scene);
    
        let rocketVelocity = new THREE.Vector3();

        let cameraResetPosition = null;

        document.addEventListener('keydown', (event) => {
            if (event.key === 'r') {
            if (cameraResetPosition === null) {
                // set camera position to be a 3rd person behind the rocket
                let distanceBehind = 100;
                let cameraOffset = new THREE.Vector3(0, 0, -distanceBehind);
                let rocketPosition = loadedModel.scene.position.clone();
                camera.position.copy(rocketPosition.add(cameraOffset));

                camera.lookAt(loadedModel.scene.position);
                controls.target = loadedModel.scene.position;
                cameraResetPosition = 'set';
            } else if (cameraResetPosition === 'set') {
                // reset camera position
                camera.position.set(0, 0, 530);
                controls.target = new THREE.Vector3(0, 0, 0);
                cameraResetPosition = null;
            }
            }
        let speed = 50; // Adjust the speed as needed

        if (event.key === 'ArrowUp') {
            rocketVelocity.z = speed;
        } else if (event.key === 'ArrowDown') {
            rocketVelocity.z = -speed;
        } else if (event.key === 'ArrowLeft') {
            rocketVelocity.x = speed;
        } else if (event.key === 'ArrowRight') {
            rocketVelocity.x = -speed;
        } else if (event.key === 'w') {
            rocketVelocity.y = speed;
        } else if (event.key === 's') {
            rocketVelocity.y = -speed;
        }
        });

        document.addEventListener('keyup', (event) => {
        if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
            rocketVelocity.z = 0;
        } else if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            rocketVelocity.x = 0;
        } else if (event.key === 'w' || event.key === 's') {
            rocketVelocity.y = 0;
        }
        });

        function animate() {
            requestAnimationFrame(animate);
          
            let deltaTime = clock.getDelta();
            loadedModel.scene.position.add(rocketVelocity.clone().multiplyScalar(deltaTime));
          
            if (cameraResetPosition === 'set') {
              let distanceBehind = 100;
              let cameraOffset = new THREE.Vector3(0, 0, -distanceBehind);
              let rocketPosition = loadedModel.scene.position.clone();
              let targetCameraPosition = rocketPosition.add(cameraOffset);
          
              // Smoothly interpolate the camera position using lerp
              camera.position.lerp(targetCameraPosition, 0.1);
              camera.lookAt(loadedModel.scene.position);
            }
          
            renderer.render(scene, camera);
          }
        
        animate();
    });
          

            

    //spyro
    objModel(() => {
        scene.add(objModeled.scene);
        
    });

    // blue dragon
    objModel3(() => {
        objModeled3.scene.rotation.y = Math.PI/2;
        scene.add(objModeled3.scene);

    });

    // blue lightsaber
    objModel4(() => {
        objModeled4.scene.rotation.y = Math.PI/2;
        scene.add(objModeled4.scene);
        
    });

    // mandalorian
    objModel5(() => {
        objModeled5.scene.rotation.y = Math.PI/2;
        scene.add(objModeled5.scene);
        
    });

    // sun
    objModel6(() => {
        objModeled6.scene.rotation.y = Math.PI/2;
        scene.add(objModeled6.scene);
    });

    // // mandalorian space ship
    // objModel7(() => {
    //     objModeled7.scene.rotation.y = Math.PI/2;
    //     scene.add(objModeled7.scene);
    //     spaceGarage.add(objModeled7.scene);

    // });

    // // space ship corridor
    // objModel8(() => {
    //     objModeled8.scene.rotation.y = Math.PI/2;
    //     scene.add(objModeled8.scene);
    //     spaceGarage.add(objModeled8.scene);

    // });

    // // fire
    // objModel9(() => {
    //     objModeled9.scene.rotation.x = Math.PI/2;
    //     objModeled9.scene.rotation.z = -Math.PI/2;
    //     // copy objModeled9.scene to a new variable
    //     let fire = objModeled9.scene.clone();
    //     // set the position of the new variable
    //     fire.position.set(329, -2, 22);

    //     scene.add(fire);
    //     scene.add(objModeled9.scene);
    //     spaceGarage.add(objModeled9.scene);
    //     spaceGarage.add(fire);
    // });
    // // bb8
    // objModel10(() => {
    //     objModeled10.scene.rotation.y = Math.PI/2;
    //     scene.add(objModeled10.scene);
    //     spaceGarage.add(objModeled10.scene);
    // });

    // scene.add(spaceGarage);

    let spaceGarageFolder = gui.addFolder('spaceGarage');
    spaceGarageFolder.add(spaceGarage.position, 'x', -100, 100);
    spaceGarageFolder.add(spaceGarage.position, 'y', -100, 100);
    spaceGarageFolder.add(spaceGarage.position, 'z', -100, 100);

    // add a blue light to lightsaber
    let light = new THREE.PointLight(0x0000ff, 0.5, 100000);
    light.position.set(0, 0, 0);
    scene.add(light);

    let light2 = new THREE.PointLight(0x0000ff, 0.5, 100000);
    light2.position.set(0, 100, 0);
    scene.add(light2);

    let light3 = new THREE.PointLight(0x0000ff, 0.5, 100000);
    light3.position.set(0, -100, 0);
    scene.add(light3);

    let LightSaberFolder = gui.addFolder('LightSaber');
    let intensityController = LightSaberFolder.add({ intensity: light.intensity }, "intensity", 0, 4, 0.1).name("Intensity");
    
    intensityController.onChange(function(value) {
    light.intensity = value;
    light2.intensity = value;
    light3.intensity = value;
    });

    // user options
    let toggleRocketModel = document.getElementById('check-apple');
    let togglePlanet = document.getElementById('check-apple2');

    // change rocket visibility of the model
    toggleRocketModel.addEventListener('click', function() {
        toggleVisibility(loadedModel.scene)
    });

    // change SaturnPlanet visibility
    togglePlanet.addEventListener('click', function() {
        toggleVisibility(SaturnPlanet);
    });

    // update scene
    let inputElements = document.querySelectorAll('input');
    inputElements.forEach((input) => {
        if (input.id === 'check-apple2' || input.id === 'check-apple' || input.id === 'volumeControl') {
            return; // skip this input
        }
        input.addEventListener('change', () => updateScene(camera, renderer, scene));
    });

    // ADD an Astro
    let textureAstro = loader.load('https://i.ibb.co/4gHcRZD/bg3-je3ddz.jpg');

    textureAstro.anisotropy = 16;
    let AstroGeometry = new THREE.DodecahedronGeometry(30, 0);
    let AstroMaterial = new THREE.MeshPhongMaterial({ map: texturenucleus  ,opacity: 0.4});
    let Astro = new THREE.Mesh(AstroGeometry, AstroMaterial);
    
    Astro.position.set(-100, 0, 0);
    Astro.rotation.x = Math.PI / 2;
    Astro.rotation.z = Math.PI / 2;

    Astro.receiveShadow = true;
    scene.add(Astro);

    // ADD Donut 
    let textureDonut = loader.load('https://i.ibb.co/4gHcRZD/bg3-je3ddz.jpg');

    textureDonut.anisotropy = 16;
    let DonutGeometry = new THREE.TorusGeometry(30, 10, 16, 100);
    let DonutMaterial = new THREE.MeshPhongMaterial({ map: texturenucleus  ,opacity: 0.4});
    let Donut = new THREE.Mesh(DonutGeometry, DonutMaterial);

    Donut.position.set(0, 0, -100);
    Donut.rotation.x = Math.PI / 2;
    Donut.rotation.z = Math.PI / 2;
    Donut.rotation.y = Math.PI / 2;
    Donut.receiveShadow = true;
    scene.add(Donut);

    /*  Nucleus  */   
    texturenucleus.anisotropy = 16;
    let icosahedronGeometry = new THREE.IcosahedronGeometry(30, 10);
    let lambertMaterial = new THREE.MeshPhongMaterial({ map: texturenucleus });
    nucleus = new THREE.Mesh(icosahedronGeometry, lambertMaterial);
    // nucleus.castShadow = true;
    nucleus.receiveShadow = true;
    scene.add(nucleus);

    // turn possible to go insdie the nucleus
    nucleus.material.side = THREE.DoubleSide;

    // fix zoom limit 
    controls.maxDistance = 500;
    controls.minDistance = 5;

    /*    Sphere  Background   */
    textureSphereBg.anisotropy = 16;
    let geometrySphereBg = new THREE.SphereBufferGeometry(150, 40, 40);
    let materialSphereBg = new THREE.MeshBasicMaterial({
        side: THREE.BackSide,
        map: textureSphereBg,
    });
    sphereBg = new THREE.Mesh(geometrySphereBg, materialSphereBg);
    scene.add(sphereBg);

    // nucleus GUI FOLDER
    let nucleusFolder = gui.addFolder('nucleus');
    // scale all axis once 
    nucleusFolder.add(nucleus.scale, 'x', 0.1, 5);
    nucleusFolder.add(nucleus.scale, 'y', 0.1, 5);
    nucleusFolder.add(nucleus.scale, 'z', 0.1, 5);

    nucleusFolder.add(nucleus.rotation, 'x', 0, Math.PI).name('Rotate X Axis');
    nucleusFolder.add(nucleus.rotation, 'y', 0, Math.PI).name('Rotate Y Axis');
    nucleusFolder.add(nucleus.rotation, 'z', 0, Math.PI).name('Rotate Z Axis');

    changeMaterial(nucleus, nucleusFolder);
   
    // Astro GUI FOLDER
    let AstroFolder = gui.addFolder('Astro');
    AstroFolder.add(Astro.scale, 'x', 0.1, 5);
    AstroFolder.add(Astro.scale, 'y', 0.1, 5);
    AstroFolder.add(Astro.scale, 'z', 0.1, 5);

    AstroFolder.add(Astro.rotation, 'x', 0, Math.PI).name('Rotate X Axis');
    AstroFolder.add(Astro.rotation, 'y', 0, Math.PI).name('Rotate Y Axis');
    AstroFolder.add(Astro.rotation, 'z', 0, Math.PI).name('Rotate Z Axis')

   changeMaterial(Astro, AstroFolder);

    // function to change the material, wireframe and color
    function changeMaterial(object, objectFolder) {
        let materialParams = {
            objectColor: object.material.color.getHex(),
        }
        objectFolder.add(object.material, 'wireframe');
        objectFolder
            .addColor(materialParams, 'objectColor')
            .onChange((value) => {object.material.color.set(value)});
    }

    // change controls.autoRotateSpeed of orbitControls with GUI
    let controlsFolder = gui.addFolder('Controls');
    controlsFolder.add(controls, 'autoRotateSpeed', 0.1, 10).name('Rotate Speed');
    
    /*    Moving Stars   */
    let starsGeometry = new THREE.Geometry();

    for (let i = 0; i < 50; i++) {
        let particleStar = randomPointSphere(150); 

        particleStar.velocity = THREE.MathUtils.randInt(50, 200);

        particleStar.startX = particleStar.x;
        particleStar.startY = particleStar.y;
        particleStar.startZ = particleStar.z;

        starsGeometry.vertices.push(particleStar);
    }
    let starsMaterial = new THREE.PointsMaterial({
        size: 5,
        color: "#ffffff",
        transparent: true,
        opacity: 0.8,
        map: textureStar,
        blending: THREE.AdditiveBlending,
    });
    starsMaterial.depthWrite = false;  
    stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);


    /*    Fixed Stars   */
    function createStars(texture, size, total) {
        let pointGeometry = new THREE.Geometry();
        let pointMaterial = new THREE.PointsMaterial({
            size: size,
            map: texture,
            blending: THREE.AdditiveBlending,                      
        });

        for (let i = 0; i < total; i++) {
            let radius = THREE.MathUtils.randInt(149, 70); 
            let particles = randomPointSphere(radius);
            pointGeometry.vertices.push(particles);
        }
        return new THREE.Points(pointGeometry, pointMaterial);
    }
    scene.add(createStars(texture1, 15, 20));   
    scene.add(createStars(texture2, 5, 5));
    scene.add(createStars(texture4, 7, 5));


    function randomPointSphere (radius) {
        let theta = 2 * Math.PI * Math.random();
        let phi = Math.acos(2 * Math.random() - 1);
        let dx = 0 + (radius * Math.sin(phi) * Math.cos(theta));
        let dy = 0 + (radius * Math.sin(phi) * Math.sin(theta));
        let dz = 0 + (radius * Math.cos(phi));
        return new THREE.Vector3(dx, dy, dz);
    }

}

function animate() {

    //Stars  Animation
    stars.geometry.vertices.forEach(function (v) {
        v.x += (0 - v.x) / v.velocity;
        v.y += (0 - v.y) / v.velocity;
        v.z += (0 - v.z) / v.velocity;

        v.velocity -= 0.3;

        if (v.x <= 5 && v.x >= -5 && v.z <= 5 && v.z >= -5) {
            v.x = v.startX;
            v.y = v.startY;
            v.z = v.startZ;
            v.velocity = THREE.MathUtils.randInt(50, 300);
        }
    });


    // Nucleus Animation
    nucleus.geometry.vertices.forEach(function (v) {
        let time = Date.now();
        v.normalize();
        let distance = nucleus.geometry.parameters.radius + noise.noise3D(
            v.x + time * 0.0005,
            v.y + time * 0.0003,
            v.z + time * 0.0008
        ) * blobScale;
        v.multiplyScalar(distance);
    })
    nucleus.geometry.verticesNeedUpdate = true;
    nucleus.geometry.normalsNeedUpdate = true;
    nucleus.geometry.computeVertexNormals();
    nucleus.geometry.computeFaceNormals();
    nucleus.rotation.y += 0.002;


    // Sphere Beckground Animation
    // sphereBg.rotation.x += 0.002;
    // sphereBg.rotation.y += 0.002;
    // sphereBg.rotation.z += 0.002;


    controls.update();
    stars.geometry.verticesNeedUpdate = true;
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

function updateScene(camera, renderer, scene) {    

    // Get the camera position and rotation from the input elements
    let cameraPosX = document.getElementById('camera-pos-x').value;
    let cameraPosY = document.getElementById('camera-pos-y').value;
    let cameraPosZ = document.getElementById('camera-pos-z').value;
    let cameraRotX = document.getElementById('camera-rot-x').value;
    let cameraRotY = document.getElementById('camera-rot-y').value;
    let cameraRotZ = document.getElementById('camera-rot-z').value;
  
    // Update the camera position and rotation
    camera.position.set(cameraPosX, cameraPosY, cameraPosZ);
    camera.rotation.set(cameraRotX, cameraRotY, cameraRotZ);
  
    // Render the updated scene
    renderer.render(scene, camera);
}
  

// Object Visibility
function toggleVisibility(object) {
    object.visible = !object.visible;
}


/*     Resize     */
window.addEventListener("resize", () => {
    clearTimeout(timeout_Debounce);
    timeout_Debounce = setTimeout(onWindowResize, 80);
});
function onWindowResize() {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
}


/*     Fullscreen btn     */
let fullscreen;
let fsEnter = document.getElementById('fullscr');
fsEnter.addEventListener('click', function (e) {
    e.preventDefault();
    if (!fullscreen) {
        fullscreen = true;
        document.documentElement.requestFullscreen();
        fsEnter.innerHTML = "Exit Fullscreen";
    }
    else {
        fullscreen = false;
        document.exitFullscreen();
        fsEnter.innerHTML = "Go Fullscreen";
    }
});



  
    document.getElementById('startButton').addEventListener('click', startGameWithTimer);
    let gameStartedMessage = document.getElementById('gameStartedMessage');
    gameStartedMessage.style.display = 'none';

    let gemCountMessage = document.getElementById('GemCount');
        gemCountMessage.style.display = 'none';

    let gameOverMenu = document.getElementById('GameOverMenu');
        gameOverMenu.style.display = 'none';

    let WinMessage = document.getElementById('WinMessage');
        WinMessage.style.display = 'none';

    let GameOverMessage = document.getElementById('GameOverMessage');
        GameOverMessage.style.display = 'none';

    let LoseMessage = document.getElementById('LoseMessage');
        LoseMessage.style.display = 'none';

    let ScoreMessage = document.getElementById('ScoreMessage');
        ScoreMessage.style.display = 'none';

    


let gems = [];
let score = 0;
let gemCount = 5; // Total number of gems
let gemsCollected = 0; // Counter for collected gems
let timeRemaining = 30;
let timerElement = document.getElementById('GameTimer');

document.getElementById('restartButton').addEventListener('click', () => {
  // reset the game
  score = 0;
  gemsCollected = 0;
  gemCount = 5;
  timeRemaining = 30;
  console.log('Game Restarted!');
  ScoreMessage.innerHTML = "Score: 0";
  gemCountMessage.innerHTML = "0/5 gems collected";
  timerElement.style.display = 'block';
  timerElement.textContent = formatTime(timeRemaining); // Update the timer element
  gameOverMenu.style.display = 'none';
  startGameWithTimer();
});

document.getElementById('LeaveGame').addEventListener('click', () => {
    // leave the game
    gameOverMenu.style.display = 'none';
});

function startGameWithTimer() {
    document.getElementById('menu').style.display = 'none';
    
    console.log('Game started!');
    
    let Gems = gemCount;
    allocateGreenGems(scene, Gems);
    
    // Display countdown timer
    
    let time = timeRemaining;
    
    timerElement.textContent = formatTime(timeRemaining);
    gemCountMessage.style.display = 'block';
    gameStartedMessage.style.display = 'block';
    
    setTimeout(() => {
        gameStartedMessage.style.display = 'none';
        ScoreMessage.style.display = 'block';
    }, 3000);
    
    let timerInterval = setInterval(() => { 
        timeRemaining--;
        timerElement.textContent = formatTime(timeRemaining);
    
        if (timeRemaining <= 0) {
        clearInterval(timerInterval);
        endGame(time, timerInterval, timeRemaining, false);
        } 
    }, 1000);
    
    if (timeRemaining === 0) {
        clearInterval(timerInterval);
        endGame(time, timerInterval, timeRemaining, false);
    } else {
        // collect gems when 'c' is pressed
        document.addEventListener('keydown', (event) => {
        let key = event.key.toLowerCase();
        if (key === 'c' || key === 'C') {
            collectGem(timeRemaining, timerInterval, time);
        }
        });
    }
    }
    
    // Function to allocate gems
    function allocateGreenGems(scene, totalGems) {
    gems = [];
    // remove all gems from scene
    gems.forEach(gem => scene.remove(gem));
    
    let gemGeometry = new THREE.SphereGeometry(5, 16, 16);
    let gemTexture = new THREE.TextureLoader().load('../assets/img/gem1.jpg');
    let gemMaterial = new THREE.MeshBasicMaterial({ map: gemTexture });
    
    for (let i = 0; i < totalGems; i++) {
        let gem = new THREE.Mesh(gemGeometry, gemMaterial);
    
        // Generate random position within the scene
        let posX = Math.random() * 200 - 100; // Adjust the range and position as needed
        let posY = Math.random() * 200 - 100;
        let posZ = Math.random() * 200 - 100;
    
        // make gems appear only on x axis
        gem.position.set(posX, 0, posZ);
    
        scene.add(gem);
        gems.push(gem);
    }
    }
    
    // Function to handle gem collection
    function collectGem(timeRemaining, timerInterval, time) {
    gems.forEach((gem, index) => {
        // Calculate distance between rocket and gem
        let distance = loadedModel.scene.position.distanceTo(gem.position);
    
        if (distance <= 40) {
        console.log('Gem collected!');
        scene.remove(gem);
        gemsCollected++;
    
        // Update gem count text
        let gemCountElement = document.getElementById('GemCount');
        gemCountElement.textContent = `${gemsCollected}/${gemCount} gems collected`;
    
        // create a logarithmic score where if the player collects a gem in the first 10 seconds, he gets 100 points, the next 10 seconds 90 points, the next 10 seconds 80 points, etc.
        score += Math.round(600 - (timeRemaining * 4.5));
    
        console.log(score);
    
        // Remove the collected gem from the gems array
        gems.splice(index, 1);
        }
    });
    
    let scoreElement = document.getElementById('score');
    let timerElement = document.getElementById('GameTimer');
    
    if (gemsCollected === gemCount) {
        console.log('All gems collected!');
        clearInterval(timerInterval);
        endGame(time, timerInterval, timeRemaining, true);
    }
    
    ScoreMessage.innerHTML = `Score: ${score}`;
    ScoreMessage.style.display = 'block';
    }
    
    function endGame(time, timerInterval, timeRemaining, success) {
    if (success) {
        let completedGameInSecs =  time - timeRemaining;
        console.log(completedGameInSecs);
        gemCountMessage.style.display = 'none'; 
        timerElement.style.display = 'none';
        ScoreMessage.style.display = 'none';
        console.log('Congratulations! You collected all the gems!');
        gameOverMenu.style.display = 'block';
        GameOverMessage.style.color = 'blue';
        GameOverMessage.style.display = 'block';
        WinMessage.innerHTML = `</br></br>Congratulations! You Won the Game! </br></br> Score: ${score}</br></br> Completed Game in: ${completedGameInSecs} seconds`;
        WinMessage.style.display = 'block';
    } else {
        gemCountMessage.style.display = 'none'; 
        WinMessage.style.display = 'none';
        timerElement.style.display = 'none';
        ScoreMessage.style.display = 'none';
        console.log('Game Over! Time\'s up or you missed some gems!');
        gameOverMenu.style.display = 'block';
        GameOverMessage.style.color = 'red';
        GameOverMessage.style.display = 'block';
        let missingGems = gemCount - gemsCollected;
        if (missingGems < 0) missingGems = (-1) * missingGems;
    
        LoseMessage.innerHTML = `</br></br>Game Over! Time is Up! </br></br> Score: ${score} </br></br> Missing Gems: ${missingGems}`;
        LoseMessage.style.display = 'block';
    }
}
    
function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = seconds % 60;
    return `${padZero(minutes)}:${padZero(remainingSeconds)}`;
}

function padZero(value) {
    return value.toString().padStart(2, '0');
}





let audio2 = new Audio('../assets/audio/starWars.mp3');
let audio = new Audio('../assets/audio/starWars2.mp3');
let playButton = document.getElementById('playButton');
let pauseButton = document.getElementById('pauseButton');
let volumeControl = document.getElementById('volumeControl');
let forwardButton = document.getElementById('nextButton');
let backwardButton = document.getElementById('prevButton');
let currentAudio = audio; 

pauseButton.style.display = 'none';

playButton.addEventListener('click', function() {
    currentAudio.play(); 
    pauseButton.style.display = 'block';
    playButton.style.display = 'none';
});

pauseButton.addEventListener('click', function() {
    currentAudio.pause(); 
    pauseButton.style.display = 'none';
    playButton.style.display = 'block';
});

// control volume
volumeControl.addEventListener("input", function() {
    currentAudio.volume = volumeControl.value; 
});

// next song
forwardButton.addEventListener('click', function() {
    pauseButton.style.display = 'block';
    playButton.style.display = 'none';
    currentAudio.pause(); 
    currentAudio.currentTime = 0; 
    if (currentAudio === audio) { 
        currentAudio = audio2; 
    } else {
        currentAudio = audio;
    }
    currentAudio.play(); 
});

// previous song
backwardButton.addEventListener('click', function() {
    pauseButton.style.display = 'block';
    playButton.style.display = 'none';
    currentAudio.pause(); 
    currentAudio.currentTime = 0; 
    if (currentAudio === audio) { 
        currentAudio = audio2; 
    } else {
        currentAudio = audio;
    }
    currentAudio.play(); 
});