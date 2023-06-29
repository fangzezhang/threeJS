import React, {useEffect, useRef} from 'react';
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default function _Line() {
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
    const material = new THREE.LineBasicMaterial({
      color: 0xff0000,
    });
    const line = new THREE.Line(geometry, material);
    // const line = new THREE.LineLoop(geometry, material);  // 闭合线条
    // const line = new THREE.LineSegments(geometry, material);  // 非连续线条
    scene.add(line);

    const camera = new THREE.PerspectiveCamera(30, 800 / 500, 1, 2000);
    camera.position.set(200, 200, 300);
    camera.lookAt(scene.position);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
    });
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
