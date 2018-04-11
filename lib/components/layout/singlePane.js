'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDocumentTitle = require('react-document-title');

var _reactDocumentTitle2 = _interopRequireDefault(_reactDocumentTitle);

var _flightMap = require('../map/flightMap');

var _flightMap2 = _interopRequireDefault(_flightMap);

var _companyDiscs = require('../company/companyDiscs');

var _companyDiscs2 = _interopRequireDefault(_companyDiscs);

var _companyShapes = require('../../propTypeShapes/companyShapes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SinglePane = function (_Component) {
  _inherits(SinglePane, _Component);

  function SinglePane() {
    _classCallCheck(this, SinglePane);

    return _possibleConstructorReturn(this, (SinglePane.__proto__ || Object.getPrototypeOf(SinglePane)).apply(this, arguments));
  }

  _createClass(SinglePane, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          pageTitle = _props.pageTitle,
          pageHeader = _props.pageHeader,
          companies = _props.companies;

      var discs = [{
        discId: -1,
        company: 'Dynamic Discs',
        name: 'Breakout',
        range: 358,
        hst: -23,
        lsf: 38,
        type: 'F',
        enabled: true,
        wear: 10
      }, {
        discId: -1,
        company: 'Dynamic Discs',
        name: 'Deputy',
        range: 261,
        hst: -27,
        lsf: 0,
        type: 'P',
        enabled: true,
        wear: 10
      }];
      var thrower = {
        throwType: 'rhbh',
        power: 32,
        fanPower: true,
        pathsShown: 'one',
        lieDistance: true,
        lieCircle: true,
        isRequired: {}
      };
      var content = _react2.default.createElement(
        _reactDocumentTitle2.default,
        { title: pageTitle },
        _react2.default.createElement(
          'div',
          { className: 'workspace-container grid-container' },
          _react2.default.createElement(
            'header',
            { className: 'App-header grid-item-header' },
            _react2.default.createElement(
              'h1',
              { className: 'App-title' },
              pageHeader
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'grid-item2' },
            _react2.default.createElement(_flightMap2.default, { discs: discs, thrower: thrower })
          ),
          _react2.default.createElement(
            'div',
            { className: 'grid-item2' },
            _react2.default.createElement(_companyDiscs2.default, { companies: companies })
          ),
          _react2.default.createElement(
            'div',
            { className: 'grid-item1' },
            'Throw Selector Goes Here'
          ),
          _react2.default.createElement(
            'div',
            { className: 'grid-item1' },
            'Display Options Goes Here'
          ),
          _react2.default.createElement(
            'div',
            { className: 'grid-item1' },
            'Import/Export Options Go Here'
          )
        )
      );

      return content;
    }
  }]);

  return SinglePane;
}(_react.Component);

SinglePane.propTypes = {
  pageTitle: _propTypes2.default.string,
  pageHeader: _propTypes2.default.string,
  companies: _propTypes2.default.arrayOf(_companyShapes.companyShape)
};

SinglePane.defaultProps = {
  pageTitle: 'DiscPath',
  pageHeader: 'Experimental Disc Golf Flight Path Visualizer'
};

exports.default = SinglePane;