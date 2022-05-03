import * as THREE from 'three';
import { Sky } from 'three/examples/jsm/objects/Sky';
import { SkyUniforms } from '../types';
import { sky as config } from '../config';

export default class SkySun {
  private options: SkyUniforms;
  public sky: Sky;
  public sun: THREE.Vector3;

  constructor(options: SkyUniforms) {
    this.options = { ...config, ...options };
    this.sky = new Sky();
    this.sky.scale.setScalar(1000);

    const { turbidity, rayleigh, mieDirectionalG, mieCoefficient } = this.options;

    this.sky.material.uniforms = {
      ...this.sky.material.uniforms,
      turbidity: { value: turbidity },
      rayleigh: { value: rayleigh },
      mieDirectionalG: { value: mieDirectionalG },
      mieCoefficient: { value: mieCoefficient },
    };

    console.log(this.sky.material.uniforms);

    this.sun = new THREE.Vector3();
    this.update();
  }

  update() {
    const { inclination, azimuth } = this.options;
    const theta = Math.PI * (inclination - 0.5);
    const phi = 2 * Math.PI * (azimuth - 0.5);
    this.sun.x = Math.cos(phi);
    this.sun.y = Math.sin(phi) * Math.sin(theta);
    this.sun.z = Math.sin(phi) * Math.cos(theta);
    this.sky.material.uniforms.sunPosition.value.copy(this.sun);
  }
}
