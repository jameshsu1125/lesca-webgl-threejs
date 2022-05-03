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
define(["require", "exports", "cannon-es"], function (require, exports, CANNON) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    CANNON = __importStar(CANNON);
    var PhysicsMaterial = /** @class */ (function () {
        function PhysicsMaterial() {
            this.Impact = new CANNON.Material('Impact');
            this.Static = new CANNON.Material('Static');
            this.material = new CANNON.ContactMaterial(this.Impact, this.Static, {
                friction: 0.1,
                restitution: 0.1,
            });
        }
        return PhysicsMaterial;
    }());
    exports.default = PhysicsMaterial;
});
