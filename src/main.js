import './style.css'
import * as THREE from 'three'
import { block_1, block_3, block_2, block_4, block_5, block_6, block_7, } from './city'
import { block_8, block_9, block_10, block_11, block_12, block_13, block_14, block_15, block_16 } from './city'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import Update from './phy/update';
//import uhF from 'D:/Dem Bois/College/Third Year/Second Semester/Test For Calculations Project/src/phy/update_helperFucntion';
import StarterSystem from './phy/starterSystem';
import * as dat from 'dat.gui';
import vector from './phy/vectore'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */

const loadingManager = new THREE.LoadingManager()
loadingManager.onStart = () => {
    console.log('loadingManager: loading started')
}
loadingManager.onLoaded = () => {
    console.log('loadingManager: loading finished')
}
loadingManager.onProgress = () => {
    console.log('loadingManager: loading progressing')
}
loadingManager.onError = () => {
    console.log('loadingManager: loading error')
}

const textureLoader = new THREE.TextureLoader(loadingManager)

const b0 = block_1();
const b5 = block_6();
const b4 = block_5();
const b3 = block_4();
const b1 = block_2();
const b2 = block_3();
const b6 = block_7();
const b7 = block_8();
const b8 = block_9();
const b9 = block_10();
const b10 = block_11();
const b11 = block_12();
const b13 = block_13();
const b14 = block_14();
const b15 = block_15();
const b16 = block_16();
scene.add(b7)
scene.add(b8)
scene.add(b9)
scene.add(b10)
scene.add(b11)
scene.add(b13)
scene.add(b14)
scene.add(b15)
scene.add(b16)
scene.add(b1);
scene.add(b3)
scene.add(b2);
scene.add(b4)
scene.add(b5)
scene.add(b6);
scene.add(b0);

const gltfloader = new GLTFLoader()


// const helicopter = gltfloader.load(
//     'static/models/street/street.glb')
// helicopter.position.x = 2000
// helicopter.scale.set(200, 200, 200)
// scene.add(d)


gltfloader.load(
    'static/models/street/street.glb',

    (gltf) => {
        //scene.add(gltf.scene)
        const s = gltf.scene

        s.position.z = -4500
        s.position.y = -7300
        s.scale.set(450, 55, 110)

        scene.add(s)
        console.log(s)
    }
)

gltfloader.load(
    'static/models/street/street.glb',

    (gltf) => {
        // scene.add(gltf.scene)
        const s = gltf.scene

        s.position.y = -7400;
        s.position.x = -4000;
        s.scale.set(450, 55, 110)
        s.rotation.y = Math.PI / 2;
        scene.add(s);
    }
)

gltfloader.load(
    'static/models/street/street.glb',

    (gltf) => {
        // scene.add(gltf.scene)
        const s = gltf.scene

        s.position.z = 0
        s.position.y = -7400
        s.position.x = 4500
        s.scale.set(450, 55, 110)

        s.rotation.y = Math.PI / 2
        scene.add(s)
        console.log(s)
    }
)

gltfloader.load(
    'static/models/street/street.glb',

    (gltf) => {
        // scene.add(gltf.scene)
        const s = gltf.scene

        s.position.z = 5000
        s.position.y = -7300
        s.scale.set(450, 55, 110)

        scene.add(s)
        console.log(s)

    }
)
let model, upperFan;
const heli = new THREE.Group();

gltfloader.load('static/models/HelicopterBody.glb', function (gltf) {
    model = gltf.scene;
    heli.add(gltf.scene);
});

gltfloader.load('static/models/upperfan.glb', function (gltf) {
    model = gltf.scene;
    upperFan = model;
    heli.add(gltf.scene);
});

gltfloader.load('static/models/TailFan.glb', function (gltf) {
    model = gltf.scene;
    heli.add(gltf.scene);
});

const heliPositionValues = {
    x: 0,
    y: -7400,
    z: 0,
};

heli.position.x = heliPositionValues.x;
heli.position.y = heliPositionValues.y;
heli.position.z = heliPositionValues.z;
heli.scale.set(100, 100, 100)
scene.add(heli);

// gltfloader.load(
//     'static/models/street/tree.glb',

//     (gltf) => {
//         // scene.add(gltf.scene)
//         const t = gltf.scene


//         t.position.y = -5000

//         t.scale.set(25, 25, 25)

//         scene.add(t)
//         console.log(t)

//     }
// )

// let model;
// const heli = new THREE.Group();

// gltfloader.load(
//     'static/models/kopra2.glb',
//     (gltf) => {
//         model = gltf.scene;
//         heli.add(gltf.scene);
//     }
// )

const floorTexture = textureLoader.load('/static/textures/pavement.jpg',)

let materialArray = []
let texture_ft = new THREE.TextureLoader().load('/static/textures/skybox/sh_ft.png');
let texture_bk = new THREE.TextureLoader().load('/static/textures/skybox/sh_bk.png');
let texture_up = new THREE.TextureLoader().load('/static/textures/skybox/sh_up.png');
let texture_dn = new THREE.TextureLoader().load('/static/textures/skybox/sh_dn.png');
let texture_rt = new THREE.TextureLoader().load('/static/textures/skybox/sh_rt.png');
let texture_lf = new THREE.TextureLoader().load('/static/textures/skybox/sh_lf.png');

materialArray.push(new THREE.MeshBasicMaterial({ map: texture_ft }));
materialArray.push(new THREE.MeshBasicMaterial({ map: texture_bk }));
materialArray.push(new THREE.MeshBasicMaterial({ map: texture_up }));
materialArray.push(new THREE.MeshBasicMaterial({ map: floorTexture }));
materialArray.push(new THREE.MeshBasicMaterial({ map: texture_rt }));
materialArray.push(new THREE.MeshBasicMaterial({ map: texture_lf }));


for (let i = 0; i < 6; i++)
    materialArray[i].side = THREE.BackSide;

floorTexture.wrapS = THREE.MirroredRepeatWrapping
floorTexture.wrapT = THREE.MirroredRepeatWrapping
// floorTexture.repeat.x = 2
// floorTexture.repeat.y = 3
floorTexture.offset.x = 0.5
floorTexture.offset.y = 0.5
// floorTexture.rotation = Math.PI * 0.25
floorTexture.center.x = 0.5
floorTexture.center.y = 0.5
// floorTexture.generateMipmaps = false
floorTexture.minFilter = THREE.NearestFilter
floorTexture.magFilter = THREE.NearestFilter
floorTexture.repeat.y = 10
floorTexture.repeat.x = 10
floorTexture.side = THREE.DoubleSide;

const geometry = new THREE.BoxGeometry(25000, 15000, 25000)
console.log(geometry.attributes)
const material = new THREE.MeshBasicMaterial({ map: floorTexture })
const mesh = new THREE.Mesh(geometry, materialArray)
scene.add(mesh)
// scene.add(groundmesh)
// groundmesh.position.y = -4500

// groundmaterial.side = THREE.DoubleSide
material.side = THREE.BackSide

const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(20000, 20000)
directionalLight.shadow.camera.far = 15
directionalLight.shadow.camera.left = -7
directionalLight.shadow.camera.top = 7
directionalLight.shadow.camera.right = 7
directionalLight.shadow.camera.bottom = -7
directionalLight.position.set(5, 5, 5)
scene.add(directionalLight)

/**
 * Sizes
*/
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
*/
// Base camera
const camera = new THREE.PerspectiveCamera(50, ((sizes.width / 1) / (sizes.height / 1)), 0.1, 40000);
scene.add(camera);
camera.lookAt(heli.position);
/**
 * 
 * Controller
 */
// Create a new instance of dat.GUI
const gui = new dat.GUI();

// Create an object to hold the values of the new vector
const vectorValues = {
    x: -1000,
    y: 1500,
    z: 1000,
};
const rotationValues = {
    x: Math.PI / -12,
    y: 0,
    z: 0,
};
const heliRotationValues = {
    x: 0,
    y: Math.PI / 2,
    z: 0,
};
const heliRotationFolder = gui.addFolder('Helicopter Rotation');
heliRotationFolder.add(heliRotationValues, 'x', -Math.PI, Math.PI).onChange(updateHeliRotation);
heliRotationFolder.add(heliRotationValues, 'y', -Math.PI, Math.PI).onChange(updateHeliRotation);
heliRotationFolder.add(heliRotationValues, 'z', -Math.PI, Math.PI).onChange(updateHeliRotation);

const rotationFolder = gui.addFolder('Camera Rotation');
rotationFolder.add(rotationValues, 'x', -Math.PI, Math.PI).onChange(updateCameraRotation);
rotationFolder.add(rotationValues, 'y', -Math.PI, Math.PI).onChange(updateCameraRotation);
rotationFolder.add(rotationValues, 'z', -Math.PI, Math.PI).onChange(updateCameraRotation);

// Add controls to the GUI for the x, y, and z components of the new vector
const vectorFolder = gui.addFolder('Camera Position');
vectorFolder.add(vectorValues, 'x', -10000, 10000).onChange(updateCameraPosition);
vectorFolder.add(vectorValues, 'y', -10000, 10000).onChange(updateCameraPosition);
vectorFolder.add(vectorValues, 'z', -10000, 10000).onChange(updateCameraPosition);

// Function to update the camera position based on the new vector values
function updateCameraPosition() {
    camera.position.copy(heli.position).add(new THREE.Vector3(vectorValues.x + 1000, vectorValues.y, vectorValues.z + 1000));
}
// Add controls to the GUI for the x, y, and z components of the helicopter's position
const heliPositionFolder = gui.addFolder('Helicopter Position');
heliPositionFolder.add(heliPositionValues, 'x', -10000, 10000).onChange(updateHeliPosition);
heliPositionFolder.add(heliPositionValues, 'y', -10000, 10000).onChange(updateHeliPosition);
heliPositionFolder.add(heliPositionValues, 'z', -10000, 10000).onChange(updateHeliPosition);

// Function to update the helicopter's position based on the GUI controls
function updateHeliPosition() {
    heli.position.set(heliPositionValues.x, heliPositionValues.y, heliPositionValues.z);
    // Update the camera position based on the new helicopter position
    updateCameraPosition();
}
function updateCameraRotation() {
    camera.rotation.set(rotationValues.x, rotationValues.y, rotationValues.z);
}
function updateHeliRotation() {
    heli.rotation.set(heliRotationValues.x, heliRotationValues.y, heliRotationValues.z);
}

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// test
// initial the forces
const update = new Update(
    // the rotor length (m)
    3.84,
    // the helicopter mass (Kg)
    680,
    // the fual mass (Kg)
    76,
    // the temperature (celuses)
    35,
    // the wind speed (km/h)
    40
);

let lunch = false,
    start = false,
    ground = true;
const starterSystem = new StarterSystem();

// Add an event listener for the keydown event on the document
document.addEventListener("keydown", function (event) {
    // if the helicopter not on the ground then you can fly with it
    if (!ground) {
        if (event.key == "w") {
            // increase the force which moves the rotor which will reduce the move force for the helicopter to increase
            // ... We can assume that we are increasing the power given to the helicopter
            update.move_up();
        }
        if (event.key == "d") {
            // increase the right angel which will decrease the forcse in the x axis and increase it in the -z axis
            update.move_right();
        }
        if (event.key == "a") {
            // increase the left angel which will decrease the forcse in the x axis and increase it in the z axis
            update.move_left();
        }
        if (event.key == "s") {
            // decrease the force which moves the rotor which will reduce the move force for the helicopter to decrease
            // ... We can assume that we are decreasing the power given to the helicopter
            update.move_down();
        }
        if (event.key == "8") {
            // increase the angel between the X axis and the y axis which will decrease the left force and increase the thrust force
            update.move_forward();
        }
        if (event.key == "6") {
            heli.rotateY(Math.PI / 2)
            rotationValues.y = Math.PI / 2;
        }
        if (event.key == "4") {

        }
        if (event.key == "2") {
            // decrease the angel between the X axis and the y axis which will increase the left force and decrease the thrust force
            update.move_backword();
        }
        if (event.key == "p") {
            update.auto_pilot();
        }
    }
    if (event.key == "c") {
        // increase the angel which will increase the CL and then the move force for the helicopter
        update.increase_alpha();
    }
    if (event.key == "x") {
        // decrease the angel which will decrease the CL and then the move force for the helicopter
        update.decrease_alpha();
    }
    // when it's not on the ground the only thing you can do is lunching the starter system
    if (event.key == "o") {
        // start the starter system 
        start = true;
        starterSystem.setTime();
    }
});

// Animate for each frame
const tick = () => {
    // Update the controls
    //controls.update();

    // Render
    renderer.render(scene, camera);

    // wait for the model to render befor animating any thing
    if (model) {
        // the state where the helicopter is on the ground before starting the starter system
        if (ground && !lunch && !start) {
            // call the update on the ground which only depends on the gravity and the reaction force from the earth
            update.update_on_ground();
        }
        // the state where the starter system is started
        else if ((!lunch && start) || (ground && start)) {
            let currentTime = Date.now();
            // while the desired time isn't exceeded yet and the velocity of the rotor didn't reach the desired velocity then keep increasing it
            if (currentTime < starterSystem.endTime && starterSystem.rotorVelocity == starterSystem.finalRotorSpeed !== 0) {
                starterSystem.rotorVelocity += starterSystem.starterTorque / starterSystem.rotorInertia * (currentTime - starterSystem.startTime) / 1000;
                // update to the new velocity and W 
                update.rotorVelocity = starterSystem.rotorVelocity;
                update.forces.rotorVelocity = starterSystem.rotorVelocity;
                update.W = update.forces.rotorVelocity / update.r;
                // print the current rotor velocity
                console.log(update.rotorVelocity);
                // calculate the force which redused this velocity
                update.rotorMoveForce = (starterSystem.deltaRotorSpeed / starterSystem.accelerationTime) * starterSystem.rotorInertia;
                // call the function which will calculate the acceleration and velocity for the rotor and give it to the forces
                update.rotor_update();
            }
            // when reaches the desired rotor velocity then mark the helicopter as lusnhed and reset the otherS
            else {
                lunch = true;
                ground = false;
                start = false;
            }
        }
        // the state after the starter system is started where the helicopter above the ground
        else {
            // update the 
            if (update.position.getY() < -7400 || update.alpha == 0)
                update.reset_update();
            else
                update.update_on_fly();

            heli.position.x = update.position.getX();
            heli.position.y = (update.position.getY()) - 7400;
            heli.position.z = update.position.getZ();
            scene.add(heli);
        }
    }
    updateCameraPosition();
    updateCameraRotation();
    updateHeliRotation();
    renderer.render(scene, camera);

    requestAnimationFrame(tick);
}

tick();