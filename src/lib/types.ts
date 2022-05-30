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
  ambient: {
    color: number;
    intensity: number;
  };
  spot: {
    color: number;
    intensity: number;
    far: number;
    position: {
      x: number;
      y: number;
      z: number;
    };
  };
  shadowMapSize: number;
  debug: Boolean;
};

export type CameraUniforms = {
  zoom: number;
  far: number;
  dom?: HTMLElement;
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
  outputEncoding: number;
  physicallyCorrectLights: boolean;
};

export type Uniforms = {
  physics: boolean;
  stats: boolean;
  sky: SkyUniforms;
  light: LightUniforms;
  camera: CameraUniforms;
  controls: ControlsUniforms;
  renderer: RendererUniforms;
};
