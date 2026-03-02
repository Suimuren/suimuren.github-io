// Import the necessary modules from three.js
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";
import { OBJLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/OBJLoader.js';
import { FBXLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/FBXLoader.js';

// Create a Three.js scene
const scene = new THREE.Scene();

// Create a camera, which determines what we'll see when we render the scene
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5; // Position the camera slightly away from the origin

// Create a renderer and attach it to the DOM // 将渲染器附加到DOM
const renderer = new THREE.WebGLRenderer({ alpha: true });
document.getElementById("container3D").style.position = "absolute";
//document.getElementById("container3D").style.left = "25%"; // 靠左边对齐！！！！
document.getElementById("container3D").style.top = "0"; // 靠上对齐！！！！
document.getElementById("container3D").appendChild(renderer.domElement);


// 设置渲染器的宽度
renderer.setSize(window.innerWidth / 2, window.innerHeight);
renderer.setPixelRatio(3) // 调整清晰度的


// Add lights to the scene 灯光1
const topLight = new THREE.DirectionalLight(0xffffff, 2); // (color, intensity)
topLight.position.set(10, 10, 10) //top-left-ish
topLight.castShadow = false;
scene.add(topLight);

// Add a second directional light from a different angle 灯光2
const directionalLight2 = new THREE.DirectionalLight(0xffffff, 2);
directionalLight2.position.set(0, -10, -50);
directionalLight2.castShadow = true;
scene.add(directionalLight2);

// Add ambient light 灯光3
const ambientLight = new THREE.AmbientLight(0x404040); // Soft white light
scene.add(ambientLight);

// Add a point light to illuminate the model from all directions 灯光4
const pointLight = new THREE.PointLight(0xffffff, 1, 100); // White light, intensity, distance
pointLight.position.set(-10, 0, 0); // Position it in the scene
scene.add(pointLight);

// Load a 3D model using GLTFLoader
const loader = new GLTFLoader();
loader.load(
  './model/marble/scene.gltf', // Update this path to your model's location
  function (gltf) {
    scene.add(gltf.scene); // Add the loaded model to the scene
    const model = gltf.scene;
      
// Optional: Center the model in the scene  
    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());

    model.position.sub(center); // Center the model
      
 // Set the camera position based on the size of the model
    const maxDim = Math.max(size.x, size.y, size.z);
    const fov = camera.fov * (Math.PI / 180);// Convert FOV to radians
    let cameraZ = maxDim / (2 * Math.tan(fov / 2));

    cameraZ *= 1.8; // Add some padding to avoid clipping the model， 调整镜头远和近距离的，可以把model 弄小
    camera.position.z = cameraZ;
      

    scene.add(model);
  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded'); // Log the progress of loading
  },
  function (error) {
    console.error('An error happened', error); // Log errors if any
  }
);

// Add controls to allow orbiting the camera around the scene 旋转的
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false; // Disable zoom
controls.enablePan = false;  // Disable panning
controls.enableDamping = true
controls.minPolarAngle = Math.PI / 4; // Limit vertical rotation
controls.maxPolarAngle = Math.PI / 2; // Limit vertical rotation
controls.minAzimuthAngle = -Math.PI / 0; // Limit horizontal rotation
controls.maxAzimuthAngle = Math.PI / 0; // Limit horizontal rotation
controls.autoRotate =true
controls.autoRotateSpeed = 2.0; // Adjust the rotation speed (default is 2.0)

controls.update();

// Create an animation loop to render the scene repeatedly
function animate() {
  requestAnimationFrame(animate);
  controls.update(); // Update controls on every frame
  renderer.render(scene, camera); // Render the scene from the perspective of the camera
}

// Listen for window resize to adjust camera and renderer size
window.addEventListener('resize', () => {
    
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    
    // update camera
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});


// Start the animation loop
animate();


