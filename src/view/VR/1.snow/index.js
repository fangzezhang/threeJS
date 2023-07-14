import React, {useEffect, useRef} from 'react';
import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import pano_l from './images/pano_l.jpg';
import pano_r from './images/pano_r.jpg';
import pano_u from './images/pano_u.jpg';
import pano_d from './images/pano_d.jpg';
import pano_f from './images/pano_f.jpg';
import pano_b from './images/pano_b.jpg';

export default function Snow() {
  const div = useRef(null);

  function createTextMaterial(text, fontSize=12, fontColor='red') {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    // 设置画布大小
    canvas.width = 128;
    canvas.height = 128;

    // 设置文本样式
    context.font = fontSize + 'px ';
    context.fillStyle = fontColor;

    // 居中绘制文本
    const x = (canvas.width - context.measureText(text).width) / 2;
    const y = (canvas.height - fontSize) / 2;
    context.fillText(text, x, y);

    // 创建纹理并返回材质
    const texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.MeshBasicMaterial( { map: texture } );

    return material;
  }

  function initRenderer() {
    const scene = new THREE.Scene();
    const materials = [];

    const texture_left = new THREE.TextureLoader().load( pano_l );
    const texture_right = new THREE.TextureLoader().load( pano_r );
    const texture_up = new THREE.TextureLoader().load( pano_u );
    const texture_bottom = new THREE.TextureLoader().load( pano_d );
    const texture_front = new THREE.TextureLoader().load( pano_f );
    const texture_back = new THREE.TextureLoader().load( pano_b );

    materials[0] = new THREE.MeshBasicMaterial( { map: texture_right, } );
    materials[1] = new THREE.MeshBasicMaterial( { map: texture_left, } );
    materials[2] = new THREE.MeshBasicMaterial( { map: texture_up, } );
    materials[3] = new THREE.MeshBasicMaterial( { map: texture_bottom, } );
    materials[4] = new THREE.MeshBasicMaterial( { map: texture_front, } );
    materials[5] = new THREE.MeshBasicMaterial( { map: texture_back, } );

    /*for (let i = 0; i < 6; i++) {
      materials.push(createTextMaterial(i)); // 在正方体6个面上添加数字, 用来判断图片的方位
    }*/

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const mesh = new THREE.Mesh(geometry, materials);
    mesh.geometry.scale(1, 1, -1);  // 将 Z 轴方向进行反转, 原本指向观察者的面朝向原理观察者的方向;

    scene.add(mesh);

    const camera = new THREE.PerspectiveCamera(90, 800 / 500, 0.1, 100);
    camera.position.set(0, 0, 0.01);

    const renderer = new THREE.WebGLRenderer({
      antialias: true, // 消除锯齿
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(800, 500);
    renderer.render(scene, camera);

    const orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.addEventListener('change', () => {
      renderer.render(scene, camera);
    });

    return renderer;
  }

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
