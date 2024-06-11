import * as THREE from 'three';
import Config from '../../lib/config';

const config = { ...Config };
config.controls.default.distance = 3;
config.renderer.background = { color: 0x000000, alpha: 0 };
config.sky.enabled = false;
config.controls.damping = true;
config.controls.dampingFactor = 1.5;

export { config };
