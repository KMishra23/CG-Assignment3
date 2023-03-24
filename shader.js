export class Shader{
    constructor(gl, vertexShaderSrc, fragmentShaderSrc) {
        // passes the gl context to the shader class
        this.gl = gl;
        this.vertexShaderSrc = vertexShaderSrc;
        this.fragmentShaderSrc = fragmentShaderSrc;

        // Compile the shaders from the source code
        this.vertexShader = this.createShader(this.gl.VERTEX_SHADER, vertexShaderSrc);
        this.fragmentShader= this.createShader(this.gl.FRAGMENT_SHADER, fragmentShaderSrc);
        
        // Create the program, attach shaders to it
        this.program = this.createProgram(this.vertexShader, this.fragmentShader);
        
        // Creates a position buffer for future purpose
        this.positionBuffer = gl.createBuffer();
        this.indexBuffer = gl.createBuffer();
        this.colorBuffer = gl.createBuffer();
    }

    createShader(type, source) {
        const shader = this.gl.createShader(type);
        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);
        var success = this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS);
        if(success) {
          return shader;
        }
        console.log("Shader error, type:", type)
        console.log(this.gl.getShaderInfoLog(shader));
        this.gl.deleteShader(shader);  
    }

    createProgram(vertexShader, fragmentShader) {
        const program = this.gl.createProgram();
        this.gl.attachShader(program, vertexShader);
        this.gl.attachShader(program, fragmentShader);
        this.gl.linkProgram(program);
        var success = this.gl.getProgramParameter(program, this.gl.LINK_STATUS);
        if(success) {
          return program;
        }
      
        console.log(this.gl.getProgramLogInfo(program));
        this.gl.deleteProgram(program);
    }

    use() {
        this.gl.useProgram(this.program)
    }

    setUniform2f(uniformName, vec2) {
        // This looks for a uniform with the specified name in the shaders that are in the progran and sets the values to it.
        const uniformLoc = this.gl.getUniformLocation(this.program, uniformName);
        this.gl.uniform2f(this.gl.getUniformLocation(this.program, uniformName), vec2[0], vec2[1]);
    }

    setUniform4f(uniformName, vec4) {
        const uniformLoc = this.gl.getUniformLocation(this.program, uniformName);
        this.gl.uniform4f(uniformLoc, vec4[0], vec4[1], vec4[2], vec4[3]);
    }

    setUniformMatrix4fv(uniformName, mat4) {
        const uniformLoc = this.gl.getUniformLocation(this.program, uniformName);
        this.gl.uniformMatrix4fv(uniformLoc, false, mat4);
    }

    bindBuffer(data, buffer) {
        // This takes a specified buffer and binds the data supplied to it. In this case, its only the vertex data. 
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(data), this.gl.DYNAMIC_DRAW);
    }

    bindIndexBuffer(data, buffer) {
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, buffer);
		this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(data), this.gl.DYNAMIC_DRAW);
    }

    fillAttributeData(attribName, size, type, normalize, stride, offset) {
        // We then fill the attribute data here, specify its size, type, stride, etc and to which attribute its going to.
        this.gl.enableVertexAttribArray(this.gl.getAttribLocation(this.program, attribName));
        this.gl.vertexAttribPointer(this.gl.getAttribLocation(this.program, attribName), size, type, normalize, stride, offset);
    }

    drawArrays(primitiveType, numElements) {
        this.gl.drawArrays(primitiveType, 0, numElements);
    }

    drawElements(count) {
        this.gl.drawElements(this.gl.TRIANGLES, count, this.gl.UNSIGNED_SHORT, 0)
    }
}