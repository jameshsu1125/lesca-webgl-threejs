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
    var devicePixelRatio = window.devicePixelRatio;
    var Renderer = /** @class */ (function () {
        function Renderer(options) {
            this.options = __assign(__assign({}, config_1.renderer), options);
            var _a = this.options, alpha = _a.alpha, shadowType = _a.shadowType, exposure = _a.exposure;
            var renderer = new THREE.WebGLRenderer({ alpha: alpha });
            renderer.setPixelRatio(devicePixelRatio);
            renderer.toneMapping = THREE.ACESFilmicToneMapping;
            renderer.shadowMap.enabled = true;
            renderer.shadowMap.type = shadowType;
            renderer.toneMappingExposure = exposure;
            this.resize = function (Camera) {
                var rendererSetSize = function () {
                    var innerWidth = window.innerWidth, innerHeight = window.innerHeight;
                    Camera.aspect = innerWidth / innerHeight;
                    Camera.updateProjectionMatrix();
                    renderer.setSize(innerWidth, innerHeight);
                };
                rendererSetSize();
                window.addEventListener('resize', rendererSetSize);
            };
            this.renderer = renderer;
        }
        return Renderer;
    }());
    exports.default = Renderer;
});
