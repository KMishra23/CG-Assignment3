export const cylinderFragShader = `
uniform vec3 color1;
uniform vec3 color2;
uniform vec3 color3;
uniform vec3 color4;

uniform vec2 repeat;
varying vec3 vPos;

precision mediump float;

void main() {
    vec3 position = normalize(vPos.xyz);
    vec2 uv = vec2(atan(position.y, position.x), position.z) * repeat;
    float u = uv.x;
    float v = uv.y;

    if(mod(floor(u) + floor(v), 4.0) == 0.0) {
        gl_FragColor = vec4(color1, 1.0);
    } else if(mod(floor(u) + floor(v), 4.0) == 1.0) {
        gl_FragColor = vec4(color2, 1.0);
    } else if(mod(floor(u) + floor(v), 4.0) == 2.0) {
        gl_FragColor = vec4(color3, 1.0);
    } else {
        gl_FragColor = vec4(color4, 1.0);
    }

}`