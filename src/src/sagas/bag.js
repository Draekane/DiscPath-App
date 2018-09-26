import { put, call, takeEvery } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { checkBagForUpdates } from '../actions/bag';
import { CHECK_BAG_FOR_UPDATES } from '../actionTypes/bag';

export function* checkForBagUpdateSaga({companies, bag}) {
    const updateBag = {
        ...bag,
        bags: _.map(bag.bags, bag2 => ({
          ...bag2,
          discs: _.map(bag2.discs, (disc) => {
            const companySet = _.find(companies, comp => comp.company === disc.company);
            const updateDisc = _.find(companySet.discs, cdisc => cdisc.discId === disc.discId);
            return {
              ...disc,
              hst: updateDisc.hst,
              lsf: updateDisc.lsf,
              range: updateDisc.range,
              type: updateDisc.type,
              maxWeight: updateDisc.maxWeight,
              pdga: updateDisc.pdga,
              matrix_x: updateDisc.matrix_x,
              matrix_y: updateDisc.matrix_y,
            };
          }),
        })),
      };
}

