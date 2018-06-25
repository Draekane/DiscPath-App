import expect from 'expect';
import _ from 'lodash';

import * as bagActions from '../../src/actions/bag';
import bagReducer from '../../src/reducers/bag';
import Disc from '../mocks/mockDisc';
// import Bag from '../mocks/mockBag';

const initialState = bagReducer();

describe('Bag Reducer Test', () => {
  describe('Initialization', () => {
    it('Should not be empty', () => {
      expect(initialState.bags.length).toEqual(1);
      expect(initialState.lastDiscId).toEqual(0);
      expect(initialState.lastBagId).toEqual(1);
      expect(initialState.selectedBagId).toEqual(1);
      expect(initialState.editingDiscId).toBeNull();
      expect(initialState.addBag).toBeFalsy();
      expect(initialState.updateBag).toBeFalsy();
    });
  });

  describe('ADD_DISC_TO_BAG', () => {
    it('Should increment lastDiscId and add a new disc to the currently selected bag', () => {
      const testInitialState = _.cloneDeep(initialState);
      const disc = new Disc();
      const action = bagActions.loadDisc(disc);

      const target = bagReducer(testInitialState, action);

      const { bags } = target;
      const currentBag = _.find(bags, bag => bag.bagId === target.selectedBagId);
      const { discs } = currentBag;

      expect(target.lastDiscId).toEqual(testInitialState.lastDiscId + 1);
      expect(discs.length).toBeGreaterThan(0);
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

  describe('ADD_NEW_BAG_FINISH', () => {
    it('Add a new bag to the current bag array and set the new bag to selected', () => {
      const testInitialState = _.cloneDeep(initialState);

      const action = bagActions.addNewBagFinish('TestBag');

      const target = bagReducer(testInitialState, action);

      const addedBag = _.find(target.bags, bag => bag.name === 'TestBag');

      expect(addedBag).toBeDefined();
      expect(addedBag.bagId).toEqual(target.selectedBagId);
      expect(target.addBag).toBeFalsy();
      expect(target.lastBagId).toBeGreaterThan(testInitialState.lastBagId);
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

  describe('CLOSE_DISC_EDIT_MODAL', () => {
    it('Should set the editingDiscId to NULL', () => {
      const setup = setupMultipleDiscsInBag();

      const { bags } = setup;
      const currentBag = _.find(bags, bag => bag.bagId === setup.selectedBagId);

      const editThisDisc = _.sample(currentBag.discs);

      const setupAction = bagActions.openDiscEditModal(editThisDisc.baggedDiscId);

      const setupState = bagReducer(setup, setupAction);

      expect(setupState.editingDiscId).toEqual(editThisDisc.baggedDiscId);

      const action = bagActions.closeDiscEditModal();

      const target = bagReducer(setupState, action);

      expect(target.editingDiscId).toBeNull();
    });
  });

  describe('DISABLE_DISC', () => {
    it('Should set disc name of editingDiscId to the value passed in', () => {
      const setup = setupDiscInBag();

      const testAction = bagActions.setDiscEnable(1, true);
      const target = bagReducer(setup, testAction);

      const editedDisc = getEditedDisc(target, target.editingDiscId);

      expect(target.editingDiscId).toEqual(1);
      expect(editedDisc).toBeDefined();
      expect(editedDisc.enabled).toBeFalsy();
    });
  });

  describe('default', () => {
    it('should return the state without any modifications', () => {
      const testInitialState = _.cloneDeep(initialState);

      const target = bagReducer(testInitialState, { type: 'SOME_UNKNOWN_ACTIONTYPE' });

      expect(target).toEqual(testInitialState);
    });
  });

  describe('DISABLE_DISC_TYPE', () => {
    it('Should set all discs of a specific type to disabled', () => {
      const setup = setupMultipleDiscsInBag();

      const { bags } = setup;
      const currentBag = _.find(bags, bag => bag.bagId === setup.selectedBagId);

      const typeCount = _.countBy(currentBag.discs, disc => disc.type);
      let firstType = {};
      if (typeCount.D) {
        firstType = { key: 'D', value: typeCount.D };
      } else if (typeCount.F) {
        firstType = { key: 'F', value: typeCount.F };
      } else if (typeCount.M) {
        firstType = { key: 'M', value: typeCount.M };
      } else if (typeCount.P) {
        firstType = { key: 'P', value: typeCount.P };
      }

      const testAction = bagActions.setDiscTypeEnable(firstType.key, true);
      const target = bagReducer(setup, testAction);
      const { bags: testBags } = target;
      const currentTestBag = _.find(testBags, bag => bag.bagId === target.selectedBagId);

      const getDiscByType = _.filter(currentTestBag.discs, disc => disc.type === firstType.key);

      expect(getDiscByType.length).toBeGreaterThan(0);
      expect(getDiscByType.length).toEqual(firstType.value);
      _.forEach(getDiscByType, disc => expect(disc.enabled).toBeFalsy());
    });
  });

  describe('EDIT_DISC_NAME', () => {
    it('Should set disc name of editingDiscId to the value passed in', () => {
      const setup = setupDiscInBag();
      const newName = 'The Discs New Name';

      const testAction = bagActions.editDiscName(newName);
      const target = bagReducer(setup, testAction);

      const editedDisc = getEditedDisc(target, target.editingDiscId);

      expect(target.editingDiscId).toEqual(1);
      expect(editedDisc).toBeDefined();
      expect(editedDisc.displayName).toEqual(newName);
    });
  });

  describe('EDIT_DISC_POWER', () => {
    it('Should set power of editingDiscId to the value passed in', () => {
      const setup = setupDiscInBag();

      const testAction = bagActions.editDiscPower(25);
      const target = bagReducer(setup, testAction);

      const editedDisc = getEditedDisc(target, target.editingDiscId);

      expect(target.editingDiscId).toEqual(1);
      expect(editedDisc).toBeDefined();
      expect(editedDisc.power).toEqual(25);
    });
  });

  describe('EDIT_DISC_THROW_TYPE', () => {
    it('Should set throwtype of editingDiscId to the value passed in', () => {
      const setup = setupDiscInBag();

      const testAction = bagActions.editDiscThrowType('lhbh');
      const target = bagReducer(setup, testAction);

      const editedDisc = getEditedDisc(target, target.editingDiscId);

      expect(target.editingDiscId).toEqual(1);
      expect(editedDisc).toBeDefined();
      expect(editedDisc.throwType).toEqual('lhbh');
    });
  });

  describe('EDIT_DISC_WEIGHT', () => {
    it('Should set weight of editingDiscId to the value passed in', () => {
      const setup = setupDiscInBag();

      const testAction = bagActions.editDiscWeight(155);
      const target = bagReducer(setup, testAction);

      const editedDisc = getEditedDisc(target, target.editingDiscId);

      expect(target.editingDiscId).toEqual(1);
      expect(editedDisc).toBeDefined();
      expect(editedDisc.weight).toEqual(155);
    });
  });

  describe('OPEN_DISC_EDIT_MODAL', () => {
    it('Should NOT set the editingDiscId to an ID if that disc does not exist in the current bag', () => {
      const setup = setupMultipleDiscsInBag();

      const action = bagActions.openDiscEditModal(1000);

      const target = bagReducer(setup, action);

      expect(target.editingDiscId).toBeNull();
    });

    it('Should set the editingDiscId to the selected disc ID', () => {
      const setup = setupMultipleDiscsInBag();

      const { bags } = setup;
      const currentBag = _.find(bags, bag => bag.bagId === setup.selectedBagId);

      const editThisDisc = _.sample(currentBag.discs);

      const action = bagActions.openDiscEditModal(editThisDisc.baggedDiscId);

      const target = bagReducer(setup, action);

      expect(target.editingDiscId).toEqual(editThisDisc.baggedDiscId);
    });
  });

  describe('REMOVE_DISC_FROM_BAG', () => {
    it('Should remove a specific disc from the current bag', () => {
      const setup = setupMultipleDiscsInBag();

      const { bags } = setup;
      const currentBag = _.find(bags, bag => bag.bagId === setup.selectedBagId);

      const removeThisDisc = _.sample(currentBag.discs);

      const testAction = bagActions.removeDiscFromBag(removeThisDisc.baggedDiscId);
      const target = bagReducer(setup, testAction);

      const { bags: testBags } = target;
      const currentTestBag = _.find(testBags, bag => bag.bagId === target.selectedBagId);
      const shouldBeNull = _.filter(currentTestBag.discs, disc => disc.baggedDiscId === removeThisDisc.baggedDiscId);

      expect(currentTestBag.discs.length).toBeLessThan(currentBag.discs.length);
      expect(shouldBeNull).toEqual([]);
    });
  });

  describe('REMOVE_EXISTING_BAG', () => {
    it('Removing last bag adds an empty default bag so Bags are never entirely empty', () => {
      const testInitialState = _.cloneDeep(initialState);

      const action = bagActions.removeExistingBag();

      const target = bagReducer(testInitialState, action);

      expect(target.selectedBagId).toEqual(1);
      expect(target.bags.length).toEqual(1);
    });

    it('Remove the Currently selected bag from the list of bags', () => {
      let setupState = _.cloneDeep(initialState);
      for (let i = 0; i < 5; i++) {
        const setupAction = bagActions.addNewBagFinish(`Bag Number ${i + 1}`);
        setupState = bagReducer(setupState, setupAction);
      }

      expect(setupState.bags.length).toEqual(6);

      const action = bagActions.removeExistingBag();

      const target = bagReducer(setupState, action);

      expect(target.bags.length).toEqual(5);
      expect(_.some(target.bags, bag => bag.name === 'Bag Number 5')).toBeFalsy();
    });
  });

  describe('SELECT_BAG', () => {
    it('Don\'t update selectedBagId if the bag does NOT exist', () => {
      const testInitialState = _.cloneDeep(initialState);

      const action = bagActions.selectBag(5);

      const target = bagReducer(testInitialState, action);

      expect(target.selectedBagId).toEqual(1);
    });

    it('Update the selectedBagId when the bag DOES exist.', () => {
      let setupState = _.cloneDeep(initialState);
      for (let i = 0; i < 5; i++) {
        const setupAction = bagActions.addNewBagFinish(`Bag Number ${i + 1}`);
        setupState = bagReducer(setupState, setupAction);
      }

      const action = bagActions.selectBag(5);

      const target = bagReducer(setupState, action);

      expect(target.selectedBagId).toEqual(5);
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

  describe('UPDATE_BAG_NAME_FINISH', () => {
    it('Should update the name of the currently selected bag, and set the UpdateBag to false', () => {
      const testInitialState = _.cloneDeep(initialState);
      const newBagName = 'MyTestBag_Update';

      const action = bagActions.updateBagNameFinish(newBagName);

      const target = bagReducer(testInitialState, action);

      expect(target.updateBag).toBeFalsy();
      expect(target.bags[0].name).toEqual(newBagName);
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

  describe('UPDATE_DISC_WEAR', () => {
    it('Should set wear of editingDiscId to the value passed in', () => {
      const setup = setupDiscInBag();

      const testAction = bagActions.setDiscWear(8);
      const target = bagReducer(setup, testAction);

      const editedDisc = getEditedDisc(target, target.editingDiscId);

      expect(target.editingDiscId).toEqual(1);
      expect(editedDisc).toBeDefined();
      expect(editedDisc.wear).toEqual(8);
    });
  });
});

const getEditedDisc = (target, discId) => {
  const { bags } = target;
  const currentBag = _.find(bags, bag => bag.bagId === target.selectedBagId);
  const { discs } = currentBag;
  const editedDisc = _.find(discs, disc => disc.baggedDiscId === discId);

  return editedDisc;
};

const setupDiscInBag = () => {
  const testInitialState = _.cloneDeep(initialState);

  const testDisc = new Disc();
  const setupStep1 = bagActions.loadDisc(testDisc);
  const stateStep1 = bagReducer(testInitialState, setupStep1);

  const setupStep2 = bagActions.openDiscEditModal(1);
  const stateStep2 = bagReducer(stateStep1, setupStep2);

  return stateStep2;
};

const setupMultipleDiscsInBag = () => {
  let currentState = _.cloneDeep(initialState);

  for (let i = 0; i < 10; i++) {
    const testDisc = new Disc();
    const setupStep1 = bagActions.loadDisc(testDisc);
    currentState = bagReducer(currentState, setupStep1);
  }

  return currentState;
};
