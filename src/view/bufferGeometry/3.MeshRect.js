import React, {useEffect, useRef} from 'react';
import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

export default function MeshRect() {
  const div = useRef(null);

  const initRenderer = () => {
    const scene = new THREE.Scene();

    /*const vertices = new Float32Array([
      0, 0, 0, //顶点1坐标
      80, 0, 0, //顶点2坐标
      80, 80, 0, //顶点3坐标
      0, 0, 0, //顶点4坐标   和顶点1位置相同
      80, 80, 0, //顶点5坐标  和顶点3位置相同
      0, 80, 0, //顶点6坐标
    ]);
    */
    // 通过 index 去除重复坐标
    const vertices = new Float32Array([
      0, 0, 0, //顶点1坐标
      80, 0, 0, //顶点2坐标
      80, 80, 0, //顶点3坐标
      0, 80, 0, //顶点6坐标
    ]);
    const geometry = new THREE.BufferGeometry();
    const attribute = new THREE.BufferAttribute(vertices, 3);
    const index = new Uint16Array([
      0, 1, 2, 0, 2, 3
    ]);
    geometry.index = new THREE.BufferAttribute(index, 1);
    geometry.setAttribute('position', attribute);
    const material = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

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
