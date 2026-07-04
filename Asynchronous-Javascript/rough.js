class DynamicPriorityQueue {
  constructor(concurrency) {
    this.concurrency = concurrency;
    this.queue = [];
    this.active = 0;
  }

  setLimit(newLimit) {
    this.concurrency = newLimit;
    this.runNext();
  }

  add(task, priority, onComplete) {
    this.queue.push({ task, priority, onComplete });
    console.log("before", this.queue);
    this.queue.sort((a, b) => b.priority - a.priority);
    console.log("after", this.queue);
    this.runNext();
  }

  runNext() {
    while (this.active < this.concurrency && this.queue.length !== 0) {
      const { task, onComplete } = this.queue.shift();
      this.active += 1;
      task((err, data) => {
        this.active--;
        if (err) {
          onComplete(err);
        } else {
          onComplete(null, data);
        }
        this.runNext();
      });
    }
  }
}

const pq = new DynamicPriorityQueue(1);
const results = [];

const checkDone = () => {
  if (results.length === 3) {
    // try {
    //   expect(results).toEqual(["first", "high", "low"]);
    //   done();
    // } catch (e) {
    //   done(e);
    // }
    console.log(results);
  }
};

pq.add(
  (cb) => setTimeout(() => cb(null, "first"), 50),
  0,
  (err, res) => {
    results.push(res);
    checkDone();
  },
);

pq.add(
  (cb) => setTimeout(() => cb(null, "low"), 10),
  0,
  (err, res) => {
    results.push(res);
    checkDone();
  },
);

pq.add(
  (cb) => setTimeout(() => cb(null, "high"), 10),
  10,
  (err, res) => {
    results.push(res);
    checkDone();
  },
);

pq.setLimit(2);
