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

const colors = ["#ffffff", "#ff9800", "#ffeb3b", "#4caf50", "#03a9f4", "#9c27b0", "#f44336"];


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

    const directionalLight = new THREE.DirectionalLight("#fff", 3, 1000); 
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

    const loader1 = new THREE.TextureLoader(); 
    const texturePlane = loader1.load('https://i.ibb.co/hcN2qXk/star-nc8wkw.jpg');

    const planeGeometry = new THREE.PlaneGeometry( 30, 30, 32, 32 );
    const planeMaterial = new THREE.MeshPhongMaterial( { map: texturePlane } )
    const plane = new THREE.Mesh( planeGeometry, planeMaterial );
    plane.rotation.y = Math.PI / 2;
    plane.receiveShadow = true;
    plane.material.side = THREE.DoubleSide;
    plane.position.set(-10, -5, 0);
    scene.add( plane );

    // show directional light helper
    const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5);
    scene.add(directionalLightHelper);

    // let ambientLight = new THREE.AmbientLight("#ffffff", 1);
    // ambientLight.position.set(0, 200, 0);
    // scene.add(ambientLight);

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

    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    controls.maxDistance = 350;
    controls.minDistance = 150;
    controls.enablePan = false;

    
    // add shadows to the scene
    
    // renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    // renderer.shadowMapSoft = true;
    
    // add axis
    const axesHelper = new THREE.AxesHelper( 190 );
    scene.add( axesHelper );
    
    const loader = new THREE.TextureLoader(); 
    const textureSphereBg = loader.load('https://i.ibb.co/4gHcRZD/bg3-je3ddz.jpg');
    const textureSun = loader.load('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/4ad4afd9-1b7c-4043-8820-8322dc919c18/d6r3ze7-ede358d7-7d74-4d99-a023-c41de93b093b.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzRhZDRhZmQ5LTFiN2MtNDA0My04ODIwLTgzMjJkYzkxOWMxOFwvZDZyM3plNy1lZGUzNThkNy03ZDc0LTRkOTktYTAyMy1jNDFkZTkzYjA5M2IucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.wx1PpjChng962qEruw1OQ9FNbOWpxUFz1yFPZQ-t84M');
    const texturenucleus = loader.load('https://i.ibb.co/hcN2qXk/star-nc8wkw.jpg');
    const textureStar = loader.load("https://i.ibb.co/ZKsdYSz/p1-g3zb2a.png");
    const texture1 = loader.load("https://i.ibb.co/F8by6wW/p2-b3gnym.png");  
    const texture2 = loader.load("https://i.ibb.co/yYS2yx5/p3-ttfn70.png");
    const texture4 = loader.load("https://i.ibb.co/yWfKkHh/p4-avirap.png");
    
    // NEW PLANET
    const textureSphere = loader.load('https://i.ibb.co/4gHcRZD/bg3-je3ddz.jpg');
    const textureRing = loader.load('https://i.ibb.co/3FrQV5N/bg3-je3ddz.jpg');

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
    const gui = new dat.GUI();

    // set position of the guide GUI with pace on top and right
    gui.domElement.style.position = 'absolute';
    gui.domElement.style.top = '2px';
    gui.domElement.style.right = '10px';

    
    const cameraFolder = gui.addFolder('camera');
    cameraFolder.add(camera.position, 'x', -100, 100);
    cameraFolder.add(camera.position, 'y', -100, 100);
    cameraFolder.add(camera.position, 'z', -100, 100);
   
    // load models

    // rocket
    loadModel(() => {
        loadedModel.scene.rotation.y = Math.PI/2; 
        scene.add(loadedModel.scene);
        
    });

    // spyro
    objModel(() => {
        scene.add(objModeled.scene);
        
    });

    // unknown object
    // objModel2(() => {
    //     objModeled2.scene.rotation.y = Math.PI/2;
    //     scene.add(objModeled2.scene);
    //     console.log(objModeled2)
    // });

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

    // mandalorian space ship
    objModel7(() => {
        objModeled7.scene.rotation.y = Math.PI/2;
        scene.add(objModeled7.scene);
        spaceGarage.add(objModeled7.scene);

    });

    // space ship corridor
    objModel8(() => {
        objModeled8.scene.rotation.y = Math.PI/2;
        scene.add(objModeled8.scene);
        spaceGarage.add(objModeled8.scene);

    });

    // fire
    objModel9(() => {
        objModeled9.scene.rotation.x = Math.PI/2;
        objModeled9.scene.rotation.z = -Math.PI/2;
        
       
        // copy objModeled9.scene to a new variable
        const fire = objModeled9.scene.clone();
        // set the position of the new variable
        fire.position.set(329, -2, 22);

        scene.add(fire);
        scene.add(objModeled9.scene);
        spaceGarage.add(objModeled9.scene);
        spaceGarage.add(fire);
    });
    // bb8
    objModel10(() => {
        objModeled10.scene.rotation.y = Math.PI/2;
        scene.add(objModeled10.scene);
        spaceGarage.add(objModeled10.scene);
    });

    scene.add(spaceGarage);

    const spaceGarageFolder = gui.addFolder('spaceGarage');
    spaceGarageFolder.add(spaceGarage.position, 'x', -100, 100);
    spaceGarageFolder.add(spaceGarage.position, 'y', -100, 100);
    spaceGarageFolder.add(spaceGarage.position, 'z', -100, 100);

    
    const corridorlight = new THREE.DirectionalLight(0xff0000, 3, 1000);
    // position the light on the spaceGarage group
    corridorlight.position.set(spaceGarage.position.x, spaceGarage.position.y, spaceGarage.position.z);
    
    corridorlight.castShadow = true;
    scene.add(corridorlight);

    // Set up shadow properties for the light
    corridorlight.shadow.mapSize.width = 512;
    corridorlight.shadow.mapSize.height = 512;
    corridorlight.shadow.camera.near = 0.5;
    corridorlight.shadow.camera.far = 500;

    // make light cast shadows to a bigger object
    // corridorlight.shadow.camera.left = -30;
    // corridorlight.shadow.camera.right = 30;
    // corridorlight.shadow.camera.top = 30;
    // corridorlight.shadow.camera.bottom = -30;

    let corridorlightHelper = new THREE.DirectionalLightHelper(corridorlight, 5);
    scene.add(corridorlightHelper);

    // add a blue light to lightsaber
    const light = new THREE.PointLight(0x0000ff, 0.5, 100000);
    light.position.set(0, 0, 0);
    scene.add(light);

    const light2 = new THREE.PointLight(0x0000ff, 0.5, 100000);
    scene.add(light2);

    const light3 = new THREE.PointLight(0x0000ff, 0.5, 100000);
    light3.position.set(0, -100, 0);
    scene.add(light3);

    // const width = 40;
    // const height = 1000;
    // const intensity = 1;
    // const rectLight = new THREE.RectAreaLight( 0x0000ff, intensity,  width, height );
    // rectLight.position.set( 0, 0, 0 );
    // rectLight.lookAt( 0, 0, 0 );
    // scene.add( rectLight )

    // const rectLightHelper = new RectAreaLightHelper( rectLight );
    // rectLight.add( rectLightHelper );

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
    const inputElements = document.querySelectorAll('input');
    inputElements.forEach((input) => {
        if (input.id === 'check-apple2' || input.id === 'check-apple' || input.id === 'volumeControl') {
            return; // skip this input
        }
        input.addEventListener('change', () => updateScene(camera, renderer, scene));
    });

    // ADD an Astro
    const textureAstro = loader.load('https://i.ibb.co/4gHcRZD/bg3-je3ddz.jpg');

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
    const textureDonut = loader.load('https://i.ibb.co/4gHcRZD/bg3-je3ddz.jpg');

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
    const nucleusFolder = gui.addFolder('nucleus');
    // scale all axis once 
    nucleusFolder.add(nucleus.scale, 'x', 0.1, 5);
    nucleusFolder.add(nucleus.scale, 'y', 0.1, 5);
    nucleusFolder.add(nucleus.scale, 'z', 0.1, 5);

    nucleusFolder.add(nucleus.rotation, 'x', 0, Math.PI).name('Rotate X Axis');
    nucleusFolder.add(nucleus.rotation, 'y', 0, Math.PI).name('Rotate Y Axis');
    nucleusFolder.add(nucleus.rotation, 'z', 0, Math.PI).name('Rotate Z Axis');

    changeMaterial(nucleus, nucleusFolder);
   
    // Astro GUI FOLDER
    const AstroFolder = gui.addFolder('Astro');
    AstroFolder.add(Astro.scale, 'x', 0.1, 5);
    AstroFolder.add(Astro.scale, 'y', 0.1, 5);
    AstroFolder.add(Astro.scale, 'z', 0.1, 5);

    AstroFolder.add(Astro.rotation, 'x', 0, Math.PI).name('Rotate X Axis');
    AstroFolder.add(Astro.rotation, 'y', 0, Math.PI).name('Rotate Y Axis');
    AstroFolder.add(Astro.rotation, 'z', 0, Math.PI).name('Rotate Z Axis')

   changeMaterial(Astro, AstroFolder);

    // function to change the material, wireframe and color
    function changeMaterial(object, objectFolder) {
        const materialParams = {
            objectColor: object.material.color.getHex(),
        }
        objectFolder.add(object.material, 'wireframe');
        objectFolder
            .addColor(materialParams, 'objectColor')
            .onChange((value) => {object.material.color.set(value)});
    }

    // change controls.autoRotateSpeed of orbitControls with GUI
    const controlsFolder = gui.addFolder('Controls');
    controlsFolder.add(controls, 'autoRotateSpeed', 0.1, 10).name('Rotate Speed');

    // change the background color of the scene with GUI






    
    
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


    //Nucleus Animation
    // nucleus.geometry.vertices.forEach(function (v) {
    //     let time = Date.now();
    //     v.normalize();
    //     let distance = nucleus.geometry.parameters.radius + noise.noise3D(
    //         v.x + time * 0.0005,
    //         v.y + time * 0.0003,
    //         v.z + time * 0.0008
    //     ) * blobScale;
    //     v.multiplyScalar(distance);
    // })
    // nucleus.geometry.verticesNeedUpdate = true;
    // nucleus.geometry.normalsNeedUpdate = true;
    // nucleus.geometry.computeVertexNormals();
    // nucleus.geometry.computeFaceNormals();
    // nucleus.rotation.y += 0.002;


    // Sphere Beckground Animation
    sphereBg.rotation.x += 0.002;
    sphereBg.rotation.y += 0.002;
    sphereBg.rotation.z += 0.002;


    controls.update();
    stars.geometry.verticesNeedUpdate = true;
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

function updateScene(camera, renderer, scene) {    

    // Get the camera position and rotation from the input elements
    const cameraPosX = document.getElementById('camera-pos-x').value;
    const cameraPosY = document.getElementById('camera-pos-y').value;
    const cameraPosZ = document.getElementById('camera-pos-z').value;
    const cameraRotX = document.getElementById('camera-rot-x').value;
    const cameraRotY = document.getElementById('camera-rot-y').value;
    const cameraRotZ = document.getElementById('camera-rot-z').value;
  
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

let audio = new Audio('../assets/audio/starWars.mp3');
let audio2 = new Audio('../assets/audio/starWars2.mp3');
let playButton = document.getElementById('playButton');
let pauseButton = document.getElementById('pauseButton');
let volumeControl = document.getElementById('volumeControl');
let forwardButton = document.getElementById('nextButton');
let backwardButton = document.getElementById('prevButton');
let currentAudio = audio; // initially set current audio to audio

pauseButton.style.display = 'none';

playButton.addEventListener('click', function() {
    currentAudio.play(); // play current audio
    pauseButton.style.display = 'block';
    playButton.style.display = 'none';
});

pauseButton.addEventListener('click', function() {
    currentAudio.pause(); // pause current audio
    pauseButton.style.display = 'none';
    playButton.style.display = 'block';
});

// control volume
volumeControl.addEventListener("input", function() {
    currentAudio.volume = volumeControl.value; // set volume for current audio
});

// next song
forwardButton.addEventListener('click', function() {
    pauseButton.style.display = 'block';
    playButton.style.display = 'none';
    currentAudio.pause(); // pause current audio
    currentAudio.currentTime = 0; // start audio from beginning
    if (currentAudio === audio) { // check which audio is currently playing
        currentAudio = audio2; // set current audio to audio2
    } else {
        currentAudio = audio; // set current audio to audio
    }
    currentAudio.play(); // play current audio
});

// previous song
backwardButton.addEventListener('click', function() {
    pauseButton.style.display = 'block';
    playButton.style.display = 'none';
    currentAudio.pause(); // pause current audio
    currentAudio.currentTime = 0; // start audio from beginning
    if (currentAudio === audio) { // check which audio is currently playing
        currentAudio = audio2; // set current audio to audio2
    } else {
        currentAudio = audio; // set current audio to audio
    }
    currentAudio.play(); // play current audio
});
