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

var degreeToradian = function degreeToradian(degree) {
  return Math.PI / 180 * degree;
};

var OrbitControls = /*#__PURE__*/function () {
  function OrbitControls(Camera, Renderer, options) {
    (0, _classCallCheck2["default"])(this, OrbitControls);
    (0, _defineProperty2["default"])(this, "options", void 0);
    (0, _defineProperty2["default"])(this, "controls", void 0);
    (0, _defineProperty2["default"])(this, "azimuthAngle", void 0);
    this.options = _objectSpread(_objectSpread({}, _config.controls), options);
    var _this$options = this.options,
        distance = _this$options.distance,
        polar = _this$options.polar,
        azimuth = _this$options.azimuth,
        enabled = _this$options.enabled;
    this.controls = new Controls(Camera, Renderer.domElement);
    this.controls.enabled = enabled;
    this.controls.maxPolarAngle = degreeToradian(90 - polar.min);
    this.controls.minPolarAngle = degreeToradian(90 - polar.max);
    this.controls.maxAzimuthAngle = degreeToradian(azimuth.max);
    this.controls.minAzimuthAngle = degreeToradian(azimuth.min);
    this.controls.minDistance = distance.min;
    this.controls.maxDistance = distance.max;
    this.azimuthAngle = this.controls.getPolarAngle();

    if (this.options["default"]) {
      var _this$options$default = this.options["default"],
          _polar = _this$options$default.polar,
          _azimuth = _this$options$default.azimuth;
      if (_polar !== undefined) this.controls.setPolarAngle(degreeToradian(90 - _polar));
      if (_azimuth !== undefined) this.controls.setAzimuthalAngle(degreeToradian(_azimuth));
    }
  }

  (0, _createClass2["default"])(OrbitControls, [{
    key: "fixed",
    value: function fixed() {
      var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        polar: 30,
        azimuth: 30,
        target: new THREE.Vector3(0, 0, 0)
      };
      var polar = config.polar,
          azimuth = config.azimuth,
          target = config.target;

      if (polar !== null && polar !== void 0 ? polar : false) {
        this.controls.maxPolarAngle = degreeToradian(90 + Number(polar));
        this.controls.minPolarAngle = degreeToradian(90 - Number(polar));
      }

      if (azimuth !== null && azimuth !== void 0 ? azimuth : false) {
        this.controls.maxAzimuthAngle = degreeToradian(Number(azimuth));
        this.controls.minAzimuthAngle = degreeToradian(Number(azimuth));
      }

      this.lookAt(target);
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
      this.azimuthAngle += (mesh.rotation.y + degreeToradian(offsetAzimuth) - this.azimuthAngle) / panEasing;
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
      this.controls.maxPolarAngle = degreeToradian(90 - polar.min);
      this.controls.minPolarAngle = degreeToradian(90 - polar.max);
    }
  }]);
  return OrbitControls;
}();

exports["default"] = OrbitControls;