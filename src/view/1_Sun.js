import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function First3D() {
  const rendererRef = useRef(null);

  const initRenderer = () => {
    const scene = new THREE.Scene();

    // const geometry = new THREE.BoxGeometry(100, 100, 100);
    const geometry = new THREE.SphereGeometry(5, 32, 32);
    const material = new THREE.MeshBasicMaterial({
      color: 0xffff00,
      // transparent: true,
      // opacity: 0.5
    });
    const mesh = new THREE.Mesh(geometry, material);

    const width = 800;
    const height = 500;
    const camera = new THREE.PerspectiveCamera(75, width/height, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer();

    const pointLight = new THREE.PointLight(0xffffff, 100.0);
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    pointLight.position.set(0, 0, 0);

    mesh.position.set(0, 0, 0);
    camera.position.set(0, 0, 10);
    camera.lookAt(mesh.position);
    // camera.lookAt(0, 0, 0);
    scene.add(mesh);
    scene.add(pointLight);
    renderer.setSize(width, height);
    renderer.render(scene, camera);

    function animate() {
      requestAnimationFrame(animate);
      // mesh.rotateY(0.01);
      mesh.position.y += 0.01;
      renderer.render(scene, camera);
    }

    animate();
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

  let message = '';

  for (let i = 0; i < 1000; i++) {
    message += 'test text';
  }
  return (
    <>
      <div ref={rendererRef}>

      </div>
      <div style={{width: '500px', height: '500px', overflow: 'scroll'}}>
        { message }
      </div>
    </>
  );
}
