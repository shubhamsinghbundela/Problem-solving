// Problem Description – Asynchronous Worker Pool
//
// You are required to create a worker pool that manages the execution
// of asynchronous tasks.
// The pool should ensure that no more than N tasks are running concurrently,
// while any additional tasks are queued.
// As tasks complete, queued tasks should start automatically.
// Each task must invoke its callback with its result when finished.

class CallbackPool {
  constructor(limit) {
    this.limit = limit;
    this.queue = [];
    this.active = 0;
  }

  run(task, onComplete) {
    this.queue.push({ task, onComplete });
    this._next();
  }

  _next() {
    while (this.active < this.limit && this.queue.length !== 0) {
      const { task, onComplete } = this.queue.shift();
      this.active += 1;
      task((err, data) => {
        this.active--;
        if (err) {
          onComplete(err);
        } else {
          onComplete(null, data);
        }
        this._next();
      });
    }
  }
}

module.exports = CallbackPool;
