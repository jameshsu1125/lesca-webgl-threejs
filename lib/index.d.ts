/// <reference types="cannon-es" />
import * as THREE from 'three';
import Light from './misc/Light';
import Control from './misc/OrbitControls';
import Renderer from './misc/Renderer';
import Sky from './misc/Sky';
import { Uniforms } from './types';
export default class Webgl {
    private options;
    renderer: Renderer;
    private update;
    scene: THREE.Scene;
    camera: THREE.Camera;
    light: Light;
    render: THREE.WebGLRenderer;
    controls: Control;
    clock: THREE.Clock;
    sky: Sky;
    physicsImpactMaterial: import('material/Material').Material;
    physicsStaticMaterial: import('material/Material').Material;
    world: import('world/World').World;
    stats: any;
    enterframe: any;
    constructor(options: Uniforms);
    setFPS(fps: number): void;
    addCannonDebuger(): any;
    updateMatrix(dom?: HTMLElement): void;
}
export { THREE };
