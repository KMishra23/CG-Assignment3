const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0065b3);
const camera = new THREE.PerspectiveCamera(30, window.innerWidth/ window.innerHeight, 0.1, 1000);
camera.position.z = 170;

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