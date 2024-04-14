/// <reference types="cannon-es" />
import * as THREE from 'three';
import Light from './misc/Light';
import Control from './misc/OrbitControls';
import Renderer from './misc/Renderer';
import Sky from './misc/Sky';
import { CameraTypes, Uniforms } from './types';
export default class Webgl {
    private options;
    renderer: Renderer;
    private update;
    scene: THREE.Scene;
    camera: CameraTypes;
    light: Light;
    render: THREE.WebGLRenderer;
    controls: Control;
    clock: THREE.Clock;
    sky: Sky;
    physicsImpactMaterial: import('material/Material').Material;
    physicsStaticMaterial: import('material/Material').Material;
    world: import('world/World').World;
    stats: any;
    enterframe: {
        add: (doSomething: Function) => void;
        todo: {
            do: Function;
            list: Function[];
        };
        play: () => void;
        stop: () => void;
        destroy: () => void;
        undo: () => void;
        setFPS: (value?: number | undefined) => void;
        reset: () => void;
    };
    constructor(options: Uniforms);
    setFPS(fps: number): void;
    addCannonDebuger(): any;
    updateMatrix(): void;
    updateDom(dom: HTMLElement): void;
    addResizeListeners(): void;
    removeResizeListeners(): void;
}
export { THREE };
