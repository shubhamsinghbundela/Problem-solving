class Scheduler {
  constructor() {
    this.queue = [];
  }

  schedule(task, priority = 0) {
    this.queue.push({ task, priority });
    this.queue.sort((a, b) => b.priority - a.priority);
  }

  run(onAllFinished) {
    if (this.queue.length === 0) {
      return onAllFinished && onAllFinished(null);
    }
    const { task } = this.queue.shift();
    task((err, data) => {
      this.run(onAllFinished);
    });
  }
}

const scheduler = new Scheduler();
const results = [];

const createTask = (val) => (cb) => {
  console.log(val);
  results.push(val);
  cb(null);
};

scheduler.schedule(createTask("low"), 0);
scheduler.schedule(createTask("high"), 10);
scheduler.schedule(createTask("medium"), 5);

scheduler.run((err) => {
  console.log(results);
  // try {
  //   expect(err).toBeNull();
  //   expect(results).toEqual(["high", "medium", "low"]);
  //   done();
  // } catch (e) {
  //   done(e);
  // }
});
