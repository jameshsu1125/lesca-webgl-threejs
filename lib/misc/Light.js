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
    var Light = /** @class */ (function () {
        function Light(Scene, options) {
            this.options = __assign(__assign({}, config_1.light), options);
            var _a = this.options, ambient = _a.ambient, spot = _a.spot, shadowMapSize = _a.shadowMapSize, debug = _a.debug;
            var light = new THREE.AmbientLight(ambient.color, ambient.intensity);
            Scene.add(light);
            var spotLight = new THREE.SpotLight(spot.color, spot.intensity, 100);
            spotLight.castShadow = true;
            spotLight.angle = (Math.PI / 180) * 10;
            spotLight.penumbra = 1;
            var _b = spot.position, x = _b.x, y = _b.y, z = _b.z;
            spotLight.position.set(x, y, z);
            Scene.add(spotLight);
            spotLight.shadow.mapSize.width = shadowMapSize;
            spotLight.shadow.mapSize.height = shadowMapSize;
            if (debug) {
                var helper = new THREE.SpotLightHelper(spotLight);
                Scene.add(helper);
            }
            this.light = spotLight;
        }
        Light.prototype.update = function (position) {
            var _a = this.options.spot.position, x = _a.x, y = _a.y, z = _a.z;
            this.light.position.set(position.x + x, position.y + y, position.z + z);
        };
        return Light;
    }());
    exports.default = Light;
});
