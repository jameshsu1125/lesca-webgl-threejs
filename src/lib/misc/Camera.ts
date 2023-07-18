import { CameraUniforms } from '../types';
import * as THREE from 'three';
import { camera as config } from '../config';

const { innerWidth, innerHeight } = window;

export default class Camera {
  private options: CameraUniforms;
  public camera: THREE.PerspectiveCamera;

  constructor(options: CameraUniforms) {
    this.options = { ...config, ...options };
    const { fov, far, dom } = this.options;

    const width: Number = dom instanceof HTMLElement ? dom.clientWidth : innerWidth;
    const height: Number = dom instanceof HTMLElement ? dom.clientHeight : innerHeight;

    this.camera = new THREE.PerspectiveCamera(fov, Number(width) / Number(height), 0.1, far);
  }
}
