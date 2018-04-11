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

var _bagShapes = require('../../propTypeShapes/bagShapes');

var _calculatorUtils = require('../../utils/calculatorUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var lieConfig = {
  D: { color: '#fff', outline: '#888' }, // Distance Driver Colors
  F: { color: '#faa', outline: '#833' }, // Fairway Driver Colors
  M: { color: '#aaf', outline: '#338' }, // Mid Colors
  P: { color: '#afa', outline: '#383' } // Putt and Approach Colors
};

var splinePoints = {
  spr: [0, 0, 0, 0, 0, 0, 255, 255],
  spg: [255, 255, 255, 255, 255, 255, 255, 0],
  spb: [0, 0, 0, 0, 0, 0, 0, 0]
};

var canvas = void 0;
var pathBuffer = void 0;
var lieBuffer = void 0;
var outlineBuffer = void 0;

var FlightMap = function (_Component) {
  _inherits(FlightMap, _Component);

  function FlightMap() {
    _classCallCheck(this, FlightMap);

    return _possibleConstructorReturn(this, (FlightMap.__proto__ || Object.getPrototypeOf(FlightMap)).apply(this, arguments));
  }

  _createClass(FlightMap, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.updateCanvas();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.updateCanvas();
    }
  }, {
    key: 'resetBuffers',
    value: function resetBuffers() {
      canvas = this.canvasRef;

      pathBuffer = document.createElement('canvas');
      pathBuffer.width = canvas.width;
      pathBuffer.height = canvas.height;

      lieBuffer = document.createElement('canvas');
      lieBuffer.width = canvas.width;
      lieBuffer.height = canvas.height;

      outlineBuffer = document.createElement('canvas');
      outlineBuffer.width = canvas.width;
      outlineBuffer.height = canvas.height;
      var context = canvas.getContext('2d');
      context.fillStyle = '#000';
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.lineWidth = 1.0;
      context.font = '9px helvetica';
      context.fillStyle = '#999';
      context.strokeStyle = '#446';
      var i = void 0;
      for (i = 0; i < canvas.width; i += 50) {
        context.beginPath();
        context.moveTo(i, 0);
        context.lineTo(i, canvas.height);
        context.stroke();
      }
      for (i = 0; i <= canvas.height; i += 50) {
        context.beginPath();
        context.moveTo(0, i);
        context.lineTo(canvas.height, i);
        context.stroke();
        context.textAlign = 'left';
        context.fillText(canvas.height - i + '\'', 5, i - 3);
        context.textAlign = 'right';
        context.fillText(Math.floor((canvas.height - i) / 3.33) + 'm', canvas.width - 5, i - 3);
      }
      var pathContext = pathBuffer.getContext('2d');
      var lieContext = lieBuffer.getContext('2d');
      var outlineContext = outlineBuffer.getContext('2d');
      pathContext.clearRect(0, 0, canvas.width, canvas.height);
      lieContext.clearRect(0, 0, canvas.width, canvas.height);
      outlineContext.clearRect(0, 0, canvas.width, canvas.height);
    }
  }, {
    key: 'updateCanvas',
    value: function updateCanvas() {
      var _props = this.props,
          thrower = _props.thrower,
          discs = _props.discs;

      var pwi = thrower.power;
      var pw = 0.6 + pwi / 48 * 0.6;
      var lie = void 0;
      var ry = void 0;
      var gy = void 0;
      var by = void 0;
      var pws = void 0;
      var pointColor = void 0;

      this.resetBuffers();
      var lieLabels = [];

      // Cycle through Discs
      _lodash2.default.forEach(discs, function (disc) {
        if (!disc.enabled) {
          return;
        }

        // Draw fan/landing zone if true
        if (thrower.fanPower) {
          for (var i = 0; i <= 24; i++) {
            pws = i / 24.0;
            ry = (0, _calculatorUtils.processForHex)(splinePoints.spr, pws, 8);
            gy = (0, _calculatorUtils.processForHex)(splinePoints.spg, pws, 8);
            by = (0, _calculatorUtils.processForHex)(splinePoints.spb, pws, 8);
            var pwf = 0.6 + pws * 0.6;
            var delta = Math.abs(pw - pwf);
            var a = Math.min(0.4, Math.max(0.3, Math.cos(delta * 5.5)));

            var _pointColor = '#' + (0, _calculatorUtils.hb)(a * ry) + (0, _calculatorUtils.hb)(a * gy) + (0, _calculatorUtils.hb)(a * by);
            var _drawPathOptions = {
              dist: disc.range,
              hss: disc.hst,
              lsf: disc.lsf,
              armspeed: pwf,
              wear: disc.wear,
              throwType: thrower.throwType,
              color: _pointColor,
              drawPath: thrower.pathsShown === 'all' && i % 2 === 0,
              pathBuffer: pathBuffer,
              canvas: canvas
            };
            lie = (0, _calculatorUtils.drawPath)(_drawPathOptions);
            var _drawLieOptions = {
              x: lie[0],
              y: lie[1],
              markLie: _calculatorUtils.drawPath === 'all' && i % 2 === 0,
              color: _pointColor,
              lieColor: lieConfig[disc.type].color,
              lieOutline: lieConfig[disc.type].outline,
              pathBuffer: pathBuffer,
              lieBuffer: lieBuffer,
              outlineBuffer: outlineBuffer
            };
            (0, _calculatorUtils.drawLie)(_drawLieOptions);
          }
        }

        // draw disc path for selected throw power
        pws = pwi / 48.0;
        ry = (0, _calculatorUtils.processForHex)(splinePoints.spr, pws, 8);
        gy = (0, _calculatorUtils.processForHex)(splinePoints.spg, pws, 8);
        by = (0, _calculatorUtils.processForHex)(splinePoints.spb, pws, 8);
        pointColor = '#' + (0, _calculatorUtils.hb)(ry) + (0, _calculatorUtils.hb)(gy) + (0, _calculatorUtils.hb)(by);
        var drawPathOptions = {
          dist: disc.range,
          hss: disc.hst,
          lsf: disc.lsf,
          armspeed: pw,
          wear: disc.wear,
          throwType: thrower.throwType,
          color: pointColor,
          drawPath: thrower.pathsShown === 'all' || thrower.pathsShown === 'one',
          pathBuffer: pathBuffer,
          canvas: canvas
        };
        lie = (0, _calculatorUtils.drawPath)(drawPathOptions);
        var drawLieOptions = {
          x: lie[0],
          y: lie[1],
          markLie: true,
          color: pointColor,
          lieColor: lieConfig[disc.type].color,
          lieOutline: lieConfig[disc.type].outline,
          pathBuffer: pathBuffer,
          lieBuffer: lieBuffer,
          outlineBuffer: outlineBuffer
        };
        (0, _calculatorUtils.drawLie)(drawLieOptions);
        lieLabels.push([lie, disc.company + ' ' + disc.name]);
      });

      var context = canvas.getContext('2d');

      if (thrower.lieCircle) {
        context.globalAlpha = 0.35;
        context.globalCompositeOperation = 'source-over';
        context.drawImage(outlineBuffer, 0, 0);
        context.globalAlpha = 0.15;
        context.globalCompositeOperation = 'source-over';
        context.drawImage(lieBuffer, 0, 0);
        context.globalAlpha = 1.0;
        context.globalCompositeOperation = 'source-over';
      }

      context.drawImage(pathBuffer, 0, 0);

      if (thrower.lieDistance) {
        _lodash2.default.forEach(lieLabels, function (key) {
          var lie = key[0];
          var dn = key[1];
          var txt = canvas.height - lie[1] + '\' ' + Math.floor((canvas.height - lie[1]) / 3.33) + 'm';
          context.font = '10px helvetica';
          context.textAlign = 'center';
          context.strokeStyle = '#000';
          context.fillStyle = '#c0ffee';
          context.lineWidth = 3;
          context.strokeText(txt, lie[0], lie[1] - 6);
          context.fillText(txt, lie[0], lie[1] - 6);
          context.font = '9px helvetica';
          context.strokeText(dn, lie[0], lie[1] - 18);
          context.fillText(dn, lie[0], lie[1] - 18);
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props2 = this.props,
          width = _props2.width,
          height = _props2.height;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement('canvas', { ref: function ref(el) {
            return _this2.canvasRef = el;
          }, id: 'splineCanvas', className: 'splineCanvas', width: width, height: height }),
        ' '
      );
    }
  }]);

  return FlightMap;
}(_react.Component);

FlightMap.propTypes = {
  width: _propTypes2.default.number,
  height: _propTypes2.default.number,
  discs: _propTypes2.default.arrayOf(_bagShapes.discShape),
  thrower: _propTypes2.default.shape(_bagShapes.throwerShape)
};

FlightMap.defaultProps = {
  width: 350,
  height: 550,
  discs: [{
    discId: -1,
    company: 'Dynamic Discs',
    name: 'Deputy',
    range: 261,
    hst: -27,
    lsf: 0,
    type: 4,
    enabled: true,
    wear: 10
  }],
  thrower: {
    throwType: 'rhbh',
    power: 100,
    fanPower: true,
    pathsShown: 'one',
    lieDistance: true,
    lieCircle: true
  }
};

exports.default = FlightMap;