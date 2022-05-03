import * as THREE from 'three';
import { light as config } from '../config';
import { LightUniforms } from '../types';

export default class Light {
  private options: LightUniforms;
  public light: THREE.PointLight;

  constructor(Scene: THREE.Scene, options: LightUniforms) {
    this.options = { ...config, ...options };

    const { color, intensity, position, shadowMapSize } = this.options;

    const light = new THREE.AmbientLight(color, 1);
    Scene.add(light);

    const pointLight = new THREE.PointLight(color, intensity, 100);
    pointLight.castShadow = true;
    pointLight.position.setY(position.y);
    Scene.add(pointLight);

    pointLight.shadow.mapSize.width = shadowMapSize;
    pointLight.shadow.mapSize.height = shadowMapSize;

    // const helper = new THREE.PointLightHelper(pointLight);
    // Scene.add(helper);

    this.light = pointLight;
  }

  update(position: THREE.Vector3) {
    const { x, y, z } = this.options.position;
    this.light.position.set(position.x + x, position.y + y, position.z + z);
  }
}
