export default class Counter {
  constructor(count) {
    this.count = count;
  }

  addCount() {
    this.count++;
    return this.count;
  }

  subtractCount() {
    if (this.count > 0) {
      this.count--;
    }
    console.log(this.count);
    return this.count;
  }

  // countToDisplay() {
  //   return this.count;
  // }

  sumToDisplay(price) {
    return price * this.count;
  }
}