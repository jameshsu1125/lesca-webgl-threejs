import * as THREE from 'three';
import { CameraTypes, RendererUniforms } from '../types';
export default class Renderer {
    private dom;
    private options;
    renderer: THREE.WebGLRenderer;
    private camera;
    update: () => void;
    addListeners: () => void;
    removeListeners: () => void;
    updateDom: (dom: HTMLElement) => void;
    constructor(options: RendererUniforms, dom: HTMLElement | null | undefined, camera: CameraTypes);
}
