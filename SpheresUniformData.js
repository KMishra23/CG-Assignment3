import * as THREE from 'three'; 

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

export const SphereUniformDataList = [{
    
    bingLighting:{value: bingLighting},
    numLights:{value: numLights},
    ambientColor:{value: new THREE.Color('#630200')},
    diffuseColor:{value: new THREE.Color('#ff0400')},
    specularColor:{value:new THREE.Color('#fdfdfd')},
    shininessVal:{value: 20.0},
    Ka:{value: 1.0},
    Kd:{value: 0.0},
    Ks:{value: 0.0} 
    
},{
    bingLighting:{value: bingLighting},
    numLights:{value: numLights},
    ambientColor:{value: new THREE.Color('#630200')},
    diffuseColor:{value: new THREE.Color('#ff0400')},
    specularColor:{value:new THREE.Color('#fdfdfd')},
    shininessVal:{value: 20.0},
    Ka:{value: 1.0},
    Kd:{value: 0.0},
    Ks:{value: 2.0} 
},{
    bingLighting:{value: bingLighting},
    numLights:{value: numLights},
    ambientColor:{value: new THREE.Color('#630200')},
    diffuseColor:{value: new THREE.Color('#ff0400')},
    specularColor:{value:new THREE.Color('#fdfdfd')},
    shininessVal:{value: 20.0},
    Ka:{value: 1.0},
    Kd:{value: 0.0},
    Ks:{value: 4.0} 
},{
    bingLighting:{value: bingLighting},
    numLights:{value: numLights},
    ambientColor:{value: new THREE.Color('#630200')},
    diffuseColor:{value: new THREE.Color('#ff0400')},
    specularColor:{value:new THREE.Color('#fdfdfd')},
    shininessVal:{value: 20.0},
    Ka:{value: 1.0},
    Kd:{value: 0.5},
    Ks:{value: 0.0} 
},{
    bingLighting:{value: bingLighting},
    numLights:{value: numLights},
    ambientColor:{value: new THREE.Color('#630200')},
    diffuseColor:{value: new THREE.Color('#ff0400')},
    specularColor:{value:new THREE.Color('#fdfdfd')},
    shininessVal:{value: 20.0},
    Ka:{value: 1.0},
    Kd:{value: 0.5},
    Ks:{value: 2.0} 
},{
    bingLighting:{value: bingLighting},
    numLights:{value: numLights},
    ambientColor:{value: new THREE.Color('#630200')},
    diffuseColor:{value: new THREE.Color('#ff0400')},
    specularColor:{value:new THREE.Color('#fdfdfd')},
    shininessVal:{value: 20.0},
    Ka:{value: 1.0},
    Kd:{value: 0.5},
    Ks:{value: 4.0} 
},{
    bingLighting:{value: bingLighting},
    numLights:{value: numLights},
    ambientColor:{value: new THREE.Color('#630200')},
    diffuseColor:{value: new THREE.Color('#ff0400')},
    specularColor:{value:new THREE.Color('#fdfdfd')},
    shininessVal:{value: 20.0},
    Ka:{value: 1.0},
    Kd:{value: 1.0},
    Ks:{value: 0.0} 
},{
    bingLighting:{value: bingLighting},
    numLights:{value: numLights},
    ambientColor:{value: new THREE.Color('#630200')},
    diffuseColor:{value: new THREE.Color('#ff0400')},
    specularColor:{value:new THREE.Color('#fdfdfd')},
    shininessVal:{value: 20.0},
    Ka:{value: 1.0},
    Kd:{value: 1.0},
    Ks:{value: 2.0} 
},{
    bingLighting:{value: bingLighting},
    numLights:{value: numLights},
    ambientColor:{value: new THREE.Color('#630200')},
    diffuseColor:{value: new THREE.Color('#ff0400')},
    specularColor:{value:new THREE.Color('#fdfdfd')},
    shininessVal:{value: 20.0},
    Ka:{value: 1.0},
    Kd:{value: 1.0},
    Ks:{value: 4.0} 
}
]
