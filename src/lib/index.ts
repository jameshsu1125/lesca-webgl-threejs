import * as THREE from 'three';
import Config from './config';
import Camera from './misc/Camera';
import Light from './misc/Light';
import Control from './misc/OrbitControls';
import PhysicsMaterial from './misc/physicsMaterial';
import PhysicsWorld from './misc/physicWorld';
import Renderer from './misc/Renderer';
import Sky from './misc/Sky';
import { Uniforms } from './types';

const Frame = require('lesca-enterframe').default;
const Statsjs = require('stats-js');
const CannonEsDebuger = require('cannon-es-debugger');

export default class Webgl {
  private options: Uniforms;
  private renderer: Renderer;
  private update: () => void;

  public scene: THREE.Scene;
  public camera: THREE.Camera;
  public light: THREE.PointLight;
  public render: THREE.WebGLRenderer;
  public controls: Control;
  public clock: THREE.Clock;
  public sky!: Sky;
  public physicsImpactMaterial!: import('material/Material').Material;
  public physicsStaticMaterial!: import('material/Material').Material;
  public world!: import('world/World').World;

  public stats: any;
  public enterframe: any;

  constructor(options: Uniforms) {
    this.options = { ...Config, ...options };

    this.scene = new THREE.Scene();
    this.camera = new Camera(this.options.camera).camera;
    this.light = new Light(this.scene, this.options.light).light;
    this.renderer = new Renderer(this.options.renderer);
    this.renderer.resize(this.camera);
    this.render = this.renderer.renderer;
    this.controls = new Control(this.camera, this.render, this.options.controls);
    this.clock = new THREE.Clock();

    const { physics, sky } = this.options;

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
      this.stats = new Statsjs();
      this.stats.showPanel(0);
    }

    this.update = () => {
      this.stats?.begin();
      this.controls.controls.update();
      this.render.render(this.scene, this.camera);
      this.world?.step(1 / 60, this.clock.getDelta());
    };

    this.enterframe = Frame;

    Frame.add(this.update);
    Frame.play();
  }

  addCannonDebuger() {
    const cannonEsDebuger = new CannonEsDebuger(this.scene, this.world.bodies);
    return cannonEsDebuger;
  }
}
