import { Transform } from "./transform.js"
import { vec3, mat4, vec4, mat3 } from 'https://cdn.skypack.dev/gl-matrix';

export class Camera {
    constructor(eye, up, target, fov, aspect, near, far){
        this.eyeVec = vec3.create()
        this.upVec = vec3.create()
        this.targetVec = vec3.create()

        this.eyeMode0 = [0,0,10]
        this.upMode0 = [0,1,0]
        this.targetMode0 = [0,0,0]

        this.eyeMode1 = [50,0,0]
        this.upMode1 = [0,0,1]
        this.targetMode1 = [0,0,0]

        vec3.set(this.eyeVec, eye[0], eye[1], eye[2])
        vec3.set(this.upVec, up[0], up[1], up[2])
        vec3.set(this.targetVec, target[0], target[1], target[2])

        this.transform = new Transform()

        this.viewMatrix = mat4.create()
        this.calculateViewMatrix()

        this.fov = fov*Math.PI/180
        this.aspect = aspect
        this.near = near
        this.far = far

        this.mode = 0

        this.projectionMatrix = mat4.create()
        this.calculateProjectionMatrix()
    }

    calculateViewMatrix(){
        mat4.lookAt(this.viewMatrix, this.eyeVec, this.targetVec, this.upVec)
        // console.log(this.viewMatrix)
    }

    calculateProjectionMatrix(){
        mat4.perspective(this.projectionMatrix, this.fov, this.aspect, this.near, this.far)
        // console.log(this.projectionMatrix)
    }

    updateFOV(fov) {
        this.fov = fov*Math.PI/180
        this.calculateProjectionMatrix()
    }

    updateNear(near) {
        this.near = near
        this.calculateProjectionMatrix()
    }

    updateFar(far) {
        this.far = far
        this.calculateProjectionMatrix()
    }

    switchMode() {
        if(this.mode == 0) { //switch to lateral view x
            vec3.set(this.eyeVec, this.eyeMode1[0], this.eyeMode1[1], this.eyeMode1[2])
            vec3.set(this.upVec, this.upMode1[0], this.upMode1[1], this.upMode1[2])
            vec3.set(this.targetVec, this.targetMode1[0], this.targetMode1[1], this.targetMode1[2])

            this.calculateViewMatrix()
            // this.calculateProjectionMatrix()

            this.mode = 1
        }
        else if (this.mode == 1) { //switch to top down view
            vec3.set(this.eyeVec, this.eyeMode0[0], this.eyeMode0[1], this.eyeMode0[2])
            vec3.set(this.upVec, this.upMode0[0], this.upMode0[1], this.upMode0[2])
            vec3.set(this.targetVec, this.targetMode0[0], this.targetMode0[1], this.targetMode0[2])

            this.calculateViewMatrix()

            this.mode = 0
        }
    }

}