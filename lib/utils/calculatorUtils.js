'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Converts an integer to a hex string. Given SMALL name for ease of use
var hb = exports.hb = function hb(n) {
  var s = Math.floor(n).toString(16);
  if (s.length === 1) s = '0' + s;
  return s;
};

var catmull = exports.catmull = function catmull(p, i, pc) {
  var k = Math.floor(i * (pc - 1));
  var t = i * (pc - 1) - k;
  var y0 = k > 0 ? p[k - 1] : p[0] + (p[0] - p[1]);
  var y1 = p[k];
  var y2 = k < pc - 1 ? p[k + 1] : p[pc - 1];
  var y3 = k < pc - 2 ? p[k + 2] : p[pc - 1] + (p[pc - 1] - p[pc - 2]);
  var a = y1 * 2.0;
  var b = -y0 + y2;
  var c = y0 * 2.0 + y2 * 4.0 - y3 - y1 * 5.0;
  var d = -y0 + y1 * 3.0 + y3 - y2 * 3.0;
  return 0.5 * (a + b * t + c * Math.pow(t, 2) + d * Math.pow(t, 3));
};

var processForHex = exports.processForHex = function processForHex(p, i, pc) {
  return Math.min(255, Math.max(0, Math.floor(catmull(p, i, pc))));
};

var drawPath = exports.drawPath = function drawPath(options) {
  var dist = options.dist,
      hss = options.hss,
      lsf = options.lsf,
      armspeed = options.armspeed,
      wear = options.wear,
      throwType = options.throwType,
      color = options.color,
      drawPath = options.drawPath,
      pathBuffer = options.pathBuffer,
      canvas = options.canvas;

  var yscale = 2.5;
  var xscale = 0.7;
  var pathContext = pathBuffer.getContext('2d');
  pathContext.strokeStyle = color;
  pathContext.lineWidth = 2.4;

  var airspeed = armspeed;
  var ehss = hss;
  var elsf = lsf;
  var turnsign = throwType === 'rhbh' ? 1.0 : -1.0;
  // 0.4+(1.0-airspeed*airspeed)*0.3;
  var fadestart = 0.4 + (1.0 - Math.pow(airspeed, 2)) * 0.3;
  var impact = (1.0 - airspeed) / 5;
  var turnend = 0.8 - Math.pow(airspeed, 2) * 0.36;
  var x = void 0;
  var y = void 0;
  var ox = canvas.width / 2;
  var oy = canvas.height;
  var vx = 0.0;
  var vy = -1.0;
  var ht = yscale * dist;
  var deltav = yscale / ht;
  var wm = wear / 10.0;

  // calculate effective HSS and LSF
  ehss *= 1.0 + (1.0 - wm);
  ehss -= (1.0 - wm) / 0.05 * (dist / 100);
  elsf *= wm;
  if (airspeed > 0.8) {
    var op = (airspeed - 0.8) / 0.4;
    op *= op * 2;
    var dc = Math.max(0.0, 350 - dist) / 10.0; // emphasize high-speed turn on sub-350ft discs
    ehss -= op * dc;
  }
  ehss *= Math.pow(airspeed, 4);
  elsf *= 1.0 / (airspeed * airspeed);

  // iterate through the flight path
  do {
    y = oy + vy;
    x = ox + vx * xscale;
    airspeed -= deltav;
    if (airspeed > turnend) {
      vx -= turnsign * (ehss / 14000) * (turnend / airspeed);
    }
    if (airspeed < fadestart) {
      vx -= turnsign * (elsf / 4000) * (fadestart - airspeed) / fadestart;
    }
    if (airspeed > 0.0) {
      if (drawPath) {
        pathContext.beginPath();
        pathContext.moveTo(ox, oy);
        pathContext.lineTo(x, y);
        pathContext.stroke();
      }
      ox = x;oy = y;
    }
  } while (airspeed > impact);

  // return lie coordinates to caller
  return [x, y];
};

var drawLie = exports.drawLie = function drawLie(options) {
  var x = options.x,
      y = options.y,
      markLie = options.markLie,
      color = options.color,
      lieColor = options.lieColor,
      lieOutline = options.lieOutline,
      pathBuffer = options.pathBuffer,
      lieBuffer = options.lieBuffer,
      outlineBuffer = options.outlineBuffer;

  var pathContext = pathBuffer.getContext('2d');
  var lieContext = lieBuffer.getContext('2d');
  var outlineContext = outlineBuffer.getContext('2d');

  // mark the lie
  if (markLie) {
    pathContext.strokeStyle = color;
    pathContext.fillStyle = color;
    pathContext.beginPath();
    pathContext.arc(x, y, 2, 0, 2 * 3.1415926);
    pathContext.stroke();
    pathContext.fill();
  }

  // 15m circle around lie
  outlineContext.globalCompositeOperation = 'source-over';
  outlineContext.globalAlpha = 1.0;
  outlineContext.fillStyle = lieOutline;
  outlineContext.strokeStyle = lieOutline;
  outlineContext.beginPath();
  outlineContext.arc(x, y, 1.5 * 33, 0, 2 * 3.1415926);
  outlineContext.stroke();
  outlineContext.fill();

  // 10m circle around lie
  lieContext.globalCompositeOperation = 'source-over';
  lieContext.globalAlpha = 1.0;
  lieContext.fillStyle = lieColor;
  lieContext.strokeStyle = lieColor;
  lieContext.beginPath();
  lieContext.arc(x, y, 33, 0, 2 * 3.1415926);
  lieContext.stroke();
  lieContext.fill();
};