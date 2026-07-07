// Problem Description – batchAll(tasks, batchSize)

// You are required to implement a function named batchAll that processes an array of asynchronous tasks in fixed-size batches.
// Each batch should execute its tasks concurrently, but the next batch must not start until all tasks in the current batch have completed.
async function batchAll(tasks, batchSize) {
  return new Promise((resolve, reject) => {
    let active = 0;
    let index = 0;
    let result = [];
    let completed = 0;
    function next() {
      if (completed == tasks.length) {
        resolve(result);
      }
      while (active < batchSize && index < tasks.length) {
        let currentIndex = index;
        active += 1;
        index += 1;
        tasks[currentIndex]()
          .then((data) => {
            result[currentIndex] = data;
            active -= 1;
            completed += 1;
            next();
          })
          .catch(reject);
      }
    }
    next();
  });
}

module.exports = batchAll;
