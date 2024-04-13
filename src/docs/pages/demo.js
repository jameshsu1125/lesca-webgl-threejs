import { useEffect, useRef } from 'react';
import Webgl from '../../lib/';
import GlbLoader from '../../lib/glbLoader';
import Avatar from './Combine_v3.glb';
import { config } from './config';

let webglRef;

const Demo = () => {
  const container = useRef();

  useEffect(() => {
    if (!webglRef) {
      config.camera.target = container.current;
      const webgl = new Webgl(config);

      const { scene, enterframe, clock, controls } = webgl;

      const delta = clock.getDelta();

      // const geometry = new THREE.SphereGeometry(3, 32, 16);
      // const material2 = new THREE.MeshBasicMaterial({ color: 0xffff00 });
      // const sphere = new THREE.Mesh(geometry, material2);
      // scene.add(sphere);

      // const polar = controls.get();

      GlbLoader(Avatar).then((e) => {
        const { model, mixers } = e;

        const scale = 1;
        model.scale.set(scale, scale, scale);
        webgl.scene.add(model);

        // animation clip update
        enterframe.add((e) => {
          mixers[0].update(0.02);
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
