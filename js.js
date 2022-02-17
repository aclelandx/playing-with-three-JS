import * as THREE from 'https://cdn.skypack.dev/three';

let camera, scene, renderer;
let geometry, material, mesh;
let light;

const container = document.getElementById('threeJSContainer')

init(window.innerWidth, window.innerHeight);

window.addEventListener('resize', function () {
    container.innerHTML = ``;
    const sizeArray = [window.innerWidth, window.innerHeight];
    const [x, y] = sizeArray;
    init(x, y);
})


function init(x, y) {


    camera = new THREE.PerspectiveCamera(45, x / y, 3, 0);
    camera.position.z = 4;

    scene = new THREE.Scene();

    //background that has been added
    let planeGeometry, planeMaterial;
    planeGeometry = new THREE.PlaneGeometry(x, y);
    planeMaterial = new THREE.MeshBasicMaterial({ color: 0xf9fafb, side: THREE.DoubleSide })
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.position.set(0, 0, 0)

    plane.receiveShadow = true;
    scene.add(plane);



    //Shape that has been added
    geometry = new THREE.TorusKnotBufferGeometry(15, 3, 100, 8, 2, 3);
    material = new THREE.MeshNormalMaterial();
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 0, 1);
    mesh.castShadow = true;
    mesh.receiveShadow = false;
    scene.add(mesh);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setSize(x, y);
    renderer.setAnimationLoop(animation);
    container.appendChild(renderer.domElement);

}




function animation(time) {

    mesh.rotation.x = time / 7500;
    mesh.rotation.y = time / 50000;

    renderer.render(scene, camera);

}