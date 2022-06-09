import { Button, ButtonGroup } from '@mui/material';
import { useEffect } from 'react';
import Code from '../components/code';
import { name } from '../config';

const codes = [
  {
    title: '1. Installation',
    code: `npm install ${name} --save`,
    type: 'text',
  },
  {
    title: '2. Init',
    code: `import Webgl from "${name}"
    
const config = {
  camera: { zoom: 200, far: 200 },
  sky: {
    enabled: true,
    turbidity: 3.8,
    rayleigh: 2.967,
    mieCoefficient: 0.005,
    mieDirectionalG: 0.7,
    inclination: 70,
    azimuth: 180,
  },
  controls: {
    distance: { min: 13, max: 30 },
    polar: { min: -70, max: 70 },
    azimuth: { min: -Infinity, max: Infinity },
    default: {
      polar: 0,
      azimuth: 0,
    },
    offsetAzimuth: 0,
    enabled: true,
    panEasing: 100,
  },
  light: {
    ambient: {
      color: 0x5289d2,
      intensity: 0.6,
    },
    spot: {
      color: 0x999999,
      intensity: 0.9,
      position: { x: 0, y: 15, z: 0 },
    },
    shadowMapSize: 256,
    debug: true,
  },
  renderer: {
    alpha: false,
    shadowType: THREE.PCFSoftShadowMap,
    exposure: 0.5,
    outputEncoding: THREE.sRGBEncoding,
    physicallyCorrectLights: false,
  },
  physics: false,
  stats: true,
};

const webgl = new Webgl(config);
container.appendChild(render.domElement);
    `,
    type: 'js',
  },
];

const Usage = () => {
  useEffect(() => {}, []);
  return (
    <div className='Usage'>
      <h2>Usage</h2>
      {codes.map((e) => (
        <div key={e.title}>
          <h3>{e.title}</h3>
          <Code code={e.code} theme={e.type} />
        </div>
      ))}
      <ButtonGroup variant='contained'>
        <Button>click</Button>
      </ButtonGroup>
    </div>
  );
};
export default Usage;
