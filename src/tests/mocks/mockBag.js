import faker from 'faker';

export default class Bag {
  constructor() {
    this.bagId = faker.random.number();
    this.discs = [];
    this.name = faker.lorem.word();
  }
}
