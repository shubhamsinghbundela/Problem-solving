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

const pool = new CallbackPool(2);
let activeCount = 0;
let maxActive = 0;
let finished = 0;

const task = (cb) => {
  activeCount++;
  maxActive = Math.max(maxActive, activeCount);
  setTimeout(() => {
    activeCount--;
    cb(null, "done");
  }, 20);
};

const handleComplete = () => {
  finished++;
  if (finished === 5) {
    console.log(maxActive);
  }
};

for (let i = 0; i < 5; i++) {
  pool.run(task, handleComplete);
}
