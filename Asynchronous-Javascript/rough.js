class LeakyBucket {
  constructor(capacity, leakRateMs) {
    this.limit = capacity;
    this.leakRateMs = leakRateMs;
    this.queue = [];
    this.totalRequest = 0;
    this.flag = true;
  }

  add(task, onComplete) {
    this.totalRequest += 1;
    if (this.totalRequest > this.limit) {
      let err = {};
      err.message = "Rate Limit Exceed";
      onComplete(err);
      return;
    }
    this.queue.push({ task, onComplete });
    this._process();
  }

  _process() {
    if (this.flag && this.queue.length) {
      this.flag = false;
      setTimeout(() => {
        const { task, onComplete } = this.queue.shift();
        task((err, data) => {
          if (err) {
            onComplete(err);
          } else {
            onComplete(null, data);
          }
          this.flag = true;
          this._process();
        });
      }, this.leakRateMs);
    }
  }
}

const bucket = new LeakyBucket(1, 50);

const slowTask = (cb) => setTimeout(() => cb(null), 100);

bucket.add(slowTask, () => {});

bucket.add(slowTask, (err) => {
  // try {
  //   expect(err).toBeDefined();
  //   expect(err.message).toBe("Rate Limit Exceeded");
  //   done();
  // } catch (e) {
  //   done(e);
  // }
  console.log(err.message);
});
