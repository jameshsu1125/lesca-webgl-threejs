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
  public lights: {
    point?: THREE.PointLight;
    spot?: THREE.SpotLight;
  };
  public target: THREE.Object3D<THREE.Object3DEventMap> | undefined;

  constructor(Scene: THREE.Scene, options: LightUniforms) {
    this.options = { ...config, ...options };
    this.lights = {};
    this.target = undefined;

    const { ambient, spot, point, shadowMapSize, debug } = this.options;

    const light = new THREE.AmbientLight(ambient.color, ambient.intensity);
    Scene.add(light);

    if (options.point) {
      const pointLight = new THREE.PointLight(point.color, point.intensity, point.distance);
      pointLight.castShadow = true;
      pointLight.decay = point.decay;

      pointLight.shadow.mapSize.width = shadowMapSize;
      pointLight.shadow.mapSize.height = shadowMapSize;

      const { x, y, z } = point.position;
      pointLight.position.set(x, y, z);

      Scene.add(pointLight);
      this.lights.point = pointLight;

      if (debug) {
        const helper = new THREE.PointLightHelper(pointLight);
        Scene.add(helper);
      }
    }

    if (options.spot) {
      const spotLight = new THREE.SpotLight(spot.color, spot.intensity, spot.distance);
      spotLight.castShadow = true;
      spotLight.angle = Math.PI * 0.12;
      spotLight.penumbra = 1;
      spotLight.decay = point.decay;
      spotLight.shadow.mapSize.width = shadowMapSize;
      spotLight.shadow.mapSize.height = shadowMapSize;

      const { x, y, z } = spot.position;
      spotLight.position.set(x, y, z);

      Scene.add(spotLight);
      this.target = spotLight.target;
      this.lights.spot = spotLight;

      if (debug) {
        const helper = new THREE.SpotLightHelper(spotLight);
        Scene.add(helper);
      }
    }
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
