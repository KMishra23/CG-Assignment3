import * as THREE from 'three';
import { DoubleSide } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { gouradFragShader } from './gouradFragmentShader';
import { gouradVertShader } from './gouradVertexShader';
import { phongFragShader } from './phongFragmentShader';
import { phongVertShader } from './phongVertexShader';


const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0065b3);
const camera = new THREE.PerspectiveCamera(30, window.innerWidth/ window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);



var lightPos1 = new THREE.Vector3(-200,0,0)
var lightPos2 = new THREE.Vector3(200,0,0)
var lightPos3 = new THREE.Vector3(0,200,0)
var lightPos4 = new THREE.Vector3(0,-200,0)

var numLights = 2

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

    ambientColor:{value: new THREE.Color('#c46f25')},
    diffuseColor:{value: new THREE.Color('#b334a8')},
    specularColor:{value:new THREE.Color('#242780')},
    shininessVal:{value: 80.0},
    Ka:{value: 1.0},
    Kd:{value: 0.2},
    Ks:{value: 1.0}
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

const sphere1 = new THREE.Mesh( round, phong );
sphere1.position.x=30;
sphere1.position.y=30;

const sphere2 = new THREE.Mesh( round, phong );
sphere2.position.x=30;
sphere2.position.y=-30;

const sphere3 = new THREE.Mesh( round, phong );
sphere3.position.x=-30;
sphere3.position.y=30;

const sphere4 = new THREE.Mesh( round, phong );
sphere4.position.x=-30;
sphere4.position.y=-30;

const sphere5 = new THREE.Mesh( round, phong );
sphere5.position.x=0;
sphere5.position.y=30;

const sphere6 = new THREE.Mesh( round, phong );
sphere6.position.x=30;
sphere6.position.y=0;

const sphere7 = new THREE.Mesh( round, phong );
sphere7.position.x=0;
sphere7.position.y=-30;

const sphere8 = new THREE.Mesh( round, phong );
sphere8.position.x=-30;
sphere8.position.y=0;

const sphere9 = new THREE.Mesh( round, phong );
sphere9.position.x=0;
sphere9.position.y=0;

scene.add( sphere1 );
scene.add( sphere2 );
scene.add( sphere3 );
scene.add( sphere4 );
scene.add( sphere5 );
scene.add( sphere6 );
scene.add( sphere7 );
scene.add( sphere8 );
scene.add( sphere9 );

camera.position.z = 170;

const control = new OrbitControls(camera, renderer.domElement)

function animate() {
	requestAnimationFrame( animate );
    control.update();
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
	renderer.render( scene, camera );
}
animate();

