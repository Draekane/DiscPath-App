'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.throwerShape = exports.discShape = undefined;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var discShape = exports.discShape = _propTypes2.default.shape({
  discId: _propTypes2.default.number,
  company: _propTypes2.default.string,
  name: _propTypes2.default.string,
  range: _propTypes2.default.number,
  hst: _propTypes2.default.number,
  lsf: _propTypes2.default.number,
  type: _propTypes2.default.string,
  enabled: _propTypes2.default.bool,
  wear: _propTypes2.default.number
});

var throwerShape = exports.throwerShape = _propTypes2.default.shape({
  throwType: _propTypes2.default.string,
  power: _propTypes2.default.number,
  fanPower: _propTypes2.default.bool,
  pathsShown: _propTypes2.default.string,
  lieDistance: _propTypes2.default.bool,
  lieCircle: _propTypes2.default.bool
});