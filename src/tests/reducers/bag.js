import _ from 'lodash';
import expect from 'expect';
import * as bagActions from '../../src/actions/bag';
import bagReducer from '../../src/reducers/bag';
import Disc from '../mocks/mockDisc';
import Bag from '../mocks/mockBag';

const initialState = bagReducer();

const setupMultipleDiscs = (totalCount) => {
  const discs = [];
  for (let i = 0; i <= totalCount; i++) {
    discs.push(new Disc());
  }

  return discs;
};

const setupMultipleBags = (totalCount, includeDiscs) => {
  const bags = [];
  for (let i = 0; i <= totalCount; i++) {
    const newBag = new Bag();
    if (includeDiscs) {
      const discCount = Math.floor((Math.random() * 15) + 1);
      newBag.discs = setupMultipleDiscs(discCount);
    }
    bags.push(newBag);
  }

  return bags;
};

describe('Bag Reducer Test', () => {
  describe('default', () => {
    it('should return the state without any modifications', () => {
      const testInitialState = _.cloneDeep(initialState);

      const target = bagReducer(testInitialState, { type: 'SOME_UNKNOWN_ACTIONTYPE' });

      expect(target).toEqual(testInitialState);
    });
  });

  describe('Initialization', () => {
    it('Should not be empty', () => {
      expect(initialState.bags.length).toEqual(1);
      expect(initialState.lastBagId).toEqual(1);
      expect(initialState.selectedBagId).toEqual(1);
      expect(initialState.editingDiscId).toBeNull();
      expect(initialState.addBag).toBeFalsy();
      expect(initialState.updateBag).toBeFalsy();
    });
  });

  /*
    This tests the following cases in the reducer:
    case bagActionTypes.ADD_DISC_TO_BAG_SUCCESS:
    case bagActionTypes.UPDATE_DISC_WEAR_SUCCESS:
    case bagActionTypes.EDIT_DISC_WEIGHT_SUCCESS:
    case bagActionTypes.EDIT_DISC_POWER_SUCCESS:
    case bagActionTypes.EDIT_DISC_THROW_TYPE_SUCCESS:
    case bagActionTypes.EDIT_DISC_NAME_SUCCESS:
    case bagActionTypes.EDIT_DISC_ENABLED_SUCCESS:
    case bagActionTypes.REMOVE_DISC_FROM_BAG_SUCCESS:
    case bagActionTypes.EDIT_BAG_NAME_SUCCESS:
  */
  describe('ADD_DISC_TO_BAG_SUCCESS', () => {
    it('Should update the specified bag with the passed-in bag', () => {
      const setupState = {
        ..._.cloneDeep(initialState),
        bags: setupMultipleBags(4, true),
      };

      const changeDiscBag = setupState.bags[2];
      const setupBag = {
        ...changeDiscBag,
        discs: [
          ...changeDiscBag.discs,
          new Disc(),
        ],
      };

      const action = bagActions.addDiscToBagSuccess(setupBag);
      const target = bagReducer(setupState, action);

      expect(target.bags).not.toEqual(setupState.bags);
      expect(target.bags[2]).toEqual(setupBag);
    });
  });

  describe('ADD_NEW_BAG_SUCCESS', () => {
    it('Should update the list of bags with the new array of bags passed in', () => {
      const setupState = {
        ..._.cloneDeep(initialState),
        bags: setupMultipleBags(4, true),
      };

      const newBag = new Bag();
      const updateBags = [
        ...setupState.bags,
        newBag,
      ];

      const action = bagActions.addNewBagSuccess(updateBags);
      const target = bagReducer(setupState, action);

      expect(target.bags).not.toEqual(setupState.bags);
      expect(target.bags).toEqual(updateBags);
    });
  });

  describe('EDIT_DISC_TYPE_ENABLED_SUCCESS', () => {
    it('Should update the passed-in bag and the passed in disc type', () => {
      const setupState = {
        ..._.cloneDeep(initialState),
        bags: setupMultipleBags(4, true),
      };

      const modDiscType = { ...setupState.discTypes[1], enabled: false };

      const modBag = {
        ...setupState.bags[1],
        disc: _.map(setupState.bags[1].discs, (disc) => {
          if (disc.type === modDiscType.discType) return { ...disc, enabled: false };
          return disc;
        }),
      };

      const action = bagActions.editDiscTypeEnabledSuccess(modBag, modDiscType);
      const target = bagReducer(setupState, action);

      expect(target.bags).not.toEqual(setupState.bags);
      expect(target.bags[1]).toEqual(modBag);
      expect(target.discTypes[1]).toEqual(modDiscType);
    });
  });

  describe('SELECT_BAG_SUCCESS', () => {
    const setupState = {
      ..._.cloneDeep(initialState),
      bags: setupMultipleBags(6, true),
    };
    it('Should select the id of the passed-in bagId if the bag exists', () => {
      const newBagId = setupState.bags[3].bagId;

      const action = bagActions.selectBagSuccess(newBagId);
      const target = bagReducer(setupState, action);

      expect(target.selectedBagId).toEqual(newBagId);
    });
    it('should NOT change the selectedBagId if the passed-in ID does not match an existing bag', () => {
      const bagIds = _.map(setupState.bags, bag => bag.bagId);
      const possibleBadIds = _.difference([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], bagIds);
      const newBagId = possibleBadIds[_.random((possibleBadIds.length - 1))];

      const action = bagActions.selectBagSuccess(newBagId);
      const target = bagReducer(setupState, action);

      expect(target.selectedBagId).not.toEqual(newBagId);
      expect(target.selectedBagId).toEqual(setupState.selectedBagId);
    });
  });

  describe('ADD_NEW_BAG_START', () => {
    it('Should set the AddBag boolean to true while the UpdateBag boolean should remain false', () => {
      const testInitialState = _.cloneDeep(initialState);

      const action = bagActions.addNewBagStart();

      const target = bagReducer(testInitialState, action);

      expect(target.addBag).toBeTruthy();
      expect(target.updateBag).toBeFalsy();
    });
  });

  describe('ADD_NEW_BAG_FINISH', () => {
    it('Should set the AddBag boolean to true while the UpdateBag boolean should remain false', () => {
      const setupState = _.cloneDeep(initialState);

      const setupAction = bagActions.addNewBagStart();

      const testInitialState = bagReducer(setupState, setupAction);

      expect(testInitialState.addBag).toBeTruthy();
      expect(testInitialState.updateBag).toBeFalsy();

      const action = bagActions.addNewBagFinish();

      const target = bagReducer(testInitialState, action);

      expect(target.addBag).toBeFalsy();
      expect(target.updateBag).toBeFalsy();
    });
  });

  describe('ADD_NEW_BAG_CANCEL', () => {
    it('Should set the AddBag and UpdateBag boolean to false', () => {
      const setupState = _.cloneDeep(initialState);

      const setupAction = bagActions.addNewBagStart();

      const testInitialState = bagReducer(setupState, setupAction);

      expect(testInitialState.addBag).toBeTruthy();
      expect(testInitialState.updateBag).toBeFalsy();

      const action = bagActions.addNewBagCancel();

      const target = bagReducer(testInitialState, action);

      expect(target.addBag).toBeFalsy();
      expect(target.updateBag).toBeFalsy();
    });
  });

  describe('UPDATE_BAG_NAME_START', () => {
    it('Should set the UpdateBage to be true while leaving the AddBag false', () => {
      const testInitialState = _.cloneDeep(initialState);

      const action = bagActions.updateBagNameStart();

      const target = bagReducer(testInitialState, action);

      expect(target.addBag).toBeFalsy();
      expect(target.updateBag).toBeTruthy();
    });
  });

  describe('UPDATE_BAG_NAME_FINISH', () => {
    it('Should set the updateBag to false and the addBag to false', () => {
      const setupState = _.cloneDeep(initialState);

      const setupAction = bagActions.updateBagNameStart();

      const testInitialState = bagReducer(setupState, setupAction);

      expect(testInitialState.addBag).toBeFalsy();
      expect(testInitialState.updateBag).toBeTruthy();

      const action = bagActions.updateBagNameFinish();

      const target = bagReducer(testInitialState, action);

      expect(target.addBag).toBeFalsy();
      expect(target.updateBag).toBeFalsy();
    });
  });

  describe('UPDATE_BAG_NAME_CANCEL', () => {
    it('Should set the updateBag to false and the addBag to false', () => {
      const setupState = _.cloneDeep(initialState);

      const setupAction = bagActions.updateBagNameStart();

      const testInitialState = bagReducer(setupState, setupAction);

      expect(testInitialState.addBag).toBeFalsy();
      expect(testInitialState.updateBag).toBeTruthy();

      const action = bagActions.updateBagNameCancel();

      const target = bagReducer(testInitialState, action);

      expect(target.addBag).toBeFalsy();
      expect(target.updateBag).toBeFalsy();
    });
  });

  describe('REMOVE_EXISTING_BAG_SUCCESS', () => {
    it('Removing bags sets the current list of bags to the passed in list', () => {
      const setupState = {
        ..._.cloneDeep(initialState),
        bags: setupMultipleBags(6, true),
      };

      const modBags = _.slice(setupState.bags, 2, 5);

      const action = bagActions.removeExistingBagSuccess(modBags);

      const target = bagReducer(setupState, action);

      expect(target.bags.length).toEqual(modBags.length);
      expect(target.bags).toEqual(modBags);
      expect(target.bags).not.toEqual(setupState.bags);
    });

    it('Removing last bag sets selectedBagId to 1', () => {
      const setupState = {
        ..._.cloneDeep(initialState),
        bags: setupMultipleBags(6, true),
      };

      const modBags = [];

      const action = bagActions.removeExistingBagSuccess(modBags);
      const target = bagReducer(setupState, action);

      expect(target.selectedBagId).toEqual(1);
      expect(target.bags.length).toEqual(modBags.length);
      expect(target.bags).toEqual(modBags);
      expect(target.bags).not.toEqual(setupState.bags);
    });
  });

  describe('OPEN_DISC_EDIT_MODAL', () => {
    it('Should set the editingDiscId to the passed-in disc Id if the disc exists in the selected bag', () => {
      const setupState = {
        ..._.cloneDeep(initialState),
        bags: setupMultipleBags(3, true),
      };

      const editBag = setupState.bags[_.random(2)];
      const editDisc = editBag.discs[_.random(editBag.discs.length - 1)];

      const testState = {
        ...setupState,
        selectedBagId: editBag.bagId,
      };

      const action = bagActions.openDiscEditModal(editDisc.baggedDiscId);
      const target = bagReducer(testState, action);

      expect(target.editingDiscId).toEqual(editDisc.baggedDiscId);
    });
    it('Should NOT change the editingDiscId to the passed-in disc ID if the disc does NOT exist in the selected bag', () => {
      const setupState = {
        ..._.cloneDeep(initialState),
        bags: setupMultipleBags(3, true),
      };

      const editBag = setupState.bags[_.random(2)];

      const testState = {
        ...setupState,
        selectedBagId: editBag.bagId,
      };

      const action = bagActions.openDiscEditModal('someFunkyId');
      const target = bagReducer(testState, action);

      expect(target.editingDiscId).not.toEqual('someFunkyId');
      expect(target.editingDiscId).toEqual(testState.editingDiscId);
    });
  });

  describe('CLOSE_DISC_EDIT_MODAL', () => {
    it('Should set the editingDiscId to null', () => {
      const setupState = {
        ..._.cloneDeep(initialState),
        bags: setupMultipleBags(3, true),
      };

      const editBag = setupState.bags[_.random(2)];

      const testState = {
        ...setupState,
        selectedBagId: editBag.bagId,
      };

      const action = bagActions.closeDiscEditModal();
      const target = bagReducer(testState, action);

      expect(target.editingDiscId).toBeNull();
    });
  });

  describe('ENLARGE_MAP', () => {
    it('Should increase the zoom by 0.2 up to 2', () => {
      const setupState = _.cloneDeep(initialState);

      const action = bagActions.enlargeMap();
      const zoom1 = bagReducer(setupState, action);
      expect(zoom1.zoom.toFixed(1)).toEqual('1.2');

      const zoom2 = bagReducer(zoom1, action);
      expect(zoom2.zoom.toFixed(1)).toEqual('1.4');

      const zoom3 = bagReducer(zoom2, action);
      expect(zoom3.zoom.toFixed(1)).toEqual('1.6');

      const zoom4 = bagReducer(zoom3, action);
      expect(zoom4.zoom.toFixed(1)).toEqual('1.8');

      const zoom5 = bagReducer(zoom4, action);
      expect(zoom5.zoom.toFixed(1)).toEqual('2.0');

      const zoom6 = bagReducer(zoom5, action);
      expect(zoom6.zoom.toFixed(1)).toEqual('2.0');
    });
  });

  describe('SHRINK_MAP', () => {
    it('Should decrease the zoom by 0.2 up to 2', () => {
      const setupState = _.cloneDeep(initialState);

      const action = bagActions.shrinkMap();
      const zoom1 = bagReducer(setupState, action);
      expect(zoom1.zoom.toFixed(1)).toEqual('0.8');

      const zoom2 = bagReducer(zoom1, action);
      expect(zoom2.zoom.toFixed(1)).toEqual('0.6');

      const zoom3 = bagReducer(zoom2, action);
      expect(zoom3.zoom.toFixed(1)).toEqual('0.6');
    });
  });

  describe('resetMap', () => {
    it('Should reset map zoom to 1', () => {
      const setupState = _.cloneDeep(initialState);

      const action = bagActions.shrinkMap();
      const zoom1 = bagReducer(setupState, action);
      const zoom2 = bagReducer(zoom1, action);
      const zoom3 = bagReducer(zoom2, action);

      const action2 = bagActions.resetMap();
      const resetMap = bagReducer(zoom3, action2);

      expect(resetMap.zoom.toFixed(1)).toEqual('1.0');
    });
  });

  describe('CHECK_BAG_FOR_UPDATES_SUCCESS', () => {
    it('should update the bag with the current passed-in state', () => {
      const setupState = _.cloneDeep(initialState);

      const updatedBag = {
        ...setupState,
        bags: setupMultipleBags(4, true),
      };

      const action = bagActions.checkBagForUpdateSuccess(updatedBag);
      const target = bagReducer(setupState, action);

      expect(target).not.toEqual(setupState);
      expect(target).not.toEqual(updatedBag);
      expect(target).toEqual({ ...updatedBag, ranUpdateCheck: true });
    });
  });

  describe('SET_MAP_THEME', () => {
    it('Should set the darkTheme boolean for the state', () => {
      const setupState = _.cloneDeep(initialState);
      const currentTheme = setupState.darkTheme;

      const action = bagActions.setTheme(!currentTheme);
      const target = bagReducer(setupState, action);

      expect(target).not.toEqual(setupState);
      expect(target.darkTheme).toEqual(!currentTheme);
    });
  });
});
