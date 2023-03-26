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

    // Create a range input element to adjust planet size
    const planetSizeSlider = document.createElement("input");
    planetSizeSlider.type = "range";
    planetSizeSlider.id = "blobScale";
    planetSizeSlider.name = "blobScale";
    planetSizeSlider.min = "1";
    planetSizeSlider.max = "10";
    planetSizeSlider.value = "1";
    planetSizeSlider.step = "1";
    planetSizeSlider.addEventListener("input", updatePlanetSize);

    // Create a label for the range input
    const planetSizeLabel = document.createElement("label");
    planetSizeLabel.for = "blobScale";
    planetSizeLabel.innerText = "Planet Size:";

    // Create a div to contain the label and range input
    const planetSizeControl = document.createElement("div");
    planetSizeControl.appendChild(planetSizeLabel);
    planetSizeControl.appendChild(planetSizeSlider);

    // Add the planet size control to the HTML page
    document.body.appendChild(planetSizeControl);

    // Function to update the planet size
    function updatePlanetSize() {
        // get canvas and context
        const canvas = document.getElementById('canvas_container');
        const ctx = canvas.getContext('2d');
    
        // initialize variables
        let blobScale = 1;
        const planetRadius = 50;
    
        // update planet size based on user input
        function updatePlanetSize() {
        blobScale = parseInt(document.getElementById("blobScale").value);
        drawPlanet();
        }
    
        // draw planet on canvas
        function drawPlanet() {
        // clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // draw planet
        ctx.beginPath();
        ctx.arc(canvas.width/2, canvas.height/2, planetRadius*blobScale, 0, 2*Math.PI);
        ctx.fillStyle = 'green';
        ctx.fill();
        }
    
        // initial draw
        drawPlanet();
    
    }


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

    // Add the new sphere to the scene
    scene.add(sphere);
 
    // PLANET RING
    let ringGeometry = new THREE.TorusBufferGeometry(35, 5, 16, 100);
    let ringMaterial = new THREE.MeshPhongMaterial({ map: texturenucleus, side: THREE.DoubleSide, color: 0xffffff });
    
    let ring = new THREE.Mesh(ringGeometry, ringMaterial);

    ring.position.set(sphere.position.x, sphere.position.y, sphere.position.z);
    ring.rotation.x = Math.PI / 3;

    // Add the ring to the scene
    scene.add(ring);

    function render() {
        requestAnimationFrame(render);
        sphere.rotation.x -= 0.01;
        sphere.rotation.y += 0.01;
        sphere.rotation.z += 0.01;
        ring.rotation.y += 0.01;
        renderer.render(scene, camera);
    }

    render();
    
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

    // Add the cone to the scene
    scene.add(cone);
    scene.add(trace);
    scene.add(trace2);
    scene.add(trace3);
    scene.add(trace4);
    scene.add(trace5);
    scene.add(cylinder);

    function render2() {
        requestAnimationFrame(render2);
        cylinder.rotation.x += 0.01;
        cone.rotation.x += 0.01;
        renderer.render(scene, camera);
    }

    render2();

    // ADD an Astro
    const textureDragon = loader.load('https://i.ibb.co/4gHcRZD/bg3-je3ddz.jpg');

    textureDragon.anisotropy = 16;
    let dragonGeometry = new THREE.DodecahedronGeometry(30, 0);
    let dragonMaterial = new THREE.MeshPhongMaterial({ map: texturenucleus  ,opacity: 0.4});
    let dragon = new THREE.Mesh(dragonGeometry, dragonMaterial);
    
    dragon.position.set(-100, 0, 0);
    dragon.rotation.x = Math.PI / 2;
    dragon.rotation.z = Math.PI / 2;

    scene.add(dragon);


    /*  Nucleus  */   
    texturenucleus.anisotropy = 16;
    let icosahedronGeometry = new THREE.IcosahedronGeometry(30, 10);
    let lambertMaterial = new THREE.MeshPhongMaterial({ map: texturenucleus });
    nucleus = new THREE.Mesh(icosahedronGeometry, lambertMaterial);
    scene.add(nucleus);


    // turn possible to go insdie the nucleus
    nucleus.material.side = THREE.DoubleSide;

    // create a crazy 

    // fix zoom limit 
    controls.maxDistance = 500;
    controls.minDistance = 5;

    nucleus.addEventListener('click', function() {
        // remove the old nucleus mesh from the scene
        scene.remove(nucleus);
    
        // create a new scene inside the nucleus
        let innerScene = new THREE.Scene();
    
        // create a road mesh
        let roadGeometry = new THREE.PlaneGeometry(100, 500);
        let roadMaterial = new THREE.MeshBasicMaterial({ color: 0x999999 });
        let roadMesh = new THREE.Mesh(roadGeometry, roadMaterial);
        roadMesh.rotation.x = -Math.PI / 2;
        innerScene.add(roadMesh);
    
        // create a car mesh
        let carGeometry = new THREE.BoxGeometry(10, 5, 10);
        let carMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
        let carMesh = new THREE.Mesh(carGeometry, carMaterial);
        carMesh.position.set(0, 2.5, 0);
        innerScene.add(carMesh);
    
        // set up camera for inner scene
        let innerCamera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
        innerCamera.position.set(0, 50, 100);
        innerCamera.lookAt(0, 0, 0);
    
        // set up renderer for inner scene
        let innerRenderer = new THREE.WebGLRenderer();
        innerRenderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(innerRenderer.domElement);
    
        // add controls for inner scene
        let innerControls = new THREE.OrbitControls(innerCamera, innerRenderer.domElement);
        innerControls.maxDistance = 500;
        innerControls.minDistance = 5;
    
        // animate inner scene
        function animateInnerScene() {
            requestAnimationFrame(animateInnerScene);
            innerRenderer.render(innerScene, innerCamera);
        }
        animateInnerScene();
    });

    
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

document.addEventListener("keydown", onDocumentKeyDown, false);

// move orbit with keys
function onDocumentKeyDown(event) {
    const keyCode = event.which;
    switch (keyCode) {
        case 37: // left arrow key
            camera.position.x -= 50;
            break;
        case 38: // up arrow key
            camera.position.z -= 50;
            break;
        case 39: // right arrow key
            camera.position.x += 50;
            break;
        case 40: // down arrow key
            camera.position.z += 50;
            break;
        // do for w a s d keys
        case 87: // W key
            camera.position.y += 50;
            break;
        case 65: // A key
            camera.position.x -= 50;
            break;
        case 83: // S key
            camera.position.y -= 50;
            break;
        case 68: // D key
            camera.position.x += 50;
            break;
        }
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
