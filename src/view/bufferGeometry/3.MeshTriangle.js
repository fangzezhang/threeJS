import React, {useEffect, useRef} from 'react';
import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

export default function Mesh() {
  const div = useRef(null);

  const initRenderer = () => {
    const scene = new THREE.Scene();

    const vertices = new Float32Array([
      0, 0, 0,
      50, 0, 0,
      0, 100, 0,
      0, 0, 10,
      0, 0, 100,
      50, 0, 10,
    ]);
    const attribute = new THREE.BufferAttribute(vertices, 3);
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', attribute);
    const material = new THREE.MeshBasicMaterial({
      color: 0x0000ff,
      side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const camera = new THREE.PerspectiveCamera(30, 800 / 500, 1, 2000);
    camera.position.set(200, 200, 300);
    camera.lookAt(scene.position);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(800, 500);
    renderer.render(scene, camera);

    const orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.addEventListener('change', () => {
      renderer.render(scene, camera);
    });

    return renderer;
  };

  useEffect(() => {
    const renderer = initRenderer();
    const node = div.current;

    node.appendChild(renderer.domElement);

    return () => {
      node.removeChild(renderer.domElement);
    }
  }, []);

  return (
    <div ref={div}>
    </div>
  );
}
