import { ControlsUniforms } from '../types';
import * as THREE from 'three';
export default class OrbitControls {
    private options;
    controls: any;
    azimuthAngle: number;
    constructor(Camera: THREE.Camera, Renderer: THREE.WebGLRenderer, options: ControlsUniforms);
    lookAt(vec?: THREE.Vector3): void;
    chase(mesh: THREE.Mesh, height?: number): void;
    lock(): void;
    unlock(): void;
}
