"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var THREE = _interopRequireWildcard(require("three"));
var _config = require("../config");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var Orbit = require('lesca-threejs-orbitcontrols').OrbitControls;
var Controls = new Orbit(THREE);
var degreeToRadian = function degreeToRadian(degree) {
  return Math.PI / 180 * degree;
};
var radianToDegree = function radianToDegree(radian) {
  return radian / (Math.PI / 180);
};
var OrbitControls = /*#__PURE__*/function () {
  function OrbitControls(Camera, Renderer, options) {
    (0, _classCallCheck2["default"])(this, OrbitControls);
    (0, _defineProperty2["default"])(this, "options", void 0);
    (0, _defineProperty2["default"])(this, "controls", void 0);
    (0, _defineProperty2["default"])(this, "azimuthAngle", void 0);
    (0, _defineProperty2["default"])(this, "camera", void 0);
    this.options = _objectSpread(_objectSpread({}, _config.controls), options);
    var _this$options = this.options,
      distance = _this$options.distance,
      polar = _this$options.polar,
      azimuth = _this$options.azimuth,
      enabled = _this$options.enabled;
    this.controls = new Controls(Camera, Renderer.domElement);
    this.camera = Camera;
    this.controls.enabled = enabled;
    this.controls.maxPolarAngle = degreeToRadian(90 - polar.min);
    this.controls.minPolarAngle = degreeToRadian(90 - polar.max);
    this.controls.maxAzimuthAngle = degreeToRadian(azimuth.max);
    this.controls.minAzimuthAngle = degreeToRadian(azimuth.min);
    this.controls.minDistance = distance.min;
    this.controls.minZoom = distance.min;
    this.controls.maxDistance = distance.max;
    this.controls.maxZoom = distance.max;
    this.azimuthAngle = this.controls.getPolarAngle();
    if (this.options["default"]) {
      var _this$options$default = this.options["default"],
        _polar = _this$options$default.polar,
        _azimuth = _this$options$default.azimuth;
      if (_polar !== undefined) this.controls.setPolarAngle(degreeToRadian(90 - _polar));
      if (_azimuth !== undefined) this.controls.setAzimuthalAngle(degreeToRadian(_azimuth));
    }
  }
  (0, _createClass2["default"])(OrbitControls, [{
    key: "fixed",
    value: function fixed() {
      var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        target: new THREE.Vector3(0, 0, 0)
      };
      var polar = config.polar,
        azimuth = config.azimuth,
        target = config.target;
      if (polar !== undefined && polar !== null) {
        this.controls.maxPolarAngle = degreeToRadian(90 + Number(polar));
        this.controls.minPolarAngle = degreeToRadian(90 - Number(polar));
      }
      if (azimuth !== undefined && azimuth !== null) {
        this.controls.maxAzimuthAngle = degreeToRadian(Number(azimuth));
        this.controls.minAzimuthAngle = degreeToRadian(Number(azimuth));
      }
      this.lookAt(target);
    }
  }, {
    key: "getDistance",
    value: function getDistance() {
      var target = this.controls.target;
      var x1 = target.x,
        y1 = target.y,
        z1 = target.z;
      var _this$camera$position = this.camera.position,
        x2 = _this$camera$position.x,
        y2 = _this$camera$position.y,
        z2 = _this$camera$position.z;
      return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) + Math.pow(z2 - z1, 2));
    }
  }, {
    key: "get",
    value: function get() {
      var polar = 90 - radianToDegree(this.controls.getPolarAngle());
      var azimuth = radianToDegree(this.controls.getAzimuthalAngle());
      var distance = this.getDistance();
      return {
        polar: polar,
        azimuth: azimuth,
        distance: distance
      };
    }
  }, {
    key: "set",
    value: function set(config) {
      var polar = config.polar,
        azimuth = config.azimuth,
        distance = config.distance;
      if (polar) {
        this.controls.maxPolarAngle = degreeToRadian(90 - polar);
        this.controls.minPolarAngle = degreeToRadian(90 - polar);
      }
      if (azimuth) {
        this.controls.maxAzimuthAngle = degreeToRadian(azimuth);
        this.controls.minAzimuthAngle = degreeToRadian(azimuth);
      }
      if (distance) {
        this.controls.minDistance = distance;
        this.controls.maxDistance = distance;
      }
    }
  }, {
    key: "lookAt",
    value: function lookAt() {
      var vec = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new THREE.Vector3(0, 0, 0);
      this.controls.target.set(vec.x, vec.y, vec.z);
    }
  }, {
    key: "chase",
    value: function chase(mesh) {
      var height = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      var _this$options2 = this.options,
        offsetAzimuth = _this$options2.offsetAzimuth,
        panEasing = _this$options2.panEasing;
      this.controls.target.set(mesh.position.x, mesh.position.y + height, mesh.position.z);
      this.azimuthAngle += (mesh.rotation.y + degreeToRadian(offsetAzimuth) - this.azimuthAngle) / panEasing;
      this.controls.maxAzimuthAngle = this.azimuthAngle;
      this.controls.minAzimuthAngle = this.azimuthAngle;
    }
  }, {
    key: "lock",
    value: function lock() {
      var polar = this.controls.getPolarAngle();
      this.controls.maxPolarAngle = polar;
      this.controls.minPolarAngle = polar;
    }
  }, {
    key: "unlock",
    value: function unlock() {
      var polar = this.options.polar;
      this.controls.maxPolarAngle = degreeToRadian(90 - polar.min);
      this.controls.minPolarAngle = degreeToRadian(90 - polar.max);
    }
  }]);
  return OrbitControls;
}();
exports["default"] = OrbitControls;