import * as THREE from 'three';
import Config from '../../lib/config';

const config = { ...Config };
config.controls.default.distance = 3;
config.light.ambient.enabled = false;

export { config };
