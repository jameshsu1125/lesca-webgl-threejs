import { CameraUniforms } from '../types';
import * as THREE from 'three';
export default class Camera {
    private options;
    camera: THREE.PerspectiveCamera;
    constructor(options: CameraUniforms);
}
