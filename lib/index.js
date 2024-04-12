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
var _config = _interopRequireDefault(require("./config"));
var _Camera = _interopRequireDefault(require("./misc/Camera"));
var _Light = _interopRequireDefault(require("./misc/Light"));
var _OrbitControls = _interopRequireDefault(require("./misc/OrbitControls"));
var _physicsMaterial = _interopRequireDefault(require("./misc/physicsMaterial"));
var _physicWorld = _interopRequireDefault(require("./misc/physicWorld"));
var _Renderer = _interopRequireDefault(require("./misc/Renderer"));
var _Sky = _interopRequireDefault(require("./misc/Sky"));
var _lescaEnterframe = _interopRequireDefault(require("lesca-enterframe"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var Statsjs = require('stats-js');
var CannonEsDebuger = require('cannon-es-debugger')["default"];
var Webgl = exports["default"] = /*#__PURE__*/function () {
  function Webgl(options) {
    var _this = this;
    (0, _classCallCheck2["default"])(this, Webgl);
    (0, _defineProperty2["default"])(this, "options", void 0);
    (0, _defineProperty2["default"])(this, "renderer", void 0);
    (0, _defineProperty2["default"])(this, "update", void 0);
    (0, _defineProperty2["default"])(this, "scene", void 0);
    (0, _defineProperty2["default"])(this, "camera", void 0);
    (0, _defineProperty2["default"])(this, "light", void 0);
    (0, _defineProperty2["default"])(this, "render", void 0);
    (0, _defineProperty2["default"])(this, "controls", void 0);
    (0, _defineProperty2["default"])(this, "clock", void 0);
    (0, _defineProperty2["default"])(this, "sky", void 0);
    (0, _defineProperty2["default"])(this, "physicsImpactMaterial", void 0);
    (0, _defineProperty2["default"])(this, "physicsStaticMaterial", void 0);
    (0, _defineProperty2["default"])(this, "world", void 0);
    (0, _defineProperty2["default"])(this, "stats", void 0);
    (0, _defineProperty2["default"])(this, "enterframe", void 0);
    this.options = _objectSpread(_objectSpread({}, _config["default"]), options);
    this.scene = new THREE.Scene();
    this.camera = new _Camera["default"](this.options.camera).camera;
    this.light = new _Light["default"](this.scene, this.options.light);
    this.renderer = new _Renderer["default"](this.options.renderer);
    this.renderer.resize(this.camera, this.options.camera.dom);
    this.render = this.renderer.renderer;
    this.controls = new _OrbitControls["default"](this.camera, this.render, this.options.controls);
    this.clock = new THREE.Clock();
    var _this$options = this.options,
      physics = _this$options.physics,
      sky = _this$options.sky,
      stats = _this$options.stats;
    if (sky.enabled) {
      this.sky = new _Sky["default"](this.options.sky);
      this.scene.add(this.sky.sky);
    }
    if (physics) {
      var physicsMaterial = new _physicsMaterial["default"]();
      var Impact = physicsMaterial.Impact,
        Static = physicsMaterial.Static;
      this.physicsImpactMaterial = Impact;
      this.physicsStaticMaterial = Static;
      this.world = new _physicWorld["default"]().world;
      this.world.addContactMaterial(physicsMaterial.material);
    }
    if (stats) {
      this.stats = new Statsjs();
      this.stats.showPanel(0);
      document.body.appendChild(this.stats.dom);
    }
    this.update = function () {
      var _this$stats, _this$world;
      (_this$stats = _this.stats) === null || _this$stats === void 0 || _this$stats.begin();
      _this.controls.controls.update();
      _this.render.render(_this.scene, _this.camera);
      (_this$world = _this.world) === null || _this$world === void 0 || _this$world.step(1 / 60, _this.clock.getDelta());
    };
    this.enterframe = _lescaEnterframe["default"];
    _lescaEnterframe["default"].setFPS(this.options.fps);
    _lescaEnterframe["default"].add(this.update);
    _lescaEnterframe["default"].play();
  }
  return (0, _createClass2["default"])(Webgl, [{
    key: "setFPS",
    value: function setFPS(fps) {
      _lescaEnterframe["default"].setFPS(fps);
    }
  }, {
    key: "addCannonDebuger",
    value: function addCannonDebuger() {
      var cannonEsDebuger = new CannonEsDebuger(this.scene, this.world);
      return cannonEsDebuger;
    }
  }]);
}();