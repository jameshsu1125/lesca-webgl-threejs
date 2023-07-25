"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CameraType = void 0;
var CameraType = /*#__PURE__*/function (CameraType) {
  CameraType[CameraType["perspective"] = 0] = "perspective";
  CameraType[CameraType["orthographic"] = 1] = "orthographic";
  return CameraType;
}({});
exports.CameraType = CameraType;