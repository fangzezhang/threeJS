import React, {useEffect, useRef} from 'react';
import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

export default function MeshRectNormal() {
  const div = useRef(null);

  /*
  * 不设置法线, 改变材质, geometry 无法显示
  * */
  const initRenderer = () => {
    const scene = new THREE.Scene();

    const vertices = new Float32Array([
      0, 0, 0,
      80, 0, 0,
      80, 80, 0,
      0, 80, 0,
    ]);
    const attribute = new THREE.BufferAttribute(vertices, 3);
    const index = new Uint16Array([
      0, 1, 2, 0, 2, 3,
    ]);
    const normals = new Float32Array([
      0, 0, 1,
      0, 0, 1,
      0, 0, 1,
      0, 0, 1,
    ]);
    const geometry = new THREE.BufferGeometry();
    geometry.attributes.position = attribute;
    // 使用了顶点索引, 每个法线数据和顶点位置数据一一对应:
    geometry.attributes.normal = new THREE.BufferAttribute(normals, 3);
    geometry.index = new THREE.BufferAttribute(index, 1);
    const material = new THREE.MeshLambertMaterial({
      color: 0x00ff00
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const pointLight = new THREE.PointLight('white', 2.0);
    const pointLightHelper = new THREE.PointLightHelper(pointLight);
    pointLight.position.set(0, 100, 100);
    scene.add(pointLight);
    scene.add(pointLightHelper);

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
