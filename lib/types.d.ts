export declare type SkyUniforms = {
    enabled: boolean;
    turbidity: number;
    rayleigh: number;
    mieCoefficient: number;
    mieDirectionalG: number;
    inclination: number;
    azimuth: number;
};
export declare type LightUniforms = {
    color: number;
    intensity: number;
    position: {
        x: number;
        y: number;
        z: number;
    };
    shadowMapSize: number;
};
export declare type CameraUniforms = {
    fov: number;
    far: number;
    dom?: HTMLElement;
};
export declare type ControlsUniforms = {
    distance: {
        min: number;
        max: number;
    };
    polar: {
        min: number;
        max: number;
    };
    azimuth: {
        min: number;
        max: number;
    };
    default?: {
        polar: number;
        azimuth: number;
    };
    offsetAzimuth: number;
    enabled: boolean;
    panEasing: number;
};
export declare type RendererUniforms = {
    alpha: false;
    shadowType: number;
    exposure: number;
    outputEncoding: number;
    physicallyCorrectLights: boolean;
};
export declare type Uniforms = {
    physics: boolean;
    stats: boolean;
    sky: SkyUniforms;
    light: LightUniforms;
    camera: CameraUniforms;
    controls: ControlsUniforms;
    renderer: RendererUniforms;
};
