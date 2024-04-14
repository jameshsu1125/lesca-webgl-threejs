import { CameraType, CameraTypes, CameraUniforms } from '../types';
import * as THREE from 'three';
import { camera as config } from '../config';

const { innerWidth, innerHeight } = window;

export default class Camera {
  private options: CameraUniforms;
  public camera: CameraTypes;

  constructor(options: CameraUniforms) {
    this.options = { ...config, ...options };
    const { fov, far, dom, type } = this.options;

    const width: Number = dom instanceof HTMLElement ? dom.clientWidth : innerWidth;
    const height: Number = dom instanceof HTMLElement ? dom.clientHeight : innerHeight;

    if (type === CameraType.orthographic) {
      this.camera = new THREE.OrthographicCamera(
        Number(width) / -2,
        Number(width) / 2,
        Number(height) / 2,
        Number(height) / -2,
        0.01,
        far,
      );
      this.camera.zoom = fov;
    } else {
      this.camera = new THREE.PerspectiveCamera(fov, Number(width) / Number(height), 0.01, far);
    }
    this.camera.position.set(0, 0, -10);
  }
}
