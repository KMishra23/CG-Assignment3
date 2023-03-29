import webglObjLoader from 'https://cdn.skypack.dev/webgl-obj-loader';
import { Transform } from './transform.js';
import { vec3, mat4, vec4, mat3 } from 'https://cdn.skypack.dev/gl-matrix';

export class Model {
    constructor(position, path, name, color) {
        this.center = position
        this.type = name
        this.colorCheck = color
        this.color = [color[0]/255, color[1]/255, color[2]/255, 1]
        this.path = path

        this.transform = new Transform()
        this.transform.setPosition(position[0], position[1], position[2])

        // this.loadModel()
    }

    async loadModel(){
		const response = await fetch(this.path)
		const text = await response.text()
		
        this.mesh = new webglObjLoader.Mesh(text)
        // console.log(this.mesh)
		
        this.vertices= this.mesh.vertices
		this.indices = this.mesh.indices
		// this.vertexNormals = this.mesh.vertexNormals
		
        return true;
	}

	updatePosition(position){
		this.center = position
		this.transform.setPosition(position[0], position[1], position[2])
	}

    getPosition() { //To get the position of the center of any primitve
        this.transform.updateModelTransformMatrix()
        var out = vec3.create()
        var pos = vec3.create()
        vec3.set(pos, this.center[0], this.center[1], this.center[2])
        return vec3.transformMat4(out, pos, this.transform.modelTransformMatrix)
    }

    getScreenPosition(scene) {
        var screenPos = vec3.create()
        var pos = vec3.create()
        pos = this.getPosition()

        vec3.transformMat4(screenPos, pos, scene.camera.viewMatrix)
        vec3.transformMat4(screenPos, screenPos, scene.camera.projectionMatrix)

        var temp = [(screenPos[0]+1)/2 * scene.canvasWidth, (screenPos[1]+1)/2 * scene.canvasHeight, screenPos[2]]

        return temp
    }
}