var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
define(["require", "exports", "three"], function (require, exports, THREE) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.physics = exports.renderer = exports.light = exports.controls = exports.sky = exports.camera = void 0;
    THREE = __importStar(THREE);
    var camera = {
        fov: 40,
        far: 200,
    };
    exports.camera = camera;
    // todo => https://threejs.org/examples/webgl_shaders_sky.html
    var sky = {
        enabled: true,
        turbidity: 0,
        rayleigh: 0.079,
        mieCoefficient: 0.023,
        mieDirectionalG: 0.226,
        inclination: 70,
        azimuth: -102.7,
    };
    exports.sky = sky;
    var controls = {
        distance: { min: 30, max: 30 },
        polar: { min: 35, max: 35 },
        azimuth: { min: -Infinity, max: Infinity },
        default: {
            polar: 0,
            azimuth: 0,
        },
        offsetAzimuth: 0,
        enabled: true,
        panEasing: 100,
    };
    exports.controls = controls;
    var light = {
        color: 0xe0e0e0,
        intensity: 1.5,
        position: {
            x: 0,
            y: 15,
            z: 0,
        },
        shadowMapSize: 512,
    };
    exports.light = light;
    var renderer = {
        alpha: false,
        shadowType: THREE.BasicShadowMap,
        exposure: 0.5,
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
        stats: stats,
    };
    exports.default = Config;
});