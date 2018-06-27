import PropTypes from 'prop-types';
import React, { Component } from 'react';
import _ from 'lodash';
import { FaMinusSquare, FaPlusSquare, FaCircle } from 'react-icons/lib/fa';

import { discShape, throwerShape, displayOptionsShape } from '../../propTypeShapes/bagShapes';
import { processForHex, hb, drawPath, drawLie } from '../../utils/calculatorUtils';

const lieConfig = {
  D: { color: '#FF7800', outline: '#884000' }, // Distance Driver Colors
  F: { color: '#78FF00', outline: '#408800' }, // Fairway Driver Colors
  M: { color: '#0078FF', outline: '#004088' }, // Mid Colors
  P: { color: '#00FFFF', outline: '#008888' }, // Putt and Approach Colors
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
    // THIS IS WHAT DRAWS THE CANVAS AND THE GRID
    const { zoom } = this.props;
    canvas = this.canvasRef;
    const setWidth = canvas.width / zoom;
    const setHeight = canvas.height / zoom;

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
    let j;
    // Draw Vertical Lines
    for (i = 0; i < canvas.width; i += 50) {
      const adjustI = i * zoom;
      context.beginPath();
      context.moveTo(adjustI, canvas.height);
      context.lineTo(adjustI, 0);
      context.stroke();
    }
    // Draw and Label Horizontal lines
    for (j = 0; j <= canvas.height; j += 50) {
      const adjustJ = j * zoom;
      context.beginPath();
      context.moveTo(canvas.height, adjustJ);
      context.lineTo(0, adjustJ);
      context.stroke();
      context.textAlign = 'left';
      context.fillText(`${j}'`, 5, (canvas.height - adjustJ) - 3);
      context.textAlign = 'right';
      context.fillText(`${Math.floor((j) / 3.33)}m`, canvas.width - 5, (canvas.height - adjustJ) - 3);
    }
    const pathContext = pathBuffer.getContext('2d');
    const lieContext = lieBuffer.getContext('2d');
    const outlineContext = outlineBuffer.getContext('2d');
    pathContext.scale(zoom, zoom);
    lieContext.scale(zoom, zoom);
    outlineContext.scale(zoom, zoom);
    pathContext.clearRect(0, 0, setWidth, setHeight);
    lieContext.clearRect(0, 0, setWidth, setHeight);
    outlineContext.clearRect(0, 0, setWidth, setHeight);
  }

  updateCanvas() {
    const {
      thrower,
      discs,
      displayOptions,
      zoom,
    } = this.props;
    let pwi;
    let pw;
    let lie;
    let ry;
    let gy;
    let by;
    let pws;
    let pointColor;
    let weightDiff;
    let powerShift;

    const { power: throwerPower, throwType: throwerThrowType } = thrower;

    this.resetBuffers();
    const lieLabels = [];

    const orderedDiscs = _.orderBy(discs, d => d.type);

    // Cycle through Discs
    _.forEach(orderedDiscs, (disc) => {
      if (!disc.enabled) { return; }

      const {
        maxWeight,
        weight,
        power: discPower,
        throwType: discThrowType,
      } = disc;

      pwi = (discPower || throwerPower);

      if (maxWeight && weight) {
        weightDiff = maxWeight - weight;
        powerShift = (weightDiff * 0.005) + 1;

        pwi *= powerShift;
      }

      pw = 0.6 + ((pwi / 48) * 0.6);

      // Draw fan/landing zone if true
      if (displayOptions.fanPower) {
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
            wear: disc.wear || 10,
            throwType: discThrowType || throwerThrowType,
            color: pointColor,
            drawPath: (displayOptions.pathsShown === 'all' && i % 2 === 0),
            pathBuffer,
            canvas,
            zoom,
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
            zoom,
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
        wear: disc.wear || 10,
        throwType: discThrowType || throwerThrowType,
        color: pointColor,
        drawPath: (displayOptions.pathsShown === 'all' || displayOptions.pathsShown === 'one'),
        pathBuffer,
        canvas,
        zoom,
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
        zoom,
      };
      drawLie(drawLieOptions);
      lieLabels.push([lie, `${disc.company} ${disc.name}`]);
    });

    const context = canvas.getContext('2d');
    const setHeight = canvas.height / zoom;

    if (displayOptions.lieCircle) {
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

    if (displayOptions.lieDistance) {
      _.forEach(lieLabels, (key) => {
        const lie = key[0];
        const dn = key[1];
        const txt = `${setHeight - lie[1]}' ${Math.floor((setHeight - lie[1]) / 3.33)}m`;
        context.font = '10px helvetica';
        context.textAlign = 'center';
        context.strokeStyle = '#000';
        context.fillStyle = '#c0ffee';
        context.lineWidth = 3;
        const adjustX = lie[0] * zoom;
        const adjustY = lie[1] * zoom;
        context.strokeText(txt, adjustX, adjustY - 6);
        context.fillText(txt, adjustX, adjustY - 6);
        context.font = '9px helvetica';
        context.strokeText(dn, adjustX, adjustY - 18);
        context.fillText(dn, adjustX, adjustY - 18);
      });
    }
  }

  handleEnlargeMap = () => {
    const { functions } = this.props;

    functions.handleMapEnlarge();
  }

  handleResetMap = () => {
    const { functions } = this.props;

    functions.handleMapReset();
  }

  handleShrinkMap = () => {
    const { functions } = this.props;

    functions.handleMapShrink();
  }

  render() {
    const {
      width,
      height,
      zoom,
      id,
    } = this.props;
    return (
      <div className="canvasContainer" >
        <div className="zoomButtons" >
          <span style={{ color: 'white' }} >Map Size: </span>
          <span title="Shrink Map" >
            <FaMinusSquare onClick={this.handleShrinkMap} color="white" className="zoomButton" />
          </span>
          <span title="Reset Map">
            <FaCircle color="white" onClick={this.handleResetMap} className="zoomButton" />
          </span>
          <span title="Enlarge Map">
            <FaPlusSquare color="white" onClick={this.handleEnlargeMap} className="zoomButton" />
          </span>
        </div>
        <canvas
          ref={el => this.canvasRef = el} /* eslint-disable-line no-return-assign */
          id={`${id}splineCanvas`}
          className="splineCanvas"
          width={width * zoom}
          height={height * zoom}
        />
      </div>);
  }
}

FlightMap.propTypes = {
  id: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  discs: PropTypes.arrayOf(discShape),
  thrower: PropTypes.shape(throwerShape),
  displayOptions: PropTypes.shape(displayOptionsShape),
  zoom: PropTypes.number,
  functions: PropTypes.shape({
    handleMapEnlarge: PropTypes.func,
    handleMapShrink: PropTypes.func,
    handleMapReset: PropTypes.func,
  }),
};

FlightMap.defaultProps = {
  width: 350,
  height: 550,
  zoom: 2,
};

export default FlightMap;
