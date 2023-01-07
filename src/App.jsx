import React, {useEffect, useRef, useState} from 'react';
import * as THREE from 'three';
import "./App.css";
import SceneInit from './lib/SceneInit';
import {GLTFLoader} from "three/addons/loaders/GLTFLoader.js";
import {useInView} from "framer-motion";
import {animate} from "motion";

function App() {
    const [clicked, setClicked] = useState(false);
    let arrowSVG = new URL("/assets/arrow.svg", import.meta.url).href;
    const useInViewp1 = useRef(null);
    const isInViewp1 = useInView(useInViewp1);
    const useInViewp2 = useRef(null);
    const isInViewp2 = useInView(useInViewp2);
    const useInViewp3 = useRef(null);
    const isInViewp3 = useInView(useInViewp3);
    const useInViewp4 = useRef(null);
    const isInViewp4 = useInView(useInViewp4);
    let t = 0.2;

    useEffect(() => {
        document.getElementsByTagName("img")[0].src = arrowSVG;
        document.getElementsByTagName("img")[1].src = arrowSVG;
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
            let scale = Math.min(window.innerWidth, window.innerHeight) / 6000 -0.13;
            if (window.innerWidth < 600) {
                scale = 0.015
            }
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
    useEffect(() => {
        if (isInViewp1) {
            animate(
                ".p1",
                { opacity: 1, marginLeft: "5%" },
                { delay: t, duration: 2 }
            );
            t+=0.1
        }

    }, [isInViewp1]);

    useEffect(() => {
        if (isInViewp2) {
            animate(
                ".p2",
                { opacity: 1, marginLeft: "5%" },
                { delay: t, duration: 2 }
            );
            t+=0.1
        }
    }, [isInViewp2]);
    useEffect(() => {
        if (isInViewp3) {
            animate(
                ".p3",
                { opacity: 1, marginLeft: "5%" },
                { delay: t, duration: 2 }
            );
            t+=0.1
        }

    }, [isInViewp3]);

    useEffect(() => {
        if (isInViewp4) {
            animate(
                ".p4",
                { opacity: 1, marginLeft: "5%" },
                { delay: t, duration: 2 }
            );
            t+=0.1
        }

    }, [isInViewp4]);



    return (
        <>
            <div className="hide">
                <h1 className="hideTitle">
                    Please use a Laptop or Desktop for the best experience
                </h1>
                <div className="hideLink">
                    <img className={"hideImg"} id={"arrow"} alt="arrow down img" onClick={() => window.location.href = "https://stefan-laux.dev"}/>
                </div>
            </div>
        <div className={"App"}>
            <h3>384’400 km</h3>
            <img className={"img"} id={"arrow"} alt="arrow down img" onClick={() => window.location.href = "#details"}/>

            <p className={"title"}>MOON</p>
            <canvas id="canvas"  height={"500px"} width={"500px"}/>
            <div id="details">
                <div className="textDetails">
                    <div className={"titleDetails"}>
                        <p className={"p1"} ref={useInViewp1} >Diameter: </p>
                        <p className={"p2"} ref={useInViewp2} >Mass: </p>
                        <p className={"p3"} ref={useInViewp3} >Gravitation: </p>
                        <p className={"p4"} ref={useInViewp4} >Orbit: </p>
                    </div>

                    <div className={"dataDetails"}>
                        <p className={"p1"}>3’474.8 km</p>
                        <p className={"p2"}>7.34767309 × 10²² kg</p>
                        <p className={"p3"}>1.62 m/s² (0.1654G) </p>
                        <p className={"p4"}>27 days</p>
                    </div>

                </div>

            </div>
        </div>
        </>
    );
}

export default App;