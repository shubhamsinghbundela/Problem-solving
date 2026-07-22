// Problem Description – Concurrency-Limited Task Executor

// You are given an array of asynchronous tasks and a number maxConcurrent.
// Your task is to execute the tasks while ensuring that no more than maxConcurrent tasks run at the same time.
// As soon as one task completes, the next pending task should start.
// The final output must preserve the original task order.
async function taskScheduler(tasks, maxConcurrent) {
  return new Promise((resolve, reject) => {
    let result = [];
    let completed = 0;
    let index = 0;
    let active = 0;
    function next() {
      if (completed == tasks.length) {
        resolve(result);
        return;
      }
      while (active < maxConcurrent && index < tasks.length) {
        let currentIndex = index;
        active += 1;
        index += 1;
        tasks[currentIndex]()
          .then((data) => {
            result[currentIndex] = data;
            completed += 1;
            active -= 1;
            next();
          })
          .catch((err) => {
            reject(err);
          });
      }
    }
    next();
  });
}

module.exports = taskScheduler;
