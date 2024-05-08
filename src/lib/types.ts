import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';

export type FPS = number;

export type SkyUniforms = {
  enabled: boolean;
  turbidity: number;
  rayleigh: number;
  mieCoefficient: number;
  mieDirectionalG: number;
  inclination: number;
  azimuth: number;
};

export type LightTypes = 'point' | 'spot' | 'hemisphere' | 'direct';

export type PointLight = {
  type: 'point';
  enabled: boolean;
  castShadow: boolean;
  blurSamples: number;
  bias: number;
  color: number;
  intensity: number;
  distance: number;
  decay: number;
  position: {
    x: number;
    y: number;
    z: number;
  };
};

export type SpotLight = {
  type: 'spot';
  enabled: boolean;
  castShadow: boolean;
  blurSamples: number;
  bias: number;
  color: number;
  intensity: number;
  distance: number;
  decay: number;
  angle: number;
  penumbra: number;
  position: {
    x: number;
    y: number;
    z: number;
  };
};

export type HemisphereLight = {
  type: 'hemisphere';
  enabled: boolean;
  intensity: number;
  color: number;
  groundColor: number;
  position: {
    x: number;
    y: number;
    z: number;
  };
};

export type DirectLight = {
  type: 'direct';
  enabled: boolean;
  castShadow: boolean;
  color: number;
  intensity: number;
  position: {
    x: number;
    y: number;
    z: number;
  };
};

export type LightUniforms = {
  ambient: {
    enabled: boolean;
    color: number;
    intensity: number;
  };
  lights: (PointLight | SpotLight | HemisphereLight | DirectLight)[];
  shadowMapSize: number;
  debug: Boolean;
};

export enum CameraType {
  perspective = 0,
  orthographic = 1,
}

export type CameraUniforms = {
  fov: number;
  far: number;
  dom?: HTMLElement;
  type: CameraType;
};

export type ControlsUniforms = {
  distance: { min: number; max: number };
  polar: { min: number; max: number };
  azimuth: { min: number; max: number };
  default: {
    polar: number;
    azimuth: number;
    distance: number;
  };
  offsetAzimuth: number;
  enabled: boolean;
  panEasing: number;
};

export type RendererUniforms = {
  alpha: boolean;
  preserveDrawingBuffer: boolean;
  shadowType: number;
  exposure: number;
  outputEncoding: THREE.ColorSpace;
  background: { color: number; alpha: number };
};

export type Uniforms = {
  physics: boolean;
  stats: boolean;
  fps: FPS;
  sky: SkyUniforms;
  light: LightUniforms;
  camera: CameraUniforms;
  controls: ControlsUniforms;
  renderer: RendererUniforms;
};

export type GLBOption = {
  onProcess: (loaded: number, total: number) => {};
  loop: boolean;
  castShadow: boolean | string[];
  receiveShadow: boolean | string[];
  material: {
    metalness: number;
    roughness: number;
    clearcoat: number;
    clearcoatRoughness: number;
  };
};

export type GMM = {
  gltf: GLTF;
  model: THREE.Group;
  mixers: THREE.AnimationMixer[];
};

export type CameraTypes = THREE.OrthographicCamera | THREE.PerspectiveCamera;
