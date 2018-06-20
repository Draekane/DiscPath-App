import * as faker from 'faker';

export default class Disc {
  constructor() {
    this.color = faker.commerce.color();
    this.company = faker.company.companyName();
    this.discId = faker.random.number();
    this.displayName = faker.commerce.productName();
    this.enabled = true;
    this.hst = -(faker.random.number() % 60);
    this.lsf = faker.random.number() % 60;
    this.maxWeight = getMaxWeight(faker.random.number());
    this.name = this.displayName;
    this.power = faker.random.number() % 49;
    this.range = getRange(faker.random.number());
    this.throwType = getThrowType(faker.random.number());
    this.type = getDiscType(this.range);
    this.wear = 10;
    this.weight = this.maxWeight;
  }
}

const getMaxWeight = (value) => {
  const temp = (value % 200);
  if (temp < 100) return temp + 100;
  return temp;
};

const getRange = (value) => {
  const temp = (value % 450);
  if (temp < 200) return temp + 200;
  return temp;
};

const getThrowType = (value) => {
  if ((value % 2) === 0) return 'rhbh';
  return 'lhbh';
};

const getDiscType = (value) => {
  let returnVal;
  if (value > 350) {
    returnVal = 'D';
  } else if (value > 300) {
    returnVal = 'F';
  } else if (value > 200) {
    returnVal = 'M';
  } else if (value > 100) {
    returnVal = 'P';
  }
  return returnVal;
};
