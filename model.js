import webglObjLoader from 'https://cdn.skypack.dev/webgl-obj-loader';
import { Transform } from './transform.js';

export class Model {
    constructor(position, path, name, color) {
        this.center = position
        this.type = name
        this.color = color
        this.path = path

        this.transform = new Transform()
        this.transform.setPosition(position[0], position[1], position[2])

        // this.loadModel()
    }
    async loadModel(){
		const response = await fetch(this.path)
		const text = await response.text()
		
        this.mesh = new webglObjLoader.Mesh(text)
		
        this.vertices= this.mesh.vertices
		this.indices = this.mesh.indices
		// this.vertexNormals = this.mesh.vertexNormals
		
        return true;
	}
	updatePosition(position){
		this.center = position
		this.transform.setPosition(position[0], position[1], position[2])
	}
}