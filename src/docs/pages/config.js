import * as THREE from 'three';
import Config from '../../lib/config';

export const config = { ...Config };

// export const config = {
//   fps: 30,
//   camera: { fov: 50, far: 1000, type: CameraType.perspective },
//   sky: {
//     enabled: true,
//     turbidity: 3.6,
//     rayleigh: 0.165,
//     mieCoefficient: 0,
//     mieDirectionalG: 0.768,
//     inclination: 0.25,
//     azimuth: 0.25,
//   },
//   controls: {
//     distance: { min: 10, max: 200 },
//     polar: { min: -70, max: 70 },
//     azimuth: { min: -Infinity, max: Infinity },
//     default: {
//       polar: 30,
//       azimuth: 0,
//     },
//     offsetAzimuth: 0,
//     enabled: true,
//     panEasing: 100,
//   },
//   light: {
//     ambient: {
//       color: 0x5289d2,
//       intensity: 1,
//     },
//     point: {
//       color: 0xff0000,
//       intensity: 1,
//       position: { x: 0, y: 5, z: 10 },
//     },
//     spot: {
//       color: 0x999999,
//       intensity: 0.9,
//       position: { x: 0, y: 15, z: 20 },
//     },
//     shadowMapSize: 256,
//     debug: false,
//   },
//   renderer: {
//     alpha: false,
//     shadowType: THREE.PCFSoftShadowMap,
//     exposure: 0.5,
//     outputEncoding: THREE.sRGBEncoding,
//     physicallyCorrectLights: false,
//   },
//   physics: true,
//   stats: true,
// };
