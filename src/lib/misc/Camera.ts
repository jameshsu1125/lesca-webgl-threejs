import { CameraUniforms } from '../types';
import * as THREE from 'three';
import { camera as config } from '../config';

const { innerWidth, innerHeight } = window;

export default class Camera {
  private options: CameraUniforms;
  public camera: THREE.PerspectiveCamera;

  constructor(options: CameraUniforms) {
    this.options = { ...config, ...options };
    const { fov, far } = this.options;

    this.camera = new THREE.PerspectiveCamera(fov, innerWidth / innerHeight, 0.1, far);
  }
}
