import _ from 'lodash';
import Disc from '../models/disc';

export const similarityPercentage = value => `${parseInt(value * 100, 10)}%`;

export const hstValue = 50;
export const lsfValue = 63;

export const getSelectedDisc = (selectedDisc, companies) => {
  let foundDisc = null;
  if (!selectedDisc) return foundDisc;
  const currentParse = selectedDisc.split('-');
  _.forEach(companies, (company) => {
    if (company.companyId === currentParse[0]) {
      _.forEach(company.discs, (disc) => {
        if (disc.discId === currentParse[1]) {
          foundDisc = new Disc({ ...disc, company: company.company });
        }
      });
    }
  });

  return foundDisc;
};

export const getSimilarDiscs = (selectedDisc, companies, similarity) => {
  if (!selectedDisc) return [];
  const percent = similarity;
  const checkParams = {
    hstA: selectedDisc.hst - (hstValue * percent),
    hstB: selectedDisc.hst + (hstValue * percent),
    lsfA: selectedDisc.lsf - (lsfValue * percent),
    lsfB: selectedDisc.lsf + (lsfValue * percent),
    rangeA: selectedDisc.range - (100 * percent),
    rangeB: selectedDisc.range + (100 * percent),
  };

  const similarDiscs = [];
  _.forEach(companies, (company) => {
    _.forEach(company.discs, (disc) => {
      const convertDisc = new Disc({ ...disc, company: company.company });
      if (convertDisc.isDiscSimilar(checkParams) && convertDisc.discId !== selectedDisc.discId) {
        similarDiscs.push(convertDisc);
      }
    });
  });

  return similarDiscs;
};

export const getDisplayDiscs = (selectedDiscId, companies, similarity) => {
  const selectedDisc = getSelectedDisc(selectedDiscId, companies);

  if (!selectedDisc) return [];

  const similarDiscs = getSimilarDiscs(selectedDisc, companies, similarity);

  return _.union([selectedDisc], similarDiscs);
};
