import * as THREE from 'three';
import Config from './config';
import Camera from './misc/Camera';
import Light from './misc/Light';
import Control from './misc/OrbitControls';
import PhysicsMaterial from './misc/physicsMaterial';
import PhysicsWorld from './misc/physicWorld';
import Renderer from './misc/Renderer';
import Sky from './misc/Sky';
import { CameraTypes, Uniforms } from './types';
import Frame from 'lesca-enterframe';

const Statsjs = require('stats-js');
const CannonEsDebuger = require('cannon-es-debugger').default;

export default class Webgl {
  private options: Uniforms;
  public renderer: Renderer;
  private update: () => void;

  public scene: THREE.Scene;
  public camera: CameraTypes;
  public light: Light;
  public render: THREE.WebGLRenderer;
  public controls: Control;
  public clock: THREE.Clock;
  public sky!: Sky;
  public physicsImpactMaterial!: import('material/Material').Material;
  public physicsStaticMaterial!: import('material/Material').Material;
  public world!: import('world/World').World;

  public stats: any;
  public enterframe = Frame;

  constructor(options: Uniforms) {
    this.options = { ...Config, ...options };

    this.scene = new THREE.Scene();
    this.camera = new Camera(this.options.camera).camera;
    this.light = new Light(this.scene, this.options.light);
    this.renderer = new Renderer(
      this.options.renderer,
      this.options.camera.dom || null,
      this.camera,
    );

    this.renderer.addListeners();

    this.render = this.renderer.renderer;
    this.controls = new Control(this.camera, this.render, this.options.controls);
    this.clock = new THREE.Clock();

    const { physics, sky, stats } = this.options;

    if (sky.enabled) {
      this.sky = new Sky(this.options.sky);
      this.scene.add(this.sky.sky);
    }

    if (physics) {
      const physicsMaterial = new PhysicsMaterial();
      const { Impact, Static } = physicsMaterial;
      this.physicsImpactMaterial = Impact;
      this.physicsStaticMaterial = Static;
      this.world = new PhysicsWorld().world;
      this.world.addContactMaterial(physicsMaterial.material);
    }

    if (stats) {
      this.stats = new Statsjs();
      this.stats.showPanel(0);
      document.body.appendChild(this.stats.dom);
    }

    this.update = () => {
      this.stats?.begin();
      this.controls.controls.update();
      this.render.render(this.scene, this.camera);
      this.world?.step(1 / 60, this.clock.getDelta());
    };

    this.enterframe.setFPS(this.options.fps);
    this.enterframe.add(this.update);
    this.enterframe.play();
  }

  setFPS(fps: number) {
    this.enterframe.setFPS(fps);
  }

  addCannonDebuger() {
    const cannonEsDebuger = new CannonEsDebuger(this.scene, this.world);
    return cannonEsDebuger;
  }

  updateMatrix() {
    this.renderer.update();
  }

  updateDom(dom: HTMLElement) {
    this.renderer.updateDom(dom);
    this.updateMatrix();
  }

  addResizeListeners() {
    this.renderer.addListeners();
  }

  removeResizeListeners() {
    this.renderer.removeListeners();
  }
}

export { THREE };
