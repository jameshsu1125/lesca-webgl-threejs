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
    const { alpha, shadowType, exposure, outputEncoding, physicallyCorrectLights } = this.options;

    const renderer = new THREE.WebGLRenderer({ alpha });

    renderer.setPixelRatio(devicePixelRatio);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = shadowType;
    renderer.toneMappingExposure = exposure;
    renderer.physicallyCorrectLights = physicallyCorrectLights;
    renderer.outputEncoding = outputEncoding;

    this.resize = (Camera: THREE.OrthographicCamera, dom: HTMLElement) => {
      const rendererSetSize = () => {
        const { innerWidth, innerHeight } = window;

        const width: number = dom instanceof HTMLElement ? dom.clientWidth : innerWidth;
        const height: number = dom instanceof HTMLElement ? dom.clientHeight : innerHeight;

        Camera.left = Number(width) / -2;
        Camera.right = Number(width) / 2;
        Camera.top = Number(height) / 2;
        Camera.bottom = Number(height) / -2;

        Camera.updateProjectionMatrix();
        renderer.setSize(width || innerWidth, height || innerHeight);
      };
      rendererSetSize();
      setTimeout(() => rendererSetSize(), 500);
      window.addEventListener('resize', rendererSetSize);
    };

    this.renderer = renderer;
  }
}
