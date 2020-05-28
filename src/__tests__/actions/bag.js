import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import _ from 'lodash';

import * as bagActions from '../../src/actions/bag';
import * as bagActionTypes from '../../src/actionTypes/bag';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Bag Actions Tests', () => {
  describe('addNewBagCancel', () => {
    const tester = (expectedActions) => {
      const store = mockStore({});

      return Promise.resolve(store.dispatch(bagActions.addNewBagCancel()))
        .then(() => {
          const actionsDispatched = _.map(store.getActions(), action => action.type);
          return expect(actionsDispatched).toEqual(expectedActions);
        });
    };

    it('should create an object of the correct type', () => {
      // ARRANGE
      const expectedActions = [
        bagActionTypes.ADD_NEW_BAG_CANCEL,
      ];

      // ACT & ASSERT
      return tester(expectedActions);
    });
  });

  describe('addNewBagFinish', () => {
    const tester = (expectedActions) => {
      const store = mockStore({});

      return Promise.resolve(store.dispatch(bagActions.addNewBagFinish()))
        .then(() => {
          const actionsDispatched = _.map(store.getActions(), action => action.type);
          return expect(actionsDispatched).toEqual(expectedActions);
        });
    };

    it('should create an object of the correct type', () => {
      // ARRANGE
      const expectedActions = [
        bagActionTypes.ADD_NEW_BAG_FINISH,
      ];

      // ACT & ASSERT
      return tester(expectedActions);
    });
  });

  describe('addNewBagStart', () => {
    const tester = (expectedActions) => {
      const store = mockStore({});

      return Promise.resolve(store.dispatch(bagActions.addNewBagStart()))
        .then(() => {
          const actionsDispatched = _.map(store.getActions(), action => action.type);
          return expect(actionsDispatched).toEqual(expectedActions);
        });
    };

    it('should create an object of the correct type', () => {
      // ARRANGE
      const expectedActions = [
        bagActionTypes.ADD_NEW_BAG_START,
      ];

      // ACT & ASSERT
      return tester(expectedActions);
    });
  });

  describe('closeDiscEditModal', () => {
    const tester = (expectedActions) => {
      const store = mockStore({});

      return Promise.resolve(store.dispatch(bagActions.closeDiscEditModal()))
        .then(() => {
          const actionsDispatched = _.map(store.getActions(), action => action.type);
          return expect(actionsDispatched).toEqual(expectedActions);
        });
    };

    it('should create an object of the correct type', () => {
      // ARRANGE
      const expectedActions = [
        bagActionTypes.CLOSE_DISC_EDIT_MODAL,
      ];

      // ACT & ASSERT
      return tester(expectedActions);
    });
  });

  describe('editDiscName', () => {
    const tester = (expectedActions) => {
      const store = mockStore({});

      return Promise.resolve(store.dispatch(bagActions.editDiscName()))
        .then(() => {
          const actionsDispatched = _.map(store.getActions(), action => action.type);
          return expect(actionsDispatched).toEqual(expectedActions);
        });
    };

    it('should create an object of the correct type', () => {
      // ARRANGE
      const expectedActions = [
        bagActionTypes.EDIT_DISC_NAME,
      ];

      // ACT & ASSERT
      return tester(expectedActions);
    });
  });

  describe('editDiscPower', () => {
    const tester = (expectedActions) => {
      const store = mockStore({});

      return Promise.resolve(store.dispatch(bagActions.editDiscPower()))
        .then(() => {
          const actionsDispatched = _.map(store.getActions(), action => action.type);
          return expect(actionsDispatched).toEqual(expectedActions);
        });
    };

    it('should create an object of the correct type', () => {
      // ARRANGE
      const expectedActions = [
        bagActionTypes.EDIT_DISC_POWER,
      ];

      // ACT & ASSERT
      return tester(expectedActions);
    });
  });

  describe('editDiscThrowType', () => {
    const tester = (expectedActions) => {
      const store = mockStore({});

      return Promise.resolve(store.dispatch(bagActions.editDiscThrowType()))
        .then(() => {
          const actionsDispatched = _.map(store.getActions(), action => action.type);
          return expect(actionsDispatched).toEqual(expectedActions);
        });
    };

    it('should create an object of the correct type', () => {
      // ARRANGE
      const expectedActions = [
        bagActionTypes.EDIT_DISC_THROW_TYPE,
      ];

      // ACT & ASSERT
      return tester(expectedActions);
    });
  });

  describe('editDiscWeight', () => {
    const tester = (expectedActions) => {
      const store = mockStore({});

      return Promise.resolve(store.dispatch(bagActions.editDiscWeight()))
        .then(() => {
          const actionsDispatched = _.map(store.getActions(), action => action.type);
          return expect(actionsDispatched).toEqual(expectedActions);
        });
    };

    it('should create an object of the correct type', () => {
      // ARRANGE
      const expectedActions = [
        bagActionTypes.EDIT_DISC_WEIGHT,
      ];

      // ACT & ASSERT
      return tester(expectedActions);
    });
  });

  describe('exportBagsToFile', () => {
    const tester = (expectedActions) => {
      const store = mockStore({});

      return Promise.resolve(store.dispatch(bagActions.exportBagsToFile()))
        .then(() => {
          const actionsDispatched = _.map(store.getActions(), action => action.type);
          return expect(actionsDispatched).toEqual(expectedActions);
        });
    };

    it('should create an object of the correct type', () => {
      // ARRANGE
      const expectedActions = [
        bagActionTypes.EXPORT_BAGS_TO_FILE,
      ];

      // ACT & ASSERT
      return tester(expectedActions);
    });
  });

  describe('importBagsFromFile', () => {
    const tester = (expectedActions) => {
      const store = mockStore({});

      return Promise.resolve(store.dispatch(bagActions.importBagsFromFile()))
        .then(() => {
          const actionsDispatched = _.map(store.getActions(), action => action.type);
          return expect(actionsDispatched).toEqual(expectedActions);
        });
    };

    it('should create an object of the correct type', () => {
      // ARRANGE
      const expectedActions = [
        bagActionTypes.IMPORT_BAGS_FROM_FILE,
      ];

      // ACT & ASSERT
      return tester(expectedActions);
    });
  });

  describe('openDiscEditModal', () => {
    const tester = (expectedActions) => {
      const store = mockStore({});

      return Promise.resolve(store.dispatch(bagActions.openDiscEditModal()))
        .then(() => {
          const actionsDispatched = _.map(store.getActions(), action => action.type);
          return expect(actionsDispatched).toEqual(expectedActions);
        });
    };

    it('should create an object of the correct type', () => {
      // ARRANGE
      const expectedActions = [
        bagActionTypes.OPEN_DISC_EDIT_MODAL,
      ];

      // ACT & ASSERT
      return tester(expectedActions);
    });
  });

  describe('removeDiscFromBag', () => {
    const tester = (expectedActions) => {
      const store = mockStore({});

      return Promise.resolve(store.dispatch(bagActions.removeDiscFromBag()))
        .then(() => {
          const actionsDispatched = _.map(store.getActions(), action => action.type);
          return expect(actionsDispatched).toEqual(expectedActions);
        });
    };

    it('should create an object of the correct type', () => {
      // ARRANGE
      const expectedActions = [
        bagActionTypes.REMOVE_DISC_FROM_BAG,
      ];

      // ACT & ASSERT
      return tester(expectedActions);
    });
  });

  describe('removeExistingBag', () => {
    const tester = (expectedActions) => {
      const store = mockStore({});

      return Promise.resolve(store.dispatch(bagActions.removeExistingBag()))
        .then(() => {
          const actionsDispatched = _.map(store.getActions(), action => action.type);
          return expect(actionsDispatched).toEqual(expectedActions);
        });
    };

    it('should create an object of the correct type', () => {
      // ARRANGE
      const expectedActions = [
        bagActionTypes.REMOVE_EXISTING_BAG,
      ];

      // ACT & ASSERT
      return tester(expectedActions);
    });
  });

  describe('selectBag', () => {
    const tester = (expectedActions) => {
      const store = mockStore({});

      return Promise.resolve(store.dispatch(bagActions.selectBag()))
        .then(() => {
          const actionsDispatched = _.map(store.getActions(), action => action.type);
          return expect(actionsDispatched).toEqual(expectedActions);
        });
    };

    it('should create an object of the correct type', () => {
      // ARRANGE
      const expectedActions = [
        bagActionTypes.SELECT_BAG,
      ];

      // ACT & ASSERT
      return tester(expectedActions);
    });
  });

  describe('updateBagNameCancel', () => {
    const tester = (expectedActions) => {
      const store = mockStore({});

      return Promise.resolve(store.dispatch(bagActions.updateBagNameCancel()))
        .then(() => {
          const actionsDispatched = _.map(store.getActions(), action => action.type);
          return expect(actionsDispatched).toEqual(expectedActions);
        });
    };

    it('should create an object of the correct type', () => {
      // ARRANGE
      const expectedActions = [
        bagActionTypes.UPDATE_BAG_NAME_CANCEL,
      ];

      // ACT & ASSERT
      return tester(expectedActions);
    });
  });

  describe('updateBagNameFinish', () => {
    const tester = (expectedActions) => {
      const store = mockStore({});

      return Promise.resolve(store.dispatch(bagActions.updateBagNameFinish()))
        .then(() => {
          const actionsDispatched = _.map(store.getActions(), action => action.type);
          return expect(actionsDispatched).toEqual(expectedActions);
        });
    };

    it('should create an object of the correct type', () => {
      // ARRANGE
      const expectedActions = [
        bagActionTypes.UPDATE_BAG_NAME_FINISH,
      ];

      // ACT & ASSERT
      return tester(expectedActions);
    });
  });

  describe('updateBagNameStart', () => {
    const tester = (expectedActions) => {
      const store = mockStore({});

      return Promise.resolve(store.dispatch(bagActions.updateBagNameStart()))
        .then(() => {
          const actionsDispatched = _.map(store.getActions(), action => action.type);
          return expect(actionsDispatched).toEqual(expectedActions);
        });
    };

    it('should create an object of the correct type', () => {
      // ARRANGE
      const expectedActions = [
        bagActionTypes.UPDATE_BAG_NAME_START,
      ];

      // ACT & ASSERT
      return tester(expectedActions);
    });
  });
});
