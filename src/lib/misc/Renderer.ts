import * as THREE from 'three';
import { RendererUniforms } from '../types';
import { renderer as config } from '../config';

const { devicePixelRatio } = window;

export default class Renderer {
  private options: RendererUniforms;
  public resize: Function;
  public renderer: THREE.WebGLRenderer;
  public update: Function;

  constructor(options: RendererUniforms) {
    this.options = { ...config, ...options };
    const { alpha, shadowType, exposure, outputEncoding, preserveDrawingBuffer } = this.options;

    const renderer = new THREE.WebGLRenderer({ alpha, preserveDrawingBuffer });

    renderer.setPixelRatio(devicePixelRatio);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = shadowType as THREE.ShadowMapType;
    renderer.toneMappingExposure = exposure;
    // renderer.physicallyCorrectLights = physicallyCorrectLights;
    renderer.outputEncoding = outputEncoding;

    this.update = (Camera: THREE.OrthographicCamera, dom: HTMLElement) => {
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

    this.resize = (camera: THREE.OrthographicCamera, dom: HTMLElement) => {
      this.update(camera, dom);
      window.addEventListener('resize', () => {
        this.update(camera, dom);
        setTimeout(() => this.update(camera, dom), 500);
      });
    };

    this.renderer = renderer;
  }
}
