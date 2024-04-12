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
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var _window = window,
  devicePixelRatio = _window.devicePixelRatio;
var Renderer = exports["default"] = /*#__PURE__*/(0, _createClass2["default"])(function Renderer(options) {
  var _this = this;
  (0, _classCallCheck2["default"])(this, Renderer);
  (0, _defineProperty2["default"])(this, "options", void 0);
  (0, _defineProperty2["default"])(this, "resize", void 0);
  (0, _defineProperty2["default"])(this, "renderer", void 0);
  (0, _defineProperty2["default"])(this, "update", void 0);
  this.options = _objectSpread(_objectSpread({}, _config.renderer), options);
  var _this$options = this.options,
    alpha = _this$options.alpha,
    shadowType = _this$options.shadowType,
    exposure = _this$options.exposure,
    outputEncoding = _this$options.outputEncoding,
    preserveDrawingBuffer = _this$options.preserveDrawingBuffer;
  var renderer = new THREE.WebGLRenderer({
    alpha: alpha,
    preserveDrawingBuffer: preserveDrawingBuffer
  });
  renderer.setPixelRatio(devicePixelRatio);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = shadowType;
  renderer.toneMappingExposure = exposure;
  // renderer.physicallyCorrectLights = physicallyCorrectLights;
  renderer.outputEncoding = outputEncoding;
  this.update = function (Camera, dom) {
    var _window2 = window,
      innerWidth = _window2.innerWidth,
      innerHeight = _window2.innerHeight;
    var width = dom instanceof HTMLElement ? dom.clientWidth : innerWidth;
    var height = dom instanceof HTMLElement ? dom.clientHeight : innerHeight;
    Camera.left = Number(width) / -2;
    Camera.right = Number(width) / 2;
    Camera.top = Number(height) / 2;
    Camera.bottom = Number(height) / -2;
    Camera.updateProjectionMatrix();
    renderer.setSize(width || innerWidth, height || innerHeight);
  };
  this.resize = function (camera, dom) {
    _this.update(camera, dom);
    window.addEventListener('resize', function () {
      _this.update(camera, dom);
      setTimeout(function () {
        return _this.update(camera, dom);
      }, 500);
    });
  };
  this.renderer = renderer;
});