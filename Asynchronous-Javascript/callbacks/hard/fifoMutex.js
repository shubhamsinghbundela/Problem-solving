// Problem Description – Fair FIFO Mutex
//
// Implement a Mutex to control access to an async resource.
//
// Only one task may run at a time. Extra tasks must wait in a queue
// and be executed in FIFO order.
//
// When a task finishes, the lock should be released automatically
// and the next queued task should start.
//
// Requirements:
// - Run immediately if free.
// - Queue when locked (FIFO).
// - Auto-release on task completion.
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

module.exports = Mutex;
