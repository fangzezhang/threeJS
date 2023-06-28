import React, {useRef, useEffect} from 'react';
import * as THREE from 'three';
import { GUI } from 'dat.gui';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

export default function _GuiLib() {
  const div = useRef(null);

  let res;
  let gui;
  const initGUI = () => {
    gui = new GUI();
    gui.domElement.style.right = '0px';
    gui.domElement.style.width = '300px';

    const exampleObj = {
      example: 30,
    };
    gui.add(exampleObj, 'example', 0, 100);
  };

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

    const obj = {
      color: 0xffffff,
    };
    const materialFolder = gui.addFolder('材质'); // gui 增加分组
    materialFolder.close(); // 关闭菜单
    materialFolder.add(obj, 'color', 0x000000, 0xfffffff).name('蒙层颜色').onChange((value) => {
      mesh.material.color.set(value);
    });

    // 交互界面是拖动条
    gui.add(mesh.position, 'x', 0, 180).onChange((value) => {
      mesh.position.x = value * 0.1;
    });
    gui.add(mesh.position, 'y', [0, 50, 100, 180]);  // 交互界面是下拉菜单
    gui.add(mesh.position, 'z', 0, 180);

    const camera = new THREE.PerspectiveCamera(30, 800 / 500, 1, 2000);
    camera.position.set(200, 150, 200);
    camera.lookAt(mesh.position);

    const pointLight = new THREE.PointLight(0xffffff, 1.0);
    const pointLightHelper = new THREE.PointLightHelper(pointLight);

    materialFolder.add(pointLight, 'intensity', 0, 2.0).name('光照强度(流明)');

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
      res = requestAnimationFrame(animation);
    }
    res = animation();
    gui.add({bool: true}, 'bool').name('mesh 是否旋转').onChange((value) => {
      if (value) {
        res = requestAnimationFrame(animation);
      } else {
        cancelAnimationFrame(res);
      }
    });

    return renderer;
  };

  useEffect(() => {
    initGUI();
    const node = div.current;
    const renderer = initRenderer();

    node.appendChild(renderer.domElement);

    return () => {
      node.removeChild(renderer.domElement);
      gui.destroy();
      cancelAnimationFrame(res);
    }
  }, []);

  return (
    <div ref={div}>

    </div>
  );
}
