import { Button, ButtonGroup } from '@mui/material';
import { useEffect, useRef } from 'react';
import * as CANNON from 'cannon-es';
import * as THREE from 'three';
import Webgl from '../../lib/';
import { config } from './config';
import GlbLoader from 'lesca-glb-loader';
import Avatar from './Combine_v3.glb';

let webglRef;

const Demo = () => {
  const container = useRef();

  useEffect(() => {
    if (!webglRef) {
      config.camera.target = container.current;
      const webgl = new Webgl(config);
      const debuger = webgl.addCannonDebuger();

      const { scene, physicsImpactMaterial, physicsStaticMaterial, world, enterframe } = webgl;

      // Floor;
      const floorGeometry = new THREE.PlaneBufferGeometry(300, 300, 100, 100);
      floorGeometry.rotateX(-Math.PI / 2);
      const material = new THREE.MeshLambertMaterial({ color: 0xdddddd });
      const floor = new THREE.Mesh(floorGeometry, material);
      floor.receiveShadow = true;
      scene.add(floor);

      const groundShape = new CANNON.Plane();
      const groundBody = new CANNON.Body({ mass: 0, material: physicsStaticMaterial });
      groundBody.addShape(groundShape);
      groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
      world.addBody(groundBody);

      const radius = 1;
      const sphereShape = new CANNON.Sphere(radius);
      const sphereBody = new CANNON.Body({ mass: 1, material: physicsStaticMaterial });
      sphereBody.addShape(sphereShape);
      sphereBody.position.set(0, 3, 0);
      sphereBody.linearDamping = 0.9;
      world.addBody(sphereBody);

      const delta = webgl.clock.getDelta();

      const polar = webgl.controls.get();
      console.log(polar);

      enterframe.add(() => {
        debuger.update();
      });

      GlbLoader(Avatar).then((e) => {
        const { model, mixers, gltf } = e;

        const scale = 1;
        model.scale.set(scale, scale, scale);
        webgl.scene.add(model);

        // animation clip update
        webgl.enterframe.add(() => {
          mixers[0].update(delta);
          webgl.stats.end();
        });
      });

      webglRef = webgl;
    }

    const { render } = webglRef;
    container.current.appendChild(render.domElement);
  }, []);
  return <div ref={container} className='Demo' />;
};
export default Demo;
