"use strict";

var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sky = exports.renderer = exports.physics = exports.light = exports["default"] = exports.controls = exports.camera = exports.GLBLoaderConfig = void 0;
var THREE = _interopRequireWildcard(require("three"));
var _types = require("./types");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var fps = 0;
var camera = exports.camera = {
  fov: 70,
  far: 1000,
  type: _types.CameraType.perspective,
  dom: undefined
};

// todo => https://threejs.org/examples/webgl_shaders_sky.html
var sky = exports.sky = {
  enabled: true,
  turbidity: 0,
  rayleigh: 0.079,
  mieCoefficient: 0.023,
  mieDirectionalG: 0.226,
  inclination: 70,
  azimuth: -102.7
};
var controls = exports.controls = {
  distance: {
    min: 3,
    max: 100
  },
  polar: {
    min: -90,
    max: 90
  },
  azimuth: {
    min: -Infinity,
    max: Infinity
  },
  "default": {
    polar: 0,
    azimuth: 0,
    distance: 50
  },
  offsetAzimuth: 0,
  enabled: true,
  panEasing: 100,
  damping: false,
  dampingFactor: 1
};
var light = exports.light = {
  ambient: {
    enabled: true,
    color: 0xb7a46f,
    intensity: 0.6
  },
  lights: [{
    type: 'point',
    enabled: true,
    castShadow: true,
    bias: 0,
    blurSamples: 1,
    color: 0x999999,
    intensity: 0.9,
    distance: 3,
    decay: 0.5,
    position: {
      x: 0,
      y: 3,
      z: 0
    }
  }, {
    type: 'spot',
    enabled: false,
    castShadow: true,
    bias: 0,
    blurSamples: 1,
    color: 0x999999,
    intensity: 0.9,
    distance: 3,
    decay: 0.5,
    angle: Math.PI * 0.12,
    penumbra: 1,
    position: {
      x: 0,
      y: 3,
      z: 3
    }
  }],
  shadowMapSize: 256,
  debug: false
};
var renderer = exports.renderer = {
  alpha: false,
  preserveDrawingBuffer: false,
  shadowType: THREE.PCFSoftShadowMap,
  exposure: 0.5,
  outputEncoding: THREE.SRGBColorSpace,
  background: {
    color: 0x000000,
    alpha: 1
  }
};
var physics = exports.physics = false;
var stats = false;
var Config = {
  fps: fps,
  camera: camera,
  sky: sky,
  controls: controls,
  light: light,
  renderer: renderer,
  physics: physics,
  stats: stats
};

/**
 * https://threejs.org/manual/#en/materials
 */
var GLBLoaderConfig = exports.GLBLoaderConfig = {
  onProcess: function onProcess(loaded, total) {
    return "".concat(loaded / total * 100, "% loaded");
  },
  loop: true,
  castShadow: true,
  receiveShadow: false,
  material: {
    metalness: 0,
    roughness: 1,
    clearcoat: 0,
    clearcoatRoughness: 0.5
  }
};
var _default = exports["default"] = Config;