import React, {useRef, useEffect} from 'react';
import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {func} from "three/examples/jsm/nodes/shadernode/ShaderNodeBaseElements";

export default function _PhongAndSetRnderer() {
  const div = useRef(null);

  const initRenderer = () => {
    const scene = new THREE.Scene();

    const geometry = new THREE.BoxGeometry(50, 50, 50);
    const material = new THREE.MeshPhongMaterial({
      color: 'red',
      shininess: 40, // 高光部分的亮度, 默认30
      specular: 0x444444, // 高光部分的颜色
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 0, 0);
    scene.add(mesh);

    const camera = new THREE.PerspectiveCamera(30, 800 / 500, 1, 2000);
    camera.position.set(200, 150, 200);
    camera.lookAt(mesh.position);

    const pointLight = new THREE.PointLight(0xffffff, 1.0);
    const pointLightHelper = new THREE.PointLightHelper(pointLight);
    pointLight.position.set(200, 100, 100);
    scene.add(pointLight);
    scene.add(pointLightHelper);

    const renderer = new THREE.WebGLRenderer({
      antialias: true, // 消除锯齿
    });
    renderer.setClearColor(0x444444, 1);  // 设置背景色
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(800, 500);
    renderer.render(scene, camera);

    const orbitControls = new OrbitControls(camera, renderer.domElement);
    // orbitControls.addEventListener('change', () => {
    //   renderer.render(scene, camera);
    // });

    function animation() {
      mesh.rotateY(0.01);
      renderer.render(scene, camera);
      requestAnimationFrame(animation);
    }
    animation();

    return renderer;
  };

  useEffect(() => {
    const node = div.current;
    const renderer = initRenderer();

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
