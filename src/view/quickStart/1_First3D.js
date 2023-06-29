import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function First3D() {
  const rendererRef = useRef(null);

  const initRenderer = () => {
    const scene = new THREE.Scene();

    const geometry = new THREE.BoxGeometry(100, 100, 100);
    const material = new THREE.MeshLambertMaterial({
      color: 'red',
      // transparent: true,
      // opacity: 0.5
    });
    const mesh = new THREE.Mesh(geometry, material);

    const width = 800;
    const height = 500;
    const camera = new THREE.PerspectiveCamera(30, width/height, 1, 3000);

    const renderer = new THREE.WebGLRenderer();

    const pointLight = new THREE.PointLight(0xffffff, 1.0);

    pointLight.position.set(100, 60, 50);

    mesh.position.set(100, 0, 0);
    camera.position.set(200, 200, 200);
    camera.lookAt(mesh.position);
    // camera.lookAt(0, 0, 0);
    scene.add(mesh);
    scene.add(pointLight);
    renderer.setSize(width, height);
    renderer.render(scene, camera);

    return renderer;
  };

  useEffect(() => {
    const renderer = initRenderer();
    const node = rendererRef.current;

    node.appendChild(renderer.domElement);

    return () => {
      renderer.dispose();
      node.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div ref={rendererRef}>

    </div>
  );
}
