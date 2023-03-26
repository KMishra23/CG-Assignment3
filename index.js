import { vertexShaderSrc } from "./Shaders/vertexShader.js";
import { fragmentShaderSrc } from "./Shaders/fragmentShader.js"
import { Scene } from "./scene.js";
import { Renderer } from "./renderer.js";
import { Shader } from "./shader.js";
import { Camera } from "./camera.js";
import { Circle } from "./circle.js";
import { Model } from "./model.js";
import { PolygonField } from "./polygonField.js";
import { GameManager } from "./game.js";
import { vec3, mat4, vec4, mat3 } from 'https://cdn.skypack.dev/gl-matrix';
import * as dat from 'https://cdn.skypack.dev/dat.gui';

main();

function main() {
  const canvas = document.querySelector("#glcanvas");
  canvas.width = window.innerWidth-20;
  canvas.height = window.innerHeight-20;
  // Initialize the GL context
  const gl = canvas.getContext("webgl");


  var test = vec4.fromValues(0,0,0,0)
  // console.log(test)

  // Only continue if WebGL is available and working
  if (gl === null) {
    alert(
      "Unable to initialize WebGL. Your browser or machine may not support it."
    );
    return;
  }

  // get the shader source code from the respective files
  var vertexShaderSource = vertexShaderSrc;
  var fragmentShaderSource = fragmentShaderSrc;

  // create a shader, renderer and scene object. Their functionality is explained in their respective files
  const shader = new Shader(gl, vertexShaderSource, fragmentShaderSource);
  const renderer = new Renderer(gl);
  const scene = new Scene(canvas.width, canvas.height);

  // Starts using the created program with webgl
  shader.use()
  // Program creation and shaders compiled


  var near = 0.0001
  var far = 100
  var fov = 90
  var camera = new Camera(
    [0, 0, 10], [0, 1, 0], [0, 0, 0], fov, canvas.width/canvas.height, near, far
  )
  scene.addCamera(camera)


  var field = new PolygonField([0, 0, -5], 15, 10, [1.0, 0.0, 0, 1])
  scene.add(field)

  var model1 = new Model([0, 0, 0], './models/star.obj', "Cube", [0.0, 0.0, 1.0, 1]);
  scene.addModel(model1)
  
  var model2 = new Model([0, 0, 0], './models/Cube.obj', "Character", [0.0, 0.0, 1.0, 1]);
  // scene.addModel(model2)

  model2.transform.setScale(0.5, 0.5, 0.5)

  const gameManager = new GameManager(field, 7, scene)

  const gui = new dat.GUI();

  const transformSettings = {
    fov: 90,
    near: 0.0001,
    far: 100,
    angleX: 0,
    angleY: 0,
    angleZ: 0,
  }

  gui.add(transformSettings, 'fov', 30, 180).step(0.01).onChange(function ()
  {
    scene.camera.updateFOV(transformSettings.fov)
  });

  gui.add(transformSettings, 'near', 0, 50).step(0.01).onChange(function ()
  { 
    scene.camera.updateNear(transformSettings.near)
  });

  gui.add(transformSettings, 'far', 0, 300).step(0.01).onChange(function ()
  {
    scene.camera.updateFar(transformSettings.far)
  });
  gui.add(transformSettings, 'angleX', 0, 2*Math.PI).step(0.01).onChange(function ()
  {
    model1.transform.setQuaternionAngles(transformSettings.angleX, transformSettings.angleY, transformSettings.angleZ)
  });
  gui.add(transformSettings, 'angleY', 0, 2*Math.PI).step(0.01).onChange(function ()
  {
    model1.transform.setQuaternionAngles(transformSettings.angleX, transformSettings.angleY, transformSettings.angleZ)
  });
  gui.add(transformSettings, 'angleZ', 0, 2*Math.PI).step(0.01).onChange(function ()
  {
    model1.transform.setQuaternionAngles(transformSettings.angleX, transformSettings.angleY, transformSettings.angleZ)
  });


  document.addEventListener('keydown', event => {
    if(event.key == "c") {
      scene.camera.switchMode()
    }
    // if(event.key == "1") {
    //   gameManager.field.changeSides(gameManager.field.sides - 1)
    //   gameManager.updatePlayers(gameManager.playerCount)
    // }
    // if(event.key == "2") {
    //   gameManager.field.changeSides(gameManager.field.sides + 1)
    //   gameManager.updatePlayers(gameManager.playerCount)
    // }
    // if(event.key == "9") {
    //   gameManager.updatePlayers(gameManager.playerCount - 1)
    // }
    // if(event.key == "0") {
    //   gameManager.updatePlayers(gameManager.playerCount + 1)
    // }
  })

  renderer.render(scene, shader, true)

  renderer.setAnimationLoop(animation);

  function animation () {
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.enable(gl.CULL_FACE);
    gl.enable(gl.DEPTH_TEST);
    renderer.render(scene, shader, false);
  }
}

