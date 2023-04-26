export const phongVertShader = `
// attribute vec3 position;
// attribute vec3 normal;

// uniform mat4 projection, modelview, normalMat;

varying vec3 normalInterp;
varying vec3 vertPos;

void main(){
  vec4 vertPos4 = modelViewMatrix * vec4(position, 1.0);
  vertPos = vec3(vertPos4) / vertPos4.w;
  normalInterp = normalMatrix * normal;
  gl_Position = projectionMatrix * vertPos4; 
}
`