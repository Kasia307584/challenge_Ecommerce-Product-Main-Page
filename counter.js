export default class Counter {
  constructor() {
    this.count = 0;
  }

  addCount() {
    this.count++;
    return this.count;
  }

  subtractCount() {
    if (this.count > 0) {
      this.count--;
    }
    return this.count;
  }

  countToDisplay() {
    return this.count;
  }

  sumToDisplay(price) {
    return price * this.count;
  }
}
