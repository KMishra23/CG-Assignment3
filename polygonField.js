import { Transform } from "./transform.js";

export class PolygonField {
    constructor(center, sides, length, color) {
        this.length = length
        this.center = center
        this.color = color
        this.type = "Polygon Field"
        
        this.sides = sides
        var centerAngle = 2*Math.PI/sides
        this.vertexList = [];
        this.cornerList = []

        this.zOffset = 1

        this.transform = new Transform()

        for(var i = 0; i < sides; i++) {
            this.vertexList.push(center[0], center[1], center[2]-this.zOffset);
            this.vertexList.push(center[0] + length * Math.cos(i*centerAngle), center[1] + length * Math.sin(i*centerAngle), center[2]-this.zOffset);
            this.vertexList.push(center[0] + length * Math.cos((i+1)*centerAngle), center[1] + length * Math.sin((i+1)*centerAngle), center[2]-this.zOffset);

            this.cornerList.push([center[0] + length * Math.cos(i*centerAngle), center[1] + length * Math.sin(i*centerAngle), center[2]])

            this.vertexList.push(center[0], center[1], center[2]-this.zOffset-2);
            this.vertexList.push(center[0] + length * Math.cos(i*centerAngle), center[1] + length * Math.sin(i*centerAngle), center[2]-this.zOffset-2);
            this.vertexList.push(center[0] + length * Math.cos((i+1)*centerAngle), center[1] + length * Math.sin((i+1)*centerAngle), center[2]-this.zOffset);

            this.vertexList.push(center[0] + length * Math.cos(i*centerAngle), center[1] + length * Math.sin(i*centerAngle), center[2]-this.zOffset);
            this.vertexList.push(center[0] + length * Math.cos(i*centerAngle), center[1] + length * Math.sin(i*centerAngle), center[2]-this.zOffset-2);
            this.vertexList.push(center[0] + length * Math.cos((i+1)*centerAngle), center[1] + length * Math.sin((i+1)*centerAngle), center[2]-this.zOffset);
            
            this.vertexList.push(center[0] + length * Math.cos(i*centerAngle), center[1] + length * Math.sin(i*centerAngle), center[2]-this.zOffset-2);
            this.vertexList.push(center[0] + length * Math.cos((i+1)*centerAngle), center[1] + length * Math.sin((i+1)*centerAngle), center[2]-this.zOffset-2);
            this.vertexList.push(center[0] + length * Math.cos((i+1)*centerAngle), center[1] + length * Math.sin((i+1)*centerAngle), center[2]-this.zOffset);
        }

    }

    changeSides(sides) {
        this.sides = sides
        var centerAngle = 2*Math.PI/sides

        this.vertexList = []
        this.cornerList = []

        for(var i = 0; i < sides; i++) {
            this.vertexList.push(this.center[0], this.center[1], this.center[2]-this.zOffset);
            this.vertexList.push(this.center[0] + this.length * Math.cos(i*centerAngle), this.center[1] + this.length * Math.sin(i*centerAngle), this.center[2]-this.zOffset);
            this.vertexList.push(this.center[0] + this.length * Math.cos((i+1)*centerAngle), this.center[1] + this.length * Math.sin((i+1)*centerAngle), this.center[2]-this.zOffset);

            this.cornerList.push([this.center[0] + this.length * Math.cos(i*centerAngle), this.center[1] + this.length * Math.sin(i*centerAngle), this.center[2]])

            this.vertexList.push(this.center[0], this.center[1], this.center[2]-this.zOffset-2);
            this.vertexList.push(this.center[0] + this.length * Math.cos(i*centerAngle), this.center[1] + this.length * Math.sin(i*centerAngle), this.center[2]-this.zOffset-2);
            this.vertexList.push(this.center[0] + this.length * Math.cos((i+1)*centerAngle), this.center[1] + this.length * Math.sin((i+1)*centerAngle), this.center[2]-this.zOffset);

            this.vertexList.push(this.center[0] + this.length * Math.cos(i*centerAngle), this.center[1] + this.length * Math.sin(i*centerAngle), this.center[2]-this.zOffset);
            this.vertexList.push(this.center[0] + this.length * Math.cos(i*centerAngle), this.center[1] + this.length * Math.sin(i*centerAngle), this.center[2]-this.zOffset-2);
            this.vertexList.push(this.center[0] + this.length * Math.cos((i+1)*centerAngle), this.center[1] + this.length * Math.sin((i+1)*centerAngle), this.center[2]-this.zOffset);
            
            this.vertexList.push(this.center[0] + this.length * Math.cos(i*centerAngle), this.center[1] + this.length * Math.sin(i*centerAngle), this.center[2]-this.zOffset-2);
            this.vertexList.push(this.center[0] + this.length * Math.cos((i+1)*centerAngle), this.center[1] + this.length * Math.sin((i+1)*centerAngle), this.center[2]-this.zOffset-2);
            this.vertexList.push(this.center[0] + this.length * Math.cos((i+1)*centerAngle), this.center[1] + this.length * Math.sin((i+1)*centerAngle), this.center[2]-this.zOffset);
        }
    }
}