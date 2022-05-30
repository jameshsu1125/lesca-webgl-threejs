import * as THREE from 'three';
import { LightUniforms } from '../types';
export default class Light {
    private options;
    light: THREE.PointLight;
    constructor(Scene: THREE.Scene, options: LightUniforms);
    update(position: THREE.Vector3, offsetY?: number): void;
}
