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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "three", "./config", "./misc/Camera", "./misc/Light", "./misc/OrbitControls", "./misc/physicsMaterial", "./misc/physicWorld", "./misc/Renderer", "./misc/Sky"], function (require, exports, THREE, config_1, Camera_1, Light_1, OrbitControls_1, physicsMaterial_1, physicWorld_1, Renderer_1, Sky_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    THREE = __importStar(THREE);
    config_1 = __importDefault(config_1);
    Camera_1 = __importDefault(Camera_1);
    Light_1 = __importDefault(Light_1);
    OrbitControls_1 = __importDefault(OrbitControls_1);
    physicsMaterial_1 = __importDefault(physicsMaterial_1);
    physicWorld_1 = __importDefault(physicWorld_1);
    Renderer_1 = __importDefault(Renderer_1);
    Sky_1 = __importDefault(Sky_1);
    var Frame = require('lesca-enterframe').default;
    var Statsjs = require('stats-js');
    var CannonEsDebuger = require('cannon-es-debugger');
    var Webgl = /** @class */ (function () {
        function Webgl(options) {
            var _this = this;
            this.options = __assign(__assign({}, config_1.default), options);
            this.scene = new THREE.Scene();
            this.camera = new Camera_1.default(this.options.camera).camera;
            this.light = new Light_1.default(this.scene, this.options.light).light;
            this.renderer = new Renderer_1.default(this.options.renderer);
            this.renderer.resize(this.camera);
            this.render = this.renderer.renderer;
            this.controls = new OrbitControls_1.default(this.camera, this.render, this.options.controls);
            this.clock = new THREE.Clock();
            var _a = this.options, physics = _a.physics, sky = _a.sky;
            if (sky.enabled) {
                this.sky = new Sky_1.default(this.options.sky);
                this.scene.add(this.sky.sky);
            }
            if (physics) {
                var physicsMaterial = new physicsMaterial_1.default();
                var Impact = physicsMaterial.Impact, Static = physicsMaterial.Static;
                this.physicsImpactMaterial = Impact;
                this.physicsStaticMaterial = Static;
                this.world = new physicWorld_1.default().world;
                this.world.addContactMaterial(physicsMaterial.material);
                this.stats = new Statsjs();
                this.stats.showPanel(0);
            }
            this.update = function () {
                var _a, _b;
                (_a = _this.stats) === null || _a === void 0 ? void 0 : _a.begin();
                _this.controls.controls.update();
                _this.render.render(_this.scene, _this.camera);
                (_b = _this.world) === null || _b === void 0 ? void 0 : _b.step(1 / 60, _this.clock.getDelta());
            };
            this.enterframe = Frame;
            Frame.add(this.update);
            Frame.play();
        }
        Webgl.prototype.addCannonDebuger = function () {
            var cannonEsDebuger = new CannonEsDebuger(this.scene, this.world.bodies);
            return cannonEsDebuger;
        };
        return Webgl;
    }());
    exports.default = Webgl;
});
