"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var THREE = _interopRequireWildcard(require("three"));

var _config = require("../config");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var _window = window,
    devicePixelRatio = _window.devicePixelRatio;
var Renderer = /*#__PURE__*/(0, _createClass2["default"])(function Renderer(options) {
  (0, _classCallCheck2["default"])(this, Renderer);
  (0, _defineProperty2["default"])(this, "options", void 0);
  (0, _defineProperty2["default"])(this, "resize", void 0);
  (0, _defineProperty2["default"])(this, "renderer", void 0);
  this.options = _objectSpread(_objectSpread({}, _config.renderer), options);
  var _this$options = this.options,
      alpha = _this$options.alpha,
      shadowType = _this$options.shadowType,
      exposure = _this$options.exposure,
      outputEncoding = _this$options.outputEncoding,
      physicallyCorrectLights = _this$options.physicallyCorrectLights;
  var renderer = new THREE.WebGLRenderer({
    alpha: alpha
  });
  renderer.setPixelRatio(devicePixelRatio);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = shadowType;
  renderer.toneMappingExposure = exposure;
  renderer.physicallyCorrectLights = physicallyCorrectLights;
  renderer.outputEncoding = outputEncoding;

  this.resize = function (Camera) {
    var rendererSetSize = function rendererSetSize() {
      var _window2 = window,
          innerWidth = _window2.innerWidth,
          innerHeight = _window2.innerHeight;
      Camera.aspect = innerWidth / innerHeight;
      Camera.updateProjectionMatrix();
      renderer.setSize(innerWidth, innerHeight);
    };

    rendererSetSize();
    window.addEventListener('resize', rendererSetSize);
  };

  this.renderer = renderer;
});
exports["default"] = Renderer;