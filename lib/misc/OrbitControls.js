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
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var Orbit = require('lesca-threejs-orbitcontrols').OrbitControls;
var Controls = new Orbit(THREE);
var degreeToRadian = function degreeToRadian(degree) {
  return Math.PI / 180 * degree;
};
var radianToDegree = function radianToDegree(radian) {
  return radian / (Math.PI / 180);
};
var OrbitControls = exports["default"] = /*#__PURE__*/function () {
  function OrbitControls(Camera, Renderer, options) {
    (0, _classCallCheck2["default"])(this, OrbitControls);
    (0, _defineProperty2["default"])(this, "options", void 0);
    (0, _defineProperty2["default"])(this, "controls", void 0);
    (0, _defineProperty2["default"])(this, "azimuthAngle", void 0);
    (0, _defineProperty2["default"])(this, "camera", void 0);
    this.options = _objectSpread(_objectSpread({}, _config.controls), options);
    var _this$options = this.options,
      polar = _this$options.polar,
      azimuth = _this$options.azimuth,
      enabled = _this$options.enabled,
      damping = _this$options.damping,
      dampingFactor = _this$options.dampingFactor;
    this.controls = new Controls(Camera, Renderer.domElement);
    this.camera = Camera;
    this.controls.enabled = enabled;
    this.controls.maxPolarAngle = degreeToRadian(90 - polar.min);
    this.controls.minPolarAngle = degreeToRadian(90 - polar.max);
    this.controls.maxAzimuthAngle = degreeToRadian(azimuth.max);
    this.controls.minAzimuthAngle = degreeToRadian(azimuth.min);
    this.azimuthAngle = this.controls.getPolarAngle();
    this.controls.setPolarAngle(degreeToRadian(90 - this.options["default"].polar));
    this.controls.setAzimuthalAngle(degreeToRadian(this.options["default"].azimuth));
    this.setDistance(this.options["default"].distance);
    if (damping) {
      this.controls.enablePan = false;
      this.controls.enableDamping = true;
      // this.controls.minPolarAngle = 0.8;
      // this.controls.maxPolarAngle = 2.4;
      this.controls.dampingFactor = Math.max(0.05 - (dampingFactor - 1) * 0.05, 0.001);
      this.controls.rotateSpeed = 0.07;
    }
  }
  return (0, _createClass2["default"])(OrbitControls, [{
    key: "setDistance",
    value: function setDistance(value) {
      var _this = this;
      var distance = this.options.distance;
      this.controls.minDistance = value;
      this.controls.maxDistance = value;
      requestAnimationFrame(function () {
        _this.controls.minDistance = distance.min;
        _this.controls.minZoom = distance.min;
        _this.controls.maxDistance = distance.max;
        _this.controls.maxZoom = distance.max;
      });
    }
  }, {
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
}();