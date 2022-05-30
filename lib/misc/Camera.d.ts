import { CameraUniforms } from '../types';
import * as THREE from 'three';
export default class Camera {
    private options;
    camera: THREE.OrthographicCamera;
    constructor(options: CameraUniforms);
}
