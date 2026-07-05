// Problem Description – Leaky Bucket Rate Limiter
//
// You are required to implement a RateLimiter based on the Leaky Bucket algorithm.
//
// The rate limiter has a fixed capacity and processes tasks at a constant rate.
// Tasks are executed in the exact order they are received.
//
// Requirements:
// 1. The bucket has a maximum capacity
// 2. Tasks are processed at a fixed interval (leak rate)
// 3. If the bucket is full, new tasks must be rejected immediately
// 4. Fairness must be preserved (FIFO execution)

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
      err.message = "Rate Limit Exceeded";
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

module.exports = LeakyBucket;
