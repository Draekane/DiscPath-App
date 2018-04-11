'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _immutabilityHelper = require('immutability-helper');

var _immutabilityHelper2 = _interopRequireDefault(_immutabilityHelper);

var _disc = require('../actionTypes/disc');

var discActionTypes = _interopRequireWildcard(_disc);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var intiialState = {
  discId: -1,
  company: null,
  name: null,
  range: 0,
  hst: 0,
  lsf: 0,
  type: null,
  enabled: true,
  wear: 10
};

var disc = function disc() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : intiialState;
  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  switch (action.type) {
    case discActionTypes.LOAD_DISC_DATA:
      return function () {
        var discData = action.data.discData;


        if (!discData) {
          return state;
        }
        return (0, _immutabilityHelper2.default)(state, {
          discId: {
            $set: discData.discId
          },
          company: {
            $set: discData.company
          },
          name: {
            $set: discData.name
          },
          range: {
            $set: discData.range
          },
          hst: {
            $set: discData.hst
          },
          lsf: {
            $set: discData.lsf
          },
          type: {
            $set: discData.type
          },
          enabled: {
            $set: discData.enabled
          },
          wear: {
            $set: discData.wear
          }
        });
      }();
    case discActionTypes.UPDATE_DISC_WEAR:
      return (0, _immutabilityHelper2.default)(state, {
        wear: {
          $set: action.data.wear
        }
      });
    case discActionTypes.DISABLE_DISC:
      return (0, _immutabilityHelper2.default)(state, {
        enabled: {
          $set: false
        }
      });
    case discActionTypes.ENABLE_DISC:
      return (0, _immutabilityHelper2.default)(state, {
        enabled: {
          $set: true
        }
      });
    default:
      return state;
  }
};

exports.default = disc;