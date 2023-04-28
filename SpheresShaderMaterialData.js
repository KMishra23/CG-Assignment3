import * as THREE from 'three';
import { phongFragShader } from './Shaders/phongFragmentShader';
import { phongVertShader } from './Shaders/phongVertexShader';
import { gouradFragShader } from './Shaders/gouradFragmentShader';
import { gouradVertShader } from './Shaders/gouradVertexShader';
import { SphereUniformDataList } from './SpheresUniformData';

export const SpheresMaterialListPhong = [
    new THREE.ShaderMaterial({
        vertexShader: phongVertShader,
        fragmentShader: phongFragShader,
        uniforms: SphereUniformDataList[0],
        side: THREE.DoubleSide
    }),
    new THREE.ShaderMaterial({
        vertexShader: phongVertShader,
        fragmentShader: phongFragShader,
        uniforms: SphereUniformDataList[1],
        side: THREE.DoubleSide
    }),
    new THREE.ShaderMaterial({
        vertexShader: phongVertShader,
        fragmentShader: phongFragShader,
        uniforms: SphereUniformDataList[2],
        side: THREE.DoubleSide
    }),
    new THREE.ShaderMaterial({
        vertexShader: phongVertShader,
        fragmentShader: phongFragShader,
        uniforms: SphereUniformDataList[3],
        side: THREE.DoubleSide
    }),
    new THREE.ShaderMaterial({
        vertexShader: phongVertShader,
        fragmentShader: phongFragShader,
        uniforms: SphereUniformDataList[4],
        side: THREE.DoubleSide
    }),
    new THREE.ShaderMaterial({
        vertexShader: phongVertShader,
        fragmentShader: phongFragShader,
        uniforms: SphereUniformDataList[5],
        side: THREE.DoubleSide
    }),
    new THREE.ShaderMaterial({
        vertexShader: phongVertShader,
        fragmentShader: phongFragShader,
        uniforms: SphereUniformDataList[6],
        side: THREE.DoubleSide
    }),
    new THREE.ShaderMaterial({
        vertexShader: phongVertShader,
        fragmentShader: phongFragShader,
        uniforms: SphereUniformDataList[7],
        side: THREE.DoubleSide
    }),
    new THREE.ShaderMaterial({
        vertexShader: phongVertShader,
        fragmentShader: phongFragShader,
        uniforms: SphereUniformDataList[8],
        side: THREE.DoubleSide
    }),
]

export const SpheresMaterialListGourad = [
    new THREE.ShaderMaterial({
        vertexShader: gouradVertShader,
        fragmentShader: gouradFragShader,
        uniforms: SphereUniformDataList[0],
        side: THREE.DoubleSide
    }),
    new THREE.ShaderMaterial({
        vertexShader: gouradVertShader,
        fragmentShader: gouradFragShader,
        uniforms: SphereUniformDataList[1],
        side: THREE.DoubleSide
    }),
    new THREE.ShaderMaterial({
        vertexShader: gouradVertShader,
        fragmentShader: gouradFragShader,
        uniforms: SphereUniformDataList[2],
        side: THREE.DoubleSide
    }),
    new THREE.ShaderMaterial({
        vertexShader: gouradVertShader,
        fragmentShader: gouradFragShader,
        uniforms: SphereUniformDataList[3],
        side: THREE.DoubleSide
    }),
    new THREE.ShaderMaterial({
        vertexShader: gouradVertShader,
        fragmentShader: gouradFragShader,
        uniforms: SphereUniformDataList[4],
        side: THREE.DoubleSide
    }),
    new THREE.ShaderMaterial({
        vertexShader: gouradVertShader,
        fragmentShader: gouradFragShader,
        uniforms: SphereUniformDataList[5],
        side: THREE.DoubleSide
    }),
    new THREE.ShaderMaterial({
        vertexShader: gouradVertShader,
        fragmentShader: gouradFragShader,
        uniforms: SphereUniformDataList[6],
        side: THREE.DoubleSide
    }),
    new THREE.ShaderMaterial({
        vertexShader: gouradVertShader,
        fragmentShader: gouradFragShader,
        uniforms: SphereUniformDataList[7],
        side: THREE.DoubleSide
    }),
    new THREE.ShaderMaterial({
        vertexShader: gouradVertShader,
        fragmentShader: gouradFragShader,
        uniforms: SphereUniformDataList[8],
        side: THREE.DoubleSide
    }),
]