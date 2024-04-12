import * as THREE from 'three';
import { LightUniforms } from '../types';
type TY = {
    target: THREE.Mesh;
    offsetY: number;
};
export default class Light {
    private options;
    lights: {
        point?: THREE.PointLight;
        spot?: THREE.SpotLight;
    };
    target: THREE.Object3D<THREE.Event> | undefined;
    constructor(Scene: THREE.Scene, options: LightUniforms);
    update(options: TY): void;
}
export {};
