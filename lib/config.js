"use strict";

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sky = exports.renderer = exports.physics = exports.light = exports["default"] = exports.controls = exports.camera = void 0;

var THREE = _interopRequireWildcard(require("three"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var camera = {
  zoom: 200,
  far: 75
}; // todo => https://threejs.org/examples/webgl_shaders_sky.html

exports.camera = camera;
var sky = {
  enabled: true,
  turbidity: 0,
  rayleigh: 0.079,
  mieCoefficient: 0.023,
  mieDirectionalG: 0.226,
  inclination: 70,
  azimuth: -102.7
};
exports.sky = sky;
var controls = {
  distance: {
    min: 30,
    max: 30
  },
  polar: {
    min: 35,
    max: 35
  },
  azimuth: {
    min: -Infinity,
    max: Infinity
  },
  "default": {
    polar: 0,
    azimuth: 0
  },
  offsetAzimuth: 0,
  enabled: true,
  panEasing: 100
};
exports.controls = controls;
var light = {
  ambient: {
    color: 0x5289d2,
    intensity: 0.6
  },
  spot: {
    color: 0x999999,
    intensity: 0.9,
    far: 3,
    position: {
      x: 0,
      y: 3,
      z: 0
    }
  },
  shadowMapSize: 256,
  debug: false
};
exports.light = light;
var renderer = {
  alpha: false,
  shadowType: THREE.PCFSoftShadowMap,
  exposure: 0.5,
  outputEncoding: THREE.sRGBEncoding,
  physicallyCorrectLights: false
};
exports.renderer = renderer;
var physics = false;
exports.physics = physics;
var stats = false;
var Config = {
  camera: camera,
  sky: sky,
  controls: controls,
  light: light,
  renderer: renderer,
  physics: physics,
  stats: stats
};
var _default = Config;
exports["default"] = _default;