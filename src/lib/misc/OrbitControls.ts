import { ControlsUniforms } from '../types';
import * as THREE from 'three';
import { controls as config } from '../config';

const Orbit = require('lesca-threejs-orbitcontrols').OrbitControls;
const Controls = new Orbit(THREE);

const degreeToradian = (degree: number) => {
  return (Math.PI / 180) * degree;
};

export default class OrbitControls {
  private options: ControlsUniforms;
  public controls: any;
  public azimuthAngle: number;

  constructor(Camera: THREE.Camera, Renderer: THREE.WebGLRenderer, options: ControlsUniforms) {
    this.options = { ...config, ...options };
    const { distance, polar, azimuth, enabled } = this.options;
    this.controls = new Controls(Camera, Renderer.domElement);
    this.controls.enabled = enabled;

    this.controls.maxPolarAngle = degreeToradian(90 - polar.min);
    this.controls.minPolarAngle = degreeToradian(90 - polar.max);

    this.controls.maxAzimuthAngle = degreeToradian(azimuth.max);
    this.controls.minAzimuthAngle = degreeToradian(azimuth.min);

    this.controls.minDistance = distance.min;
    this.controls.maxDistance = distance.max;

    this.azimuthAngle = this.controls.getPolarAngle();
  }

  chase(mesh: THREE.Mesh, height = 1) {
    const { offsetAzimuth, panEasing } = this.options;

    this.controls.target.set(mesh.position.x, mesh.position.y + height, mesh.position.z);
    this.azimuthAngle +=
      (mesh.rotation.y + degreeToradian(offsetAzimuth) - this.azimuthAngle) / panEasing;

    this.controls.maxAzimuthAngle = this.azimuthAngle;
    this.controls.minAzimuthAngle = this.azimuthAngle;
  }

  lock() {
    const polar = this.controls.getPolarAngle();

    this.controls.maxPolarAngle = polar;
    this.controls.minPolarAngle = polar;
  }

  unlock() {
    const { polar } = this.options;

    this.controls.maxPolarAngle = degreeToradian(90 - polar.min);
    this.controls.minPolarAngle = degreeToradian(90 - polar.max);
  }
}
