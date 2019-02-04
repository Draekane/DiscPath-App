import { processForHex, hb } from './calculatorUtils';

/* All colors based on RYB, for viewing, not RGB for coding. */
/* Primary Colors */
const yellow = {
  spr: [255, 255, 255, 255, 255, 255, 255, 255],
  spg: [255, 255, 255, 255, 255, 255, 125, 0],
  spb: [0, 0, 0, 0, 0, 0, 0, 0],
};

const blue = {
  spr: [0, 0, 0, 0, 0, 0, 255, 255],
  spg: [0, 0, 0, 0, 0, 0, 0, 0],
  spb: [255, 255, 255, 255, 255, 255, 125, 0],
};

const red = {
  spr: [255, 255, 255, 255, 255, 255, 125, 0],
  spg: [0, 0, 0, 0, 0, 0, 255, 255],
  spb: [0, 0, 0, 0, 0, 0, 0, 0],
};

/* Secondary Colors */
const purple = {
  spr: [125, 125, 125, 125, 125, 125, 255, 255],
  spg: [0, 0, 0, 0, 0, 0, 0, 0],
  spb: [255, 255, 255, 255, 255, 185, 125, 0],
};

const orange = {
  spr: [255, 255, 255, 255, 255, 255, 255, 255],
  spg: [125, 125, 125, 125, 125, 60, 63, 0],
  spb: [0, 0, 0, 0, 0, 0, 0, 0],
};

const green = {
  spr: [0, 0, 0, 0, 0, 0, 255, 255],
  spg: [255, 255, 255, 255, 255, 185, 125, 0],
  spb: [0, 0, 0, 0, 0, 0, 0, 0],
};

/* Tertiary Colors */
const magenta = {
  spr: [255, 255, 255, 255, 255, 255, 255, 255],
  spg: [0, 0, 0, 0, 0, 0, 0, 0],
  spb: [255, 255, 255, 255, 255, 185, 125, 0],
};

const vermillion = {
  spr: [255, 255, 255, 255, 255, 255, 255, 255],
  spg: [62, 62, 62, 62, 62, 62, 30, 0],
  spb: [0, 0, 0, 0, 0, 0, 0, 0],
};

const amber = {
  spr: [255, 255, 255, 255, 255, 255, 255, 255],
  spg: [185, 185, 185, 185, 185, 125, 60, 0],
  spb: [0, 0, 0, 0, 0, 0, 0, 0],
};

const chartreuse = {
  spr: [185, 185, 185, 185, 185, 185, 255, 255],
  spg: [255, 255, 255, 255, 255, 185, 125, 0],
  spb: [0, 0, 0, 0, 0, 0, 0, 0],
};

const teal = {
  spr: [0, 0, 0, 0, 0, 185, 255, 255],
  spg: [255, 255, 255, 255, 255, 185, 125, 0],
  spb: [255, 255, 255, 255, 255, 185, 125, 0],
};

const violet = {
  spr: [185, 185, 185, 185, 185, 185, 255, 255],
  spg: [0, 0, 0, 0, 0, 0, 0, 0],
  spb: [255, 255, 255, 255, 255, 185, 125, 0],
};

export const getColorPoint = (color, power) => {
  let splineColor = green;
  if (color) {
    switch (color.toLowerCase()) {
      case 'red':
        splineColor = red;
        break;
      case 'yellow':
        splineColor = yellow;
        break;
      case 'blue':
        splineColor = blue;
        break;
      case 'purple':
        splineColor = purple;
        break;
      case 'orange':
        splineColor = orange;
        break;
      case 'green':
        splineColor = green;
        break;
      case 'magenta':
        splineColor = magenta;
        break;
      case 'vermillion':
        splineColor = vermillion;
        break;
      case 'amber':
        splineColor = amber;
        break;
      case 'chartreuse':
        splineColor = chartreuse;
        break;
      case 'teal':
        splineColor = teal;
        break;
      case 'violet':
        splineColor = violet;
        break;
      default:
        splineColor = green;
        break;
    }
  }

  const ry = processForHex(splineColor.spr, power, 8);
  const gy = processForHex(splineColor.spg, power, 8);
  const by = processForHex(splineColor.spb, power, 8);

  return `#${hb(ry)}${hb(gy)}${hb(by)}`;
};
