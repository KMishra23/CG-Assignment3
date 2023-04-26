import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GUI } from 'dat.gui'


const vShader = `
// attribute vec3 position;
// attribute vec3 normal;
uniform mat4 projection, modelview, normalMat;
varying vec3 normalInterp;
varying vec3 vertPos;

void main(){
  vec4 vertPos4 = modelViewMatrix * vec4(position, 1.0);
  vertPos = vec3(vertPos4) / vertPos4.w;
  normalInterp = normalMatrix * normal;
  gl_Position = projectionMatrix * vertPos4; 
}
`
const fShader=`
precision mediump float;
varying vec3 normalInterp;  // Surface normal
varying vec3 vertPos;       // Vertex position
uniform int mode;   // Rendering mode
uniform float Ka;   // Ambient reflection coefficient
uniform float Kd;   // Diffuse reflection coefficient
uniform float Ks;   // Specular reflection coefficient
uniform float shininessVal; // Shininess
// Material color
uniform vec3 ambientColor;
uniform vec3 diffuseColor;
uniform vec3 specularColor;
uniform vec3 lightPos; // Light position

void main() {
  vec3 N = normalize(normalInterp);
  vec3 L = normalize(lightPos - vertPos);

  // Lambert's cosine law
  float lambertian = max(dot(N, L), 0.0);
  float specular = 0.0;
  if(lambertian > 0.0) {
    vec3 R = reflect(-L, N);      // Reflected light vector
    vec3 V = normalize(-vertPos); // Vector to viewer
    // Compute the specular term
    float specAngle = max(dot(R, V), 0.0);
    specular = pow(specAngle, shininessVal);
  }
  gl_FragColor = vec4(Ka * ambientColor +
                      Kd * lambertian * diffuseColor +
                      Ks * specular * specularColor, 1.0);

  // only ambient
  if(mode == 2) gl_FragColor = vec4(Ka * ambientColor, 1.0);
  // only diffuse
  if(mode == 3) gl_FragColor = vec4(Kd * lambertian * diffuseColor, 1.0);
  // only specular
  if(mode == 4) gl_FragColor = vec4(Ks * specular * specularColor, 1.0);

  // gl_FragColor = vec4(1,1,0,1);
}
`


// shader uniforms
var uniformData = {
  mode:{value: 1},
  lightPos:{value: new THREE.Vector3(0,0,0)},
  ambientColor:{value: new THREE.Color('#c46fff')},
  diffuseColor:{value: new THREE.Color('#b334a8')},
  specularColor:{value:new THREE.Color('#242780')},
  shininessVal:{value: 80.0},
  Ka:{value: 1.0},
  Kd:{value: 1.0},
  Ks:{value: 1.0}
}

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0065b3);
let aspect = window.innerWidth / window.innerHeight;
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/ window.innerHeight, 0.1, 1000);
camera.position.z = 10;

// var ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
// ambientLight.castShadow = true;
// scene.add(ambientLight);

// var directionalLight = new THREE.DirectionalLight(0x002311, 1);
// directionalLight.castShadow = true;
// directionalLight.position.set(0, 0, 3);
// scene.add(directionalLight);


const renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(5,5,5);
const material = new THREE.ShaderMaterial({
  vertexShader: vShader,
  fragmentShader: fShader,
  uniforms: uniformData
});

// mesh
const cube = new THREE.Mesh(geometry, material);
scene.add( cube );

const controls = new OrbitControls(camera, renderer.domElement)

function animate() {
	requestAnimationFrame( animate );
  controls.update();
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
	renderer.render( scene, camera );
}
animate();

// document.body.appendChild(renderer.domElement);