import * as THREE from 'three';
import { SpheresUniformData } from './SpheresUniformData';

export class SpheresScene {
    constructor() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x0065b3);
        this.camera = new THREE.PerspectiveCamera(30, window.innerWidth/ window.innerHeight, 0.1, 10000);
        this.camera.position.z = 170;

        this.sphereGeo = new THREE.SphereGeometry(10, 30, 30);

        this.spheresList = []
        this.positionsList = [
            [-30, -30], [0, -30], [30, -30],
            [-30, 0], [0, 0], [30, 0],
            [-30, 30], [0, 30], [30, 30]
        ]  

        this.spheresData = new SpheresUniformData

        this.phongMaterials = this.spheresData.spheresMaterialsPhong
        this.gouradMaterials = this.spheresData.spheresMaterialsGourad

        for(var i = 0; i < 9; i++) {
            const sphere = new THREE.Mesh(this.sphereGeo, this.phongMaterials[i]);
            sphere.position.x = this.positionsList[i][0];
            sphere.position.y = this.positionsList[i][1];

            this.scene.add(sphere);
            this.spheresList.push(sphere);
        }
        this.type = "Phong"
    }

    swapShader(type) {
        for(var i = 0; i < 9; i++) {
            this.scene.remove(this.spheresList[i])
        }

        if(type == "Gourad") {
            this.spheresList = []
            for(var i = 0; i < 9; i++) {
                const sphere = new THREE.Mesh(this.sphereGeo, this.gouradMaterials[i]);
                sphere.position.x = this.positionsList[i][0];
                sphere.position.y = this.positionsList[i][1];

                this.scene.add(sphere);
                this.spheresList.push(sphere);
            }
            this.type = "Gourad"
        }
        else if(type == "Phong") {
            this.spheresList = []
            for(var i = 0; i < 9; i++) {
                const sphere = new THREE.Mesh(this.sphereGeo, this.phongMaterials[i]);
                sphere.position.x = this.positionsList[i][0];
                sphere.position.y = this.positionsList[i][1];

                this.scene.add(sphere);
                this.spheresList.push(sphere);
            }
            this.type = "Phong"
        }
    }

    changeLocalIllumModel() {
        this.spheresData.swapLocalIlluminationModel()

        this.phongMaterials = this.spheresData.spheresMaterialsPhong
        this.gouradMaterials = this.spheresData.spheresMaterialsGourad

        for(var i = 0; i < 9; i++) {
            this.scene.remove(this.spheresList[i])
        }
        this.spheresList = []

        if(this.type == "Phong") {
            for(var i = 0; i < 9; i++) {
                const sphere = new THREE.Mesh(this.sphereGeo, this.phongMaterials[i]);
                sphere.position.x = this.positionsList[i][0];
                sphere.position.y = this.positionsList[i][1];

                this.scene.add(sphere);
                this.spheresList.push(sphere);
            }
        }
        else if(this.type == "Gourad") {
            for(var i = 0; i < 9; i++) {
                const sphere = new THREE.Mesh(this.sphereGeo, this.gouradMaterials[i]);
                sphere.position.x = this.positionsList[i][0];
                sphere.position.y = this.positionsList[i][1];

                this.scene.add(sphere);
                this.spheresList.push(sphere);
            }
        }

        // console.log(this.phongMaterials)
    }

    changeNumberOfLights() {
        this.spheresData.changeNumberOfLight()
        // console.log("ye")

        this.phongMaterials = this.spheresData.spheresMaterialsPhong
        this.gouradMaterials = this.spheresData.spheresMaterialsGourad

        for(var i = 0; i < 9; i++) {
            this.scene.remove(this.spheresList[i])
        }
        this.spheresList = []

        if(this.type == "Phong") {
            for(var i = 0; i < 9; i++) {
                const sphere = new THREE.Mesh(this.sphereGeo, this.phongMaterials[i]);
                sphere.position.x = this.positionsList[i][0];
                sphere.position.y = this.positionsList[i][1];

                this.scene.add(sphere);
                this.spheresList.push(sphere);
            }
        }
        else if(this.type == "Gourad") {
            for(var i = 0; i < 9; i++) {
                const sphere = new THREE.Mesh(this.sphereGeo, this.gouradMaterials[i]);
                sphere.position.x = this.positionsList[i][0];
                sphere.position.y = this.positionsList[i][1];

                this.scene.add(sphere);
                this.spheresList.push(sphere);
            }
        }
    }
}