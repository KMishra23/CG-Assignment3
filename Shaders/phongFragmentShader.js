export const phongFragShader = `
// precision mediump float;

varying vec3 normalInterp;
varying vec3 vertPos;

uniform float Ka;
uniform float Kd;
uniform float Ks;
uniform float shininessVal;

uniform vec3 ambientColor;
uniform vec3 diffuseColor;
uniform vec3 specularColor;

uniform int bingLighting[30];
uniform int numLights;
uniform bool blinn;

void main() {
  
  float lambertian = 0.0;
  float specular = 0.0;

  for(int i = 0; i < numLights; i++) {
    vec3 pee = vec3(bingLighting[i*3], bingLighting[i*3 + 1], bingLighting[i*3 + 2]);

    vec3 N = normalize(normalInterp);
    vec3 L = normalize(vec3(viewMatrix*vec4(pee,1.0)) - vertPos);

    float l = max(dot(N, L), 0.0);
    float s = 0.0;
    if(l > 0.0) {
      vec3 V = normalize(-vertPos);
      float specAngle;
      if(blinn) {
        vec3 H = normalize(L + V);
        specAngle = max(dot(N, H), 0.0);
      }
      else {
        vec3 R = reflect(-L, N);
        specAngle = max(dot(R, V), 0.0);
      }
      
      s = pow(specAngle, shininessVal);
    }

    lambertian += l;
    specular += s;
  }

  gl_FragColor = vec4(Ka * ambientColor +
                      Kd * lambertian * diffuseColor +
                      Ks * specular * specularColor, 1.0);
}
`