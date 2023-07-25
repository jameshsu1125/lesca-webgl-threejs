import { Button, ButtonGroup } from '@mui/material';
import { useEffect, useRef } from 'react';
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

      const geometry = new THREE.BoxGeometry();
      const material = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
      const cube = new THREE.Mesh(geometry, material);
      webgl.scene.add(cube);

      GlbLoader(Avatar).then((e) => {
        const { model, mixers, gltf } = e;

        const scale = 1;
        model.scale.set(scale, scale, scale);
        webgl.scene.add(model);

        console.log(e);

        // animation clip update
        webgl.enterframe.add(() => {
          // =>  same requestAnimationFrame
          const delta = webgl.clock.getDelta();

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
