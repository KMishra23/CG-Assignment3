import * as THREE from 'three';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { cylinderFragShader } from './TextureMapShaders/CylinderMapFragmentShader';
import { cylinderVertShader } from './TextureMapShaders/CylinderMapVertexShader';
import { sphereFragShader } from './TextureMapShaders/SphericalMapFragmentShader';
import { sphereVertShader } from './TextureMapShaders/SphericalMapVertexShader';

export class TextureMapScene {
    constructor() {
        this.enableDisplay = false;
        this.type = "Cylindrical"

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x0065b3);
        this.camera = new THREE.PerspectiveCamera(30, window.innerWidth/ window.innerHeight, 0.1, 1000);
        this.camera.position.z = 50;
        this.camera.position.x = 0;
        this.camera.position.y = 0;

        this.ambLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.ambLight.castShadow = true;
        this.scene.add(this.ambLight);

        this.spotLight = new THREE.SpotLight(0xffffff, 1);
        this.spotLight.castShadow = true;
        this.spotLight.position.set(0, 64, 32);
        this.scene.add(this.spotLight);

        this.cylinderData = {
            color1: { value: new THREE.Color(0xff3333) },
            color2: { value: new THREE.Color(0x00cc00) },
            color3: { value: new THREE.Color(0xff00ff) },
            color4: { value: new THREE.Color(0xffff00) },
            repeat: { value: new THREE.Vector2(4, 4) },
        }
          
        this.sphereData = {
            color1: { value: new THREE.Color(0xff3333) },
            color2: { value: new THREE.Color(0x00cc00) },
            color3: { value: new THREE.Color(0xff00ff) },
            color4: { value: new THREE.Color(0xffff00) },
            repeat: { value: new THREE.Vector2(4, 4) },
        }

        this.cylinderShader = new THREE.ShaderMaterial(
            {
              vertexShader: cylinderVertShader,
              fragmentShader: cylinderFragShader,
              uniforms: this.cylinderData
            }
        )
          
        this.sphereShader = new THREE.ShaderMaterial(
            {
              vertexShader: sphereVertShader,
              fragmentShader: sphereFragShader,
              uniforms: this.sphereData
            }
        )

        this.cylinderMaterial = new THREE.ShaderMaterial(this.cylinderShader);
        this.sphereMaterial = new THREE.ShaderMaterial(this.sphereShader);

        this.currentMaterial = this.cylinderMaterial;

        var cylinder = new THREE.CylinderGeometry(1, 1, 5);
        var mesh1 = new THREE.Mesh(cylinder, this.currentMaterial);
        mesh1.position.set(0,2,1);
        this.scene.add(mesh1);
        
        var sphere = new THREE.SphereGeometry(3);
        var mesh2 = new THREE.Mesh(sphere, this.currentMaterial);
        mesh2.position.set(5,5,4);
        this.scene.add(mesh2);
        
        var box = new THREE.BoxGeometry(3, 3, 3);
        var mesh3 = new THREE.Mesh(box, this.currentMaterial);
        mesh3.position.set(-5,5,4);
        this.scene.add(mesh3);
      
        var tetra = new THREE.TetrahedronGeometry(5, 0);
        var mesh4 = new THREE.Mesh(tetra, this.currentMaterial);
        mesh4.position.set(10, -5, 0);
        this.scene.add(mesh4);

        var plane = new THREE.BoxGeometry(100, 3, 100);
        const material = new THREE.MeshPhongMaterial( { color: 0x848384} );
        var mesh5 = new THREE.Mesh(plane, material);
        mesh5.rotateX(40 * Math.PI/180)
        // mesh5.rotateY(45 * Math.PI/180)
        mesh5.position.y = -20
        this.scene.add(mesh5)

        var teapot;

        const loader = new OBJLoader();
        loader.load(
            './teapot.obj',
            
            function(object) {
                teapot = object
                // console.log(object)
            }
        )

        this.meshList = [mesh1, mesh2, mesh3, mesh4, mesh5]
    }

    changeTextureMapping() {
        if(this.type == "Cylindrical") {
            this.currentMaterial = this.sphereMaterial
            this.type = "Spherical"
        }
        else if(this.type == "Spherical") {
            this.currentMaterial = this.cylinderMaterial
            this.type = "Cylindrical"
        }
        
        this.meshList[0].material = this.currentMaterial
        this.meshList[1].material = this.currentMaterial
        this.meshList[2].material = this.currentMaterial
        this.meshList[3].material = this.currentMaterial
    }

    display() {
        this.meshList[0].rotation.y += 0.01
        this.meshList[0].rotation.x += 0.01

        this.meshList[1].rotation.y += 0.01
        this.meshList[1].rotation.x += 0.01

        this.meshList[2].rotation.y += 0.01
        this.meshList[2].rotation.x += 0.01

        this.meshList[3].rotation.y += 0.01
        this.meshList[3].rotation.x += 0.01

        // console.log("help")
    }
}