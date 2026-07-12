class PriorityQueueExecutor {
  constructor() {
    this.queue = [];
    this.active = 0;
  }
  async push(task, priority = 0) {
    this.queue.push({ task, priority });
    console.log(priority);
    this.queue.sort((a, b) => b.priority - a.priority);
    await this._run();
  }
  async _run() {
    if (this.queue.length === 0) return;
    while (this.active < 1) {
      this.active += 1;
      const { task } = this.queue.shift();
      task()
        .then(() => {
          this.active -= 1;
          this._run();
        })
        .catch((err) => {
          this._run();
        });
    }
  }
}

(async () => {
  const executor = new PriorityQueueExecutor();
  const results = [];

  const createTask = (id, ms) => async () => {
    await new Promise((r) => setTimeout(r, ms));
    results.push(id);
  };

  executor.push(createTask("LOW", 50), 1);

  executor.push(createTask("MED", 10), 5);
  executor.push(createTask("HIGH", 10), 10);

  await new Promise((r) => setTimeout(r, 150));

  console.log(results);

  // expect(results).toEqual(["LOW", "HIGH", "MED"]);
})();
