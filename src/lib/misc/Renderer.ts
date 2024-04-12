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
    renderer.outputEncoding = outputEncoding;

    this.update = (
      Camera: THREE.OrthographicCamera | THREE.PerspectiveCamera,
      dom: HTMLElement,
    ) => {
      const { innerWidth, innerHeight } = window;

      const width: number = dom instanceof HTMLElement ? dom.clientWidth : innerWidth;
      const height: number = dom instanceof HTMLElement ? dom.clientHeight : innerHeight;

      if (Camera instanceof THREE.PerspectiveCamera) Camera.aspect = width / height;
      else {
        Camera.left = width / -2;
        Camera.right = width / 2;
        Camera.top = height / 2;
        Camera.bottom = height / -2;
      }

      Camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    this.resize = (
      camera: THREE.OrthographicCamera | THREE.PerspectiveCamera,
      dom: HTMLElement,
    ) => {
      this.update(camera, dom);
      window.addEventListener('resize', () => {
        this.update(camera, dom);
        setTimeout(() => this.update(camera, dom), 500);
      });
    };

    this.renderer = renderer;
  }
}
