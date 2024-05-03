import * as THREE from 'three';
import { light as config } from '../config';
import { LightUniforms } from '../types';

type TY = {
  target: THREE.Mesh;
  offsetY: number;
};

const defaultTY = {
  target: new THREE.Mesh(),
  offset: config.lights[0].position.y,
};

export default class Light {
  private options: LightUniforms;
  public lights: {
    point?: THREE.PointLight;
    spot?: THREE.SpotLight;
  };
  public target: THREE.Object3D | undefined;

  constructor(Scene: THREE.Scene, options: LightUniforms) {
    this.options = { ...config, ...options };
    this.lights = {};
    this.target = undefined;

    const { ambient, lights, shadowMapSize, debug } = this.options;

    if (ambient.enabled) {
      const light = new THREE.AmbientLight(ambient.color, ambient.intensity);
      Scene.add(light);
    }

    lights.forEach((light) => {
      if (light.type === 'point') {
        if (!light.enabled) return;
        const pointLight = new THREE.PointLight(light.color, light.intensity, light.distance);
        pointLight.castShadow = light.castShadow;
        pointLight.decay = light.decay;
        pointLight.shadow.bias = light.bias;
        pointLight.shadow.blurSamples = light.blurSamples;

        pointLight.shadow.mapSize.width = shadowMapSize;
        pointLight.shadow.mapSize.height = shadowMapSize;

        const { x, y, z } = light.position;
        pointLight.position.set(x, y, z);

        Scene.add(pointLight);
        this.lights.point = pointLight;

        if (debug) {
          const helper = new THREE.PointLightHelper(pointLight);
          Scene.add(helper);
        }
      } else {
        if (!light.enabled) return;
        const spotLight = new THREE.SpotLight(light.color, light.intensity, light.distance);
        spotLight.castShadow = light.castShadow;
        spotLight.angle = light.angle;
        spotLight.penumbra = light.penumbra;
        spotLight.decay = light.decay;
        spotLight.shadow.mapSize.width = shadowMapSize;
        spotLight.shadow.mapSize.height = shadowMapSize;
        spotLight.shadow.bias = light.bias;
        spotLight.shadow.blurSamples = light.blurSamples;

        const { x, y, z } = light.position;
        spotLight.position.set(x, y, z);

        Scene.add(spotLight);
        this.target = spotLight.target;
        this.lights.spot = spotLight;

        if (debug) {
          const helper = new THREE.SpotLightHelper(spotLight);
          Scene.add(helper);
        }
      }
    });
  }

  update(options: TY) {
    if (!options.target) console.warn('[lesca-webgl-threejs]Three is no target[Mesh] to follow.');
    const opt = { ...defaultTY, ...options };
    const { target, offsetY } = opt;
    const { spot, point } = this.lights;
    if (spot) {
      spot.position.set(target.position.x, target.position.y + offsetY, target.position.z);
      this.target?.position.set(target.position.x, target.position.y, target.position.z);
    }
    if (point) {
      point.position.set(target.position.x, target.position.y + offsetY, target.position.z);
    }
  }
}
