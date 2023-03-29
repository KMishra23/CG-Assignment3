// this one is supposed to store all the primitives on the scene.

export class Scene {
    constructor (width, height) {
        // Creates a primitive list and canvas size
        this.primitives = []
        this.models = []
        this.arrows = []
        this.canvasWidth = width;
        this.canvasHeight = height;
    }

    add(primitive) {
        if(this.primitives && primitive) {
            this.primitives.push(primitive)
            // console.log(primitive.type + " was added to the scene")
        }
    }

    async addModel(model) {
        const response = await model.loadModel()
        // console.log(response)
        if(this.models && model) {
            this.models.push(model)
            // console.log(model.type + " was added to the scene")
        }  
    }

    async addArrow(model) {
        const response = await model.loadModel()
        // console.log(response)
        if((this.models && model) && (this.arrows && model)) {
            this.arrows.push(model)
            // this.models.push(model)
            // console.log(model.type + " was added to the scene")
        }  
    }

    addCamera(camera) {
        this.camera = camera;
    }

    deletePrimitive(primitive) {
        if(this.primitives && primitive) {
            let i = this.primitives.indexOf(primitive);
            if(i > -1) {
                // console.log("Deleted")
                this.primitives.splice(i, 1);
            }
        }
    }

    deleteModel(model) {
        if(this.models && model) {
            let i = this.models.indexOf(model);
            if(i > -1) {
                // console.log("Deleted")
                this.models.splice(i, 1);
            }
        }
    }

    clearArrows() {
        this.arrows = []
    }
}