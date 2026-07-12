// Problem Description – Priority Task Queue
//
// You are required to implement a PriorityQueueExecutor that runs async tasks sequentially.
//
// The executor must support push(task, priority), where higher priority runs first.
// If tasks are waiting, newly added high-priority tasks should jump ahead of lower-priority ones.
class PriorityQueueExecutor {
  constructor() {
    this.queue = [];
    this.active = 0;
  }
  async push(task, priority = 0) {
    this.queue.push({ task, priority });
    console.log(priority);
    this.queue.sort((a, b) => b.priority - a.priority);
    this._run();
  }
  async _run() {
    if (this.queue.length === 0) return;
    while (this.active < 1) {
      this.active += 1;
      const { task } = this.queue.shift();
      task().then(() => {
        this.active -= 1;
        this._run();
      });
    }
  }
}
module.exports = PriorityQueueExecutor;
