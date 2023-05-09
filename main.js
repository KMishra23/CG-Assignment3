import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as dat from 'https://cdn.skypack.dev/dat.gui';
import { Scenes } from './SceneSpheres';
import { TextureMapScene } from './SceneTextureMap';


const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const spheresScene = new Scenes(0)
const cylinderScene = new Scenes(1)

const textureScene = new TextureMapScene()

var currentCamera = spheresScene.camera
var currentScene = spheresScene.scene

var control = new OrbitControls(currentCamera, renderer.domElement)

const gui = new dat.GUI();

let shadingOptions = {
    Shader: "Phong"
};

let sceneOptions = {
    Scene: "Shading Spheres"
}

let check = {
    RotateObjects: false
};

var flagTex = 0
var flagSph = 1
var flagCyl = 0
gui.add(sceneOptions, "Scene", ["Shading Spheres", "Shading Cylinder", "Texture Mapping", "Test"]).onChange(() => {
    if(sceneOptions.Scene == "Shading Spheres") {

        if(flagTex) gui.removeFolder(texturesMenu)
        if(flagCyl) gui.removeFolder(cylinderMenu)
        flagTex = 0
        flagSph = 1
        flagCyl = 0
        spheresMenu = gui.addFolder("Spheres Controls")
        spheresMenu.add(shadingOptions, "Shader", ["Gourad", "Phong"]).onChange(() => {
            spheresScene.swapShader(shadingOptions.Shader)
            currentShading = shadingOptions.Shader
        });

        currentScene = spheresScene.scene
        currentCamera = spheresScene.camera
        control = new OrbitControls(currentCamera, renderer.domElement)
    }
    else if(sceneOptions.Scene == "Shading Cylinder") {

        if(flagTex) gui.removeFolder(texturesMenu)
        if(flagSph) gui.removeFolder(spheresMenu)
        flagTex = 0
        flagSph = 0
        flagCyl = 1
        cylinderMenu = gui.addFolder("Cylinder Controls")
        cylinderMenu.add(shadingOptions, "Shader", ["Gourad", "Phong"]).onChange(() => {
            cylinderScene.swapShader(shadingOptions.Shader)
            currentShading = shadingOptions.Shader
        });

        currentScene = cylinderScene.scene
        currentCamera = cylinderScene.camera
        control = new OrbitControls(currentCamera, renderer.domElement)
    }
    else if(sceneOptions.Scene == "Texture Mapping") {

        if(flagSph) gui.removeFolder(spheresMenu)
        if(flagCyl) gui.removeFolder(cylinderMenu)
        flagTex = 1
        flagSph = 0
        flagCyl = 0
        texturesMenu = gui.addFolder("Texture Controls")
        texturesMenu.add(check, 'RotateObjects').onChange(() => {
            textureScene.enableDisplay = check.RotateObjects
        })
        currentCamera = textureScene.camera
        currentScene = textureScene.scene
        control = new OrbitControls(currentCamera, renderer.domElement)
    }
    else if(sceneOptions.Scene == "Test") {
        // gui.removeFolder(spheresMenu)
        // currentScene = scene
        // currentCamera = camera
        // control = new OrbitControls(currentCamera, renderer.domElement)
    }
});

var texturesMenu;
var spheresMenu;
var cylinderMenu;

// var texturesMenu = gui.addFolder("Texture Controls")
// texturesMenu.add(check, 'RotateObjects').onChange(() => {
//     textureScene.enableDisplay = check.RotateObjects
// })

spheresMenu = gui.addFolder("Spheres Control")
spheresMenu.add(shadingOptions, "Shader", ["Gourad", "Phong"]).onChange(() => {
    spheresScene.swapShader(shadingOptions.Shader)
    currentShading = shadingOptions.Shader
});

var currentShading = "Phong"

document.addEventListener('keydown', event => {
    if(event.key == "s") {
        if(currentShading == "Phong"){
            spheresScene.swapShader("Gourad")
            cylinderScene.swapShader("Gourad")
            currentShading = "Gourad"
        }
        else {
            spheresScene.swapShader("Phong")
            cylinderScene.swapShader("Phong")
            currentShading = "Phong"
        }
    }
    if(event.key == "a") {
        spheresScene.changeLocalIllumModel()
        cylinderScene.changeLocalIllumModel()
    }
    if(event.key == "t") {
        textureScene.changeTextureMapping()
    }
    if(event.key == "l") {
        spheresScene.changeNumberOfLights()
        cylinderScene.changeNumberOfLights()
    }
})

function animate() {
	requestAnimationFrame( animate );

    control.update();

    if(sceneOptions.Scene == "Texture Mapping" && textureScene.enableDisplay) textureScene.display()

	renderer.render( currentScene, currentCamera );
}
animate();

