var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
define(["require", "exports", "three", "three/examples/jsm/objects/Sky", "../config"], function (require, exports, THREE, Sky_1, config_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    THREE = __importStar(THREE);
    var SkySun = /** @class */ (function () {
        function SkySun(options) {
            this.options = __assign(__assign({}, config_1.sky), options);
            this.sky = new Sky_1.Sky();
            this.sky.scale.setScalar(1000);
            var _a = this.options, turbidity = _a.turbidity, rayleigh = _a.rayleigh, mieDirectionalG = _a.mieDirectionalG, mieCoefficient = _a.mieCoefficient;
            this.sky.material.uniforms = __assign(__assign({}, this.sky.material.uniforms), { turbidity: { value: turbidity }, rayleigh: { value: rayleigh }, mieDirectionalG: { value: mieDirectionalG }, mieCoefficient: { value: mieCoefficient } });
            this.sun = new THREE.Vector3();
            this.update();
        }
        SkySun.prototype.update = function () {
            var _a = this.options, inclination = _a.inclination, azimuth = _a.azimuth;
            var theta = Math.PI * (inclination - 0.5);
            var phi = 2 * Math.PI * (azimuth - 0.5);
            this.sun.x = Math.cos(phi);
            this.sun.y = Math.sin(phi) * Math.sin(theta);
            this.sun.z = Math.sin(phi) * Math.cos(theta);
            this.sky.material.uniforms.sunPosition.value.copy(this.sun);
        };
        return SkySun;
    }());
    exports.default = SkySun;
});
