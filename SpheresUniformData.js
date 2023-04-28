import * as THREE from 'three'; 
import { phongFragShader } from './Shaders/phongFragmentShader';
import { phongVertShader } from './Shaders/phongVertexShader';
import { gouradFragShader } from './Shaders/gouradFragmentShader';
import { gouradVertShader } from './Shaders/gouradVertexShader';

export class SpheresUniformData {
    constructor() {
        var lightPos1 = new THREE.Vector3(-100,100,100)
        var lightPos2 = new THREE.Vector3(200,0,0)
        var lightPos3 = new THREE.Vector3(0,200,0)
        var lightPos4 = new THREE.Vector3(0,-200,0)

        this.numLights = 1
        this.blinn = 0

        this.bingLighting = [
            lightPos1.x, lightPos1.y, lightPos1.z,
            lightPos2.x, lightPos2.y, lightPos2.z,
            lightPos3.x, lightPos3.y, lightPos3.z,
            lightPos4.x, lightPos4.y, lightPos4.z,
        ]

        this.spheresUniformsData = this.SphereUniformDataList()
        this.spheresMaterialsPhong = this.SpheresMaterialListPhong()
        this.spheresMaterialsGourad = this.SpheresMaterialListGourad()
    }   

    SphereUniformDataList() {
        var sphereUniformDataList = [
        {
            bingLighting:{value: this.bingLighting},
            numLights:{value: this.numLights},
            blinn:{value: this.blinn},
            ambientColor:{value: new THREE.Color('#630200')},
            diffuseColor:{value: new THREE.Color('#ff0400')},
            specularColor:{value:new THREE.Color('#fdfdfd')},
            shininessVal:{value: 20.0},
            Ka:{value: 1.0},
            Kd:{value: 0.0},
            Ks:{value: 0.0} 
            
        },{
            bingLighting:{value: this.bingLighting},
            numLights:{value: this.numLights},
            blinn:{value: this.blinn},
            ambientColor:{value: new THREE.Color('#630200')},
            diffuseColor:{value: new THREE.Color('#ff0400')},
            specularColor:{value:new THREE.Color('#fdfdfd')},
            shininessVal:{value: 20.0},
            Ka:{value: 1.0},
            Kd:{value: 0.0},
            Ks:{value: 2.0} 
        },{
            bingLighting:{value: this.bingLighting},
            numLights:{value: this.numLights},
            blinn:{value: this.blinn},
            ambientColor:{value: new THREE.Color('#630200')},
            diffuseColor:{value: new THREE.Color('#ff0400')},
            specularColor:{value:new THREE.Color('#fdfdfd')},
            shininessVal:{value: 20.0},
            Ka:{value: 1.0},
            Kd:{value: 0.0},
            Ks:{value: 4.0} 
        },{
            bingLighting:{value: this.bingLighting},
            numLights:{value: this.numLights},
            blinn:{value: this.blinn},
            ambientColor:{value: new THREE.Color('#630200')},
            diffuseColor:{value: new THREE.Color('#ff0400')},
            specularColor:{value:new THREE.Color('#fdfdfd')},
            shininessVal:{value: 20.0},
            Ka:{value: 1.0},
            Kd:{value: 0.5},
            Ks:{value: 0.0} 
        },{
            bingLighting:{value: this.bingLighting},
            numLights:{value: this.numLights},
            blinn:{value: this.blinn},
            ambientColor:{value: new THREE.Color('#630200')},
            diffuseColor:{value: new THREE.Color('#ff0400')},
            specularColor:{value:new THREE.Color('#fdfdfd')},
            shininessVal:{value: 20.0},
            Ka:{value: 1.0},
            Kd:{value: 0.5},
            Ks:{value: 2.0} 
        },{
            bingLighting:{value: this.bingLighting},
            numLights:{value: this.numLights},
            blinn:{value: this.blinn},
            ambientColor:{value: new THREE.Color('#630200')},
            diffuseColor:{value: new THREE.Color('#ff0400')},
            specularColor:{value:new THREE.Color('#fdfdfd')},
            shininessVal:{value: 20.0},
            Ka:{value: 1.0},
            Kd:{value: 0.5},
            Ks:{value: 4.0} 
        },{
            bingLighting:{value: this.bingLighting},
            numLights:{value: this.numLights},
            blinn:{value: this.blinn},
            ambientColor:{value: new THREE.Color('#630200')},
            diffuseColor:{value: new THREE.Color('#ff0400')},
            specularColor:{value:new THREE.Color('#fdfdfd')},
            shininessVal:{value: 20.0},
            Ka:{value: 1.0},
            Kd:{value: 1.0},
            Ks:{value: 0.0} 
        },{
            bingLighting:{value: this.bingLighting},
            numLights:{value: this.numLights},
            blinn:{value: this.blinn},
            ambientColor:{value: new THREE.Color('#630200')},
            diffuseColor:{value: new THREE.Color('#ff0400')},
            specularColor:{value:new THREE.Color('#fdfdfd')},
            shininessVal:{value: 20.0},
            Ka:{value: 1.0},
            Kd:{value: 1.0},
            Ks:{value: 2.0} 
        },{
            bingLighting:{value: this.bingLighting},
            numLights:{value: this.numLights},
            blinn:{value: this.blinn},
            ambientColor:{value: new THREE.Color('#630200')},
            diffuseColor:{value: new THREE.Color('#ff0400')},
            specularColor:{value:new THREE.Color('#fdfdfd')},
            shininessVal:{value: 20.0},
            Ka:{value: 1.0},
            Kd:{value: 1.0},
            Ks:{value: 4.0} 
        }]

        return sphereUniformDataList
    }

    SpheresMaterialListPhong() {
        const phongMaterials = [
            new THREE.ShaderMaterial({
                vertexShader: phongVertShader,
                fragmentShader: phongFragShader,
                uniforms: this.spheresUniformsData[0],
                side: THREE.DoubleSide
            }),
            new THREE.ShaderMaterial({
                vertexShader: phongVertShader,
                fragmentShader: phongFragShader,
                uniforms: this.spheresUniformsData[1],
                side: THREE.DoubleSide
            }),
            new THREE.ShaderMaterial({
                vertexShader: phongVertShader,
                fragmentShader: phongFragShader,
                uniforms: this.spheresUniformsData[2],
                side: THREE.DoubleSide
            }),
            new THREE.ShaderMaterial({
                vertexShader: phongVertShader,
                fragmentShader: phongFragShader,
                uniforms: this.spheresUniformsData[3],
                side: THREE.DoubleSide
            }),
            new THREE.ShaderMaterial({
                vertexShader: phongVertShader,
                fragmentShader: phongFragShader,
                uniforms: this.spheresUniformsData[4],
                side: THREE.DoubleSide
            }),
            new THREE.ShaderMaterial({
                vertexShader: phongVertShader,
                fragmentShader: phongFragShader,
                uniforms: this.spheresUniformsData[5],
                side: THREE.DoubleSide
            }),
            new THREE.ShaderMaterial({
                vertexShader: phongVertShader,
                fragmentShader: phongFragShader,
                uniforms: this.spheresUniformsData[6],
                side: THREE.DoubleSide
            }),
            new THREE.ShaderMaterial({
                vertexShader: phongVertShader,
                fragmentShader: phongFragShader,
                uniforms: this.spheresUniformsData[7],
                side: THREE.DoubleSide
            }),
            new THREE.ShaderMaterial({
                vertexShader: phongVertShader,
                fragmentShader: phongFragShader,
                uniforms: this.spheresUniformsData[8],
                side: THREE.DoubleSide
            }),
        ]
    
        return phongMaterials;
    }

    SpheresMaterialListGourad() {
        const gouradMaterials = [
            new THREE.ShaderMaterial({
                vertexShader: gouradVertShader,
                fragmentShader: gouradFragShader,
                uniforms: this.spheresUniformsData[0],
                side: THREE.DoubleSide
            }),
            new THREE.ShaderMaterial({
                vertexShader: gouradVertShader,
                fragmentShader: gouradFragShader,
                uniforms: this.spheresUniformsData[1],
                side: THREE.DoubleSide
            }),
            new THREE.ShaderMaterial({
                vertexShader: gouradVertShader,
                fragmentShader: gouradFragShader,
                uniforms: this.spheresUniformsData[2],
                side: THREE.DoubleSide
            }),
            new THREE.ShaderMaterial({
                vertexShader: gouradVertShader,
                fragmentShader: gouradFragShader,
                uniforms: this.spheresUniformsData[3],
                side: THREE.DoubleSide
            }),
            new THREE.ShaderMaterial({
                vertexShader: gouradVertShader,
                fragmentShader: gouradFragShader,
                uniforms: this.spheresUniformsData[4],
                side: THREE.DoubleSide
            }),
            new THREE.ShaderMaterial({
                vertexShader: gouradVertShader,
                fragmentShader: gouradFragShader,
                uniforms: this.spheresUniformsData[5],
                side: THREE.DoubleSide
            }),
            new THREE.ShaderMaterial({
                vertexShader: gouradVertShader,
                fragmentShader: gouradFragShader,
                uniforms: this.spheresUniformsData[6],
                side: THREE.DoubleSide
            }),
            new THREE.ShaderMaterial({
                vertexShader: gouradVertShader,
                fragmentShader: gouradFragShader,
                uniforms: this.spheresUniformsData[7],
                side: THREE.DoubleSide
            }),
            new THREE.ShaderMaterial({
                vertexShader: gouradVertShader,
                fragmentShader: gouradFragShader,
                uniforms: this.spheresUniformsData[8],
                side: THREE.DoubleSide
            }),
        ]
    
        return gouradMaterials;
    }

    swapLocalIlluminationModel() {
        this.blinn = this.blinn == 1 ? 0:1;
        this.spheresUniformsData = this.SphereUniformDataList()
        this.spheresMaterialsPhong = this.SpheresMaterialListPhong()
        this.spheresMaterialsGourad = this.SpheresMaterialListGourad()
    }
    
    changeNumberOfLight() {

    }
}