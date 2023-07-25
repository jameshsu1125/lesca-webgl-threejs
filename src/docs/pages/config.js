import * as THREE from 'three';
import { CameraType } from '../../lib/types';
export const config = {
  fps: 30,
  camera: { fov: 20, far: 1000, type: CameraType.orthographic },
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
    distance: { min: 10, max: 200 },
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
    point: {
      color: 0xff0000,
      intensity: 1,
      position: { x: 10, y: 15, z: 10 },
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
