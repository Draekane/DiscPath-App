import _ from 'lodash';
import Disc from '../models/disc';
import { calculatePath } from './calculatorUtils';

export const similarityPercentage = value => `${parseInt(value * 100, 10)}%`;

export const hstValue = 50;
export const lsfValue = 63;

// This just a lookup - Takes selectedDisc, calculates flight path and returns
export const getSelectedDisc = (selectedDisc, companies, thrower) => {
  let foundDisc = null;
  if (!selectedDisc) return foundDisc;
  const currentParse = selectedDisc.split('-');
  _.forEach(companies, (company) => {
    if (company.companyId === currentParse[0]) {
      _.forEach(company.discs, (disc) => {
        if (disc.discId === currentParse[1]) {
          const pw = 0.6 + (((disc.power || thrower.power) / 48) * 0.6);
          const pathOptions = {
            dist: disc.range,
            hss: disc.hst,
            lsf: disc.lsf,
            armspeed: pw,
            wear: disc.wear || 10,
            throwType: disc.throwType || 'rhbh',
          };
          const flightPath = calculatePath(pathOptions);
          foundDisc = new Disc({ ...disc, company: company.company, flightPath });
        }
      });
    }
  });

  return foundDisc;
};

// Takes selectedDisc, thrower information, and calculates new flight path.
export const getNewFlightPath = (selectedDisc, thrower) => {
  const { maxWeight, weight } = selectedDisc;
  let pwi = (selectedDisc.power || thrower.power);
  let weightDiff = 0;
  let powerShift;

  if (maxWeight && weight) {
    weightDiff = maxWeight - weight;
    powerShift = (weightDiff * 0.005) + 1;

    pwi *= powerShift;
  }

  const pw = 0.6 + ((pwi / 48) * 0.6);

  const pathOptions = {
    dist: selectedDisc.range,
    hss: selectedDisc.hst,
    lsf: selectedDisc.lsf,
    armspeed: pw,
    wear: selectedDisc.wear || 10,
    throwType: selectedDisc.throwType || 'rhbh',
  };
  const flightPath = calculatePath(pathOptions);

  return flightPath;
};

export const getSimilarDiscs = (selectedDisc, companies, thrower, similarity, algo) => {
  if (!selectedDisc) return [];
  // const percent = similarity;
  // const checkParams = {
  //   hstA: selectedDisc.hst - (hstValue * percent),
  //   hstB: selectedDisc.hst + (hstValue * percent),
  //   lsfA: selectedDisc.lsf - (lsfValue * percent),
  //   lsfB: selectedDisc.lsf + (lsfValue * percent),
  //   rangeA: selectedDisc.range - (100 * percent),
  //   rangeB: selectedDisc.range + (100 * percent),
  // };

  const similarDiscs = [];

  if (!algo || algo === 'flight') {
    _.forEach(companies, (company) => {
      _.forEach(company.discs, (disc) => {
        const pw = 0.6 + (((disc.power || thrower.power) / 48) * 0.6);
        const pathOptions = {
          dist: disc.range,
          hss: disc.hst,
          lsf: disc.lsf,
          armspeed: pw,
          wear: disc.wear || 10,
          throwType: disc.throwType || 'rhbh',
        };
        const flightPath = calculatePath(pathOptions);
        const convertDisc = new Disc({ ...disc, company: company.company, flightPath });
        if (convertDisc.isDiscFlightPathSimilar(selectedDisc.flightPath, similarity)
          && convertDisc.discId !== selectedDisc.discId) {
          similarDiscs.push(convertDisc);
        }
      });
    });
  } else if (algo === 'matrix') {
    _.forEach(companies, (company) => {
      _.forEach(company.discs, (disc) => {
        if (disc.matrix_x === selectedDisc.matrix_x && disc.matrix_y === selectedDisc.matrix_y) {
          similarDiscs.push(new Disc({ ...disc, company: company.compnay }));
        }
      });
    });
  }

  return similarDiscs;
};

export const getDisplayDiscs = (selectedDiscId, companies, thrower, similarity) => {
  const selectedDisc = getSelectedDisc(selectedDiscId, companies, thrower);

  if (!selectedDisc) return [];

  const similarDiscs = getSimilarDiscs(selectedDisc, companies, thrower, similarity);

  return _.union([selectedDisc], similarDiscs);
};
