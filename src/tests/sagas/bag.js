import expect from 'expect';
import { put } from 'redux-saga/effects';
import * as bagSaga from '../../src/sagas/bag';
import * as actionTypes from '../../src/actionTypes/bag';

describe('Bag Sagas', () => {
  describe('addDiscToBagSaga', () => {
    const mockBagData = {
      name: 'Test Bag',
      bagId: 1,
      discs: [],
    };
    const mockDiscData = {
      company: 'Test Company',
      discId: 'testDiscId',
      enabled: true,
      hst: 4.5,
      lsf: 2.3,
      maxWeight: 180,
      name: 'Test Disc',
      range: 65,
      type: 'P',
      flightPath: [],
    };

    const expectedResult = {
      bag: {
        ...mockBagData,
        discs: [
          {
            ...mockDiscData,
            baggedDiscId: 1,
          }],
      },
      type: actionTypes.ADD_DISC_TO_BAG_SUCCESS,
    };

    const gen = bagSaga.addDiscToBagSaga({ disc: mockDiscData, bag: mockBagData });

    it('Should return a bag with the new disc added', () => {
      expect(gen.next().value).toEqual(put(expectedResult));
    });
  });

  describe('removeDiscFromBagSaga', () => {
    const mockDiscData = {
      company: 'Test Company',
      discId: 'testDiscId',
      enabled: true,
      hst: 4.5,
      lsf: 2.3,
      maxWeight: 180,
      name: 'Test Disc',
      range: 65,
      type: 'P',
      flightPath: [],
      baggedDicsId: 1,
    };
    const mockBagData = {
      name: 'Test Bag',
      bagId: 1,
      discs: [],
    };

    const expectedResult = {
      bag: mockBagData,
      type: actionTypes.REMOVE_DISC_FROM_BAG_SUCCESS,
    };

    const gen = bagSaga.removeDiscFromBagSaga({
      disc: mockDiscData,
      bag: {
        ...mockBagData,
        discs: [mockDiscData],
      },
    });

    it('Should return a bag without the specified disc', () => {
      expect(gen.next().value).toEqual(put(expectedResult));
    });
  });
});
