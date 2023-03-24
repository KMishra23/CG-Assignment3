import { Transform } from "./transform.js";
import { vec3, mat4, vec4, mat3 } from 'https://cdn.skypack.dev/gl-matrix';

// this is the code for generating pacman. It's essentially a circle that has a quarter of it removed
export class Circle {
    constructor(radius, center, color) {
        this.radius = radius;
        this.center = center;
        this.color = color;
        this.type = "circle";

        this.numTriangles = 40; //Number of triangles on the circle if it was full
        this.vertexList = [];

        this.transform = new Transform

        for(var i = 0; i < this.numTriangles; i++) {
            // if(i < 3*this.numTriangles/4) {
                this.vertexList.push(center[0], center[1], center[2]);
                this.vertexList.push(center[0] + radius * Math.cos(2*Math.PI*i/this.numTriangles), center[1] + radius * Math.sin(2*Math.PI*i/this.numTriangles), center[2]);
                this.vertexList.push(center[0] + radius * Math.cos(2*Math.PI*(i+1)/this.numTriangles), center[1] + radius * Math.sin(2*Math.PI*(i+1)/this.numTriangles), center[2]);
            // }
        }  
    }

    getPosition() { //To get the position of the center of any primitve
        this.transform.updateModelTransformMatrix()
        var out = vec3.create()
        var pos = vec3.create()
        vec3.set(pos, this.center[0], this.center[1], this.center[2])
        return vec3.transformMat4(out, pos, this.transform.modelTransformMatrix)
    }

    restoreRotationPoint() {
        this.transform.rotatePoint = [this.center[0], this.center[1], 0];
    }
}