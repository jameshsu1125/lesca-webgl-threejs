import * as THREE from 'three';
import { RendererUniforms } from '../types';
import { renderer as config } from '../config';

const { devicePixelRatio } = window;

export default class Renderer {
  private options: RendererUniforms;
  public resize: Function;
  public renderer: THREE.WebGLRenderer;

  constructor(options: RendererUniforms) {
    this.options = { ...config, ...options };
    const { alpha, shadowType, exposure } = this.options;

    const renderer = new THREE.WebGLRenderer({ alpha });

    renderer.setPixelRatio(devicePixelRatio);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = shadowType;
    renderer.toneMappingExposure = exposure;

    this.resize = (Camera: THREE.PerspectiveCamera) => {
      const rendererSetSize = () => {
        const { innerWidth, innerHeight } = window;
        Camera.aspect = innerWidth / innerHeight;
        Camera.updateProjectionMatrix();
        renderer.setSize(innerWidth, innerHeight);
      };
      rendererSetSize();
      window.addEventListener('resize', rendererSetSize);
    };

    this.renderer = renderer;
  }
}
