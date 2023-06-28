import React, {useEffect, useRef} from 'react';
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default function _OrbitControls() {
  const div = useRef(null);
  const initRenderer = () => {
    const scene = new THREE.Scene();

    const geometry = new THREE.BoxGeometry(100, 100, 100);
    const material = new THREE.MeshLambertMaterial({
      color: 'red',
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 0, 0);
    scene.add(mesh);

    const camera = new THREE.PerspectiveCamera();
    camera.position.set(200, 200, 200);
    camera.lookAt(mesh.position);

    const pointLight = new THREE.PointLight(0xffff00, 0.8);
    const pointLightHelper = new THREE.PointLightHelper(pointLight);
    pointLight.position.set(100, 100, 50);
    // pointLight.position.set(-400, -200, -300);
    scene.add(pointLight);
    scene.add(pointLightHelper);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(800, 800);
    renderer.render(scene, camera);

    const controls = new OrbitControls(camera, renderer.domElement);
    // 旋转: 拖动鼠标左键
    // 缩放: 滚动鼠标中键
    // 平移: 拖动鼠标右键
    controls.addEventListener('change', () => {
      renderer.render(scene, camera);
    });

    function animation() {
      mesh.rotateY(0.01);
      renderer.render(scene, camera);
      requestAnimationFrame(animation);
    }
    animation();

    return renderer;
  };

  useEffect(() => {
    const renderer = initRenderer();
    const node = div.current;

    node.appendChild(renderer.domElement);

    return () => {
      node.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div ref={div}>
    </div>
  );
}
