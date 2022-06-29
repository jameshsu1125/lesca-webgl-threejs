import { CameraUniforms, ControlsUniforms, SkyUniforms, LightUniforms, RendererUniforms } from './types';
declare const camera: CameraUniforms;
declare const sky: SkyUniforms;
declare const controls: ControlsUniforms;
declare const light: LightUniforms;
declare const renderer: RendererUniforms;
declare const physics = false;
declare const Config: {
    fps: number;
    camera: CameraUniforms;
    sky: SkyUniforms;
    controls: ControlsUniforms;
    light: LightUniforms;
    renderer: RendererUniforms;
    physics: boolean;
    stats: boolean;
};
export default Config;
export { camera, sky, controls, light, renderer, physics };
