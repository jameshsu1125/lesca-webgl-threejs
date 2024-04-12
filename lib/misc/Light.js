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
var defaultTY = {
  target: new THREE.Mesh(),
  offset: _config.light.spot.position.y
};
var Light = exports["default"] = /*#__PURE__*/function () {
  function Light(Scene, options) {
    (0, _classCallCheck2["default"])(this, Light);
    (0, _defineProperty2["default"])(this, "options", void 0);
    (0, _defineProperty2["default"])(this, "lights", void 0);
    (0, _defineProperty2["default"])(this, "target", void 0);
    this.options = _objectSpread(_objectSpread({}, _config.light), options);
    this.lights = {};
    this.target = undefined;
    var _this$options = this.options,
      ambient = _this$options.ambient,
      spot = _this$options.spot,
      point = _this$options.point,
      shadowMapSize = _this$options.shadowMapSize,
      debug = _this$options.debug;
    var light = new THREE.AmbientLight(ambient.color, ambient.intensity);
    Scene.add(light);
    if (options.point) {
      var pointLight = new THREE.PointLight(point.color, point.intensity, point.distance);
      pointLight.castShadow = true;
      pointLight.decay = point.decay;
      pointLight.shadow.mapSize.width = shadowMapSize;
      pointLight.shadow.mapSize.height = shadowMapSize;
      var _point$position = point.position,
        x = _point$position.x,
        y = _point$position.y,
        z = _point$position.z;
      pointLight.position.set(x, y, z);
      Scene.add(pointLight);
      this.lights.point = pointLight;
      if (debug) {
        var helper = new THREE.PointLightHelper(pointLight);
        Scene.add(helper);
      }
    }
    if (options.spot) {
      var spotLight = new THREE.SpotLight(spot.color, spot.intensity, spot.distance);
      spotLight.castShadow = true;
      spotLight.angle = Math.PI * 0.12;
      spotLight.penumbra = 1;
      spotLight.decay = point.decay;
      spotLight.shadow.mapSize.width = shadowMapSize;
      spotLight.shadow.mapSize.height = shadowMapSize;
      var _spot$position = spot.position,
        _x = _spot$position.x,
        _y = _spot$position.y,
        _z = _spot$position.z;
      spotLight.position.set(_x, _y, _z);
      Scene.add(spotLight);
      this.target = spotLight.target;
      this.lights.spot = spotLight;
      if (debug) {
        var _helper = new THREE.SpotLightHelper(spotLight);
        Scene.add(_helper);
      }
    }
  }
  return (0, _createClass2["default"])(Light, [{
    key: "update",
    value: function update(options) {
      if (!options.target) console.warn('[lesca-webgl-threejs]Three is no target[Mesh] to follow.');
      var opt = _objectSpread(_objectSpread({}, defaultTY), options);
      var target = opt.target,
        offsetY = opt.offsetY;
      var _this$lights = this.lights,
        spot = _this$lights.spot,
        point = _this$lights.point;
      if (spot) {
        var _this$target;
        spot.position.set(target.position.x, target.position.y + offsetY, target.position.z);
        (_this$target = this.target) === null || _this$target === void 0 || _this$target.position.set(target.position.x, target.position.y, target.position.z);
      }
      if (point) {
        point.position.set(target.position.x, target.position.y + offsetY, target.position.z);
      }
    }
  }]);
}();