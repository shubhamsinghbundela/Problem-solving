// Problem Description – Parallel Execution with Concurrency Limit
//
// You need to execute many asynchronous tasks (e.g., image downloads),
// but only a fixed number are allowed to run at the same time to avoid
// resource exhaustion.
//
// This problem tests concurrency control and result ordering.
//
// Requirements:
// - Accept an array of tasks and a concurrency limit.
// - Run at most `limit` tasks in parallel until all are completed.
// - Return results in the original task order via onAllFinished.

function mapLimit(tasks, limit, onAllFinished) {
  let active = 0;
  let completed = 0;
  let index = 0;
  let results = [];

  function next() {
    if (completed == tasks.length) {
      onAllFinished(null, results);
    }
    while (active < limit && index < tasks.length) {
      let currentIndex = index;
      active += 1;
      index += 1;
      tasks[currentIndex]((err, data) => {
        results[currentIndex] = data;
        active -= 1;
        completed++;
        next();
      });
    }
  }
  next();
}

module.exports = mapLimit;
