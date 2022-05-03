import * as THREE from 'three';
import Control from './misc/OrbitControls';
import Sky from './misc/Sky';
import { Uniforms } from './types';
export default class Webgl {
    private options;
    private renderer;
    private update;
    scene: THREE.Scene;
    camera: THREE.Camera;
    light: THREE.PointLight;
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
    addCannonDebuger(): any;
}
