import { CameraUniforms } from '../types';
import * as THREE from 'three';
import { camera as config } from '../config';

const { innerWidth, innerHeight } = window;

export default class Camera {
  private options: CameraUniforms;
  public camera: THREE.OrthographicCamera;

  constructor(options: CameraUniforms) {
    this.options = { ...config, ...options };
    const { zoom, far, dom } = this.options;

    const width: Number = dom instanceof HTMLElement ? dom.clientWidth : innerWidth;
    const height: Number = dom instanceof HTMLElement ? dom.clientHeight : innerHeight;

    this.camera = new THREE.OrthographicCamera(
      Number(width) / -2,
      Number(width) / 2,
      Number(height) / 2,
      Number(height) / -2,
      0.01,
      far,
    );
    this.camera.zoom = zoom;
  }
}
