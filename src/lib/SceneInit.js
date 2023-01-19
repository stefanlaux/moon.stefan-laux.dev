import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'three/examples/jsm/libs/stats.module';
import scene from "three/addons/offscreen/scene.js";

export default class SceneInit {
    constructor(canvasId) {
        // NOTE: Core components to initialize Three.js app.
        this.scene = undefined;
        this.camera = undefined;
        this.renderer = undefined;

        // NOTE: Camera params;
        this.fov = 45;
        this.canvasId = canvasId;



        // NOTE: Lighting is basically required.
        this.ambientLight = undefined;
        this.directionalLight = undefined;
    }

    initialize() {

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            this.fov,
            window.innerWidth / window.innerHeight,
            1,
            1000
        );
        const t = document.body.getBoundingClientRect().top;
        this.camera.position.z = t/90 + 45;

        // NOTE: Specify a canvas which is already created in the HTML.
        const canvas = document.getElementById(this.canvasId);
        this.renderer = new THREE.WebGLRenderer({
            canvas,
            // NOTE: Anti-aliasing smooths out the edges.
            antialias: true,
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight -10);
        this.renderer.setClearColor( 0x151417, 0);

        // this.renderer.shadowMap.enabled = true;
        document.body.appendChild(this.renderer.domElement);

        // ambient light which is for the whole scene
        this.ambientLight = new THREE.AmbientLight(0xffffff, .0);
        this.ambientLight.castShadow = false;
        this.scene.add(this.ambientLight);

        // directional light - parallel sun rays
        this.directionalLight = new THREE.DirectionalLight(0xffffff, 2);
        // this.directionalLight.castShadow = true;
        this.directionalLight.position.set(300, 90, 300);
        this.scene.add(this.directionalLight);

        // if window resizes
        window.addEventListener('resize', () => this.onWindowResize(), false);

    }
    animate() {


        //scroll progress
        let t = document.body.getBoundingClientRect().top;
        t =  - (Math.abs(t) / (document.body.offsetHeight - window.innerHeight)) * 2000;


        //scroll animations moon
        if (t > -1000) {
            this.scene.position.set((t / 90) * -1.7, (-t / 90) * 0.000000001  - 1, (t / 90) * -1);
        } else {
            let newT = -t - 1000;
            this.scene.position.set((t / 90) * -1.8 - newT * 0.04, (-t / 90) * 0.007 - 1, (t / 90) * -1 + newT * -0.04);
        }

        window.requestAnimationFrame(this.animate.bind(this));
        this.render();
    }

    render() {
        // NOTE: Update uniform data on each render.
         //this.uniforms.u_time.value += this.clock.getDelta();
        this.renderer.render(this.scene, this.camera);
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth , window.innerHeight);
    }


}