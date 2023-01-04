import { useEffect } from 'react';
import * as THREE from 'three';

import "./App.css";

import SceneInit from './lib/SceneInit';
import {BoxGeometry} from "three";
import {GLTFLoader} from "three/addons/loaders/GLTFLoader.js";

function App() {
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

        star.position.set(x, y, z -20);
        test.scene.add(star);
    }





      let moon;
      const glftLoader = new GLTFLoader();
      glftLoader.load('./assets/scene.gltf', (gltfScene) => {
          moon = gltfScene;
          moon.scene.scale.set(13, 13, 13);
          moon.scene.position.set(0, 1, 0);
          moon.scene.rotation.y = 180;
          test.scene.add(gltfScene.scene);
      });


     const animate = () => {
       if (moon) {
            moon.scene.rotation.y += 0.003;
       }
       window.requestAnimationFrame(animate);
     };
     animate();
  }, []);

  return (
      <div className={"App"}>
          <h3>10'921 km</h3>
          <h3>6.68°</h3>
          <h1>MOON</h1>
        <canvas id="canvas"  height={"500px"} width={"500px"}/>
      </div>
  );
}

export default App;