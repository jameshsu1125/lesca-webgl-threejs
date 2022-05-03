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
    polar: { min: 35, max: 35 },
    azimuth: { min: -360, max: 360 },
    offsetAzimuth: -20,
    enabled: true,
    panEasing: 100,
  },
  light: { color: 14737632, intensity: 1.5, position: { x: 0, y: 15, z: 0 }, shadowMapSize: 512 },
  renderer: { alpha: false, shadowType: 0 },
  physics: false,
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
