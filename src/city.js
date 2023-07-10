import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

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


function tallbiuldingtexture() {
    let materialtallbiuldingArray = []
    let tallbiuldingtexture_ft = new THREE.TextureLoader().load('/static/textures/BuildingsH.jpg');
    let tallbiuldingtexture_bk = new THREE.TextureLoader().load('/static/textures/BuildingsH.jpg');
    let tallbiuldingtexture_up = new THREE.TextureLoader().load('/static/textures/BRICK.jpg');
    let tallbiuldingtexture_dn = new THREE.TextureLoader().load('/static/textures/BuildingsH.jpg');
    let tallbiuldingtexture_rt = new THREE.TextureLoader().load('/static/textures/BuildingsH.jpg');
    let tallbiuldingtexture_lf = new THREE.TextureLoader().load('/static/textures/BuildingsH.jpg');

    materialtallbiuldingArray.push(new THREE.MeshBasicMaterial({ map: tallbiuldingtexture_ft }));
    materialtallbiuldingArray.push(new THREE.MeshBasicMaterial({ map: tallbiuldingtexture_bk }));
    materialtallbiuldingArray.push(new THREE.MeshBasicMaterial({ map: tallbiuldingtexture_up }));
    materialtallbiuldingArray.push(new THREE.MeshBasicMaterial({ map: tallbiuldingtexture_dn }));
    materialtallbiuldingArray.push(new THREE.MeshBasicMaterial({ map: tallbiuldingtexture_rt }));
    materialtallbiuldingArray.push(new THREE.MeshBasicMaterial({ map: tallbiuldingtexture_lf }));


    tallbiuldingtexture_ft.repeat.y = 5
    tallbiuldingtexture_ft.repeat.x = 1
    tallbiuldingtexture_ft.repeat.z = 1
    tallbiuldingtexture_ft.wrapS = THREE.MirroredRepeatWrapping
    tallbiuldingtexture_ft.wrapT = THREE.MirroredRepeatWrapping

    tallbiuldingtexture_bk.repeat.y = 5
    tallbiuldingtexture_bk.repeat.x = 1
    tallbiuldingtexture_bk.repeat.z = 1
    tallbiuldingtexture_bk.wrapS = THREE.MirroredRepeatWrapping
    tallbiuldingtexture_bk.wrapT = THREE.MirroredRepeatWrapping

    tallbiuldingtexture_rt.repeat.y = 5
    tallbiuldingtexture_rt.repeat.x = 1
    tallbiuldingtexture_rt.repeat.z = 1
    tallbiuldingtexture_rt.wrapS = THREE.MirroredRepeatWrapping
    tallbiuldingtexture_rt.wrapT = THREE.MirroredRepeatWrapping

    tallbiuldingtexture_lf.repeat.y = 5
    tallbiuldingtexture_lf.repeat.x = 1
    tallbiuldingtexture_lf.repeat.z = 1
    tallbiuldingtexture_lf.wrapS = THREE.MirroredRepeatWrapping
    tallbiuldingtexture_lf.wrapT = THREE.MirroredRepeatWrapping

    return materialtallbiuldingArray
}


function shortbuiuldingtexture() {
    const tallbiuldingtexture_up = new THREE.TextureLoader().load('/static/textures/BRICK.jpg');

    const shtbiuldingTexture = textureLoader.load('/static/textures/sht_building.jpg')

    let materiashtlbiuldingArray = []
    materiashtlbiuldingArray.push(new THREE.MeshBasicMaterial({ map: shtbiuldingTexture }));
    materiashtlbiuldingArray.push(new THREE.MeshBasicMaterial({ map: shtbiuldingTexture }));
    materiashtlbiuldingArray.push(new THREE.MeshBasicMaterial({ map: tallbiuldingtexture_up }));
    materiashtlbiuldingArray.push(new THREE.MeshBasicMaterial({ map: tallbiuldingtexture_up }));
    materiashtlbiuldingArray.push(new THREE.MeshBasicMaterial({ map: shtbiuldingTexture }));
    materiashtlbiuldingArray.push(new THREE.MeshBasicMaterial({ map: shtbiuldingTexture }));

    return materiashtlbiuldingArray
}

function shortbuiuldingtexture2() {
    const tallbiuldingtexture_up = new THREE.TextureLoader().load('/static/textures/BRICK.jpg');

    const shtbiuldingTexture = textureLoader.load('/static/textures/shrbtex.jpg')

    let materiashtlbiuldingArray = []
    materiashtlbiuldingArray.push(new THREE.MeshBasicMaterial({ map: shtbiuldingTexture }));
    materiashtlbiuldingArray.push(new THREE.MeshBasicMaterial({ map: shtbiuldingTexture }));
    materiashtlbiuldingArray.push(new THREE.MeshBasicMaterial({ map: tallbiuldingtexture_up }));
    materiashtlbiuldingArray.push(new THREE.MeshBasicMaterial({ map: tallbiuldingtexture_up }));
    materiashtlbiuldingArray.push(new THREE.MeshBasicMaterial({ map: shtbiuldingTexture }));
    materiashtlbiuldingArray.push(new THREE.MeshBasicMaterial({ map: shtbiuldingTexture }));

    return materiashtlbiuldingArray
}

function biulding_Geometry() {

    const tallbiulding = new THREE.BoxGeometry(1000, 3000, 1000)
    const tallbiuldingmesh = new THREE.Mesh(tallbiulding, tallbiuldingtexture())

    tallbiuldingmesh.position.x = -11000
    tallbiuldingmesh.position.y = -5900
    tallbiuldingmesh.position.z = -11000
    const tallbiuldingmesh1 = new THREE.Mesh(tallbiulding, tallbiuldingtexture())

    tallbiuldingmesh1.position.x = -9000
    tallbiuldingmesh1.position.y = -5900
    tallbiuldingmesh1.position.z = -11000

    const tallbiuldingmesh2 = new THREE.Mesh(tallbiulding, tallbiuldingtexture())

    tallbiuldingmesh2.position.x = -11000
    tallbiuldingmesh2.position.y = -5900
    tallbiuldingmesh2.position.z = -7000

    const shtbiulding = new THREE.BoxGeometry(1000, 1500, 1000)
    const shtbiuldingmesh1 = new THREE.Mesh(shtbiulding, shortbuiuldingtexture2())

    shtbiuldingmesh1.position.x = -11000
    shtbiuldingmesh1.position.y = -6600
    shtbiuldingmesh1.position.z = -9000

    const shtbiuldingmesh2 = new THREE.Mesh(shtbiulding, shortbuiuldingtexture())

    shtbiuldingmesh2.position.x = -9000
    shtbiuldingmesh2.position.y = -6600
    shtbiuldingmesh2.position.z = -9000

    const shtbiuldingmesh3 = new THREE.Mesh(shtbiulding, shortbuiuldingtexture())

    shtbiuldingmesh3.position.x = -9000
    shtbiuldingmesh3.position.y = -6600
    shtbiuldingmesh3.position.z = -7000
    const block1 = new THREE.Group();
    block1.add(tallbiuldingmesh)
    block1.add(tallbiuldingmesh1)
    block1.add(tallbiuldingmesh2)
    block1.add(shtbiuldingmesh1)
    block1.add(shtbiuldingmesh2)
    block1.add(shtbiuldingmesh3)
    return block1
}

export function block_1() {


    const b = biulding_Geometry();


    return b
        // scene.add(block1);
}


export function block_2() {

    const b = biulding_Geometry();

    b.rotation.y += Math.PI

    b.position.z = -18000
    b.position.x = -16500
    return b
}


export function block_3() {

    const b = biulding_Geometry();
    b.position.x = 8500
    return b
}


export function block_4() {

    const b = biulding_Geometry();

    b.position.x = 12000

    return b

}

export function block_5() {

    const b = biulding_Geometry();

    b.rotation.y += Math.PI

    b.position.z = -18000
    b.position.x = -3000
    return b

}

export function block_6() {

    const b = biulding_Geometry();

    b.position.x = 20500
    return b
}

export function block_7() {


    const b = biulding_Geometry();

    b.position.z = 9000
    return b
        // scene.add(block1);
}
export function block_8() {

    const b = biulding_Geometry();

    b.rotation.y += Math.PI

    b.position.z = -9000
    b.position.x = -16500
    return b
}
export function block_9() {

    const b = biulding_Geometry();
    // b.position.x = 0000
    b.position.z = 18000
    return b
}
export function block_10() {

    const b = biulding_Geometry();

    b.position.x = 3500
    b.position.z = 18000
    return b

}
export function block_11() {

    const b = biulding_Geometry();

    b.rotation.y += Math.PI

    b.position.z = 1
    b.position.x = -8000
    return b

}
export function block_12() {

    const b = biulding_Geometry();
    b.position.z = 18000
    b.position.x = 8500

    return b
}
export function block_13() {

    const b = biulding_Geometry();

    b.rotation.y += Math.PI

    // b.position.z = -0000
    b.position.x = -3000
    return b
}
export function block_14() {

    const b = biulding_Geometry();
    b.position.z = 18000
    b.position.x = 20500
    return b
}
export function block_15() {
    const b = biulding_Geometry();

    b.position.z = 9000
    b.position.x = 20500
    return b
        // scene.add(block1);
}
export function block_16() {

    const b = biulding_Geometry();

    b.rotation.y += Math.PI

    b.position.z = -9000
    b.position.x = -3000
    return b
}