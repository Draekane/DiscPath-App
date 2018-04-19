import PropTypes from 'prop-types';
import React, { Component } from 'react';
import _ from 'lodash';

import { discShape, throwerShape } from '../../propTypeShapes/bagShapes';
import { processForHex, hb, drawPath, drawLie } from '../../utils/calculatorUtils';

const lieConfig = {
  D: { color: '#fff', outline: '#888' }, // Distance Driver Colors
  F: { color: '#faa', outline: '#833' }, // Fairway Driver Colors
  M: { color: '#aaf', outline: '#338' }, // Mid Colors
  P: { color: '#afa', outline: '#383' }, // Putt and Approach Colors
};

const splinePoints = {
  spr: [0, 0, 0, 0, 0, 0, 255, 255],
  spg: [255, 255, 255, 255, 255, 255, 255, 0],
  spb: [0, 0, 0, 0, 0, 0, 0, 0],
};

let canvas;
let pathBuffer;
let lieBuffer;
let outlineBuffer;

class FlightMap extends Component {
  componentDidMount() {
    this.updateCanvas();
  }

  componentDidUpdate() {
    this.updateCanvas();
  }

  resetBuffers() {
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
    const context = canvas.getContext('2d');
    context.fillStyle = '#000';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.lineWidth = 1.0;
    context.font = '9px helvetica';
    context.fillStyle = '#999';
    context.strokeStyle = '#446';
    let i;
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
      context.fillText(`${canvas.height - i}'`, 5, i - 3);
      context.textAlign = 'right';
      context.fillText(`${Math.floor((canvas.height - i) / 3.33)}m`, canvas.width - 5, i - 3);
    }
    const pathContext = pathBuffer.getContext('2d');
    const lieContext = lieBuffer.getContext('2d');
    const outlineContext = outlineBuffer.getContext('2d');
    pathContext.clearRect(0, 0, canvas.width, canvas.height);
    lieContext.clearRect(0, 0, canvas.width, canvas.height);
    outlineContext.clearRect(0, 0, canvas.width, canvas.height);
  }

  updateCanvas() {
    const { thrower, discs } = this.props;
    const pwi = thrower.power;
    const pw = 0.6 + ((pwi / 48) * 0.6);
    let lie;
    let ry;
    let gy;
    let by;
    let pws;
    let pointColor;

    this.resetBuffers();
    const lieLabels = [];

    const orderedDiscs = _.orderBy(discs, d => d.type);

    // Cycle through Discs
    _.forEach(orderedDiscs, (disc) => {
      if (!disc.enabled) { return; }

      // Draw fan/landing zone if true
      if (thrower.fanPower) {
        for (let i = 0; i <= 24; i++) {
          pws = i / 24.0;
          ry = processForHex(splinePoints.spr, pws, 8);
          gy = processForHex(splinePoints.spg, pws, 8);
          by = processForHex(splinePoints.spb, pws, 8);
          const pwf = 0.6 + (pws * 0.6);
          const delta = Math.abs(pw - pwf);
          const a = Math.min(0.4, Math.max(0.3, Math.cos(delta * 5.5)));

          const pointColor = `#${hb(a * ry)}${hb(a * gy)}${hb(a * by)}`;
          const drawPathOptions = {
            dist: disc.range,
            hss: disc.hst,
            lsf: disc.lsf,
            armspeed: pwf,
            wear: disc.wear,
            throwType: thrower.throwType,
            color: pointColor,
            drawPath: (thrower.pathsShown === 'all' && i % 2 === 0),
            pathBuffer,
            canvas,
          };
          lie = drawPath(drawPathOptions);
          const drawLieOptions = {
            x: lie[0],
            y: lie[1],
            markLie: (drawPath === 'all' && i % 2 === 0),
            color: pointColor,
            lieColor: lieConfig[disc.type].color,
            lieOutline: lieConfig[disc.type].outline,
            pathBuffer,
            lieBuffer,
            outlineBuffer,
          };
          drawLie(drawLieOptions);
        }
      }

      // draw disc path for selected throw power
      pws = (pwi / 48.0);
      ry = processForHex(splinePoints.spr, pws, 8);
      gy = processForHex(splinePoints.spg, pws, 8);
      by = processForHex(splinePoints.spb, pws, 8);
      pointColor = `#${hb(ry)}${hb(gy)}${hb(by)}`;
      const drawPathOptions = {
        dist: disc.range,
        hss: disc.hst,
        lsf: disc.lsf,
        armspeed: pw,
        wear: disc.wear,
        throwType: thrower.throwType,
        color: pointColor,
        drawPath: (thrower.pathsShown === 'all' || thrower.pathsShown === 'one'),
        pathBuffer,
        canvas,
      };
      lie = drawPath(drawPathOptions);
      const drawLieOptions = {
        x: lie[0],
        y: lie[1],
        markLie: true,
        color: pointColor,
        lieColor: lieConfig[disc.type].color,
        lieOutline: lieConfig[disc.type].outline,
        pathBuffer,
        lieBuffer,
        outlineBuffer,
      };
      drawLie(drawLieOptions);
      lieLabels.push([lie, `${disc.company} ${disc.name}`]);
    });

    const context = canvas.getContext('2d');

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
      _.forEach(lieLabels, (key) => {
        const lie = key[0];
        const dn = key[1];
        const txt = `${canvas.height - lie[1]}' ${Math.floor((canvas.height - lie[1]) / 3.33)}m`;
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


  render() {
    const { width, height } = this.props;
    return (
      <div>
        <canvas
          ref={el => this.canvasRef = el} /* eslint-disable-line no-return-assign */
          id="splineCanvas"
          className="splineCanvas"
          width={width}
          height={height}
        />
      </div>);
  }
}

FlightMap.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  discs: PropTypes.arrayOf(discShape),
  thrower: PropTypes.shape(throwerShape),
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
    wear: 10,
  }],
  thrower: {
    throwType: 'rhbh',
    power: 100,
    fanPower: true,
    pathsShown: 'one',
    lieDistance: true,
    lieCircle: true,
  },
};

export default FlightMap;
