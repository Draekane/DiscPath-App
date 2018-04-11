'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _companyShapes = require('../../propTypeShapes/companyShapes');

var _company = require('../../actions/company');

var companyActions = _interopRequireWildcard(_company);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CompanyDiscs = function (_Component) {
  _inherits(CompanyDiscs, _Component);

  function CompanyDiscs() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, CompanyDiscs);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = CompanyDiscs.__proto__ || Object.getPrototypeOf(CompanyDiscs)).call.apply(_ref, [this].concat(args))), _this), _this.createCompanyDiscSelections = function () {
      var companies = _this.props.companies;

      var newOptions = [];
      _lodash2.default.forEach(companies, function (company) {
        _lodash2.default.forEach(company.discs, function (disc) {
          newOptions.push({ label: company.name + ' ' + disc.name, value: company.companyId + '-' + disc.discId });
        });
      });

      return newOptions;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(CompanyDiscs, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      companyActions.loadCompanies();
    }
  }, {
    key: 'render',
    value: function render() {
      var displaySuggestions = this.createCompanyDiscSelections();
      var selectDisplay = _react2.default.createElement(_reactSelect2.default, {
        name: 'CompanyDiscSelector',
        id: 'CompanyDiscSelector',
        options: displaySuggestions,
        onChange: this.onSuggestionSelected,
        autosize: false
      });

      return _react2.default.createElement(
        'div',
        null,
        selectDisplay
      );
    }
  }]);

  return CompanyDiscs;
}(_react.Component);

CompanyDiscs.propTypes = {
  companies: _propTypes2.default.shape(_companyShapes.companyShape)
};

exports.default = CompanyDiscs;