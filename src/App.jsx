import React, {useEffect, useRef, useState} from 'react';
import * as THREE from 'three';
import "./App.css";
import SceneInit from './lib/SceneInit';
import {GLTFLoader} from "three/addons/loaders/GLTFLoader.js";
import {useInView} from "framer-motion";
import {animate} from "motion";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

function App() {
    const [clicked, setClicked] = useState(false);
    let arrowSVG = new URL("/assets/arrow.svg", import.meta.url).href;
    let infoSVG = new URL("/assets/info.svg", import.meta.url).href;
    let closeSVG = new URL("/assets/close.svg", import.meta.url).href;
    let personSVG = new URL("/assets/person.svg", import.meta.url).href;
    const useInViewp1 = useRef(null);
    const isInViewp1 = useInView(useInViewp1);
    const useInViewp2 = useRef(null);
    const isInViewp2 = useInView(useInViewp2);
    const useInViewp3 = useRef(null);
    const isInViewp3 = useInView(useInViewp3);
    const useInViewp4 = useRef(null);
    const isInViewp4 = useInView(useInViewp4);
    let delay = 0.3;


    useEffect(() => {

        //set src of arrow
        let arrows = document.getElementsByTagName("img");
        for (let i = 0; i < arrows.length; i++) {
            if (arrows[i].id === "arrow") {
                arrows[i].src = arrowSVG;
            }
        }
        document.getElementById("view").src = infoSVG;
        document.getElementById("close").src = closeSVG;
        document.getElementById("close").hidden = true;
        document.getElementById("person").src = personSVG;

        //set up scene
        const scene = new SceneInit('canvas');
        scene.initialize();
        scene.animate();

        //add stars
        for (let i = 0; i < 20; i++) {
            const geometry = new THREE.SphereGeometry(0.1, 24, 24);
            const material = new THREE.MeshBasicMaterial({color: 0xffffff});
            const star = new THREE.Mesh(geometry, material);
            const [x, y, z] = Array(3).fill(0).map(() => THREE.MathUtils.randFloatSpread(1000));

            //set position and scale
            star.position.set(x, y, z - 1000);
            star.scale.set(10, 10, 10)
            scene.scene.add(star);
        }

        //add moon model
        let moonObject = new URL("/assets/Moon.glb", import.meta.url).href;
        let moon;
        const glftLoader = new GLTFLoader();
        glftLoader.load(moonObject, (gltfScene) => {
            moon = gltfScene;
            let scale = 0.024;
            if (window.innerWidth < 600) {
                scale = 0.018
            }
            moon.scene.scale.set(scale, scale, scale);
            moon.scene.position.set(0, 1, 0);
            moon.scene.rotation.y = 180;
            scene.scene.add(gltfScene.scene);
        });

        //animations
        const animate = () => {
            //check if model already loaded
            if (moon) {
                //rotate moon
                moon.scene.rotation.y += 0.001;
            }

            window.requestAnimationFrame(animate);
        };
        animate();
    }, []);

    // animations data text all independent
    useEffect(() => {
        if (isInViewp1) {
            animate(
                ".p1",
                {opacity: 1, marginLeft: "-5%"},
                {delay: delay, duration: 2}
            );
            delay += 0.2
        }

    }, [isInViewp1]);

    useEffect(() => {
        if (isInViewp2) {
            animate(
                ".p2",
                {opacity: 1, marginLeft: "-5%"},
                {delay: delay, duration: 2}
            );
            delay += 0.2
        }
    }, [isInViewp2]);
    useEffect(() => {
        if (isInViewp3) {
            animate(
                ".p3",
                {opacity: 1, marginLeft: "-5%"},
                {delay: delay, duration: 2}
            );
            delay += 0.2
        }

    }, [isInViewp3]);

    useEffect(() => {
        if (isInViewp4) {
            animate(
                ".p4",
                {opacity: 1, marginLeft: "-5%"},
                {delay: delay, duration: 2}
            );
            delay += 0.2
        }

    }, [isInViewp4]);

    const toggleScroll = (bool) => {
        if (bool) {
            document.documentElement.style.overflowY = "scroll";
        }else{
            document.documentElement.style.overflowY = "hidden";
        }
    }


    const changeIcon = () => {

        let view = document.getElementById("view");
        let close = document.getElementById("close");
        view.hidden = !view.hidden;
        close.hidden = !close.hidden;

        if (view.hidden){
            toggleScroll(false);
            animate(".cardInfo", {display: "flex"}, {duration: 0});
            animate(".cardInfo", {opacity: 1}, {duration: 1.5});
        }else{
            toggleScroll(true);
            animate(".cardInfo", {opacity: 0}, {duration: 1.5});
            animate(".cardInfo", {display: "none"}, {duration: 1.5});

        }
    }




    return (
        <>
            <div className="hide">
                <h1 className="hideTitle">
                    Please use a Laptop or Desktop for the best experience
                </h1>
                <div className="hideLink">
                    <img className={"hideImgLink"} id={"arrow"} alt="arrow down img" onClick={() => window.location.href = "https://stefan-laux.dev"}/>
                </div>
                <div className="hideUp">
                    <img className={"hideImgUp"} id={"arrow"} alt="arrow down img" onClick={() => window.location.href = "https://moon.stefan-laux.dev"}/>
                </div>
            </div>
            <div className={"App"}>
                <h3>384’400 km</h3>
                <div className="explore">
                    <h3 className={"exploreText"}>Explore</h3>
                    <img className={"img"} id={"arrow"} alt="arrow down img"
                         onClick={() => window.location.href = "#details"}/>
                </div>

                <p className={"title"}>MOON</p>
                <canvas id="canvas" height={"500px"} width={"500px"}/>
                <div id="details">
                    <div className="textDetails">
                        <div className={"titleDetails"}>
                            <p className={"p1"} ref={useInViewp1}>Diameter: </p>
                            <p className={"p2"} ref={useInViewp2}>Mass: </p>
                            <p className={"p3"} ref={useInViewp3}>Gravitation: </p>
                            <p className={"p4"} ref={useInViewp4}>Orbit: </p>
                        </div>

                        <div className={"dataDetails"}>
                            <p className={"p1"}>3’474.8 km</p>
                            <p className={"p2"}>7.34767309 × 10²² kg</p>
                            <p className={"p3"}>1.62 m/s² (0.1654G) </p>
                            <p className={"p4"}>27 days</p>
                        </div>

                    </div>

                </div>
                <div id={"moondes1"} className="moonTextRight">
                    <p className={"textMoon"}> Manned missions to the Moon, such as the historic Apollo 11 mission in 1969, have allowed us to explore and uncover many of its secrets. </p>
                    </div>
                <div id={"moondes2"} className="moonTextLeft">
                    <p className={"textMoon"}> The Moon is a mesmerizing celestial wonder that has captivated humanity for centuries. This natural satellite of Earth orbits at a distance of 384,400 kilometers.</p>
                </div>

                <img className={"view icon"} id={"view"} alt="view icon" onClick={changeIcon} />
                <img className={"close icon"} id={"close"} alt="close icon" onClick={changeIcon} />
                <div className="cardInfo" id="cardInfo">

                    <div className="cardContent">
                        <div className="cardTitle">
                            <h1>MOON</h1>
                        </div>
                        <div className="cardText">
                            <p>Hello there, my name is Stefan Laux. I created this website as a small project to learn Three.JS. I hope you like it. If you want to visit my portfolio website, click the link below.</p>
                            <div className="cardLink">
                                <a href="https://stefan-laux.dev" target="_blank" rel="noreferrer">
                                    <img className={"iconCard"} id={"person"} alt="person icon" />
                                </a>
                            </div>
                        </div>
                        <div className="cardThree">
                            <p>This website was created using Three.js and a 3D model from NASA. Both sources are linked below.</p>
                        </div>
                        <div className="cardLinkThree">
                            <a target="_blank" rel="noreferrer" href="https://threejs.org/">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Three.js_Icon.svg/1200px-Three.js_Icon.svg.png" alt="three logo" className={"three"}/>
                            </a>
                            <a target="_blank" rel="noreferrer" href="https://solarsystem.nasa.gov/resources/2366/earths-moon-3d-model/">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/NASA_logo.svg/2449px-NASA_logo.svg.png" alt="nasa logo" className={"nasa"}/>
                            </a>

                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}

export default App;