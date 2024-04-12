import { Button, ButtonGroup } from '@mui/material';
import { useEffect, useRef } from 'react';
import * as CANNON from 'cannon-es';
import Webgl, { THREE } from '../../lib/';
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

      const { scene, enterframe, clock, controls } = webgl;

      // Floor;
      const floorGeometry = new THREE.PlaneBufferGeometry(300, 300, 100, 100);
      floorGeometry.rotateX(-Math.PI / 2);
      const material = new THREE.MeshLambertMaterial({ color: 0xdddddd });
      const floor = new THREE.Mesh(floorGeometry, material);
      floor.receiveShadow = true;
      scene.add(floor);

      const delta = clock.getDelta();

      const geometry = new THREE.SphereGeometry(3, 32, 16);
      const material2 = new THREE.MeshBasicMaterial({ color: 0xffff00 });
      const sphere = new THREE.Mesh(geometry, material2);
      scene.add(sphere);

      const polar = controls.get();

      GlbLoader(Avatar).then((e) => {
        const { model, mixers, gltf } = e;

        const scale = 1;
        model.scale.set(scale, scale, scale);
        webgl.scene.add(model);

        // animation clip update
        enterframe.add(() => {
          mixers[0].update(delta);
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
