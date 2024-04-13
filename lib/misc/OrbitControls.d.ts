import { ControlsUniforms } from '../types';
import * as THREE from 'three';
type PAT = {
    polar?: number;
    azimuth?: number;
    target: THREE.Vector3;
};
type PAD = {
    polar?: number;
    azimuth?: number;
    distance?: number;
};
export default class OrbitControls {
    private options;
    controls: any;
    azimuthAngle: number;
    private camera;
    constructor(Camera: THREE.Camera, Renderer: THREE.WebGLRenderer, options: ControlsUniforms);
    fixed(config?: PAT): void;
    getDistance(): number;
    get(): {
        polar: number;
        azimuth: number;
        distance: number;
    };
    set(config: PAD): void;
    lookAt(vec?: THREE.Vector3): void;
    chase(mesh: THREE.Mesh, height?: number): void;
    lock(): void;
    unlock(): void;
}
export {};
