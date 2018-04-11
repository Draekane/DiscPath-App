'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Disc = function Disc(props) {
  var company = props.company,
      name = props.name,
      enabled = props.enabled,
      wear = props.wear;


  var handleChangeValue = function handleChangeValue(value, event) {
    var discId = props.discId,
        setWearFunc = props.setWearFunc;

    if (setWearFunc != null) {
      setWearFunc(value, discId, event);
    }
  };

  var handleRemove = function handleRemove(event) {
    var discId = props.discId,
        removeFunc = props.removeFunc;

    if (removeFunc != null) {
      removeFunc(discId, event);
    }
  };

  var handleSetEnable = function handleSetEnable(event) {
    var discId = props.discId,
        enableFunc = props.enableFunc;

    if (enableFunc != null) {
      enableFunc(discId, !enabled, event);
    }
  };

  var boundHandleChangeValue = handleChangeValue.bind(undefined, undefined.value);
  var boundHandleRemove = handleRemove.bind(undefined);
  var boundHandleSetEnable = handleSetEnable.bind(undefined);

  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement('input', { type: 'check', checked: enabled, onClick: boundHandleSetEnable }),
    company,
    ' ',
    name,
    _react2.default.createElement('input', { type: 'range', min: '1', max: '10', value: wear, onChange: boundHandleChangeValue }),
    _react2.default.createElement(
      'button',
      { onClick: boundHandleRemove, type: 'button' },
      'Remove'
    )
  );
};

Disc.propTypes = {
  discId: _propTypes2.default.number.isRequired,
  company: _propTypes2.default.string.isRequired,
  name: _propTypes2.default.string.isRequired,
  enabled: _propTypes2.default.bool,
  wear: _propTypes2.default.number,
  removeFunc: _propTypes2.default.func,
  enableFunc: _propTypes2.default.func,
  setWearFunc: _propTypes2.default.func
};

Disc.defaultProps = {
  enabled: true,
  wear: 10,
  removeFunc: null,
  enableFunc: null,
  setWearFunc: null
};

exports.default = Disc;