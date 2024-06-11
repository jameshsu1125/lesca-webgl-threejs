import * as THREE from 'three';
import {
  CameraUniforms,
  ControlsUniforms,
  SkyUniforms,
  LightUniforms,
  RendererUniforms,
  FPS,
  CameraType,
  GLBOption,
} from './types';

const fps: FPS = 0;

const camera: CameraUniforms = {
  fov: 70,
  far: 1000,
  type: CameraType.perspective,
  dom: undefined,
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
  distance: { min: 3, max: 100 },
  polar: { min: -90, max: 90 },
  azimuth: { min: -Infinity, max: Infinity },
  default: {
    polar: 0,
    azimuth: 0,
    distance: 50,
  },
  offsetAzimuth: 0,
  enabled: true,
  panEasing: 100,
  damping: false,
  dampingFactor: 1,
};

const light: LightUniforms = {
  ambient: {
    enabled: true,
    color: 0xb7a46f,
    intensity: 0.6,
  },
  lights: [
    {
      type: 'point',
      enabled: true,
      castShadow: true,
      bias: 0,
      blurSamples: 1,
      color: 0x999999,
      intensity: 0.9,
      distance: 3,
      decay: 0.5,
      position: { x: 0, y: 3, z: 0 },
    },
    {
      type: 'spot',
      enabled: false,
      castShadow: true,
      bias: 0,
      blurSamples: 1,
      color: 0x999999,
      intensity: 0.9,
      distance: 3,
      decay: 0.5,
      angle: Math.PI * 0.12,
      penumbra: 1,
      position: { x: 0, y: 3, z: 3 },
    },
  ],
  shadowMapSize: 256,
  debug: false,
};

const renderer: RendererUniforms = {
  alpha: false,
  preserveDrawingBuffer: false,
  shadowType: THREE.PCFSoftShadowMap,
  exposure: 0.5,
  outputEncoding: THREE.SRGBColorSpace,
  background: { color: 0x000000, alpha: 1 },
};

const physics = false;
const stats = false;

const Config = {
  fps,
  camera,
  sky,
  controls,
  light,
  renderer,
  physics,
  stats,
};

/**
 * https://threejs.org/manual/#en/materials
 */
export const GLBLoaderConfig: GLBOption = {
  onProcess: (loaded, total) => `${(loaded / total) * 100}% loaded`,
  loop: true,
  castShadow: true,
  receiveShadow: false,
  material: {
    metalness: 0,
    roughness: 1,
    clearcoat: 0,
    clearcoatRoughness: 0.5,
  },
};

export default Config;
export { camera, sky, controls, light, renderer, physics };
