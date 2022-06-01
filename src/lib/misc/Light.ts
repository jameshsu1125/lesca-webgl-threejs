import * as THREE from 'three';
import { light as config, light } from '../config';
import { LightUniforms } from '../types';

type TY = {
  target: THREE.Mesh;
  offsetY: number;
};

const defaultTY = {
  target: new THREE.Mesh(),
  offset: light.spot.position.y,
};

export default class Light {
  private options: LightUniforms;
  public light: THREE.PointLight;
  public taregt: THREE.Object3D<THREE.Event>;

  constructor(Scene: THREE.Scene, options: LightUniforms) {
    this.options = { ...config, ...options };

    const { ambient, spot, shadowMapSize, debug } = this.options;

    const light = new THREE.AmbientLight(ambient.color, ambient.intensity);
    Scene.add(light);

    const spotLight = new THREE.SpotLight(spot.color, spot.intensity, spot.far);
    spotLight.castShadow = true;
    spotLight.angle = Math.PI * 0.12;
    spotLight.penumbra = 1;
    spotLight.distance = spot.far;
    spotLight.decay = 0.5;

    this.taregt = spotLight.target;
    Scene.add(this.taregt);

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
    this.taregt.position.set(target.position.x, target.position.y, target.position.z);
  }
}
