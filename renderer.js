// this is where we get all the primitives from the scene, then render them all in the animation loop

export class Renderer {
    constructor(gl) {
        // Pass the gl context to the renderer
        this.gl = gl;
        // this.program = program;
        // this.positionBuffer = this.gl.createBuffer();
    }

    setAnimationLoop(animation) {
        function renderLoop() {
            animation();
            window.requestAnimationFrame(renderLoop);
        }

        renderLoop();
    }

    render(scene, shader, flag) {
        scene.primitives.forEach(function(primitive) {
            // Update camera transform matrix
            scene.camera.transform.updateModelTransformMatrix()
            shader.setUniformMatrix4fv("view_matrix", scene.camera.viewMatrix)
            shader.setUniformMatrix4fv("projection_matrix", scene.camera.projectionMatrix)
            
            // Update the transform matrix
            primitive.transform.updateModelTransformMatrix();
            shader.setUniformMatrix4fv("u_model_matrix", primitive.transform.modelTransformMatrix);
            shader.bindBuffer(primitive.vertexList, shader.positionBuffer);
        
            var size = 3;
            var type = shader.gl.FLOAT;
            var normalize = false;
            var stride = 0;
            var offset = 0;
            shader.fillAttributeData("a_position", size, type, normalize, stride, offset);

            shader.setUniform4f("u_color", primitive.color);

            var primitiveType = shader.gl.TRIANGLES;
            var count = primitive.vertexList.length / 3;
            shader.drawArrays(primitiveType, count);
        })
        scene.models.forEach(function(model) {
            // console.log(model.type)
            scene.camera.transform.updateModelTransformMatrix()
            shader.setUniformMatrix4fv("view_matrix", scene.camera.viewMatrix)
            shader.setUniformMatrix4fv("projection_matrix", scene.camera.projectionMatrix)

            model.transform.updateModelTransformMatrix()
            shader.setUniformMatrix4fv("u_model_matrix", model.transform.modelTransformMatrix);
            shader.bindBuffer(model.vertices, shader.positionBuffer);
        
            var size = 3;
            var type = shader.gl.FLOAT;
            var normalize = false;
            var stride = 3*model.vertices.BYTES_PER_ELEMENT;
            var offset = 0;
            shader.fillAttributeData("a_position", size, type, normalize, stride, offset);

            shader.bindIndexBuffer(model.indices, shader.indexBuffer)

            shader.setUniform4f("u_color", model.color);

            var count = model.indices.length;
            shader.drawElements(count);
        })
        scene.arrows.forEach(function(model) {
            // console.log(model.type)
            scene.camera.transform.updateModelTransformMatrix()
            shader.setUniformMatrix4fv("view_matrix", scene.camera.viewMatrix)
            shader.setUniformMatrix4fv("projection_matrix", scene.camera.projectionMatrix)

            model.transform.updateModelTransformMatrix()
            shader.setUniformMatrix4fv("u_model_matrix", model.transform.modelTransformMatrix);
            shader.bindBuffer(model.vertices, shader.positionBuffer);
        
            var size = 3;
            var type = shader.gl.FLOAT;
            var normalize = false;
            var stride = 3*model.vertices.BYTES_PER_ELEMENT;
            var offset = 0;
            shader.fillAttributeData("a_position", size, type, normalize, stride, offset);

            shader.bindIndexBuffer(model.indices, shader.indexBuffer)

            shader.setUniform4f("u_color", model.color);

            var count = model.indices.length;
            shader.drawElements(count);
        })
    }
}