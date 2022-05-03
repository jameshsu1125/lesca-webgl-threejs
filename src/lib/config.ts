import * as THREE from 'three';
import {
  CameraUniforms,
  ControlsUniforms,
  SkyUniforms,
  LightUniforms,
  RendererUniforms,
} from './types';

const camera: CameraUniforms = {
  fov: 40,
  far: 200,
};

// todo => https://threejs.org/examples/webgl_shaders_sky.html
const sky: SkyUniforms = {
  enabled: true,
  turbidity: 0,
  rayleigh: 0.079,
  mieCoefficient: 0.023,
  mieDirectionalG: 0.226,
  inclination: 70,
  azimuth: -102.7,
};

const controls: ControlsUniforms = {
  distance: { min: 30, max: 30 },
  polar: { min: 35, max: 35 },
  azimuth: { min: -Infinity, max: Infinity },
  offsetAzimuth: 0,
  enabled: true,
  panEasing: 100,
};

const light: LightUniforms = {
  color: 0xe0e0e0,
  intensity: 1.5,
  position: {
    x: 0,
    y: 15,
    z: 0,
  },
  shadowMapSize: 512,
};

const renderer: RendererUniforms = {
  alpha: false,
  shadowType: THREE.BasicShadowMap,
  exposure: 0.5,
};

const physics = false;

const Config = {
  camera,
  sky,
  controls,
  light,
  renderer,
  physics,
};

export default Config;
export { camera, sky, controls, light, renderer, physics };
