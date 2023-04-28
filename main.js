import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { gouradFragShader } from './Shaders/gouradFragmentShader';
import { gouradVertShader } from './Shaders/gouradVertexShader';
import { phongFragShader } from './Shaders/phongFragmentShader';
import { phongVertShader } from './Shaders/phongVertexShader';
import * as dat from 'https://cdn.skypack.dev/dat.gui';
import { SpheresScene } from './SceneSpheres';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0065b3);
const camera = new THREE.PerspectiveCamera(30, window.innerWidth/ window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


var lightPos1 = new THREE.Vector3(-100,100,100)
var lightPos2 = new THREE.Vector3(200,0,0)
var lightPos3 = new THREE.Vector3(0,200,0)
var lightPos4 = new THREE.Vector3(0,-200,0)

var numLights = 1

var bingLighting = [
    lightPos1.x, lightPos1.y, lightPos1.z,
    lightPos2.x, lightPos2.y, lightPos2.z,
    lightPos3.x, lightPos3.y, lightPos3.z,
    lightPos4.x, lightPos4.y, lightPos4.z,
]

var gouradUniformData = {
    bingLighting:{value: bingLighting},
    numLights:{value: numLights},
    ambientColor:{value: new THREE.Color('#c46f25')},
    diffuseColor:{value: new THREE.Color('#b334a8')},
    specularColor:{value:new THREE.Color('#242780')},
    shininessVal:{value: 80.0},
    Ka:{value: 1.0},
    Kd:{value: 1.0},
    Ks:{value: 1.0}
}

var phongUniformData = {
    bingLighting:{value: bingLighting},
    numLights:{value: numLights},
    ambientColor:{value: new THREE.Color('#c46f25')},
    diffuseColor:{value: new THREE.Color('#b334a8')},
    specularColor:{value:new THREE.Color('#242780')},
    shininessVal:{value: 20.0},
    Ka:{value: 1.0},
    Kd:{value: 0.4},
    Ks:{value: 5.0}
}

const gourad = new THREE.ShaderMaterial({
    vertexShader: gouradVertShader,
    fragmentShader: gouradFragShader,
    uniforms: gouradUniformData,
    side: THREE.DoubleSide
})
const phong = new THREE.ShaderMaterial({
    vertexShader: phongVertShader,
    fragmentShader: phongFragShader,
    uniforms: phongUniformData,
    side: THREE.DoubleSide
})

const geometry = new THREE.BoxGeometry( 40, 40, 40 );

const round = new THREE.SphereGeometry(10, 30, 30);

const sphere1 = new THREE.Mesh( round, gourad );
sphere1.position.x=-10;
sphere1.position.y=0;

const sphere2 = new THREE.Mesh( round, phong );
sphere2.position.x=10;
sphere2.position.y=0;

scene.add( sphere1 );
scene.add( sphere2 );

camera.position.z = 170;


const spheresScene = new SpheresScene()

var currentCamera = spheresScene.camera
var currentScene = spheresScene.scene

var control = new OrbitControls(currentCamera, renderer.domElement)

const gui = new dat.GUI();

let shadingOptions = {
    Shader: "Phong"
};

let sceneOptions = {
    Scene: "Shading Spheres"
}


gui.add(sceneOptions, "Scene", ["Shading Spheres", "Test"]).onChange(() => {
    if(sceneOptions.Scene == "Shading Spheres") {
        spheresMenu = gui.addFolder("Spheres Control")
        spheresMenu.add(shadingOptions, "Shader", ["Gourad", "Phong"]).onChange(() => {
            spheresScene.swapShader(shadingOptions.Shader)
            currentShading = shadingOptions.Shader
        });

        currentScene = spheresScene.scene
        currentCamera = spheresScene.camera
        control = new OrbitControls(currentCamera, renderer.domElement)
    }
    else if(sceneOptions.Scene == "Test") {
        gui.removeFolder(spheresMenu)
        currentScene = scene
        currentCamera = camera
        control = new OrbitControls(currentCamera, renderer.domElement)
    }
});

var spheresMenu = gui.addFolder("Spheres Control")

spheresMenu.add(shadingOptions, "Shader", ["Gourad", "Phong"]).onChange(() => {
    spheresScene.swapShader(shadingOptions.Shader)
    currentShading = shadingOptions.Shader 
});

var currentShading = "Phong"

document.addEventListener('keydown', event => {
    if(event.key == "s") {
        if(currentShading == "Phong"){
            spheresScene.swapShader("Gourad")
            currentShading = "Gourad"
        }
        else {
            spheresScene.swapShader("Phong")
            currentShading = "Phong"
        }
    }
  })

function animate() {
	requestAnimationFrame( animate );
    control.update();
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
	renderer.render( currentScene, currentCamera );
}
animate();

