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
var _Sky = require("three/examples/jsm/objects/Sky");
var _config = require("../config");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var SkySun = exports["default"] = /*#__PURE__*/function () {
  function SkySun(options) {
    (0, _classCallCheck2["default"])(this, SkySun);
    (0, _defineProperty2["default"])(this, "options", void 0);
    (0, _defineProperty2["default"])(this, "sky", void 0);
    (0, _defineProperty2["default"])(this, "sun", void 0);
    this.options = _objectSpread(_objectSpread({}, _config.sky), options);
    this.sky = new _Sky.Sky();
    this.sky.scale.setScalar(1000);
    var _this$options = this.options,
      turbidity = _this$options.turbidity,
      rayleigh = _this$options.rayleigh,
      mieDirectionalG = _this$options.mieDirectionalG,
      mieCoefficient = _this$options.mieCoefficient;
    this.sky.material.uniforms = _objectSpread(_objectSpread({}, this.sky.material.uniforms), {}, {
      turbidity: {
        value: turbidity
      },
      rayleigh: {
        value: rayleigh
      },
      mieDirectionalG: {
        value: mieDirectionalG
      },
      mieCoefficient: {
        value: mieCoefficient
      }
    });
    this.sun = new THREE.Vector3();
    this.update();
  }
  return (0, _createClass2["default"])(SkySun, [{
    key: "update",
    value: function update() {
      var _this$options2 = this.options,
        inclination = _this$options2.inclination,
        azimuth = _this$options2.azimuth;
      var theta = Math.PI * (inclination - 0.5);
      var phi = 2 * Math.PI * (azimuth - 0.5);
      this.sun.x = Math.cos(phi);
      this.sun.y = Math.sin(phi) * Math.sin(theta);
      this.sun.z = Math.sin(phi) * Math.cos(theta);
      this.sky.material.uniforms.sunPosition.value.copy(this.sun);
    }
  }]);
}();