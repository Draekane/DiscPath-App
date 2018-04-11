'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.companyShape = exports.discShape = undefined;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var discShape = exports.discShape = _propTypes2.default.shape({
  discId: _propTypes2.default.number.isRequired,
  name: _propTypes2.default.string.isRequired,
  range: _propTypes2.default.number,
  hst: _propTypes2.default.number,
  lsf: _propTypes2.default.number,
  type: _propTypes2.default.string
});

var companyShape = exports.companyShape = _propTypes2.default.shape({
  name: _propTypes2.default.string.isRequired,
  companyId: _propTypes2.default.number.isRequired,
  discs: _propTypes2.default.arrayOf(discShape)
});