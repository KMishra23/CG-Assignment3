export const vertexShaderSrc = `  
	
	attribute vec3 a_position;
	uniform mat4 u_model_matrix;
	uniform mat4 view_matrix;
	uniform mat4 projection_matrix;

	void main () {             
		gl_Position = projection_matrix * view_matrix * u_model_matrix * vec4(a_position, 1);
	}
`;