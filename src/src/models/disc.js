import _ from 'lodash';

export default class Disc {
  constructor(discOptions) {
    this.company = discOptions.company || '';
    this.discId = discOptions.discId || '';
    this.enabled = discOptions.enabled || true;
    this.hst = discOptions.hst || 0;
    this.lsf = discOptions.lsf || 0;
    this.maxWeight = discOptions.weight || 200;
    this.name = discOptions.name || '';
    this.range = discOptions.range || 50;
    this.type = discOptions.type || 'D';
    this.flightPath = discOptions.flightPath || [];
    this.matrix_x = discOptions.matrix_x || 0;
    this.matrix_y = discOptions.matrix_y || 0;
  }

  isDiscSimilar(checkParams) {
    const {
      hstA,
      hstB,
      lsfA,
      lsfB,
      rangeA,
      rangeB,
    } = checkParams;

    if (_.inRange(this.hst, hstA, hstB)) {
      if (_.inRange(this.lsf, lsfA, lsfB)) {
        if (_.inRange(this.range, rangeA, rangeB)) {
          return true;
        }
      }
    }
    return false;
  }

  isDiscFlightPathSimilar(checkPath, similarity) {
    const xDiff = 2.4 * (similarity * 10);
    const yDiff = 2.4 * (similarity * 10);
    const checkPoint = checkPath[checkPath.length - 1];
    const flightPoint = this.flightPath[this.flightPath.length - 1];

    let isSimilar = false;

    if (_.inRange(flightPoint.y, checkPoint.y - yDiff, checkPoint.y + yDiff)) {
      if (_.inRange(flightPoint.x, checkPoint.x - xDiff, checkPoint.x + xDiff)) {
        isSimilar = true;
      }
    }

    return isSimilar;
  }
}

