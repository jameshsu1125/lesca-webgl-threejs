import * as THREE from 'three';
import { RendererUniforms } from '../types';
export default class Renderer {
    private options;
    resize: Function;
    renderer: THREE.WebGLRenderer;
    update: Function;
    constructor(options: RendererUniforms);
}
