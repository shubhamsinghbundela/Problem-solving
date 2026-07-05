class Mutex {
  constructor() {
    this.queue = [];
    this.flag = true;
  }

  lock(task, onComplete) {
    this.queue.push({ task, onComplete });
    this._release();
  }

  _release() {
    if (this.flag && this.queue.length) {
      this.flag = false;
      const { task, onComplete } = this.queue.shift();
      task((err, data) => {
        if (err) {
          onComplete(err);
        } else {
          onComplete(null, data);
        }
        this.flag = true;
        this._release();
      });
    }
  }
}
const mutex = new Mutex();
const results = [];

mutex.lock(
  (cb) => setTimeout(() => cb(null, "TASK_A"), 50),
  (err, data) => {
    results.push(data);
  },
);

mutex.lock(
  (cb) => setTimeout(() => cb(null, "TASK_B"), 10),
  (err, data) => {
    results.push(data);
    console.log(results);
    // try {
    //   expect(results).toEqual(["TASK_A", "TASK_B"]);
    //   done();
    // } catch (e) {
    //   done(e);
    // }
  },
);
