import * as THREE from 'three';
import { LightUniforms } from '../types';
export default class Light {
    private options;
    lights: (THREE.PointLight | THREE.SpotLight | THREE.DirectionalLight | THREE.HemisphereLight)[];
    target: THREE.Object3D | undefined;
    constructor(Scene: THREE.Scene, options: LightUniforms);
}
