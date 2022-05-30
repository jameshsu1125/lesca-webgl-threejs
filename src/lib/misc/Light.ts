import * as THREE from 'three';
import { light as config } from '../config';
import { LightUniforms } from '../types';

type TY = {
  target: THREE.Mesh;
  offsetY: number;
};

const defaultTY = {
  target: new THREE.Mesh(),
  offset: 15,
};

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

  update(options: TY) {
    if (!options.target) console.warn('[lesca-webgl-threejs]Three is no target[Mesh] to follow.');
    const opt = { ...defaultTY, ...options };
    const { target, offsetY } = opt;
    this.light.position.set(target.position.x, target.position.y + offsetY, target.position.z);
  }
}
