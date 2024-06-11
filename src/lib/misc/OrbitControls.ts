import { ControlsUniforms } from '../types';
import * as THREE from 'three';
import { controls as config } from '../config';

const Orbit = require('lesca-threejs-orbitcontrols').OrbitControls;
const Controls = new Orbit(THREE);

const degreeToRadian = (degree: number) => {
  return (Math.PI / 180) * degree;
};

const radianToDegree = (radian: number) => {
  return radian / (Math.PI / 180);
};

type PAT = {
  polar?: number;
  azimuth?: number;
  target: THREE.Vector3;
};

type PAD = {
  polar?: number;
  azimuth?: number;
  distance?: number;
};

export default class OrbitControls {
  private options: ControlsUniforms;
  public controls: any;
  public azimuthAngle: number;
  private camera: THREE.Camera;

  constructor(Camera: THREE.Camera, Renderer: THREE.WebGLRenderer, options: ControlsUniforms) {
    this.options = { ...config, ...options };
    const { polar, azimuth, enabled, damping, dampingFactor } = this.options;
    this.controls = new Controls(Camera, Renderer.domElement);
    this.camera = Camera;
    this.controls.enabled = enabled;

    this.controls.maxPolarAngle = degreeToRadian(90 - polar.min);
    this.controls.minPolarAngle = degreeToRadian(90 - polar.max);

    this.controls.maxAzimuthAngle = degreeToRadian(azimuth.max);
    this.controls.minAzimuthAngle = degreeToRadian(azimuth.min);

    this.azimuthAngle = this.controls.getPolarAngle();

    this.controls.setPolarAngle(degreeToRadian(90 - this.options.default.polar));
    this.controls.setAzimuthalAngle(degreeToRadian(this.options.default.azimuth));
    this.setDistance(this.options.default.distance);

    if (damping) {
      this.controls.enablePan = false;
      this.controls.enableZoom = false;
      this.controls.enableDamping = true;
      this.controls.minPolarAngle = 0.8;
      this.controls.maxPolarAngle = 2.4;
      this.controls.dampingFactor = Math.max(0.05 - (dampingFactor - 1) * 0.05, 0.001);
      this.controls.rotateSpeed = 0.07;
    }
  }

  setDistance(value: number) {
    const { distance } = this.options;

    this.controls.minDistance = value;
    this.controls.maxDistance = value;

    requestAnimationFrame(() => {
      this.controls.minDistance = distance.min;
      this.controls.minZoom = distance.min;
      this.controls.maxDistance = distance.max;
      this.controls.maxZoom = distance.max;
    });
  }

  fixed(config: PAT = { target: new THREE.Vector3(0, 0, 0) }) {
    const { polar, azimuth, target } = config;

    if (polar !== undefined && polar !== null) {
      this.controls.maxPolarAngle = degreeToRadian(90 + Number(polar));
      this.controls.minPolarAngle = degreeToRadian(90 - Number(polar));
    }

    if (azimuth !== undefined && azimuth !== null) {
      this.controls.maxAzimuthAngle = degreeToRadian(Number(azimuth));
      this.controls.minAzimuthAngle = degreeToRadian(Number(azimuth));
    }

    this.lookAt(target);
  }

  getDistance() {
    const { target } = this.controls;
    const { x: x1, y: y1, z: z1 } = target;
    const { x: x2, y: y2, z: z2 } = this.camera.position;
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) + Math.pow(z2 - z1, 2));
  }

  get() {
    const polar = 90 - radianToDegree(this.controls.getPolarAngle());
    const azimuth = radianToDegree(this.controls.getAzimuthalAngle());
    const distance = this.getDistance();
    return { polar, azimuth, distance };
  }

  set(config: PAD) {
    const { polar, azimuth, distance } = config;
    if (polar) {
      this.controls.maxPolarAngle = degreeToRadian(90 - polar);
      this.controls.minPolarAngle = degreeToRadian(90 - polar);
    }
    if (azimuth) {
      this.controls.maxAzimuthAngle = degreeToRadian(azimuth);
      this.controls.minAzimuthAngle = degreeToRadian(azimuth);
    }
    if (distance) {
      this.controls.minDistance = distance;
      this.controls.maxDistance = distance;
    }
  }

  lookAt(vec: THREE.Vector3 = new THREE.Vector3(0, 0, 0)) {
    this.controls.target.set(vec.x, vec.y, vec.z);
  }

  chase(mesh: THREE.Mesh, height = 1) {
    const { offsetAzimuth, panEasing } = this.options;

    this.controls.target.set(mesh.position.x, mesh.position.y + height, mesh.position.z);
    this.azimuthAngle +=
      (mesh.rotation.y + degreeToRadian(offsetAzimuth) - this.azimuthAngle) / panEasing;

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

    this.controls.maxPolarAngle = degreeToRadian(90 - polar.min);
    this.controls.minPolarAngle = degreeToRadian(90 - polar.max);
  }
}
