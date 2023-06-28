import React, {useEffect, useRef} from 'react';
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from 'stats.js';

export default function _OrbitControls() {
  const div = useRef(null);
  let req;
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
      // 设立的 animation 就不需要再通过 change 执行 render 了, 因为 animation 一直在执行 renderer.render();
      // renderer.render(scene, camera);
    });

    const clock = new THREE.Clock();
    const stats = new Stats();
    document.body.appendChild(stats.domElement);
    function animation() {
      const spt = clock.getDelta() * 1000; // 毫秒
      console.info('两帧之间的时间间隔: ' + spt);
      console.info('帧率FPS: ' + 1000 / spt);

      stats.update();

      mesh.rotateY(0.01);
      renderer.render(scene, camera);
      req = requestAnimationFrame(animation);
    }
    animation();

    function test() {
      for (let i = 0; i < 1000; i++) {
        const geometry = new THREE.BoxGeometry(5, 5, 5);
        const material = new THREE.MeshLambertMaterial({
          color: 0x00ffff,
        });
        const mesh = new THREE.Mesh(geometry, material);
        const x = (Math.random() - 0.5) * 200;
        const y = (Math.random() - 0.5) * 200;
        const z = (Math.random() - 0.5) * 200;
        mesh.position.set(x, y, z);
        scene.add(mesh);
      }
    }

    test();

    window.onresize = function () {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      // 渲染器执行 render 方法时会读取相机对象的投影矩阵属性 projectionMatrix, 但不会渲染每一帧都通过相机属性计算投影矩阵
      // 相机属性发生变化, 需要执行 updateProjectionMatrix() 更新相机的投影矩阵
      camera.updateProjectionMatrix();
    };

    return renderer;
  };

  useEffect(() => {
    const renderer = initRenderer();
    const node = div.current;

    node.appendChild(renderer.domElement);

    return () => {
      node.removeChild(renderer.domElement);
      renderer.dispose();
      cancelAnimationFrame(req);
    };
  }, []);

  return (
    <div ref={div}>
    </div>
  );
}
