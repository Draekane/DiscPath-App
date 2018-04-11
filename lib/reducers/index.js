'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require('redux');

var _reduxForm = require('redux-form');

var _disc = require('../reducers/disc');

var _disc2 = _interopRequireDefault(_disc);

var _company = require('../reducers/company');

var _company2 = _interopRequireDefault(_company);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var discPath = (0, _redux.combineReducers)({
  disc: _disc2.default,
  company: _company2.default,
  form: _reduxForm.reducer
});

var rootReducer = function rootReducer(state, action) {
  if (action.type === 'LOGOUT') {
    state = undefined; // eslint-disable-line no-param-reassign
  }

  return discPath(state, action);
};

exports.default = rootReducer;