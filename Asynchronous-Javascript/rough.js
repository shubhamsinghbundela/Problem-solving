class Barrier {
  constructor() {
    this.opened = false;
    this.waiters = [];
  }
  wait() {
    return new Promise((resolve) => {
      if (this.opened) {
        resolve();
      } else {
        this.waiters.push(resolve);
      }
    });
  }
  open() {
    this.opened = true;

    for (const resolve of this.waiters) {
      resolve();
    }

    this.waiters = [];
  }
}

(async () => {
  const barrier = new Barrier();
  let count = 0;

  const waiter = async () => {
    await barrier.wait();
    count++;
  };

  const p1 = waiter();
  console.log(p1);
  const p2 = waiter();
  console.log(p2);
  const p3 = waiter();
  console.log(p3);

  console.log(count);
  // expect(count).toBe(0);

  barrier.open();
  await Promise.all([p1, p2, p3]);

  console.log(count);
  // expect(count).toBe(3);
})();
