import * as THREE from 'three';
import {
  CameraUniforms,
  ControlsUniforms,
  SkyUniforms,
  LightUniforms,
  RendererUniforms,
} from './types';

const camera: CameraUniforms = {
  fov: 200,
  far: 75,
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
  default: {
    polar: 0,
    azimuth: 0,
  },
  offsetAzimuth: 0,
  enabled: true,
  panEasing: 100,
};

const light: LightUniforms = {
  ambient: {
    color: 0x5289d2,
    intensity: 0.6,
  },
  spot: {
    color: 0x999999,
    intensity: 0.9,
    far: 3,
    position: { x: 0, y: 3, z: 0 },
  },
  shadowMapSize: 256,
  debug: false,
};

const renderer: RendererUniforms = {
  alpha: false,
  shadowType: THREE.PCFSoftShadowMap,
  exposure: 0.5,
  outputEncoding: THREE.sRGBEncoding,
  physicallyCorrectLights: false,
};

const physics = false;
const stats = false;

const Config = {
  camera,
  sky,
  controls,
  light,
  renderer,
  physics,
  stats,
};

export default Config;
export { camera, sky, controls, light, renderer, physics };
