import { ControlsUniforms } from '../types';
import * as THREE from 'three';
import { controls as config } from '../config';

const Orbit = require('lesca-threejs-orbitcontrols').OrbitControls;
const Controls = new Orbit(THREE);

const degreeToradian = (degree: number) => {
  return (Math.PI / 180) * degree;
};

type PAT = {
  polar?: Number;
  azimuth?: Number;
  target: THREE.Vector3;
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
    this.controls.minZoom = distance.min;
    this.controls.maxDistance = distance.max;
    this.controls.maxZoom = distance.max;

    this.azimuthAngle = this.controls.getPolarAngle();

    if (this.options.default) {
      const { polar, azimuth } = this.options.default;
      if (polar !== undefined) this.controls.setPolarAngle(degreeToradian(90 - polar));
      if (azimuth !== undefined) this.controls.setAzimuthalAngle(degreeToradian(azimuth));
    }
  }

  fixed(config: PAT = { target: new THREE.Vector3(0, 0, 0) }) {
    const { polar, azimuth, target } = config;

    if (polar !== undefined && polar !== null) {
      this.controls.maxPolarAngle = degreeToradian(90 + Number(polar));
      this.controls.minPolarAngle = degreeToradian(90 - Number(polar));
    }

    if (azimuth !== undefined && azimuth !== null) {
      this.controls.maxAzimuthAngle = degreeToradian(Number(azimuth));
      this.controls.minAzimuthAngle = degreeToradian(Number(azimuth));
    }

    this.lookAt(target);
  }

  lookAt(vec: THREE.Vector3 = new THREE.Vector3(0, 0, 0)) {
    this.controls.target.set(vec.x, vec.y, vec.z);
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
