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
  public lights: (
    | THREE.PointLight
    | THREE.SpotLight
    | THREE.DirectionalLight
    | THREE.HemisphereLight
  )[];
  public target: THREE.Object3D | undefined;

  constructor(Scene: THREE.Scene, options: LightUniforms) {
    this.options = { ...config, ...options };
    this.lights = [];
    this.target = undefined;

    const { ambient, lights, shadowMapSize, debug } = this.options;

    if (ambient.enabled) {
      const light = new THREE.AmbientLight(ambient.color, ambient.intensity);
      Scene.add(light);
    }

    this.lights = lights.map((light) => {
      switch (light.type) {
        case 'spot':
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

          if (debug) {
            const helper = new THREE.SpotLightHelper(spotLight);
            Scene.add(helper);
          }

          return spotLight;

        case 'hemisphere':
          if (!light.enabled) return;
          const hemisphereLight = new THREE.HemisphereLight(
            light.color,
            light.groundColor,
            light.intensity,
          );
          hemisphereLight.position.set(light.position.x, light.position.y, light.position.z);
          Scene.add(hemisphereLight);

          if (debug) {
            const helper = new THREE.HemisphereLightHelper(hemisphereLight, 5);
            Scene.add(helper);
          }

          return hemisphereLight;

        case 'direct':
          if (!light.enabled) return;
          const directLight = new THREE.DirectionalLight(light.color, light.intensity);
          directLight.position.set(light.position.x, light.position.y, light.position.z);
          Scene.add(directLight);

          if (debug) {
            const helper = new THREE.DirectionalLightHelper(directLight);
            Scene.add(helper);
          }

          return directLight;

        default:
        case 'point':
          if (!light.enabled) return;
          const pointLight = new THREE.PointLight(light.color, light.intensity, light.distance);
          pointLight.castShadow = light.castShadow;
          pointLight.decay = light.decay;
          pointLight.shadow.bias = light.bias;
          pointLight.shadow.blurSamples = light.blurSamples;
          pointLight.shadow.mapSize.width = shadowMapSize;
          pointLight.shadow.mapSize.height = shadowMapSize;
          pointLight.position.set(light.position.x, light.position.y, light.position.z);
          Scene.add(pointLight);

          if (debug) {
            const helper = new THREE.PointLightHelper(pointLight);
            Scene.add(helper);
          }
          return pointLight;
      }
    }) as typeof this.lights;
  }
}
