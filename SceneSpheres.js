import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { SpheresMaterialListPhong } from './SpheresShaderMaterialData';
import { SpheresMaterialListGourad } from './SpheresShaderMaterialData';

export class SpheresScene {
    constructor() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x0065b3);
        this.camera = new THREE.PerspectiveCamera(30, window.innerWidth/ window.innerHeight, 0.1, 1000);
        this.camera.position.z = 170;

        this.sphereGeo = new THREE.SphereGeometry(10, 30, 30);

        this.spheresList = []
        this.positionsList = [
            [-30, -30], [0, -30], [30, -30],
            [-30, 0], [0, 0], [30, 0],
            [-30, 30], [0, 30], [30, 30]
        ]

        for(var i = 0; i < 9; i++) {
            const sphere = new THREE.Mesh(this.sphereGeo, SpheresMaterialListPhong[i]);
            sphere.position.x = this.positionsList[i][0];
            sphere.position.y = this.positionsList[i][1];

            this.scene.add(sphere);
            this.spheresList.push(sphere);
        }

    }

    swapShader(type) {
        for(var i = 0; i < 9; i++) {
            this.scene.remove(this.spheresList[i])
        }

        if(type == "Gourad") {
            this.spheresList = []
            for(var i = 0; i < 9; i++) {
                const sphere = new THREE.Mesh(this.sphereGeo, SpheresMaterialListGourad[i]);
                sphere.position.x = this.positionsList[i][0];
                sphere.position.y = this.positionsList[i][1];

                this.scene.add(sphere);
                this.spheresList.push(sphere);
            }
        }
        else if(type == "Phong") {
            this.spheresList = []
            for(var i = 0; i < 9; i++) {
                const sphere = new THREE.Mesh(this.sphereGeo, SpheresMaterialListPhong[i]);
                sphere.position.x = this.positionsList[i][0];
                sphere.position.y = this.positionsList[i][1];

                this.scene.add(sphere);
                this.spheresList.push(sphere);
            }
        }
    }
}