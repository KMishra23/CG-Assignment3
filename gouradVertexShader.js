export const gouradVertShader = `
// attribute vec3 position;
// attribute vec3 normal;
// uniform mat4 projection, modelview, normalMat;

varying vec3 normalInterp;
varying vec3 vertPos;

uniform float Ka;
uniform float Kd;
uniform float Ks;
uniform float shininessVal;

uniform vec3 ambientColor;
uniform vec3 diffuseColor;
uniform vec3 specularColor;
uniform vec3 lightPos;

uniform int bingLighting[30];
uniform int numLights;

varying vec4 color;

void main(){
  vec4 vertPos4 = modelViewMatrix * vec4(position, 1.0);
  vertPos = vec3(vertPos4) / vertPos4.w;
  normalInterp = normalMatrix * normal;
  gl_Position = projectionMatrix * vertPos4; 

  vec3 N = normalize(normalInterp);
  vec3 L = normalize(lightPos - vertPos);

  float lambertian = max(dot(N, L), 0.0);
  float specular = 0.0;
  if(lambertian > 0.0) {
    vec3 R = reflect(-L, N);
    vec3 V = normalize(-vertPos);
    float specAngle = max(dot(R, V), 0.0);
    specular = pow(specAngle, shininessVal);
  }

  color = vec4(Ka * ambientColor +
               Kd * lambertian * diffuseColor +
               Ks * specular * specularColor, 1.0);
}
`