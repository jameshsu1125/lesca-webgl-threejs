import * as THREE from 'three';
import { light as config } from '../config';
import { LightUniforms } from '../types';

export default class Light {
  private options: LightUniforms;
  public light: THREE.PointLight;

  constructor(Scene: THREE.Scene, options: LightUniforms) {
    this.options = { ...config, ...options };

    const { ambient, spot, shadowMapSize, debug } = this.options;

    const light = new THREE.AmbientLight(ambient.color, ambient.intensity);
    Scene.add(light);

    const spotLight = new THREE.SpotLight(spot.color, spot.intensity, 3);
    spotLight.castShadow = true;
    spotLight.angle = Math.PI * 0.12;
    spotLight.penumbra = 1;
    spotLight.distance = 3;
    spotLight.decay = 0.5;

    const { x, y, z } = spot.position;
    spotLight.position.set(x, y, z);
    Scene.add(spotLight);

    spotLight.shadow.mapSize.width = shadowMapSize;
    spotLight.shadow.mapSize.height = shadowMapSize;

    if (debug) {
      const helper = new THREE.SpotLightHelper(spotLight);
      Scene.add(helper);
    }

    this.light = spotLight;
  }

  update(position: THREE.Vector3, offsetY = 15) {
    this.light.position.set(position.x, position.y + offsetY, position.z);
  }
}
