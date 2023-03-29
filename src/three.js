import './src.css';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import {DRACOLoader} from 'three/examples/jsm/loaders/DRACOLoader'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import { Camera, PerspectiveCamera, Scene, SpotLight } from 'three';

const canvas = document.querySelector('canvas.webgl')
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
const scene = new THREE.Scene();
const camera = new PerspectiveCamera(75, sizes.width, sizes.height);
camera.position.z = 2;
scene.add(camera);

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('draco/');

const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);

var spotlight = new THREE.SpotLight(0xffffff);
spotlight.position.set(-40,60,-10);
scene.add(spotlight);

gltfLoader.load(
    'can_night_drive.glb',
    (gltf) => 
    {
        scene.add(gltf.scene)
    } 
);


const cursor = {x:0, y:0}

window.addEventListener('mousemove',(event) => {
    cursor.x = event.clientX/sizes.width - 0.5
    cursor.y = -(event.clientY/sizes.height - 0.5)
})

const renderer = new THREE.WebGLRenderer({canvas: canvas})
renderer.setSize(sizes.width, sizes.height)

const controls = new OrbitControls(camera, canvas)

window.addEventListener('dblclick',()=>
{
    if(!document.fullscreenElement) {
        canvas.requestFullscreen();
    }
    else {
        document.exitFullscreen();
    }
})

window.addEventListener('resize', () =>
{
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    camera.aspect = sizes.width/sizes.height
    camera.updateProjectionMatrix();

    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

const animate = () => {
    renderer.render(scene,camera)
    controls.update()

    window.requestAnimationFrame(animate)
}

animate();