export type SkyUniforms = {
  enabled: boolean;
  turbidity: number;
  rayleigh: number;
  mieCoefficient: number;
  mieDirectionalG: number;
  inclination: number;
  azimuth: number;
};

export type LightUniforms = {
  color: number;
  intensity: number;
  position: {
    x: number;
    y: number;
    z: number;
  };
  shadowMapSize: number;
};

export type CameraUniforms = {
  fov: number;
  far: number;
};

export type ControlsUniforms = {
  distance: { min: number; max: number };
  polar: { min: number; max: number };
  azimuth: { min: number; max: number };
  default?: {
    polar: number;
    azimuth: number;
  };
  offsetAzimuth: number;
  enabled: boolean;
  panEasing: number;
};

export type RendererUniforms = {
  alpha: false;
  shadowType: number;
  exposure: number;
};

export type Uniforms = {
  physics: boolean;
  sky: SkyUniforms;
  light: LightUniforms;
  camera: CameraUniforms;
  controls: ControlsUniforms;
  renderer: RendererUniforms;
};
