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
var _types = require("../types");
var THREE = _interopRequireWildcard(require("three"));
var _config = require("../config");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var _window = window,
  innerWidth = _window.innerWidth,
  innerHeight = _window.innerHeight;
var Camera = /*#__PURE__*/(0, _createClass2["default"])(function Camera(options) {
  (0, _classCallCheck2["default"])(this, Camera);
  (0, _defineProperty2["default"])(this, "options", void 0);
  (0, _defineProperty2["default"])(this, "camera", void 0);
  this.options = _objectSpread(_objectSpread({}, _config.camera), options);
  var _this$options = this.options,
    fov = _this$options.fov,
    far = _this$options.far,
    dom = _this$options.dom,
    type = _this$options.type;
  var width = dom instanceof HTMLElement ? dom.clientWidth : innerWidth;
  var height = dom instanceof HTMLElement ? dom.clientHeight : innerHeight;
  if (type === _types.CameraType.orthographic) {
    this.camera = new THREE.OrthographicCamera(Number(width) / -2, Number(width) / 2, Number(height) / 2, Number(height) / -2, 1, far);
    this.camera.zoom = fov;
    return;
  }
  this.camera = new THREE.PerspectiveCamera(fov, Number(width) / Number(height), 1);
});
exports["default"] = Camera;