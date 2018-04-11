'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutabilityHelper = require('immutability-helper');

var _immutabilityHelper2 = _interopRequireDefault(_immutabilityHelper);

var _company = require('../actionTypes/company');

var companyActionTypes = _interopRequireWildcard(_company);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var intiialState = {
  companies: []
};

var company = function company() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : intiialState;
  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  switch (action.type) {
    case companyActionTypes.LOAD_COMPANY_DATA:
      return function () {
        var companyFiles = action.data.companyFiles;


        if (!companyFiles) {
          return state;
        }
        return (0, _immutabilityHelper2.default)(state, {
          companies: {
            $set: companyFiles
          }
        });
      }();
    default:
      return state;
  }
};

exports.default = company;