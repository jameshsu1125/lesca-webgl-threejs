export const config = {
  camera: { fov: 40, far: 200 },
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
  light: { color: 14737632, intensity: 0.8, position: { x: 0, y: 25, z: 20 }, shadowMapSize: 512 },
  renderer: { alpha: false, shadowType: 0, exposure: 1.8 },
  physics: false,
  stats: true,
};
