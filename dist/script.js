let renderer,
scene,
camera,
sphereBg,
nucleus,
stars,
ring, 
sphere,
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

    //OrbitControl
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.autoRotate = true;
    controls.autoRotateSpeed = 4;
    controls.maxDistance = 350;
    controls.minDistance = 150;
    controls.enablePan = false;
    

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
        ring.rotation.x += 0.01;
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

    // ADD the Dragon
    // dragon = createDragon();
    // dragon.position.set(0, -50, 10);
    // // change dimensions of th dragon
    // dragon.scale.set(0.5, 0.5, 0.5);



    // scene.add(dragon);

    /* ADD A F1 car from the model inside the folder redbull_formula_one_car */ 
    // let loadedModel;
    // const glftLoader = new GLTFLoader();
    // glftLoader.load('./assets/redbull_formula_1_2022_car/scene.gltf', (gltfScene) => {
    //     loadedModel = gltfScene;
    //     // console.log(loadedModel);

    //     gltfScene.scene.rotation.y = Math.PI / 8;
    //     gltfScene.scene.position.y = 3;
    //     gltfScene.scene.scale.set(10, 10, 10);
    //     test.scene.add(gltfScene.scene);
    // });

    /*  Nucleus  */   
    texturenucleus.anisotropy = 16;
    let icosahedronGeometry = new THREE.IcosahedronGeometry(30, 10);
    let lambertMaterial = new THREE.MeshPhongMaterial({ map: texturenucleus });
    nucleus = new THREE.Mesh(icosahedronGeometry, lambertMaterial);
    scene.add(nucleus);


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

function createDragon() {
    // create a group to hold all dragon parts
    const group = new THREE.Group();
  
    // create dragon body with one mesh
    const body = new THREE.Mesh(
      new THREE.BoxGeometry(20, 20, 30),
      new THREE.MeshBasicMaterial({ color: 'green' })
    );
    group.add(body);
  
    // create dragon wings with two meshes (left and right)
    const wing = new THREE.Mesh(
      new THREE.BoxGeometry(10, 60, 30),
      new THREE.MeshBasicMaterial({ color: 'yellow' })
    );
    wing.position.set(30, 30, 0);
    group.add(wing);
    const wing2 = wing.clone();
    wing2.position.set(-30, 30, 0);
    wing2.rotation.z = -wing.rotation.z;
    group.add(wing2);
  
    // create dragon tail with line and pike
    const tail = new THREE.Group();
    const tailLine = new THREE.Line(
      new THREE.Geometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 10, -20),
        new THREE.Vector3(0, -10, -40),
        new THREE.Vector3(0, 0, -60)
      ]),
      new THREE.LineBasicMaterial({ color: 'green', linewidth: 8 })
    );
    const tailPike = new THREE.Mesh(
      new THREE.CylinderGeometry(0, 20, 20, 4, 1),
      new THREE.MeshBasicMaterial({ color: 'yellow' })
    );
    tailPike.geometry.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 2));
    tailPike.position.z = -70;
    tail.add(tailLine, tailPike);
    tail.position.z = -40;
    tail.position.y = 20;
    group.add(tail);
  
    // create dragon head with one mesh
    const head = new THREE.Mesh(
      new THREE.BoxGeometry(120, 100, 160),
      new THREE.MeshBasicMaterial({ color: 'green' })
    );
    head.position.y = 50;
    head.position.z = 80;
    group.add(head);
  
    // create dragon horn with two meshes (left and right)
    const horn = new THREE.Mesh(
      new THREE.CylinderGeometry(0, 12, 20, 4, 1),
      new THREE.MeshBasicMaterial({ color: 'yellow' })
    );
    horn.position.set(20, 110, 20);
    group.add(horn);
    const horn2 = horn.clone();
    horn2.position.set(-20, 110, 20);
    group.add(horn2);
  
    group.rotation
    return group;
}
 