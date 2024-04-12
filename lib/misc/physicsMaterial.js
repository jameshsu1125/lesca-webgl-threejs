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
var CANNON = _interopRequireWildcard(require("cannon-es"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var PhysicsMaterial = exports["default"] = /*#__PURE__*/(0, _createClass2["default"])(function PhysicsMaterial() {
  (0, _classCallCheck2["default"])(this, PhysicsMaterial);
  (0, _defineProperty2["default"])(this, "material", void 0);
  (0, _defineProperty2["default"])(this, "Impact", void 0);
  (0, _defineProperty2["default"])(this, "Static", void 0);
  this.Impact = new CANNON.Material('Impact');
  this.Static = new CANNON.Material('Static');
  this.material = new CANNON.ContactMaterial(this.Impact, this.Static, {
    friction: 0.1,
    restitution: 0.1
  });
});