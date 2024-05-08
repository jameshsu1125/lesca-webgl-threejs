import * as THREE from 'three';
import { renderer as config } from '../config';
import { CameraTypes, RendererUniforms } from '../types';

const { devicePixelRatio } = window;

export default class Renderer {
  private dom: HTMLElement | null;
  private options: RendererUniforms;
  public renderer: THREE.WebGLRenderer;
  private camera: CameraTypes;
  public update: () => void;
  public addListeners: () => void;
  public removeListeners: () => void;
  public updateDom: (dom: HTMLElement) => void;

  constructor(options: RendererUniforms, dom: HTMLElement | null = null, camera: CameraTypes) {
    this.options = { ...config, ...options };
    const { alpha, shadowType, exposure, outputEncoding, preserveDrawingBuffer } = this.options;
    const renderer = new THREE.WebGLRenderer({ alpha, preserveDrawingBuffer, antialias: true });

    renderer.setPixelRatio(devicePixelRatio);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = shadowType as THREE.ShadowMapType;
    renderer.toneMappingExposure = exposure;
    renderer.outputColorSpace = outputEncoding;
    renderer.setClearColor(this.options.background.color, this.options.background.alpha);

    this.dom = dom;
    this.camera = camera;

    this.update = () => {
      const { innerWidth, innerHeight } = window;

      const width: number = this.dom instanceof HTMLElement ? this.dom.clientWidth : innerWidth;
      const height: number = this.dom instanceof HTMLElement ? this.dom.clientHeight : innerHeight;

      if (this.camera instanceof THREE.PerspectiveCamera) this.camera.aspect = width / height;
      else {
        this.camera.left = width / -2;
        this.camera.right = width / 2;
        this.camera.top = height / 2;
        this.camera.bottom = height / -2;
      }

      this.camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    this.updateDom = (dom: HTMLElement) => {
      this.dom = dom;
    };

    this.addListeners = () => {
      this.update();
      window.addEventListener('resize', this.update);
    };

    this.removeListeners = () => {
      window.removeEventListener('resize', this.update);
    };

    this.renderer = renderer;
  }
}
