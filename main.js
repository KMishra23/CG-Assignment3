import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as dat from 'https://cdn.skypack.dev/dat.gui';
import { SpheresScene } from './SceneSpheres';
import { TextureMapScene } from './SceneTextureMap';


const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const spheresScene = new SpheresScene()
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


gui.add(sceneOptions, "Scene", ["Shading Spheres", "Texture Mapping", "Test"]).onChange(() => {
    if(sceneOptions.Scene == "Shading Spheres") {
        gui.removeFolder(texturesMenu)
        spheresMenu = gui.addFolder("Spheres Controls")
        spheresMenu.add(shadingOptions, "Shader", ["Gourad", "Phong"]).onChange(() => {
            spheresScene.swapShader(shadingOptions.Shader)
            currentShading = shadingOptions.Shader
        });

        currentScene = spheresScene.scene
        currentCamera = spheresScene.camera
        control = new OrbitControls(currentCamera, renderer.domElement)
    }
    else if(sceneOptions.Scene == "Texture Mapping") {
        gui.removeFolder(spheresMenu)
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
            currentShading = "Gourad"
        }
        else {
            spheresScene.swapShader("Phong")
            currentShading = "Phong"
        }
    }
    if(event.key == "a") {
        spheresScene.changeLocalIllumModel()
    }
    if(event.key == "t") {
        textureScene.changeTextureMapping()
    }
})

function animate() {
	requestAnimationFrame( animate );

    control.update();

    if(sceneOptions.Scene == "Texture Mapping" && textureScene.enableDisplay) textureScene.display()

	renderer.render( currentScene, currentCamera );
}
animate();

