import * as THREE from 'three';
import { phongFragShader } from './Shaders/phongFragmentShader';
import { phongVertShader } from './Shaders/phongVertexShader';
import { gouradFragShader } from './Shaders/gouradFragmentShader';
import { gouradVertShader } from './Shaders/gouradVertexShader';
// import { SphereUniformDataList } from './SpheresUniformData';

const the = SphereUniformDataList()

export function SpheresMaterialListPhong() {
    const phongMaterials = [
        new THREE.ShaderMaterial({
            vertexShader: phongVertShader,
            fragmentShader: phongFragShader,
            uniforms: the[0],
            side: THREE.DoubleSide
        }),
        new THREE.ShaderMaterial({
            vertexShader: phongVertShader,
            fragmentShader: phongFragShader,
            uniforms: the[1],
            side: THREE.DoubleSide
        }),
        new THREE.ShaderMaterial({
            vertexShader: phongVertShader,
            fragmentShader: phongFragShader,
            uniforms: the[2],
            side: THREE.DoubleSide
        }),
        new THREE.ShaderMaterial({
            vertexShader: phongVertShader,
            fragmentShader: phongFragShader,
            uniforms: the[3],
            side: THREE.DoubleSide
        }),
        new THREE.ShaderMaterial({
            vertexShader: phongVertShader,
            fragmentShader: phongFragShader,
            uniforms: the[4],
            side: THREE.DoubleSide
        }),
        new THREE.ShaderMaterial({
            vertexShader: phongVertShader,
            fragmentShader: phongFragShader,
            uniforms: the[5],
            side: THREE.DoubleSide
        }),
        new THREE.ShaderMaterial({
            vertexShader: phongVertShader,
            fragmentShader: phongFragShader,
            uniforms: the[6],
            side: THREE.DoubleSide
        }),
        new THREE.ShaderMaterial({
            vertexShader: phongVertShader,
            fragmentShader: phongFragShader,
            uniforms: the[7],
            side: THREE.DoubleSide
        }),
        new THREE.ShaderMaterial({
            vertexShader: phongVertShader,
            fragmentShader: phongFragShader,
            uniforms: the[8],
            side: THREE.DoubleSide
        }),
    ]

    return phongMaterials;
}

export function SpheresMaterialListGourad() {
    const gouradMaterials = [
        new THREE.ShaderMaterial({
            vertexShader: gouradVertShader,
            fragmentShader: gouradFragShader,
            uniforms: the[0],
            side: THREE.DoubleSide
        }),
        new THREE.ShaderMaterial({
            vertexShader: gouradVertShader,
            fragmentShader: gouradFragShader,
            uniforms: the[1],
            side: THREE.DoubleSide
        }),
        new THREE.ShaderMaterial({
            vertexShader: gouradVertShader,
            fragmentShader: gouradFragShader,
            uniforms: the[2],
            side: THREE.DoubleSide
        }),
        new THREE.ShaderMaterial({
            vertexShader: gouradVertShader,
            fragmentShader: gouradFragShader,
            uniforms: the[3],
            side: THREE.DoubleSide
        }),
        new THREE.ShaderMaterial({
            vertexShader: gouradVertShader,
            fragmentShader: gouradFragShader,
            uniforms: the[4],
            side: THREE.DoubleSide
        }),
        new THREE.ShaderMaterial({
            vertexShader: gouradVertShader,
            fragmentShader: gouradFragShader,
            uniforms: the[5],
            side: THREE.DoubleSide
        }),
        new THREE.ShaderMaterial({
            vertexShader: gouradVertShader,
            fragmentShader: gouradFragShader,
            uniforms: the[6],
            side: THREE.DoubleSide
        }),
        new THREE.ShaderMaterial({
            vertexShader: gouradVertShader,
            fragmentShader: gouradFragShader,
            uniforms: the[7],
            side: THREE.DoubleSide
        }),
        new THREE.ShaderMaterial({
            vertexShader: gouradVertShader,
            fragmentShader: gouradFragShader,
            uniforms: the[8],
            side: THREE.DoubleSide
        }),
    ]

    return gouradMaterials;
}