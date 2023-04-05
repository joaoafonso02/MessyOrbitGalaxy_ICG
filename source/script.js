import { loadModel, loadedModel, objModel, objModeled, objModel2, 
    objModeled2, objModel3 , objModeled3, objModel4, objModeled4, 
    objModel5, objModeled5, objModel6, objModeled6, objModel7, 
    objModeled7, objModel8, objModeled8, objModel9, objModeled9} from './test.js';

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
    camera.position.set(0,0,230);

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
    directionalLight.position.set(550, 280, 0);
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

    // const directionalLight2 = new THREE.DirectionalLight("#fff", 3, 1000);
    // directionalLight2.position.set(0, 250, 0);
    // directionalLight2.castShadow = true;
    // scene.add(directionalLight2);

    // const directionalLight2 = new THREE.DirectionalLight("#fff", 2, 1000);
    // // directionalLight.position.set(450, 180, 0);
    // directionalLight2.position.set(-200, 100, 0);
    // directionalLight2.castShadow = true;
    // scene.add(directionalLight2);

    // // Set up shadow properties for the light
    // directionalLight2.shadow.mapSize.width = 2048; 
    // directionalLight2.shadow.mapSize.height = 2048;
    // directionalLight2.shadow.camera.near = 0.5; 
    // directionalLight2.shadow.camera.far = 500; 

    // // make light cast shadows to a bigger object
    // directionalLight2.shadow.camera.left = -30;
    // directionalLight2.shadow.camera.right = 30;
    // directionalLight2.shadow.camera.top = 30;
    // directionalLight2.shadow.camera.bottom = -30;


    // //Create a sphere that cast shadows (but does not receive them)
    // const sphereGeometry1 = new THREE.SphereGeometry( 5, 32, 32 );
    // const sphereMaterial1 = new THREE.MeshStandardMaterial( { color: 0xff0000 } );
    // const sphere1 = new THREE.Mesh( sphereGeometry1, sphereMaterial1 );
    // sphere1.castShadow = true; //default is false
    // sphere1.receiveShadow = false; //default
    // sphere1.position.set(5, 0, 15);
    // scene.add( sphere1 );

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

    controls.autoRotate = false;
    controls.autoRotateSpeed = 0.2;
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

    // load models

    // rocket
    loadModel(() => {
        loadedModel.scene.rotation.y = Math.PI/2; 
        scene.add(loadedModel.scene);
        console.log(loadedModel)
    });

    // spyro
    objModel(() => {
        scene.add(objModeled.scene);
        console.log(objModeled)
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
        console.log(objModeled3)
    });

    // blue lightsaber
    objModel4(() => {
        objModeled4.scene.rotation.y = Math.PI/2;
        scene.add(objModeled4.scene);
        console.log(objModeled4)
    });

    // mandalorian
    objModel5(() => {
        objModeled5.scene.rotation.y = Math.PI/2;
        scene.add(objModeled5.scene);
        console.log(objModeled5)
    });

    // sun
    objModel6(() => {
        objModeled6.scene.rotation.y = Math.PI/2;
        scene.add(objModeled6.scene);
        console.log(objModeled5)
    });

    // mandalorian space ship
    objModel7(() => {
        objModeled7.scene.rotation.y = Math.PI/2;
        scene.add(objModeled7.scene);
        console.log(objModeled7)
    });

    // space ship corridor
    objModel8(() => {
        objModeled8.scene.rotation.y = Math.PI/2;
        scene.add(objModeled8.scene);
        console.log(objModeled8)
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
        console.log(objModeled9)
    });

    // add a blue light to lightsaber
    const light = new THREE.PointLight(0x0000ff, 0.5, 100000);
    light.position.set(0, 0, 0);
    scene.add(light);

    const light2 = new THREE.PointLight(0x0000ff, 0.5, 100000);
    scene.add(light2);

    const light3 = new THREE.PointLight(0x0000ff, 0.5, 100000);
    light3.position.set(0, -100, 0);
    scene.add(light3);



    // instead of the previous light only emitting light from origin, we can make it emit light in vertical direction
    //     const light2 = new THREE.PointLight(0x0000ff, 1, 100000);
    // const lightTarget = new THREE.Object3D(); // create a new target object
    // lightTarget.position.set(0, 1, 0); // set the position of the target
    // light2.target = lightTarget; // assign the target to the light
    // scene.add(light2);

   


    // // ADD a Rocket 
    // const textureCylinder = loader.load('https://i.ibb.co/4gHcRZD/bg3-je3ddz.jpg');
    // const textureTrace = loader.load('https://i.ibb.co/4gHcRZD/bg3-je3ddz.jpg');

    // textureCylinder.anisotropy = 16;
    // let cylinderGeometry = new THREE.CylinderBufferGeometry(30, 20, 100, 32);
    // let cylinderMaterial = new THREE.MeshPhongMaterial({ map: texturenucleus, transparent: 0.5  ,opacity: 0.5});
    // let cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);

    // let coneGeometry = new THREE.ConeBufferGeometry(30, 90, 200);
    // let coneMaterial = new THREE.MeshBasicMaterial({ map: texturenucleus, transparent: 0.5  ,opacity: 0.5});
    // let cone = new THREE.Mesh(coneGeometry, coneMaterial);

    // // Position the cone in front of the cylinder
    // cone.position.set(-40, -50, -200);

    // // fire trace
    // let traceGeometry = new THREE.CylinderBufferGeometry(0.5, 0.5, 100, 32);
    // let traceMaterial = new THREE.MeshPhongMaterial({ color: 0x632901, transparent: 0.5  ,opacity: 0.5});
    // let trace = new THREE.Mesh(traceGeometry, traceMaterial);

    // trace.position.set(100, -50, -181);
    // trace.rotation.x = Math.PI / 2;
    // trace.rotation.z = Math.PI / 2;

    // // another trace
    // let trace2 = new THREE.Mesh(traceGeometry, traceMaterial);

    // trace2.position.set(100, -50, -219);
    // trace2.rotation.x = Math.PI / 2;
    // trace2.rotation.z = Math.PI / 2;

    // // another trace
    // let trace3 = new THREE.Mesh(traceGeometry, traceMaterial);

    // trace3.position.set(150, -50, -199);
    // trace3.rotation.x = Math.PI / 2;
    // trace3.rotation.z = Math.PI / 2;

    // let angle = Math.PI / 2; 
    // trace3.rotation.set(angle, Math.PI / 2, 0);

    // cone.rotation.x = Math.PI / 3;
    // cone.rotation.z = Math.PI / 2;

    // // forth trace
    // let trace4 = new THREE.Mesh(traceGeometry, traceMaterial);

    // trace4.position.set(193, -50, -224);
    // trace4.rotation.x = Math.PI / 2;
    // trace4.rotation.z = -Math.PI / 3;

    // // fifth trace
    // let trace5 = new THREE.Mesh(traceGeometry, traceMaterial);

    // trace5.position.set(193, -50, -174);
    // trace5.rotation.x = Math.PI / 2;
    // trace5.rotation.z = Math.PI / 3;

    // cylinder.rotation.x = Math.PI / 2;
    // cylinder.rotation.z = Math.PI / 2;

    // cylinder.position.set(55, -50, -200);

    // // group cone, cylinder and traces
    // let rocket = new THREE.Group();
    // rocket.add(cone);
    // rocket.add(cylinder);
    // rocket.add(trace);
    // rocket.add(trace2);
    // rocket.add(trace3);
    // rocket.add(trace4);
    // rocket.add(trace5);

    // scene.add(rocket);
    // let time = 0;
    // function render2() {
    //     requestAnimationFrame(render2);
    //     cylinder.rotation.x += 0.01;
    //     cone.rotation.x += 0.01;
    //     rocket.position.y = Math.cos(time) * 100;
    //     rocket.position.z = Math.sin(time) * 10;
    //     time += 0.05;
    //     renderer.render(scene, camera);
    // }

    // render2();

    // copy of the rocket
    // let rocket2 = rocket.clone();
    // rocket2.position.set(-100, -100, 0);

    // scene.add(rocket2);

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

    // // /*    Sun  */ 
    // textureSun.anisotropy = 16;


    // let geometrySun = new THREE.SphereBufferGeometry(150, 40, 40);
    // let materialSun = new THREE.MeshBasicMaterial({
    //     side: THREE.BackSide,
    //     map: textureSun,
    // });
    // sun = new THREE.Mesh(geometrySun, materialSun);
    // sun.position.set(450, 280, 0);
    // scene.add(sun);

   
    
    
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
