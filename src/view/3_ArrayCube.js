import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default function _ArrayCube() {
  const div = useRef(null);

  const initRenderer = () => {
    const scene = new THREE.Scene();
    const geometry = new THREE.CircleGeometry(100);
    const material = new THREE.MeshLambertMaterial({
      color: 0x00ffff,
      transparent: true,
      opacity: 0.5,
      side: THREE.DoubleSide,  // 默认只有正面刻间, 可以设置两面可见
    });
    for (let i = 0; i < 10; i++) {
      const mesh = new THREE.Mesh(geometry, material);

      mesh.position.set(i * 200, 0, 0);
      scene.add(mesh);
    }

    const camera = new THREE.PerspectiveCamera(30, 800 / 500, 1, 8000);
    camera.position.set(3000, 0, 0);
    camera.lookAt(0, 0, 0);

    const ambientLight = new THREE.AmbientLight(0xffffff, 10.0);
    scene.add(ambientLight);

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
