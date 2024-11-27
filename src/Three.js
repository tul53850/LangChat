import React, { Component } from "react";
//import ReactDOM from "react-dom";
import * as THREE from 'three';
import earth from './data/earth.jpg';

class Three extends Component {
    componentDidMount() {
        const scene = new THREE.Scene();
        scene.add(new THREE.AmbientLight(0xffffff, 10));
        scene.add(new THREE.DirectionalLight(0xffffff, 100));
        const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

        const renderer = new THREE.WebGLRenderer({alpha: true});
        renderer.setSize( 200, 200 );
        //document.body.appendChild( renderer.domElement );
        this.mount.appendChild( renderer.domElement );
        renderer.setClearColor( 0xffffff, 0);

        const texture= new THREE.TextureLoader().load(earth)
        const geometry = new THREE.SphereGeometry( 2.5, 10, 10 );
        //const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        const material = new THREE.MeshPhongMaterial( { map: texture } );
        const cube = new THREE.Mesh( geometry, material );
        scene.add( cube );

        camera.position.z = 5;

        function animate() {
            requestAnimationFrame( animate );

            //cube.rotation.x -= 0.01;
            cube.rotation.y -= 0.01;

            renderer.render( scene, camera );
        }

        //function stopEarth(){cube.rotation.y = 0;}

        animate();
    }
    render() {
        return (
          <div ref={ref => (this.mount = ref)} />
        )
    }
}
//const rootElement = document.getElementById("root");
//ReactDOM.render(<Three />, rootElement);

export default Three;