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
}

