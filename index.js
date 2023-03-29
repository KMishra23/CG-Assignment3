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
import { KeyboardEventManager } from "./keyboardEventManager.js";
import { vec3, mat4, vec4, mat3 } from 'https://cdn.skypack.dev/gl-matrix';
import * as dat from 'https://cdn.skypack.dev/dat.gui';
import webglObjLoader from 'https://cdn.skypack.dev/webgl-obj-loader';


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


  var field = new PolygonField([0, 0, -5], 8, 10, [1.0, 0.0, 0, 1])
  scene.add(field)

  var model1 = new Model([0, 0, 0], './models/moai.obj', "Cube", [0, 255, 0, 1]);
  model1.transform.setScale(3, 3, 3)
  model1.transform.setPosition(0, 0, 0)
  // scene.addModel(model1)
  
  var model2 = new Model([0, 0, 0], './models/Cube.obj', "Character", [0, 0, 255, 1]);
  // scene.addModel(model2)

  model2.transform.setScale(0.5, 0.5, 0.5)

  const gameManager = new GameManager(field, 5, scene)
  var gameStatus = 0
  
  const gui = new dat.GUI();

  const transformSettings = {
    fov: 90,
    near: 0.01,
    far: 100,
    angleX: 0,
    angleY: 0,
    angleZ: 0,
  }

  gui.add(transformSettings, 'fov', 1, 180).step(0.01).onChange(function ()
  {
    scene.camera.updateFOV(transformSettings.fov)
  });

  gui.add(transformSettings, 'near', 0.01, 50).step(0.01).onChange(function ()
  { 
    scene.camera.updateNear(transformSettings.near)
  });

  gui.add(transformSettings, 'far', 0, 300).step(0.01).onChange(function ()
  {
    scene.camera.updateFar(transformSettings.far)
  });
  gui.add(transformSettings, 'angleX', 0, 360).step(0.01).onChange(function ()
  {
    model1.transform.setQuaternionAngles(transformSettings.angleX, transformSettings.angleY, transformSettings.angleZ)
  });
  gui.add(transformSettings, 'angleY', 0, 360).step(0.01).onChange(function ()
  {
    model1.transform.setQuaternionAngles(transformSettings.angleX, transformSettings.angleY, transformSettings.angleZ)
  });
  gui.add(transformSettings, 'angleZ', 0, 360).step(0.01).onChange(function ()
  {
    model1.transform.setQuaternionAngles(transformSettings.angleX, transformSettings.angleY, transformSettings.angleZ)
  });

  const keyboardEventManager = new KeyboardEventManager(scene, gameManager)

  document.addEventListener('keydown', event => {
    keyboardEventManager.KeyDownAction(event)
  })


  var width = 1;
  var height = 1;
  var buf = new Uint8Array(width * height * 4);
  var clicked = false

  var initialClick

  document.addEventListener('mousemove', event => {
    // console.log(event.x)
    if(clicked && gameStatus == 2) {
      // console.log(event.x + " " + event.y)
      // // start dragging the catcher to new position
      var pos = scene.camera.calculateScreenToWorldCoords(event.x, event.y, canvas.width, canvas.height)
      // console.log(pos)
      gameManager.moveCatcherAndPlayer(pos)
    }
  })

  document.addEventListener('mouseup', event => {
    if(gameManager.gameState == 2) gameStatus = gameManager.checkRatioToEndGame()
    clicked = false
  })

  document.addEventListener('mousedown', event => {
    // Get the coordinates of the click
    // var eventLocation = getEventLocation(this,event);
    // Get the data of the pixel according to the location generate by the getEventLocation function
    // var context = canvas.getContext('webgl');
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    const pixelX = x * gl.canvas.width / gl.canvas.clientWidth;
    const pixelY = gl.canvas.height - y * gl.canvas.height / gl.canvas.clientHeight - 1;
    const data = new Uint8Array(4);
    renderer.render(scene, shader, true)
    gl.readPixels(
        pixelX,            // x
        pixelY,            // y
        1,                 // width
        1,                 // height
        gl.RGBA,           // format
        gl.UNSIGNED_BYTE,  // type
        data);             // typed array to hold result
    
    // console.log(data);

    // console.log(event)
    // console.log(event.x + " " + event.y)
    initialClick = scene.camera.calculateScreenToWorldCoords(event.x - 10, event.y - 10, canvas.width, canvas.height)
    // console.log(pos)
    console.log(gameManager.gameState)
    if(gameStatus == 0){ //start the game on click
      gameStatus = gameManager.triggerGameStart(data)
    }
    else if(gameStatus == 1) { // now in rotation and scaling mode, on subsequent click, shift to drag mode 
      // console.log("started already")
      gameManager.gameState = 2
      gameStatus = 2
      gameManager.moveCatcherAndPlayer(initialClick)
    }
    clicked = true
  });


  renderer.render(scene, shader, true)

  renderer.setAnimationLoop(animation);

  function animation () {
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clearColor(220/255, 220/255, 220/255, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.enable(gl.CULL_FACE);
    gl.enable(gl.DEPTH_TEST);
    renderer.render(scene, shader, false);
  }
}

