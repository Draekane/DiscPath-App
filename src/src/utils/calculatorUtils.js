// Converts an integer to a hex string. Given SMALL name for ease of use
export const hb = (n) => {
  let s = Math.floor(n).toString(16);
  if (s.length === 1) s = `0${s}`;
  return s;
};

export const catmull = (p, i, pc) => {
  const k = Math.floor(i * (pc - 1));
  const t = (i * (pc - 1)) - k;
  const y0 = (k > 0) ? p[k - 1] : p[0] + (p[0] - p[1]);
  const y1 = p[k];
  const y2 = (k < (pc - 1)) ? p[k + 1] : p[pc - 1];
  const y3 = (k < (pc - 2)) ? p[k + 2] : p[pc - 1] + (p[pc - 1] - p[pc - 2]);
  const a = y1 * 2.0;
  const b = -y0 + y2;
  const c = ((y0 * 2.0) + (y2 * 4.0)) - y3 - (y1 * 5.0);
  const d = (-y0 + (y1 * 3.0) + y3) - (y2 * 3.0);
  return 0.5 * (a + (b * t) + (c * (t ** 2)) + (d * (t ** 3)));
};

export const processForHex = (p, i, pc) =>
  Math.min(255, Math.max(0, Math.floor(catmull(p, i, pc))));

export const drawPathMethod = (options) => {
  const {
    dist,
    hss,
    lsf,
    armspeed,
    wear,
    throwType,
    color,
    drawPath,
    pathBuffer,
    canvas,
    zoom,
  } = options;
  const yscale = 2.5;
  const xscale = 0.7;
  const pathContext = pathBuffer.getContext('2d');
  const setWidth = canvas.width / zoom;
  const setHeight = canvas.height / zoom;
  pathContext.strokeStyle = color;
  pathContext.lineWidth = 2.4 / zoom;

  let airspeed = armspeed;
  let ehss = hss;
  let elsf = lsf;
  const turnsign = (throwType === 'rhbh') ? 1.0 : -1.0;
  const fadestart = 0.4 + ((1.0 - (airspeed ** 2)) * 0.3);
  const impact = (1.0 - airspeed) / 5;
  const turnend = 0.8 - ((airspeed ** 2) * 0.36);
  let x;
  let y;
  let ox = setWidth / 2;
  let oy = setHeight;
  let vx = 0.0;
  const vy = -1.0;
  const ht = yscale * dist;
  const deltav = (yscale / ht);
  const wm = wear / 10.0;

  // calculate effective HSS and LSF
  ehss *= 1.0 + (1.0 - wm);
  ehss -= ((1.0 - wm) / 0.05) * (dist / 100);
  elsf *= wm;
  if (airspeed > 0.8) {
    let op = (airspeed - 0.8) / 0.4;
    op *= op * 2;
    const dc = Math.max(0.0, (350 - dist)) / 10.0; // emphasize high-speed turn on sub-350ft discs
    ehss -= op * dc;
  }
  ehss *= airspeed ** 4;
  elsf *= 1.0 / (airspeed * airspeed);

  // iterate through the flight path
  do {
    y = oy + vy;
    x = ox + (vx * xscale);
    airspeed -= deltav;
    if (airspeed > turnend) {
      vx -= turnsign * (ehss / 14000) * (turnend / airspeed);
    }
    if (airspeed < fadestart) {
      vx -= (turnsign * (elsf / 4000) * (fadestart - airspeed)) / fadestart;
    }
    if (airspeed > 0.0) {
      if (drawPath) {
        pathContext.beginPath();
        pathContext.moveTo(ox, oy);
        pathContext.lineTo(x, y);
        pathContext.stroke();
      }
      ox = x; oy = y;
    }
  } while (airspeed > impact);

  // return lie coordinates to caller
  return [x, y];
};

export const drawLie = (options) => {
  const {
    x,
    y,
    markLie,
    color,
    lieColor,
    lieOutline,
    pathBuffer,
    lieBuffer,
    outlineBuffer,
  } = options;
  const pathContext = pathBuffer.getContext('2d');
  const lieContext = lieBuffer.getContext('2d');
  const outlineContext = outlineBuffer.getContext('2d');

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

// This is intended to be used to figure out Similar Discs based on post-flight
export const calculatePath = (options) => {
  const {
    dist,
    hss,
    lsf,
    armspeed,
    wear,
    throwType,
  } = options;
  const yscale = 2.5;
  const xscale = 0.7;
  const setWidth = 350;
  const setHeight = 550;
  const pathCoords = [];

  let airspeed = armspeed;
  let ehss = hss;
  let elsf = lsf;
  const turnsign = (throwType === 'rhbh') ? 1.0 : -1.0;
  const fadestart = 0.4 + ((1.0 - (airspeed ** 2)) * 0.3);
  const impact = (1.0 - airspeed) / 5;
  const turnend = 0.8 - ((airspeed ** 2) * 0.36);
  let x;
  let y;
  let ox = setWidth / 2;
  let oy = setHeight;
  let vx = 0.0;
  const vy = -1.0;
  const ht = yscale * dist;
  const deltav = (yscale / ht);
  const wm = wear / 10.0;

  // calculate effective HSS and LSF
  ehss *= 1.0 + (1.0 - wm);
  ehss -= ((1.0 - wm) / 0.05) * (dist / 100);
  elsf *= wm;
  if (airspeed > 0.8) {
    let op = (airspeed - 0.8) / 0.4;
    op *= op * 2;
    const dc = Math.max(0.0, (350 - dist)) / 10.0; // emphasize high-speed turn on sub-350ft discs
    ehss -= op * dc;
  }
  ehss *= airspeed ** 4;
  elsf *= 1.0 / (airspeed * airspeed);

  // iterate through the flight path
  do {
    y = oy + vy;
    x = ox + (vx * xscale);
    airspeed -= deltav;
    if (airspeed > turnend) {
      vx -= turnsign * (ehss / 14000) * (turnend / airspeed);
    }
    if (airspeed < fadestart) {
      vx -= (turnsign * (elsf / 4000) * (fadestart - airspeed)) / fadestart;
    }
    if (airspeed > 0.0) {
      pathCoords.push({ x: (175 - x), y: (550 - y) });
      ox = x; oy = y;
    }
  } while (airspeed > impact);

  pathCoords.push({ x: (175 - x), y: (550 - y) });

  // return lie coordinates to caller
  return pathCoords;
};
