import { gsap } from 'gsap';
//import * as THREE from "three";
import * as THREE from "https://unpkg.com/three@0.126.1/build/three.module.js";
import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'
import atmosphereVertexShader from './shaders/atmosphereVertex.glsl'
import atmosphereFragmentShader from './shaders/atmosphereFragment.glsl'


//console.log(vertexShader);

// camera function
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  innerWidth / innerHeight,
  0.1,
  1000
);
console.log(scene);

//function to render

const renderer = new THREE.WebGLRenderer({
  antialias: true //--> to improve the image
});

renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(window.devicePixelRatio); //--> to improve the pixels to the image
document.body.appendChild(renderer.domElement);

// create a sphere

const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(5, 50, 50),
  new THREE.ShaderMaterial({
     vertexShader,
     fragmentShader,
     uniforms: {
      globeTexture: {
        value: new THREE.TextureLoader().load('/assets/img/globe.jpg')
      }
     }

     //map : new THREE.TextureLoader().load('./img/globe.jpg')
 })
);


//console.log(sphere );
// create atmosphere

const atmosphere = new THREE.Mesh(
  new THREE.SphereGeometry(5, 50, 50),
  new THREE.ShaderMaterial({
     vertexShader : atmosphereVertexShader,
     fragmentShader : atmosphereFragmentShader,
     blending: THREE.AdditiveBlending,
     side: THREE.BackSide
 })
);
 
atmosphere.scale.set(1.1, 1.1, 1.1)
scene.add(atmosphere);

const group = new THREE.Group()
group.add(sphere)
//scene.add(group)
scene.add(sphere);
//console.log(atmosphere );

const starGeometry = new THREE.BufferGeometry()
const starMaterial = new THREE.PointsMaterial({color: 0xffffff})

const starVertices = []
for (let i = 0; i < 10000; i++) {
  const x =  (Math.random() - 0.5) * 2000
  const y =  (Math.random() - 0.5) * 2000
  const z = -Math.random() * 2000
  starVertices.push(x, y, z)
}
console.log(starVertices);
starGeometry.setAttribute('position',
new THREE.Float32BufferAttribute(starVertices, 3))

const stars = new THREE.Points(starGeometry, starMaterial)
console.log(stars)
scene.add(stars)

camera.position.z = 15;

const mouse = {
  x: undefined,
  y: undefined

}

//animate function
const animate = () => {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  sphere.rotation.y += 0.002
    gsap.to(group.rotation, {
      x: -mouse.y * 0.5,
      y: mouse.x * 1.4,
      duration: 2  
    })
};

animate();

// function to move the mouse

addEventListener('mousemove', () => {
  mouse.x = (event.clientX / innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / innerHeight) * 2 + 1;
  
})

