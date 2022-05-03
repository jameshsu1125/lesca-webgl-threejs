import { Button, ButtonGroup } from '@mui/material';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import Webgl from '../../lib/';

const config = {
  camera: { fov: 40, far: 200 },
  sky: {
    enabled: true,
    turbidity: 0,
    rayleigh: 0.079,
    mieCoefficient: 0.023,
    mieDirectionalG: 0.226,
    inclination: 70,
    azimuth: -102.7,
  },
  controls: {
    distance: { min: 30, max: 30 },
    polar: { min: -70, max: 70 },
    azimuth: { min: -Infinity, max: Infinity },
    offsetAzimuth: 0,
    enabled: true,
    panEasing: 100,
  },
  light: { color: 14737632, intensity: 1.5, position: { x: 0, y: 15, z: 0 }, shadowMapSize: 512 },
  renderer: { alpha: false, shadowType: 0, exposure: 0.5 },
  physics: false,
};

let webglRef;

const Demo = () => {
  const container = useRef();

  useEffect(() => {
    if (!webglRef) {
      const webgl = new Webgl(config);

      const geometry = new THREE.BoxGeometry();
      const material = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
      const cube = new THREE.Mesh(geometry, material);
      webgl.scene.add(cube);

      webglRef = webgl;
    }

    const { render } = webglRef;
    container.current.appendChild(render.domElement);
  }, []);
  return <div ref={container} className='Demo' />;
};
export default Demo;
