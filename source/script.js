import { loadModel, loadedModel, objModel, objModeled, objModel2, objModeled2, objModel3 , objModeled3} from './test.js';

let renderer,
scene,
camera,
sphereBg,
nucleus,
stars,
controls,
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
    camera.position.set(0,0,230);

    const directionalLight = new THREE.DirectionalLight("#fff", 2);
    directionalLight.position.set(0, 50, -20);
    scene.add(directionalLight);

    let ambientLight = new THREE.AmbientLight("#ffffff", 1);
    ambientLight.position.set(0, 20, 20);
    scene.add(ambientLight);

    renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // create a crazy animation when refresh the page
    TweenMax.fromTo(camera.position, 2, {
        x: 0,
        y: 0,
        z: 0
    }, {
        x: 0,
        y: 0,
        z: 330,
        ease: Power4.easeOut
    }, );

    //OrbitControl
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.autoRotate = true;
    controls.autoRotateSpeed = 4;
    controls.maxDistance = 350;
    controls.minDistance = 150;
    controls.enablePan = false;

    // const ticTacToeCube = new TicTacToeCube();

    // scene.add(ticTacToeCube);
    
    const loader = new THREE.TextureLoader(); 
    const textureSphereBg = loader.load('https://i.ibb.co/4gHcRZD/bg3-je3ddz.jpg');
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
    scene.add(SaturnPlanet);

    function render() {
        requestAnimationFrame(render);
        sphere.rotation.x -= 0.01;
        sphere.rotation.y += 0.01;
        sphere.rotation.z += 0.01;
        ring.rotation.y += 0.01;
        renderer.render(scene, camera);
    }

    render();

    // load models

    loadModel(() => {
        loadedModel.scene.rotation.y = Math.PI/2; 
        scene.add(loadedModel.scene);
        console.log(loadedModel)
    });

    // addModel(scene);
    objModel(() => {
        
        scene.add(objModeled.scene);
        console.log(objModeled)
    });

    objModel2(() => {
        objModeled2.scene.rotation.y = Math.PI/2;
        scene.add(objModeled2.scene);
        console.log(objModeled2)
    });

    objModel3(() => {
        objModeled3.scene.rotation.y = Math.PI/2;
        scene.add(objModeled3.scene);
        console.log(objModeled3)
    });
  

    // ADD a Rocket 
    const textureCylinder = loader.load('https://i.ibb.co/4gHcRZD/bg3-je3ddz.jpg');
    const textureTrace = loader.load('https://i.ibb.co/4gHcRZD/bg3-je3ddz.jpg');

    textureCylinder.anisotropy = 16;
    let cylinderGeometry = new THREE.CylinderBufferGeometry(30, 20, 100, 32);
    let cylinderMaterial = new THREE.MeshPhongMaterial({ map: texturenucleus, transparent: 0.5  ,opacity: 0.5});
    let cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);

    let coneGeometry = new THREE.ConeBufferGeometry(30, 90, 200);
    let coneMaterial = new THREE.MeshBasicMaterial({ map: texturenucleus, transparent: 0.5  ,opacity: 0.5});
    let cone = new THREE.Mesh(coneGeometry, coneMaterial);

    // Position the cone in front of the cylinder
    cone.position.set(-40, -50, -200);

    // fire trace
    let traceGeometry = new THREE.CylinderBufferGeometry(0.5, 0.5, 100, 32);
    let traceMaterial = new THREE.MeshPhongMaterial({ color: 0x632901, transparent: 0.5  ,opacity: 0.5});
    let trace = new THREE.Mesh(traceGeometry, traceMaterial);

    trace.position.set(100, -50, -181);
    trace.rotation.x = Math.PI / 2;
    trace.rotation.z = Math.PI / 2;

    // another trace
    let trace2 = new THREE.Mesh(traceGeometry, traceMaterial);

    trace2.position.set(100, -50, -219);
    trace2.rotation.x = Math.PI / 2;
    trace2.rotation.z = Math.PI / 2;

    // another trace
    let trace3 = new THREE.Mesh(traceGeometry, traceMaterial);

    trace3.position.set(150, -50, -199);
    trace3.rotation.x = Math.PI / 2;
    trace3.rotation.z = Math.PI / 2;

    let angle = Math.PI / 2; 
    trace3.rotation.set(angle, Math.PI / 2, 0);

    cone.rotation.x = Math.PI / 3;
    cone.rotation.z = Math.PI / 2;

    // forth trace
    let trace4 = new THREE.Mesh(traceGeometry, traceMaterial);

    trace4.position.set(193, -50, -224);
    trace4.rotation.x = Math.PI / 2;
    trace4.rotation.z = -Math.PI / 3;

    // fifth trace
    let trace5 = new THREE.Mesh(traceGeometry, traceMaterial);

    trace5.position.set(193, -50, -174);
    trace5.rotation.x = Math.PI / 2;
    trace5.rotation.z = Math.PI / 3;

    cylinder.rotation.x = Math.PI / 2;
    cylinder.rotation.z = Math.PI / 2;

    cylinder.position.set(55, -50, -200);

    // group cone, cylinder and traces
    let rocket = new THREE.Group();
    rocket.add(cone);
    rocket.add(cylinder);
    rocket.add(trace);
    rocket.add(trace2);
    rocket.add(trace3);
    rocket.add(trace4);
    rocket.add(trace5);

    scene.add(rocket);
    let time = 0;
    function render2() {
        requestAnimationFrame(render2);
        cylinder.rotation.x += 0.01;
        cone.rotation.x += 0.01;
        rocket.position.y = Math.cos(time) * 100;
        rocket.position.z = Math.sin(time) * 10;
        time += 0.05;
        renderer.render(scene, camera);
    }

    render2();

    // copy of the rocket
    let rocket2 = rocket.clone();
    rocket2.position.set(-100, -100, 0);

    scene.add(rocket2);

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

    // make user capable of moving the rocket2 with keyboard
    // let rocket2Speed = 10.5;
    // let rocket2RotationSpeed = 0.01;
    // let rocket2Position = rocket2.position;
    // let rocket2Rotation = rocket2.rotation;

    // let lastFrameTime = 0;

    // function updateRocket(time) {
    //     const delta = time - lastFrameTime;
    //     lastFrameTime = time;

    //     const moveDistance = rocket2Speed * (delta / 1000); // Convert milliseconds to seconds
    //     const rotateAngle = rocket2RotationSpeed * (delta / 1000); // Convert milliseconds to seconds

    //     document.addEventListener('keydown', function(event) {
    //         switch (event.key) {
    //         case 'ArrowUp':
    //             rocket2Position.z -= moveDistance;
    //             break;
    //         case 'ArrowDown':
    //             rocket2Position.z += moveDistance;
    //             break;
    //         case 'ArrowLeft':
    //             rocket2Position.x -= moveDistance;
    //             break;
    //         case 'ArrowRight':
    //             rocket2Position.x += moveDistance;
    //             break;
    //         case 'a':
    //             rocket2Rotation.y += rotateAngle;
    //             break;
    //         case 'd':
    //             rocket2Rotation.y -= rotateAngle;
    //             break;
    //         case 'w':
    //             rocket2Rotation.x += rotateAngle;
    //             break;
    //         case 's':
    //             rocket2Rotation.x -= rotateAngle;
    //             break;
    //         }
    //     });

    //     requestAnimationFrame(updateRocket);
    // }

    // requestAnimationFrame(updateRocket);

    
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

    scene.add(Donut);


    /*  Nucleus  */   
    texturenucleus.anisotropy = 16;
    let icosahedronGeometry = new THREE.IcosahedronGeometry(30, 10);
    let lambertMaterial = new THREE.MeshPhongMaterial({ map: texturenucleus });
    nucleus = new THREE.Mesh(icosahedronGeometry, lambertMaterial);
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


    //Sphere Beckground Animation
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

//document.addEventListener("keydown", onDocumentKeyDown, false);


// move object with keys
// function onDocumentKeyDown(object, event) {
//     const keyCode = event.which;
//     switch (keyCode) {
//         case 37: // left arrow key
//             //mmake object move left
//             object.position.x -= 50;
//             break;
//         case 38: // up arrow key
//             object.position.z -= 50;
//             break;
//         case 39: // right arrow key
//             object.position.x += 50;
//             break;
//         case 40: // down arrow key
//             object.position.z += 50;
//             break;
//         // do for w a s d keys
//         case 87: // W key
//             object.position.y += 50;
//             break;
//         case 65: // A key
//             object.position.x -= 50;
//             break;
//         case 83: // S key
//             object.position.y -= 50;
//             break;
//         case 68: // D key
//             object.position.x += 50;
//             break;
//         }
// }

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
