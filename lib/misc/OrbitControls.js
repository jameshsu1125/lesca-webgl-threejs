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
define(["require", "exports", "three", "../config"], function (require, exports, THREE, config_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    THREE = __importStar(THREE);
    var Orbit = require('lesca-threejs-orbitcontrols').OrbitControls;
    var Controls = new Orbit(THREE);
    var degreeToradian = function (degree) {
        return (Math.PI / 180) * degree;
    };
    var OrbitControls = /** @class */ (function () {
        function OrbitControls(Camera, Renderer, options) {
            this.options = __assign(__assign({}, config_1.controls), options);
            var _a = this.options, distance = _a.distance, polar = _a.polar, azimuth = _a.azimuth, enabled = _a.enabled;
            this.controls = new Controls(Camera, Renderer.domElement);
            this.controls.enabled = enabled;
            this.controls.maxPolarAngle = degreeToradian(90 - polar.min);
            this.controls.minPolarAngle = degreeToradian(90 - polar.max);
            this.controls.maxAzimuthAngle = degreeToradian(azimuth.max);
            this.controls.minAzimuthAngle = degreeToradian(azimuth.min);
            this.controls.minDistance = distance.min;
            this.controls.maxDistance = distance.max;
            this.azimuthAngle = this.controls.getPolarAngle();
        }
        OrbitControls.prototype.chase = function (mesh, height) {
            if (height === void 0) { height = 1; }
            var _a = this.options, offsetAzimuth = _a.offsetAzimuth, panEasing = _a.panEasing;
            this.controls.target.set(mesh.position.x, mesh.position.y + height, mesh.position.z);
            this.azimuthAngle +=
                (mesh.rotation.y + degreeToradian(offsetAzimuth) - this.azimuthAngle) / panEasing;
            this.controls.maxAzimuthAngle = this.azimuthAngle;
            this.controls.minAzimuthAngle = this.azimuthAngle;
        };
        OrbitControls.prototype.lock = function () {
            var polar = this.controls.getPolarAngle();
            this.controls.maxPolarAngle = polar;
            this.controls.minPolarAngle = polar;
        };
        OrbitControls.prototype.unlock = function () {
            var polar = this.options.polar;
            this.controls.maxPolarAngle = degreeToradian(90 - polar.min);
            this.controls.minPolarAngle = degreeToradian(90 - polar.max);
        };
        return OrbitControls;
    }());
    exports.default = OrbitControls;
});
