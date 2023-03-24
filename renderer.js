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
            // Set to the uniform in the vertex shader
            shader.setUniformMatrix4fv("u_model_matrix", primitive.transform.modelTransformMatrix);
            // Add the vertexList for the primitive to the position buffer of the shader object
            shader.bindBuffer(primitive.vertexList, shader.positionBuffer);
        
            // Read 3 vertices at a time
            var size = 3;
            var type = shader.gl.FLOAT;
            var normalize = false;
            var stride = 0;
            var offset = 0;
            // Fill the attribute for vertex positions and how its supposed to be read in the shader
            shader.fillAttributeData("a_position", size, type, normalize, stride, offset);

            // Pass the canvas dimensions to the uniform so that pixel space can be converted to clip space in the shader
            shader.setUniform2f("u_resolution",[scene.canvasWidth, scene.canvasHeight]);
            
            // Set the color uniform in the fragment shader
            shader.setUniform4f("u_color", primitive.color);

            // Specify that we need to draw triangles
            var primitiveType = shader.gl.TRIANGLES;
            // Number of triangles supplied by the vertexlist
            var count = primitive.vertexList.length / 3;
            shader.drawArrays(primitiveType, count);
            // gl.drawArrays(primitiveType, offset, count);
        })
    }
}