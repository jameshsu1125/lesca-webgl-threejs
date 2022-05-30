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

var defaultTY = {
  target: new THREE.Mesh(),
  offset: _config.light.spot.position.y
};

var Light = /*#__PURE__*/function () {
  function Light(Scene, options) {
    (0, _classCallCheck2["default"])(this, Light);
    (0, _defineProperty2["default"])(this, "options", void 0);
    (0, _defineProperty2["default"])(this, "light", void 0);
    this.options = _objectSpread(_objectSpread({}, _config.light), options);
    var _this$options = this.options,
        ambient = _this$options.ambient,
        spot = _this$options.spot,
        shadowMapSize = _this$options.shadowMapSize,
        debug = _this$options.debug;
    var light = new THREE.AmbientLight(ambient.color, ambient.intensity);
    Scene.add(light);
    var spotLight = new THREE.SpotLight(spot.color, spot.intensity, spot.far);
    spotLight.castShadow = true;
    spotLight.angle = Math.PI * 0.12;
    spotLight.penumbra = 1;
    spotLight.distance = spot.far;
    spotLight.decay = 0.5;
    var _spot$position = spot.position,
        x = _spot$position.x,
        y = _spot$position.y,
        z = _spot$position.z;
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

  (0, _createClass2["default"])(Light, [{
    key: "update",
    value: function update(options) {
      if (!options.target) console.warn('[lesca-webgl-threejs]Three is no target[Mesh] to follow.');

      var opt = _objectSpread(_objectSpread({}, defaultTY), options);

      var target = opt.target,
          offsetY = opt.offsetY;
      this.light.position.set(target.position.x, target.position.y + offsetY, target.position.z);
    }
  }]);
  return Light;
}();

exports["default"] = Light;