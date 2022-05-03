import * as THREE from 'three';
import { Sky } from 'three/examples/jsm/objects/Sky';
import { SkyUniforms } from '../types';
export default class SkySun {
    private options;
    sky: Sky;
    sun: THREE.Vector3;
    constructor(options: SkyUniforms);
    update(): void;
}
