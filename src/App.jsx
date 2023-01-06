import {useEffect, useState} from 'react';
import * as THREE from 'three';

import "./App.css";

import SceneInit from './lib/SceneInit';
import {BoxGeometry} from "three";
import {GLTFLoader} from "three/addons/loaders/GLTFLoader.js";

function App() {
    const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const test = new SceneInit('canvas');
    test.initialize();
    test.animate();


      for (let i = 0; i < 20; i++) {
          const geometry = new THREE.SphereGeometry(0.1, 24, 24);
          const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
          const star = new THREE.Mesh(geometry, material);

          const [x, y, z] = Array(3)
              .fill(0)
              .map(() => THREE.MathUtils.randFloatSpread(100));

          star.position.set(x, y, z -40);
          test.scene.add(star);
      }




      let moonObject = new URL("/assets/Moon.glb", import.meta.url).href;
      let moon;
      const glftLoader = new GLTFLoader();
      glftLoader.load(moonObject, (gltfScene) => {
          moon = gltfScene;
          const scale = Math.min(window.innerWidth, window.innerHeight) / 6000 -0.13;
          console.log(scale);
          moon.scene.scale.set(scale,scale, scale);
          moon.scene.position.set(0, 1, 0);
          moon.scene.rotation.y = 180;
          test.scene.add(gltfScene.scene);
      });


     const animate = () => {
       if (moon) {
            moon.scene.rotation.y += 0.001;
       }
       if (clicked) {
            moon.scene.rotation.y += 0.1;
       }
       window.requestAnimationFrame(animate);
     };
     animate();
  }, []);




  return (
      <div className={"App"}>
          <h3>384’400 km</h3>
          <img src="/assets/arrow.svg" alt="arrow down img" onClick={() => window.location.href = "#details"}/>

          <p>MOON</p>
        <canvas id="canvas"  height={"500px"} width={"500px"}/>
          <div id="details"></div>
      </div>
  );
}

export default App;