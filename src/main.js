import "./style.css";
import * as THREE from "three";
import {
    block_1,
    block_3,
    block_2,
    block_4,
    block_5,
    block_6,
    block_7,
} from "./city";
import {
    block_8,
    block_9,
    block_10,
    block_11,
    block_12,
    block_13,
    block_14,
    block_15,
    block_16,
} from "./city";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import Update from "./phy/update";
//import uhF from 'D:/Dem Bois/College/Third Year/Second Semester/Test For Calculations Project/src/phy/update_helperFucntion';
import StarterSystem from './phy/starterSystem';
import * as dat from 'dat.gui';
import * as lil from "lil-gui";
import music from '../static/sounds/Helicopter Sound Effect - Flying 5 minutes.mp3';

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */

const loadingManager = new THREE.LoadingManager();
loadingManager.onStart = () => {
    console.log("loadingManager: loading started");
};
loadingManager.onLoaded = () => {
    console.log("loadingManager: loading finished");
};
loadingManager.onProgress = () => {
    console.log("loadingManager: loading progressing");
};
loadingManager.onError = () => {
    console.log("loadingManager: loading error");
};

const textureLoader = new THREE.TextureLoader(loadingManager);

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
const environment = new THREE.Group();
environment.add(b7);
environment.add(b8);
environment.add(b9);
environment.add(b10);
environment.add(b11);
environment.add(b13);
environment.add(b14);
environment.add(b15);
environment.add(b1);
environment.add(b3);
environment.add(b2);
environment.add(b4);
environment.add(b5);
environment.add(b6);
environment.add(b0);
scene.add(environment);

const gltfloader = new GLTFLoader();

gltfloader.load(
    "static/models/street/street.glb",

    (gltf) => {
        //scene.add(gltf.scene)
        const s = gltf.scene;

        s.position.z = -4500;
        s.position.y = -7300;
        s.scale.set(450, 55, 110);
        environment.add(s);
        console.log(s);
    },
);

gltfloader.load(
    "static/models/street/street.glb",

    (gltf) => {
        // scene.add(gltf.scene)
        const s = gltf.scene;

        s.position.y = -7400;
        s.position.x = -4000;
        s.scale.set(450, 55, 110);
        s.rotation.y = Math.PI / 2;
        environment.add(s);
    },
);

gltfloader.load(
    "static/models/street/street.glb",

    (gltf) => {
        // scene.add(gltf.scene)
        const s = gltf.scene;

        s.position.z = 0;
        s.position.y = -7400;
        s.position.x = 4500;
        s.scale.set(450, 55, 110);

        s.rotation.y = Math.PI / 2;
        environment.add(s);
        console.log(s);
    },
);

gltfloader.load(
    "static/models/street/street.glb",

    (gltf) => {
        // scene.add(gltf.scene)
        const s = gltf.scene;

        s.position.z = 5000;
        s.position.y = -7300;
        s.scale.set(450, 55, 110);

        environment.add(s);
        console.log(s);
    },
);
let model, upperFan;
const heli = new THREE.Group();
const heliQuaternion = new THREE.Quaternion();
const fixHeliRotation = () => {
    const initialRotation = new THREE.Quaternion().setFromAxisAngle(
        new THREE.Vector3(0, 1, 0),
        Math.PI / 2,
    );
    heliQuaternion.multiply(initialRotation);
}
fixHeliRotation();
gltfloader.load("static/models/HelicopterBody.glb", function (gltf) {
    model = gltf.scene;
    model.position.x = -4.025571823120117;
    model.position.y = 1.191272341157781;
    model.position.z = 0.03398655354976654;
    heli.add(gltf.scene);
});
let pivotGroup;
gltfloader.load("static/models/upperfan.glb", function (gltf) {
    model = gltf.scene;
    upperFan = model;

    // Compute the bounding box of the upperFan to get its center
    const box = new THREE.Box3().setFromObject(upperFan);
    const center = box.getCenter(new THREE.Vector3());

    // Create a new group and add the upperFan to this group
    pivotGroup = new THREE.Group();
    scene.add(pivotGroup); // Assuming 'scene' is your main THREE.Scene
    pivotGroup.add(upperFan);

    // Adjust the position of the upperFan within this group
    upperFan.position.x -= center.x;
    upperFan.position.y -= center.y - 4.2;
    upperFan.position.z -= center.z;
    // Rotate the pivotGroup, not the upperFan
    pivotGroup.rotation.y += Math.PI / 4; // Rotate by 45 degrees as an example

    heli.add(pivotGroup); // Add the group to the heli, not the upperFan directly
});

const heliPositionValues = {
    x: 0,
    y: -7400,
    z: 0,
};

heli.position.x = heliPositionValues.x;
heli.position.y = heliPositionValues.y;
heli.position.z = heliPositionValues.z;
heli.scale.set(100, 100, 100);

// heli.rotation.y = Math.PI/2;
scene.add(heli);
let initialGroundPositionY = heli.position.y;

const floorTexture = textureLoader.load("/static/textures/pavement.jpg");

let materialArray = [];
let texture_ft = new THREE.TextureLoader().load(
    "/static/textures/skybox/sh_ft.png",
);
let texture_bk = new THREE.TextureLoader().load(
    "/static/textures/skybox/sh_bk.png",
);
let texture_up = new THREE.TextureLoader().load(
    "/static/textures/skybox/sh_up.png",
);
let texture_rt = new THREE.TextureLoader().load(
    "/static/textures/skybox/sh_rt.png",
);
let texture_lf = new THREE.TextureLoader().load(
    "/static/textures/skybox/sh_lf.png",
);

materialArray.push(new THREE.MeshBasicMaterial({ map: texture_ft }));
materialArray.push(new THREE.MeshBasicMaterial({ map: texture_bk }));
materialArray.push(new THREE.MeshBasicMaterial({ map: texture_up }));
materialArray.push(new THREE.MeshBasicMaterial({ map: floorTexture }));
materialArray.push(new THREE.MeshBasicMaterial({ map: texture_rt }));
materialArray.push(new THREE.MeshBasicMaterial({ map: texture_lf }));

for (let i = 0; i < 6; i++) materialArray[i].side = THREE.BackSide;

floorTexture.wrapS = THREE.MirroredRepeatWrapping;
floorTexture.wrapT = THREE.MirroredRepeatWrapping;
floorTexture.offset.x = 0.5;
floorTexture.offset.y = 0.5;
floorTexture.center.x = 0.5;
floorTexture.center.y = 0.5;
floorTexture.minFilter = THREE.NearestFilter;
floorTexture.magFilter = THREE.NearestFilter;
floorTexture.repeat.y = 10;
floorTexture.repeat.x = 10;
floorTexture.side = THREE.DoubleSide;

const geometry = new THREE.BoxGeometry(25000, 15000, 25000);
console.log(geometry.attributes);
const material = new THREE.MeshBasicMaterial({ map: floorTexture });
const mesh = new THREE.Mesh(geometry, materialArray);
environment.add(mesh);
material.side = THREE.BackSide;

const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
environment.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.set(20000, 20000);
directionalLight.shadow.camera.far = 15;
directionalLight.shadow.camera.left = -7;
directionalLight.shadow.camera.top = 7;
directionalLight.shadow.camera.right = 7;
directionalLight.shadow.camera.bottom = -7;
directionalLight.position.set(5, 5, 5);
environment.add(directionalLight);
/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
};

window.addEventListener("resize", () => {
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
    50,
    sizes.width / 1 / (sizes.height / 1),
    0.1,
    40000,
);
scene.add(camera);
camera.lookAt(heli.position);
/**
 *
 * Controller
 */
// // Create a new instance of dat.GUI
const gui = new dat.GUI();
const lilGui = new lil.GUI({ injectStyles: false });
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
    40,
);
let myObject = {
    RotorSpeed: 0,
    AngleOfAttak: 0,
    Height: 0,
    ForwardSpeed: 0,
    RightSpeed: 0,
    UpSpeed: 0,
    Roll: 0,
    Yaw: 0,
    Pitch: 0,
    Status: "Ground",
};
let controllers = [];
const updateGUI = (statue) => {
    myObject.RotorSpeed = Math.floor(update.rotorVelocity);
    myObject.AngleOfAttak = update.alpha;
    myObject.Height = Math.floor(update.position.getY());
    myObject.ForwardSpeed = Math.floor(update.velocity.getZ());
    myObject.RightSpeed = Math.floor(update.velocity.getX());
    myObject.UpSpeed = Math.floor(update.velocity.getY());
    if (update.forces.right > 0)
        myObject.Roll = update.forces.right;
    else if (update.forces.left > 0)
        myObject.Roll = update.forces.left;
    else if (update.forces.right == 0 && update.forces.left == 0)
        myObject.Roll = 0;
    myObject.Pitch = update.forces.forwardBackAngele;
    myObject.Status = statue;
    // Call the GUI update function for each property
    controllers.forEach((controller) => controller.updateDisplay());
};
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
const heliRotationFolder = gui.addFolder("Helicopter Rotation");
heliRotationFolder
    .add(heliRotationValues, "x", -Math.PI, Math.PI)
    .onChange(updateHeliRotation);
heliRotationFolder
    .add(heliRotationValues, "y", -Math.PI, Math.PI)
    .onChange(updateHeliRotation);
heliRotationFolder
    .add(heliRotationValues, "z", -Math.PI, Math.PI)
    .onChange(updateHeliRotation);

const rotationFolder = gui.addFolder("Camera Rotation");
rotationFolder
    .add(rotationValues, "x", -Math.PI, Math.PI)
    .onChange(updateCameraRotation);
rotationFolder
    .add(rotationValues, "y", -Math.PI, Math.PI)
    .onChange(updateCameraRotation);
rotationFolder
    .add(rotationValues, "z", -Math.PI, Math.PI)
    .onChange(updateCameraRotation);

// Add controls to the GUI for the x, y, and z components of the new vector
const vectorFolder = gui.addFolder("Camera Position");
vectorFolder
    .add(vectorValues, "x", -10000, 10000)
    .onChange(updateCameraPosition);
vectorFolder
    .add(vectorValues, "y", -10000, 10000)
    .onChange(updateCameraPosition);
vectorFolder
    .add(vectorValues, "z", -10000, 10000)
    .onChange(updateCameraPosition);

// Function to update the camera position based on the new vector values
function updateCameraPosition() {
    camera.position
        .copy(heli.position)
        .add(
            new THREE.Vector3(
                vectorValues.x + 1000,
                vectorValues.y,
                vectorValues.z + 1000,
            ),
        );
}
// Add controls to the GUI for the x, y, and z components of the helicopter's position
const heliPositionFolder = gui.addFolder("Helicopter Position");
heliPositionFolder
    .add(heliPositionValues, "x", -10000, 10000)
    .onChange(updateHeliPosition);
heliPositionFolder
    .add(heliPositionValues, "y", -10000, 10000)
    .onChange(updateHeliPosition);
heliPositionFolder
    .add(heliPositionValues, "z", -10000, 10000)
    .onChange(updateHeliPosition);

// Function to update the helicopter's position based on the GUI controls
function updateHeliPosition() {
    heli.position.set(
        heliPositionValues.x,
        heliPositionValues.y,
        heliPositionValues.z,
    );
    //     // Update the camera position based on the new helicopter position
    updateCameraPosition();
}
function updateCameraRotation() {
    camera.rotation.set(rotationValues.x, rotationValues.y, rotationValues.z);
}
function updateHeliRotation() {
    heli.rotation.set(
        heliRotationValues.x,
        heliRotationValues.y,
        heliRotationValues.z,
    );
}
let rightRotationAngle = 0;
let leftRotationAngle = 0;
let angle = 0;
let rotationSpeed = Math.PI / 36;
let rotationDirection = 0;
const rotationDecay = 0.01;

const rollRight = () => {
    rotationDirection = 1;
    Rotate();
};

const stopRollRight = () => {
    rotationDirection = 1;
    StopRotate();
}

const rollLeft = () => {
    rotationDirection = -1;
    Rotate();
};

const stopRollLeft = () => {
    rotationDirection = -1;
    StopRotate();
}

const Rotate = () => {
    if (rightRotationAngle < Math.PI / 6) {
        const rotationAxis = new THREE.Vector3(rotationDirection, 0, 0);
        const rotationQuaternionDelta = new THREE.Quaternion().setFromAxisAngle(rotationAxis, rotationSpeed);
        heliQuaternion.multiply(rotationQuaternionDelta);
        // Update the rotation angle
        rightRotationAngle += rotationSpeed;
    }
}

const StopRotate = () => {
    const decayInterval = setInterval(() => {
        if (rightRotationAngle > 0) {
            const rotationAxis = new THREE.Vector3(rotationDirection, 0, 0);
            const rotationQuaternionDelta = new THREE.Quaternion().setFromAxisAngle(rotationAxis, -rotationDecay);
            heliQuaternion.multiply(rotationQuaternionDelta);
            // Update the rotation angle
            rightRotationAngle -= rotationDecay;
        } else {
            // Reset the rotation
            heliQuaternion.identity();
            fixHeliRotation();
            rightRotationAngle = 0;
            clearInterval(decayInterval);
        }
    }, 10);
}

function pitchBackward(backwardAngle) {
    if (backwardAngle > (- Math.PI / 4) + (Math.PI / 36) && backwardAngle <= 0) {
        const angle = backwardAngle / 8;
        const axis = new THREE.Vector3(0, 0, 1);
        const quaternion = new THREE.Quaternion().setFromAxisAngle(axis, -angle);
        heliQuaternion.multiply(quaternion);
    }
}

function pitchForward(forwardAngle) {
    if (forwardAngle < (Math.PI / 4) - (Math.PI / 36) && forwardAngle >= 0) {
        const angle = forwardAngle / 8;
        const axis = new THREE.Vector3(0, 0, 1);
        const quaternion = new THREE.Quaternion().setFromAxisAngle(axis, -angle);
        heliQuaternion.multiply(quaternion);
    }
}

function yawRight() {
    const axis = new THREE.Vector3(0, 1, 0);
    const heliAngle = -0.01;
    const heliQuaternion = new THREE.Quaternion().setFromAxisAngle(axis, heliAngle);
    heliQuaternion.multiply(heliQuaternion);
    const environmentAngle = +0.01;
    const environmentQuaternion = new THREE.Quaternion().setFromAxisAngle(axis, environmentAngle);
    environment.quaternion.multiply(environmentQuaternion);
}

function yawLeft() {
    const axis = new THREE.Vector3(0, 1, 0);
    const heliAngle = +0.01;
    const heliQuaternion = new THREE.Quaternion().setFromAxisAngle(axis, heliAngle);
    heliQuaternion.multiply(heliQuaternion);
    const environmentAngle = -0.01;
    const environmentQuaternion = new THREE.Quaternion().setFromAxisAngle(axis, environmentAngle);
    environment.quaternion.multiply(environmentQuaternion);
}

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));


// initial states
let lunch = false,
    start = false,
    ground = true,
    sound;

const starterSystem = new StarterSystem();
// Add Changeable Variables To The GUI Screen
let rotorLengthValue = {
    r: 3.84
};

let heliMassValue = {
    Helicopter_Mass: 680
}

let fuelMassValue = {
    Fuel_Mass: 76
}

let temperatureValue = {
    Temperature: 35
}

let windSpeedValue = {
    Wind_Speed: 40
}

let rotorMassValue = {
    Rotor_Mass: 14
}

let AshapeValue = {
    Heli_Shape: 46.2
}

let rotorAshapeValue = {
    Rotor_Shape: 1.7
}

// Add controls for ROTOR LENGTH to be changeable in the run
const rotorLengthFolder = gui.addFolder('Rotor Length');
rotorLengthFolder.add(rotorLengthValue, 'r', -19.3, 19.3).onChange(rotorLengthFunction)
// Rotor length change function
function rotorLengthFunction() {
    update.r = rotorLengthValue.r;
}

// Add controls for HELICOPTER MASS to be changeable in the run
const heliMassFolder = gui.addFolder('Helicopter Mass');
heliMassFolder.add(heliMassValue, 'Helicopter_Mass', -3401, 3401).onChange(heliMassFunction)
// Helicopter mass change function
function heliMassFunction() {
    update.heliMass = heliMassValue.Helicopter_Mass;
}

// Add controls for Fuel MASS to be changeable in the run
const fuelMassFolder = gui.addFolder('Fuel Mass');
fuelMassFolder.add(fuelMassValue, 'Fuel_Mass', -381, 381).onChange(fuelMassFunction)
// Fuel mass change function
function fuelMassFunction() {
    update.fualMass = fuelMassValue.Fuel_Mass;
}

// Add controls for TEMPERATURE to be changeable in the run
const temperatureFolder = gui.addFolder('Temeperature');
temperatureFolder.add(temperatureValue, 'Temperature', -176, 176).onChange(temperatureFunction)
// Temperature change function
function temperatureFunction() {
    update.temperature = temperatureValue.Temperature;
}

// Add controls for WIND SPEED to be changeable in the run
const windSpeedFolder = gui.addFolder('Wind Speed');
windSpeedFolder.add(windSpeedValue, 'Wind_Speed', -201, 201).onChange(windSpeedFunction)
// Wind speed change function
function windSpeedFunction() {
    update.windSpeed = windSpeedValue.Wind_Speed;
}

// Add controls for ROTOR MASS to be changeable in the run
const rotorMassFolder = gui.addFolder('Rotor Mass');
rotorMassFolder.add(rotorMassValue, 'Rotor_Mass', -71, 71).onChange(rotorMassFunction)
// Rotor mass change function
function rotorMassFunction() {
    update.rotorMass = rotorMassValue.Rotor_Mass;
}

// Add controls for HELICOPTER SHAPE to be changeable in the run
const AshapeFolder = gui.addFolder('Helicopter Shape');
AshapeFolder.add(AshapeValue, 'Heli_Shape', -232, 232).onChange(AshapeFunction)
// Helicopter shape change function
function AshapeFunction() {
    update.forces.Ashape = AshapeValue.Heli_Shape;
}

// Add controls for ROTOR SHAPE to be changeable in the run
const rotorAshapeFolder = gui.addFolder('Rotor Shape');
rotorAshapeFolder.add(rotorAshapeValue, 'Rotor_Shape', -8.5, 8.5).onChange(rotorAshapeFunction)
// Rotor shape change function
function rotorAshapeFunction() {
    update.forces.rotorAshape = rotorAshapeValue.Rotor_Shape;
}

function playSound() {
    // create an AudioListener and add it to the camera
    const listener = new THREE.AudioListener();
    camera.add(listener);

    // create a global audio source
    sound = new THREE.Audio(listener);

    // load a sound and set it as the Audio object's buffer
    const audioLoader = new THREE.AudioLoader();
    audioLoader.load(music, function (buffer) {
        sound.setBuffer(buffer);
        sound.setLoop(true);
        sound.setVolume(0.5);
        sound.play();
    });
}

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
            rollRight();
        }
        if (event.key == "a") {
            // increase the left angel which will decrease the forcse in the x axis and increase it in the z axis
            update.move_left();
            rollLeft();
        }
        if (event.key == "s") {
            // decrease the force which moves the rotor which will reduce the move force for the helicopter to decrease
            // ... We can assume that we are decreasing the power given to the helicopter
            update.move_down();
        }
        if (event.key == "8") {
            // increase the angel between the X axis and the y axis which will decrease the left force and increase the thrust force
            update.move_forward();
            pitchForward(update.forces.forwardBackAngele);
        }
        if (event.key == "6") {
            yawRight();
        }
        if (event.key == "4") {
            yawLeft();
        }

        if (event.key == "2") {
            // decrease the angel between the X axis and the y axis which will increase the left force and decrease the thrust force
            update.move_backword();
            pitchBackward(update.forces.forwardBackAngele);
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
        playSound();
        // start the starter system 
        start = true;
        starterSystem.setTime();
    }
});
document.addEventListener('keyup', (event) => {
    if (event.key == 'd') {
        stopRollRight();
    }
    if (event.key == 'a') {
        stopRollLeft()
    }
})

// Animate for each frame
const tick = () => {
    // Render
    renderer.render(scene, camera);

    if (model) {
        if (ground && !lunch && !start) {
            update.update_on_ground();
            updateGUI("Ground")
        } else if ((!lunch && start) || (ground && start)) {
            updateStarterSystem();
            updateGUI("Ground")
        } else {
            updateFlyingState();
            updateGUI("Flying")
        }
    }

    updatePivotRotation();
    updateCameraPosition();
    updateCameraRotation();
    // updateHeliRotation();
    heli.setRotationFromQuaternion(heliQuaternion);
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
};

const updateStarterSystem = () => {
    let currentTime = Date.now();
    if (
        currentTime < starterSystem.endTime &&
        starterSystem.rotorVelocity !== starterSystem.finalRotorSpeed
    ) {
        starterSystem.rotorVelocity +=
            ((starterSystem.starterTorque / starterSystem.rotorInertia) *
                (currentTime - starterSystem.startTime)) /
            1000;
        update.rotorVelocity = starterSystem.rotorVelocity;
        update.forces.rotorVelocity = starterSystem.rotorVelocity;
        update.W = update.forces.rotorVelocity / update.r;
        console.log(update.rotorVelocity);
        update.rotorMoveForce =
            (starterSystem.deltaRotorSpeed / starterSystem.accelerationTime) *
            starterSystem.rotorInertia;
        update.rotor_update();
    } else {
        lunch = true;
        ground = false;
        start = false;
    }
};

const updateFlyingState = () => {
    if (update.position.getY() < -7400 || update.alpha == 0) {
        update.reset_update();
    } else {
        update.update_on_fly();

        heli.position.x = update.position.getX();
        heli.position.y = update.position.getY() - 7400;
        heli.position.z = update.position.getZ();
        scene.add(heli);
    }
};

const updatePivotRotation = () => {
    if (update.W > 0) {
        pivotGroup.rotation.y += update.W;
    }
};

// Add GUI controllers and store them in the 'controllers' array
lilGui.title("Helicopter Status");
controllers.push(lilGui.add(myObject, "RotorSpeed"));
controllers.push(lilGui.add(myObject, "AngleOfAttak"));
controllers.push(lilGui.add(myObject, "Height"));
controllers.push(lilGui.add(myObject, "ForwardSpeed"));
controllers.push(lilGui.add(myObject, "RightSpeed"));
controllers.push(lilGui.add(myObject, "UpSpeed"));
controllers.push(lilGui.add(myObject, "Roll"));
controllers.push(lilGui.add(myObject, "Yaw"));
controllers.push(lilGui.add(myObject, "Pitch"));
controllers.push(lilGui.add(myObject, "Status"));

tick();