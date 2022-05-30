import * as THREE from 'three';
import { LightUniforms } from '../types';
declare type TY = {
    target: THREE.Mesh;
    offsetY: number;
};
export default class Light {
    private options;
    light: THREE.PointLight;
    constructor(Scene: THREE.Scene, options: LightUniforms);
    update(options: TY): void;
}
export {};
